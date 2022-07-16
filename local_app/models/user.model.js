var db = require("mongoose");
var Schema = db.Schema;

var UserSchema = new Schema({
  _id: db.Types.ObjectId,
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: false
  },
  created_at: {
    type: String,
    default: Date.now,
    required: false
  },
  updated_at: {
    type: String,
    default: Date.now,
    required: false
  }
});

module.exports = db.model("User", UserSchema);
