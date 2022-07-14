var db = require("mongoose");
var Schema = db.Schema;

var Facebook_Group_Target = new Schema({
  _id: db.Types.ObjectId,
  author_type: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },

  author_account: {
    type: String,
    required: true
  },
  author_name: {
    type: String,
    required: true
  },
  author_url: {
    type: String,
    required: true
  },

  interval: {
    type: String,
    required: false
  },

  need_screenshots: {
    type: String,
    required: false
  },
  expired_on: {
    type: String,
    required: true
  },
  created_at: {
    type : Date, default: Date.now ,
    required: false
  },
  updated_at: {
    type : Date, default: Date.now ,
    required: false
  }
});

module.exports = db.model("Facebook_Group_Target ", Facebook_Group_Target);
