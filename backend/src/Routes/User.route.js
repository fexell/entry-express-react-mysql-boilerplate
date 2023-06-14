import express from 'express'
import { Op } from 'sequelize'

import User, { Serialize } from '../Models/user.model.js'

import { ErrorResponse, SuccessResponse } from '../Utils/Response.util.js'
import { RegexEmail, RegexOneWord } from '../Utils/Regexes.util.js'
import { Capitalize } from '../Utils/Strings.util.js'
import { GeneratePasswordHash } from '../Utils/Passwords.util.js'
import { VerifyAccessToken } from '../Utils/Tokens.util.js'

const UserRoute       = express()

// Get all users route
UserRoute.get('/', VerifyAccessToken, async (req, res) => {
  const allUsers          = await User.findAll()

  return SuccessResponse(200, 'users', 'Found all users successfully.', { users: allUsers }, res)
})

// Create new user route
UserRoute.post('/', async (req, res) => {
  let email                 = req.body.email
  let username              = req.body.username
  let firstname             = req.body.firstname
  let surname               = req.body.surname
  let password              = req.body.password
  let confirm               = req.body.confirmPassword

  // If the email isn't provided, or doesn't pass the regex test
  if(!email) return ErrorResponse(422, 'email', 'You need to enter an e-mail.', null, res)
  else if(!RegexEmail(email)) return ErrorResponse(400, 'email', 'Enter a valid e-mail.', null, res)

  // If the username isn't provided, or doesn't pass the regex test
  if(!username) return ErrorResponse(422, 'username', 'You need to enter a username', null, res)
  else if(!RegexOneWord(username)) return ErrorResponse(400, 'username', 'Username can only be one word.', null, res)

  // If first name and surname is provided, then check that the value is just one word
  if(firstname && !RegexOneWord(firstname)) return ErrorResponse(422, 'firstname', 'First name can only be one word.', null, res)
  else if(surname && !RegexOneWord(surname)) return ErrorResponse(422, 'surname', 'Surname can only be one word.', null, res)

  // If the passwords aren't provided, or do not match
  if(!password) return ErrorResponse(422, 'password', 'You need to enter a password.', null, res)
  else if(!confirm) return ErrorResponse(422, 'confirmPassword', 'You need to confirm your password.', null, res)
  else if(password !== confirm) return ErrorResponse(403, 'confirmPassword', 'Passwords doesn\'t match.', null, res)

  // Turn email to lower case
  email                           = email.toLowerCase()

  // Capitalize the username
  username                        = Capitalize(username)
  firstname                       = Capitalize(firstname)
  surname                         = Capitalize(surname)

  try {
    
    // Find user by email and username
    const findExistingEmail       = await User.findOne({ where: { email: email } })
    const findExistingUsername    = await User.findOne({ where: { username: username } })

    // If email or username already exists
    if(findExistingEmail) return ErrorResponse(409, 'email', 'User with the provided e-mail already exists.', Serialize(findExistingEmail), res)
    else if(findExistingUsername) return ErrorResponse(409, 'username', 'User with the provided username already exists.', Serialize(findExistingUsername), res)

    // Generate the password
    return GeneratePasswordHash(password)
      .then(async (hash) => {

        // Create the new user and insert it to the database
        const newUser       = await User.create({
          email             : email,
          username          : username,
          firstname         : firstname || null,
          surname           : surname || null,
          password          : hash
        })

        return SuccessResponse(200, 'user', 'You\'ve successfully signed up.', { user: Serialize(newUser) }, res)
      })
      .catch((error) => {
        return ErrorResponse(500, 'password', 'Something went wrong with encrypting your password.', { errorData: error.message }, res)
      })
  } catch(error) {
    return ErrorResponse(500, 'user add', 'Something went wrong with submitting new user.', { errorData: error.message }, res)
  }
})

export default UserRoute