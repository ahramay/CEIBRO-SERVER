const mongoose = require('mongoose');
const { rolesAccess, memberAccess, timeProfileAccess } = require('../config/project.config');
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    admin: {type:Boolean,default: false},

    permissions: {
      admin: {
        roles: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
        member: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
        timeProfile: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
      },
      subContractor: {
        member: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
        timeProfile: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
      },
      individual: {
        roles: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
        member: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
        timeProfile: {
          create: {type: Boolean, default: false},
          edit: {type: Boolean, default: false},
          delete: {type: Boolean, default: false},
        },
      },
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
