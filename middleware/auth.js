module.exports = {
  authenticator: (req, res, next) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    } else {
      // req.flash('warning_msg', '請先登入才能使用！'); //flash module 提示錯誤
      res.redirect('/users/login');
    }
    
    
  },
};
