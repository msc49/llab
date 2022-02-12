if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const User = require('../../models/user')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrkey: PUB_KEY,
  algorithms: ['RS256']
}

const strategy = new JWTStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if(user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch((err => done(err, null)))
})

module.exports = (passport) => {
  passport.use(strategy)
}