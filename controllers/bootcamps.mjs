import ErrorResponse from '../utils/errorResponse.mjs'
import asyncHandler from '../middleware/async.mjs'
import geocoder from '../utils/geocoder.mjs'
import Bootcamp from '../models/Bootcamp.mjs'

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
export const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find()
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )

  res.status(200).json({ success: true })
})

// @desc        Get bootcamps within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access      Private
export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance, unit } = req.params

  if (unit !== 'km' && unit !== 'mile') {
    return next(new ErrorResponse('Please specify unit as km or mile', 400))
  }

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 6378 Km / 3963 Miles
  const radius = unit === 'km' ? distance / 6378 : distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})
