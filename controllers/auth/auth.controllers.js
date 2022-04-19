const register = async (req, res, next) => res.redirect('/productos');
const login = async (req, res, next) => res.redirect('/productos');

module.exports = {
  login,
  register,
}