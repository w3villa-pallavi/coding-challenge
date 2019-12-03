// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be empty'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true,
      validate: {
        notNull: {
          msg: 'Date of Birth cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      isEmail: true,
      validate: {
        notNull: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Email is invalid'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender cannot be empty'
        },
      }
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(14, 4),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Hourly Rate cannot be empty'
        },
      }
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return user;
};
