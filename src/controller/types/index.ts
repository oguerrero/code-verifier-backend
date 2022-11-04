/**
 * `BasicResponse` is an object with a `message` property that is a string.
 * @property {string} message - The message to display to the user.
 */
export type BasicResponse = {
  message: string
}

/**
 * ErrorResponse is an object with two properties, error and message, both of which are strings.
 * @property {string} error - The error code.
 * @property {string} message - The error message
 */
export type ErrorResponse = {
  error: string
  message: string
}

export type AuthResponse = {
  status: number
  message: string
  token: string
}
