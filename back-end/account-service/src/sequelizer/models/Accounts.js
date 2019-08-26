module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
      },
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    lastLoggedIn: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
    indexes: [{
      fields: ['email'],
      unique: true,
    }],
    modelName: 'accounts',
    sequelize,
  });
};
