module.exports = function(req, res, next) {
    //isAuthenticated comes from passport
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error','Por favor realize o login!');
    res.redirect('/signin');
}