//Note we really don't need to extend this in final implementatin I should remove the extends and the Object.setPrototype of portion
import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
	statusCode = 500
	reason = 'Error connecting to database'

	constructor() {
		super('Error connecting to DB')

		//Only because we are extending a built in class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}
	serializeErrors() {
		return [{ message: this.reason }]
	}
}
