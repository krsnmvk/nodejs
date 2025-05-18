import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UserModel } from '../models/user.model.js';
import { randomBytes } from 'node:crypto';
import { validationResult } from 'express-validator';

export function getLogin(req, res, next) {
  let messages = req.flash('error');

  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    errorMessage: messages,
  });
}

export function postLogin(req, res, next) {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      title: 'Login',
      href: '/login',
      errorMessage: errors.array()[0].msg,
    });
  }

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email');
        return res.redirect('/login');
      }

      const isValidPassword = compareSync(password, user.password);

      if (!isValidPassword) {
        req.flash('error', 'Invalid password');
        return res.redirect('/login');
      }

      req.session.isLoggedIn = true;
      req.session.user = user;

      req.session.save((err) => {
        if (err) {
          console.log(err);
        }

        return res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }

    return res.redirect('/');
  });
}

export function getSignup(req, res, next) {
  let messages = req.flash('error');

  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }

  return res.render('auth/signup', {
    title: 'Signup',
    href: '/signup',
    errorMessage: messages,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });
}

export function postSignup(req, res, next) {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());

    return res.status(422).render('auth/signup', {
      title: 'Signup',
      href: '/signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  const newUser = new UserModel({
    email: email,
    password: hashedPassword,
    cart: { items: [] },
  });

  return newUser
    .save()
    .then(() => res.redirect('/login'))
    .catch((err) => console.log(err));
}

export function getResetPassword(req, res, next) {
  let messages = req.flash('error');

  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }

  return res.render('auth/reset-password', {
    title: 'Reset Password',
    href: '/reset',
    errorMessage: messages,
  });
}

export function postResetPassword(req, res, next) {
  randomBytes(32, (err, buffer) => {
    if (err) return res.redirect('/reset');

    const token = buffer.toString('hex');

    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash('error', 'No account with that email found');
          return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpiration = new Date(Date.now() + 3600000);

        return user.save();
      })
      .then(() => res.redirect(`/reset/${token}`))
      .catch((err) => console.log(err));
  });
}

export function getNewPassword(req, res, next) {
  const { token } = req.params;

  UserModel.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) return res.redirect('/reset');

      let messages = req.flash('error');

      if (messages.length > 0) {
        messages = messages[0];
      } else {
        messages = null;
      }

      return res.render('auth/new-password', {
        title: 'Update Password',
        href: '/new',
        errorMessage: messages,
        id: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
}

export function postNewPassword(req, res, next) {
  const { id, password, passwordToken } = req.body;

  UserModel.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: id,
  })
    .then((user) => {
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(password, salt);

      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      return user.save();
    })
    .then(() => res.redirect('/login'))
    .catch((err) => console.log(err));
}
