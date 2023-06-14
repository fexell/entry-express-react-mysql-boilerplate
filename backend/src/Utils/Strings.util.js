import randomstring from 'randomstring'

// Capitalize a word function
export const Capitalize = (word) => {
  const lower           = word.toLowerCase()

  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

// Generate a random string
export const RandomString = (num) => {
  return randomstring.generate(num)
}