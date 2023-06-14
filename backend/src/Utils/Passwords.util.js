import pbkdf2 from 'pbkdf2-password-hash'

// Generate password hash function
export const GeneratePasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    pbkdf2.hash(password)
      .then((hash) => resolve(hash))
      .catch((error) => reject(error))
  })
}

// Verify password function
export const VerifyPassword = (password, passwordHash) => {
  return new Promise((resolve, _) => {
    pbkdf2.compare(password, passwordHash)
      .then((isValid) => resolve(isValid))
  })
}