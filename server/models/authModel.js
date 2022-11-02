const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passowrd: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt
      .hash(this.passowrd, 10)
      .then((hash) => {
        this.password = hash;
        return next();
      })
      .catch((error) => {
        return next('hash ERROR: ' + error);
      });
  }
});

const User = mongoose.model('user', userSchema);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 300, default: Date.now },
});

const Session = mongoose.model('session', sessionSchema);

module.exports = { User, Session };
