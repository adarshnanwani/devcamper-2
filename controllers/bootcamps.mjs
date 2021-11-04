import ErrorResponse from '../utils/errorResponse.mjs'
import Bootcamp from '../models/Bootcamp.mjs'

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
export async function getBootcamps(req, res, next) {
  try {
    const bootcamps = await Bootcamp.find()
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
export async function getBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp)
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${(req.params, id)}`,
          404
        )
      )

    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    // res.status(400).json({ success: false })

    next(
      new ErrorResponse(
        `Bootcamp not found with id of ${(req.params, id)}`,
        404
      )
    )
  }
}

// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
export async function createBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
export async function updateBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!bootcamp) return res.status(400).json({ success: false })

    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
export async function deleteBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp) return res.status(400).json({ success: false })

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}
