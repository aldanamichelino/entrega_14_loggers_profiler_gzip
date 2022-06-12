const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { UserService } = require('../services/users/users.service');
const UserDTO = require('../models/dtos/user.dto')

const salt = async() => await bcrypt.genSalt(10);
const createHash = async(password) => await bcrypt.hash(password, parseInt(salt()));
const isValidPassword = async (user, password) => await bcrypt.compare(password, user.password);

const userService = new UserService;

//Passport local strategy
passport.use('login', new LocalStrategy(async (username, password, done) => {
    try{
        const user = await userService.getUserByEmail(username);
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

            const newUser = new UserDTO(userObject);
            const user = await userService.createUser(newUser);
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
    const user = await userService.getUserById(id);
    done(null, user);
});

module.exports = passport;