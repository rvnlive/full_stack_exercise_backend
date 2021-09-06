const {
  errorMessage, successMessage, status
} = require('../helpers/status')

const {
  hashPassword,
  comparePassword,
  validatePassword,
  isEmpty,
  generateUserToken
} = require('../helpers/validations')

const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const User = models.users

/// /////////////////////////////////////////// //

exports.signUpUser = (req, res) => {
  const { userName, password } = req.body
  if (isEmpty(userName) || isEmpty(password)) {
    errorMessage.error = 'Fields can NOT be empty'
    console.log(errorMessage.error)
    return res.status(status.bad).send(errorMessage)
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than five(5) characters'
    return res.status(status.bad).send(errorMessage)
  }
  const hashedPassword = hashPassword(password)
  /// ///////////////////////////////////////////////
  User
    .findOrCreate({
      where: { user_name: userName },
      defaults: {
        user_name: userName,
        user_password: hashedPassword
      }
    })
    .then((result) => {
      const [user, created] = result
      console.log(user)
      if (created) {
        return res.json({ userCreated: created })
      } else if (!created) {
        errorMessage.error = 'Existing user!'
        return res.status(status.conflict).send(errorMessage)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error)
    )
}

exports.logInUser = (req, res) => {
  const { userName, password } = req.body

  if (isEmpty(userName) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing'
    return res.status(status.bad).send(errorMessage)
  }
  /// ///////////////////////////////////////////////
  User
    .findOne({
      where: { user_name: userName }
    })
    .then((result) => {
      console.log(result)
      if (result === null) {
        errorMessage.error = 'User with this email does not exist'
        return res.status(status.notfound).send(errorMessage)
      }
      if (!comparePassword(result.user_password, password)) {
        errorMessage.error = 'The password provided is incorrect'
        return res.status(status.bad).send(errorMessage)
      }
      const token = generateUserToken(result.user_name, result.user_id)
      delete result.user_password
      successMessage.data = result
      successMessage.data.token = token
      return res.json({ userid: result.user_id, userName: result.user_name, token: token })
    })
    .catch(error => console.log('Operation was not successful ' + error))
}
