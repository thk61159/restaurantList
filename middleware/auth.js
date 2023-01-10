module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/users/login/?note=請先登入才能使用!');
    }
    
    
  },
};
