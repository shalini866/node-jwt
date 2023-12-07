const jwt = require('jsonwebtoken');
const User = require('../models/User')
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'this is a secret it dosen store any of the application it is a way to set secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};


// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'this is a secret it dosen store any of the application it is a way to set secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  // const checkUser = (req, res, next) => {
  //   const token = req.cookies.jwt;
  //   if (token) {
  //     jwt.verify(token, 'this is a secret it dosen store any of the application it is a way to set secret', async (err, decodedToken) => {
  //       if (err) {
  //         res.locals.user = null;
  //         next();
  //       } else {
  //         try {
  //           let user = await User.findById(decodedToken.id);
  //           res.locals.user = user;
  //           next();
  //         } catch (error) {
  //           console.error(error);
  //           res.locals.user = null;
  //           next();
  //         }
  //       }
  //     });
  //   } else {
  //     res.locals.user = null;
  //     next();
  //   }
  // };


module.exports = { requireAuth , checkUser};