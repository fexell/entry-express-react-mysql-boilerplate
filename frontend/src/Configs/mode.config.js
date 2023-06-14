const isDevMode     = process.env.NODE_ENV !== 'production'

export const ApiURI = isDevMode ? 'http://localhost:5000/api' : ''