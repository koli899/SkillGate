const mongose = require("mongoose");



const announcementSchema = new mongose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, default: Date.now }
});


const AnnouncementModel = mongose.model("Announcement", announcementSchema);

module.exports = AnnouncementModel;