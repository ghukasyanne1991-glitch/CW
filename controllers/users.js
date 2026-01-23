import jwt from 'jsonwebtoken';

import Users from '../models/users.js';

const { AUTH_SECRET } = process.env;

export default {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        res.status(422).json({
          status: 'error',
          message: 'email or password are invalid',
        });
        return;
      }

      if (!Users.checkPassword(user.password, password)) {
        res.status(422).json({
          status: 'error',
          message: 'email or password are invalid',
        });
        return;
      }

      const token = jwt.sign({
        userId: user.id,
      }, AUTH_SECRET, { expiresIn: '1d' })

      res.json({
        status: 'ok',
        token,
        user,
      })
    } catch (e) {
      next(e)
    }
  },

  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await Users.create({
        username,
        email,
        password,

      });

      res.json({
        status: 'ok',
        user,
      })
    } catch (e) {
      next(e)
    }
  },




  async profile(req, res, next) {
    try {
      const user = await Users.findByPk(req.userId);

      // res.render('profile', {
      //   title: "Profile",
      //   user,
      // })

      res.json({
        status: "ok",
        user,
      })
    } catch (e) {
      next(e)
    }
  }
}
