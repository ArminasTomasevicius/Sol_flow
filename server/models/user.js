const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  publicKey: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'user' },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    }
  },
  created: { type: Date, default: Date.now }
});

userModel.set('toJSON', { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('user', userModel);
