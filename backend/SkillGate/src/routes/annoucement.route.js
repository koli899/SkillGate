const express = require("express");

const verifyRoleAccess = require("../middelware/roleAcess.middelware");

const AnnouncementModel = require("../model/announcements.model");
const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controller/announcements.controller");
const Announcementrouter = express.Router();

Announcementrouter.post("/create",verifyRoleAccess("admin"),createAnnouncement);
Announcementrouter.get("/all", getAnnouncements);
Announcementrouter.patch("/update/:id",verifyRoleAccess("admin"),updateAnnouncement);
Announcementrouter.delete("/delete/:id",verifyRoleAccess("admin"),deleteAnnouncement);


module.exports = Announcementrouter;


