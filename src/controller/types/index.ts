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

/**
 * `GoodByeResponse` is an object with a `message` property of type `string` and a `date` property of
 * type `Date`.
 * @property {string} message - The message to be displayed
 * @property {Date} date - The date the message was sent
 */
export type GoodByeResponse = {
  message: string
  date: Date
}