import Bootcamp from '../models/Bootcamp.mjs'

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
export function getBootcamps(req, res, next) {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
export function getBootcamp(req, res, next) {
  res.status(200).json({ success: true, msg: 'Get single bootcamp' })
}

// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
export async function createBootcamp(req, res, next) {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
  } catch (ex) {
    res.status(400).json({ success: false })
  }
}

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
export function updateBootcamp(req, res, next) {
  res.status(200).json({ success: true, msg: 'Update a bootcamp' })
}

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
export function deleteBootcamp(req, res, next) {
  res.status(201).json({ success: true, msg: 'Delete a bootcamp' })
}
