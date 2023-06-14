import express from 'express'
import { Sequelize } from 'sequelize'
import randomstring from 'randomstring'

import User, { Serialize } from '../Models/user.model.js'

import {
  ErrorResponse,
  SuccessResponse
} from '../Utils/Response.util.js'
import { RegexEmail } from '../Utils/Regexes.util.js'
import { GeneratePasswordHash, VerifyPassword } from '../Utils/Passwords.util.js'
import {
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken
} from '../Utils/Tokens.util.js'
import { RandomString } from '../Utils/Strings.util.js'

import { SendEmail } from '../Utils/Email.util.js'

const AuthRoute                 = express()

// The login route
AuthRoute.post('/login', async (req, res) => {
  let email                     = req.body.email
  let password                  = req.body.password

  // Turn the entire provided email to lower case
  email                         = email.toLowerCase()

  // Check email
  if(!email) return ErrorResponse(403, 'email', 'You need to enter your email.', null, res)
  else if(!RegexEmail(email)) return ErrorResponse(403, 'email', 'You need to enter a valid email.', null, res)

  // Check if password is provided
  if(!password) return ErrorResponse(403, 'password', 'You need to enter your password.', null, res)

  try {
    // Find a user by the provided email
    let user                    = await User.unscoped().findOne({ where: { email: email } })

    // In case user with the provided email could not be found
    if(!user) return ErrorResponse(404, 'password', 'Couldn\'t find a user with provided email.', null, res)

    // If user is inactive
    else if(!user.active) return ErrorResponse(403, 'password', 'Your account is inactive.', null, res)

    // Check to see if the password is the correct one
    VerifyPassword(password, user.password)
      .then(async (isValid) => {

        // If the password is wrong
        if(!isValid) return ErrorResponse(403, 'password', 'You\'ve entered the wrong password.', null, res)
        else {
          // Create an access token
          const accessToken     = SignAccessToken(Serialize(user))
          // Create a refresh token
          const refreshToken    = SignRefreshToken(Serialize(user))
          
          // Update lastLoggedInAt date
          user.lastLoggedInAt   = Date.now()
          user.updatedAt        = Date.now()
          user.save()

          res.cookie('accessToken', accessToken, { maxAge: 604800 })
          res.cookie('refreshToken', refreshToken, { maxAge: 1209600 })

          return SuccessResponse(200, 'login', 'You\'ve logged in successfully.', {
            user            : Serialize(user),
            accessToken     : accessToken,
            refreshToken    : refreshToken
          }, res)
        }
      })
  } catch(error) {
    return ErrorResponse(500, 'login', 'Something went wrong with logging you in.', { errorData: error.message }, res)
  }
})

// Refresh access token and user
AuthRoute.put('/refresh', VerifyRefreshToken, (req, res) => {
  try {
    // Create a new access token
    const accessToken           = SignAccessToken(Serialize(req.user))

    return SuccessResponse(200, 'refresh', 'User and access token has been refreshed.', {
      user          : Serialize(req.user),
      accessToken   : accessToken
    }, res)
  } catch(error) {
    return ErrorResponse(500, 'refresh', 'Something went wrong with refreshing user and access token.', null, res)
  }
})

// Forgot password route
AuthRoute.post('/forgot-password', async (req, res) => {
  let email                     = req.body.email

  try {

    // Turn the entire provided email to lower case
    email                       = email.toLowerCase()

    // Find user by the provided email
    const user                  = await User.unscoped().findOne({ where: { email: email } })

    // If user by the provided email could not be found
    if(!user) return ErrorResponse(404, 'email', 'Couldn\'t find user with provided email.', null, res)

    // Generate a random string to be saved as the password recovery token
    const randomString          = RandomString(32)

    // Update password recovery token to the random string
    await User.update({ passwordRecoveryToken: randomString }, { where: { email: user.email } })

    // Send the email with the link to recover/reset the password
    SendEmail('Entry',
      user.email,
      'Change password',
      'Here is your link to supply a new password.',
      `<a href="http://localhost:3000/password-recovery/${ randomString }">http://localhost:3000/password-recovery/${ randomString }</a>`)
      .then((response) => console.log('Email sent.'))
      .catch((error) => console.error(error))

    return SuccessResponse(200, 'forgotPassword', 'Check your email for the password-reset-link.', user, res)
  } catch(error) {
    return ErrorResponse(500, 'forgotPassword', 'Something went wrong with resetting password.', { errorData: error }, res)
  }
})

// New password route, with password recovery token parameter
AuthRoute.post('/new-password/:passwordRecoveryToken', async (req, res) => {
  let password                        = req.body.password
  let confirmPassword                 = req.body.confirmPassword
  let passwordRecoveryToken           = req.params.passwordRecoveryToken

  // If password is not provided
  if(!password) return ErrorResponse(422, 'password', 'You need to provide a password.', null, res)

  // If confirmPassword is not provided
  else if(!confirmPassword) return ErrorResponse(422, 'confirmPassword', 'You need to repeat your password.', null, res)

  // If the passwords does not match
  else if(password !== confirmPassword) return ErrorResponse(403, 'confirmPassword', 'Passwords need to match each other.', null, res)
  
  // In case there is no recovery token from the dynamic route parameter
  else if(!passwordRecoveryToken) return ErrorResponse(422, 'confirmPassword', 'Could not find a password recovery token.', null, res)

  try {

    // Find the user by the password recovery token parameter
    const user                        = await User.unscoped().findOne({ where: { passwordRecoveryToken: passwordRecoveryToken } })

    // If user could not be found
    if(!user) return ErrorResponse(404, 'confirmPassword', 'Could not find user.', null, res)

    // Generate the new password hash
    return GeneratePasswordHash(password)
      .then(async (hash) => {
        user.password                 = hash
        user.passwordRecoveryToken    = ''
        user.save()

        return SuccessResponse(200, 'newPassword', 'Your password has now been changed.', null, res)
      })
  } catch(error) {
    return ErrorResponse(500, 'newPassword', 'Something went wrong with submitting a new password.', { errorData: error }, res)
  }
})

export default AuthRoute