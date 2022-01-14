const { hashPassword, checkPassword } = require("../../uti/handlePassword");
const User = require("../models/User");
const { mongooseToObject, multipleMongooseToObject } = require('../../uti/mongoose');
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class userController {
  // [GET] /users/show
  showAllUser(req, res, next) {
    User.find({})
            .then(users => {
                res.render('users/show', {
                    users: multipleConvertDate(multipleMongooseToObject(users))
                });
            })
            .catch(err => next(err));
  }

  // [GET] /users/edit/:id
  editUser(req, res, next) {
    User.findById(req.params.id)
            .then(user => res.render('users/edit',  {
                    user: convertDate(mongooseToObject(user))
            }))
            .catch(next)
  }

  // [PUT] /users/update/:id
  updateUser(req, res, next) {
    const updateUser = {
      name : req.body.name,
    };
    User.updateOne({ _id: req.params.id }, updateUser)
        .then(() => res.redirect(`../info/${req.params.id}`))
        .catch(next);
  }

  // [GET] /users/info/:id
  infoUser(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            res.render('users/info', {
              user: convertDate(mongooseToObject(user))
            });
        })
        .catch(err => next(err));
  }

  // [DELETE] /users/:id
  deleteUser(req, res, next) {
    User.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }

  // [DELETE] /users/force/:id
  forceUser(req, res, next) {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }

  // [PATCH] /courses/restore/:id
  restoreUser(req, res, next) {
      User.restore({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(next);
  }

  // [GET] /users/trash
  showTrashUser(req, res, next) {
    User.findDeleted({})
      .then(users => {
          res.render('users/trash', {
              users: multipleConvertDate(multipleMongooseToObject(users))
          });
      })
      .catch(err => next(err));
  }

  // [GET] /changePassword/:id
  changePassUser(req, res, next) {
    res.render('users/changePassword');
  }

  // [POST] /change/:id
  async changePasswordUser(req, res, next) {
    const { oldPass, newPass, reNewPass } = req.body;
    let hashOld = await hashPassword(oldPass);
    let hashNew = await hashPassword(newPass);
    User.find({ _id: req.params.id})
      .then(user => {
        if (hashOld === user.password) {
          if (newPass === reNewPass) {
            User.updateOne({ _id: req.params.id }, {
              ...user,
              password: hashNew
            })
              .then('../')
              .catch(err => next(err))
          }
        }
      })
      .catch(err => next(err))
  }

  // [GET] /users/register
  getRegister(req, res, next) {
    const message = req.flash("message");
    return res.render("users/register", { message: message[0] });
  }

  async createUser(req, res, next) {
    const { username, password, confirmPassword } = req.body;
    let hashedPassword;
    try {
      if (confirmPassword === password) {
        hashedPassword = await hashPassword(password);
        delete req.body.confirmPassword;
      } else {
        req.flash("message", "Password and confirm password not match");
        return res.redirect("/users/register");
      }
      const userExist = await User.findOne({ username });
      if (userExist) {
        req.flash("message", "Username already exist");
        return res.redirect("/users/register");
      }
      await new User({
        ...req.body,
        password: hashedPassword,
      }).save();
      const user = await User.find();
      req.flash("message", "User created successfully");
      return res.redirect("/users/register");
    } catch (error) {}
  }

  getLogin(req, res, next) {
    const message = req.flash("message");
    return res.render("users/login", { message: message[0] });
  }
  
  async loginUser(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user) {
        const isCorrect = await checkPassword(password, user.password);
        if (isCorrect) {
          req.session.user = user;
          return res.redirect("/");
        }
      }
      req.flash("message", "Sai tên tài khoản hoặc mật khẩu");
      return res.redirect("/users/login");
    } catch (error) {
      throw error;
    }
  }

  logoutUser(req, res, next) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/users/login");
    });
  }
}

module.exports = new userController();
