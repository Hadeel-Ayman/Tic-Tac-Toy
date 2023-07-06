const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("./models/user");


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          console.log("user is there");
          done(null, existingUser);
        } else {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          const user = await User.create(newUser);
          console.log("creating new user");
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUse = await User.findOne({ gitId: profile.id });
        if (existingUse) {
          console.log("user is there");
          done(null, existingUse);
        } else {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          const user = await User.create(newUser);
          console.log("creating new user");
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "picture.type(large)"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          console.log("user is there");
          done(null, existingUser);
        } else {
          const newUser = {
            id: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          user = await User.create(newUser);
          console.log("creating new user");
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
