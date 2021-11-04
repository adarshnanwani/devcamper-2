import mongoose from 'mongoose'

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    slug: mongoose.Schema.Types.String,
    description: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please add a name'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    website: {
      type: mongoose.Schema.Types.String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    phone: {
      type: mongoose.Schema.Types.String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    email: {
      type: mongoose.Schema.Types.String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please add an address'],
    },
    location: {
      // GeoJSON Point
      type: {
        type: mongoose.Schema.Types.String,
        enum: ['Point'],
      },
      coordinates: {
        type: [mongoose.Schema.Types.Number],
        index: '2dsphere',
      },
      formattedAddress: mongoose.Schema.Types.String,
      street: mongoose.Schema.Types.String,
      city: mongoose.Schema.Types.String,
      state: mongoose.Schema.Types.String,
      zipcode: mongoose.Schema.Types.String,
      country: mongoose.Schema.Types.String,
    },
    careers: {
      // Array of strings
      type: [mongoose.Schema.Types.String],
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Other',
      ],
    },
    averageRating: {
      type: mongoose.Schema.Types.Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
    },
    averageCost: mongoose.Schema.Types.Number,
    photo: {
      type: mongoose.Schema.Types.String,
      default: 'no-photo.jpg',
    },
    housing: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    jobAssistance: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    jobGuarantee: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    acceptGi: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const BootcampModel = mongoose.model('Bootcamp', BootcampSchema)

export default BootcampModel
