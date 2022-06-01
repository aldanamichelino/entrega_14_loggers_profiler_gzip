const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { createUser, getUserById, getUserByEmail} = require('../services/users/users.service');
const { formatUserForDB } = require('../utils/users.utils');

const salt = async() => await bcrypt.genSalt(10);
const createHash = async(password) => await bcrypt.hash(password, parseInt(salt()));
const isValidPassword = async (user, password) => await bcrypt.compare(password, user.password);

//Passport local strategy
passport.use('login', new LocalStrategy(async (username, password, done) => {
    try{
        const user = await getUserByEmail(username);
        const validPassword = await isValidPassword(user, password);
        if(!validPassword){
            console.log('Usuario o contraseña inválidos');
            return done(null, false);
        }
        return done(null, user);
    } catch(error) {
        return done(error);
    };
}));


passport.use('register', new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
       try{
            const userObject = {
                email: username,
                password: await createHash(password)
            };

            const newUser = formatUserForDB(userObject);
            const user = await createUser(newUser);
            return done(null, user);
       } catch(error) {
            console.log('Error signing up >>>', error);
            return done(error);
       };
    }
));


//Serialización
passport.serializeUser((user, done) => {
    console.log('Dentro del serializer');
    done(null, user._id);
});

//Deserialización
passport.deserializeUser(async (id, done) => {
    console.log('Dentro del deserializer');
    const user = await getUserById(id);
    done(null, user);
});

module.exports = passport;