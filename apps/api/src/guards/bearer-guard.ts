import { NextFunction, Request, Response } from 'express'
import { passport } from '../auth/passport.setup'
import { PassportUser } from 'types/user'

export const bearerGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('bearer', (err, user: PassportUser) => {
    if (err) {
      return err.message
        ? res.status(401).json({ message: err.message })
        : next(err)
    }

    if (user) {
      req.user = user
      return next()
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  })(req, res, next)
}
