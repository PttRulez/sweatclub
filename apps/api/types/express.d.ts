import { PassportUser } from './user';

declare global {
	namespace Express {
		export interface Request {
			user: PassportUser
		}
	}
}