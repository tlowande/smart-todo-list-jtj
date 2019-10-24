
const isLogged = userId => {
  return userId !== undefined;
}

const isUserLogged = (req, res, next) => {
  if (req.path === '/login' || req.path === '/register') {
    next();
  } else if (!isLogged(req.session.user_id)) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = { isUserLogged };
