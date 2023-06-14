import jwt from 'jsonwebtoken'

import Api from '../../api.js'

import { ErrorResponse } from './Response.util.js'

// Create access token, and decode it
export const SignAccessToken      = (data) => jwt.sign(data, Api.get('ACCESS_TOKEN_SECRET'))
export const DecodeAccessToken    = (accessToken) => jwt.verify(accessToken, Api.get('ACCESS_TOKEN_SECRET'))

// Create refresh token, and decode it
export const SignRefreshToken     = (data) => jwt.sign(data, Api.get('REFRESH_TOKEN_SECRET'))
export const DecodeRefreshToken   = (refreshToken) => jwt.verify(refreshToken, Api.get('REFRESH_TOKEN_SECRET'))

// Verify access token middleware
export const VerifyAccessToken    = (req, res, next) => {
  const accessToken               = req.headers.authorization || req.body.accessToken || req.cookies.accessToken

  if(!accessToken) return ErrorResponse(403, 'accessToken', 'Could not find access token.', null, res)

  try {
    const decoded                 = DecodeAccessToken(accessToken)

    req.user                      = decoded
    req.accessToken               = accessToken
  } catch(error) {
    return ErrorResponse(401, 'accessToken', 'Access token is not valid.', null, res)
  }

  return next()
}

// Verify refresh token middleware
export const VerifyRefreshToken   = (req, res, next) => {
  const refreshToken              = req.headers.authorization || req.body.refreshToken || req.cookies.refreshToken

  if(!refreshToken) return ErrorResponse(403, 'refreshToken', 'Could not find refresh token.', null, res)

  try {
    const decoded                 = DecodeRefreshToken(refreshToken)

    req.user                      = decoded
    req.refreshToken              = refreshToken
  } catch(error) {
    return ErrorResponse(401, 'refreshToken', 'Refresh token is not valid.', null, res)
  }

  return next()
}