import express, { NextFunction, Request, Response } from 'express';
import {passport} from 'src/auth/passport.setup';
import jwt from 'jsonwebtoken';
import validateSchema from 'src/guards/validate-schema-guard';
import { LoginSchema, RegisterData, RegisterSchema } from "contracts";
import prisma from 'src/prisma';
import { hash } from 'argon2';

const routes = express.Router();

routes.post('/login', validateSchema(LoginSchema), async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('local', (err, user, json) => {
		if (err) return next(err);
		
		if (!user) {
			return res.status(401).json(json)
		}

		return res.json({
			accessToken: jwt.sign(user, process.env.PASSPORT_SECRET_KEY!, { expiresIn: '12h' })
		})
	})(req, res, next);
})

routes.post('/register', validateSchema(RegisterSchema), async (req: Request<any, any, RegisterData>, res: Response, next: NextFunction) => {
	const { name, cityId, password, username } = req.body;

	const duplicate = await prisma.user.findUnique({
		where: { username }
	})
	
	if (duplicate) {
		return res.status(400).json({ message: 'Такой username уже занят'})
	}

	const hashedPassword = await hash(password);

	const newUser = await prisma.user.create({
		data: {
			name, cityId, hashedPassword, username
		}
	})

	return res.status(201).json({ newUser })
})

export { routes as authController };