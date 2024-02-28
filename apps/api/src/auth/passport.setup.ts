import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { PassportUser } from 'types/user'
import prisma from 'src/prisma'
import { verify } from 'argon2'
import jwt from 'jsonwebtoken'

// passport.serializeUser((user, done) => {
//   done(null, (user as PassportUser)?.id);
// });

//  const user = await prisma.user.findUnique({
// 				where: { id }
// 			})

//   done(null, user);
// });

passport.use(
  new LocalStrategy(
    async (username: string, password: string, cb): Promise<PassportUser> => {
      const user = await prisma.user.findFirst({
        where: { username },
      })

      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' })
      }

      const passwordMatches = await verify(user.hashedPassword, password)

      if (!passwordMatches) {
        return cb(null, false, { message: 'Incorrect username or password.' })
      }

      return cb(null, {
        username: user.username,
        name: user.name,
        id: user.id,
      })
    }
  )
)

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(
      token,
      process.env.PASSPORT_SECRET_KEY!,
      // @ts-expect-error I dunno
      async (err, decoded: PassportUser) => {
        if (err) return done(err)

        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
        })

        if (!user) {
          return done(null, false)
        }

        return done(null, {
          id: decoded.id,
          username: decoded.username,
          name: decoded.name,
        })
      }
    )
  })
)

export { passport }
