const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
  };

exports.register = function(req, res) {
  const Login = new Login(req.body);
  res.send(req.body);
}