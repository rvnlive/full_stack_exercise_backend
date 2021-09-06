// Secret or Private Key (Token) generator for verification purpose
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = password => bcrypt.hashSync(password, salt)

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword)
}

const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false
  } return true
}

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
  if (input.replace(/\s/g, '').length) {
    return false
  } return true
}

const empty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
}

const generateUserToken = (userid, username) => {
  const token = jwt.sign({
    userid: userid,
    username: username
  },
  process.env.SECRET, { expiresIn: '3d' })
  return token
}

module.exports = { hashPassword, comparePassword, validatePassword, isEmpty, empty, generateUserToken }
