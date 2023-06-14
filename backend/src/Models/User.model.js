import { Sequelize, DataTypes } from 'sequelize'

const SQL           = new Sequelize('mysql://root:@localhost/entry')
const User          = SQL.define('User', {
  email           : {
    type          : DataTypes.STRING,
    allowNull     : false,
    unique        : true,
    validate      : {
      isEmail     : true,
    },
  },
  username        : {
    type          : DataTypes.STRING,
    allowNull     : false,
    unique        : true,
  },
  firstname       : {
    type          : DataTypes.STRING,
    allowNull     : true,
  },
  surname         : {
    type          : DataTypes.STRING,
    allowNull     : true,
  },
  role            : {
    type          : DataTypes.STRING,
    allowNull     : false,
    defaultValue  : 'User',
  },
  password        : {
    type          : DataTypes.STRING,
    allowNull     : false,
  },
  passwordRecoveryToken: {
    type          : DataTypes.STRING,
    allowNull     : true,
  },
  active          : {
    type          : DataTypes.BOOLEAN,
    allowNull     : false,
    defaultValue  : true,
  },
  lastLoggedInAt  : {
    type          : DataTypes.DATE,
    allowNull     : true,
  },
  createdAt       : {
    type          : DataTypes.DATE,
    allowNull     : false,
    defaultValue  : Date.now,
  },
  updatedAt       : {
    type          : DataTypes.DATE,
    allowNull     : false,
    defaultValue  : Date.now,
  }
}, {
  tableName       : 'User',
  defaultScope    : {
    attributes    : {
      exclude     : [ 'password', 'passwordRecoveryToken' ]
    }
  }
})

export const Serialize = ({
  id,
  email,
  username,
  firstname,
  surname,
  role,
  active,
  lastLoggedInAt,
  createdAt,
  updatedAt
}) => {
  return {
    id              : id,
    email           : email,
    username        : username,
    firstname       : firstname,
    surname         : surname,
    role            : role,
    active          : active,
    lastLoggedInAt  : lastLoggedInAt,
    createdAt       : createdAt,
    updatedAt       : updatedAt
  }
}

export default User