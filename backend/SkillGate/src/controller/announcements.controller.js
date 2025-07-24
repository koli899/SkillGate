

const AnnouncementModel = require("../model/announcements.model");


const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAnnouncement = AnnouncementModel.create({ title, description });
    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement created successfully', announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


const getAnnouncements = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find().sort({ time: -1 });
    res.status(200).json({ message: 'Announcements fetched successfully', announcements });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement updated successfully', announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);
    if (!deletedAnnouncement) { 
      return res.status(404).json({ message: 'Announcement not found' });
    }else {
      res.status(200).json({ message: 'Announcement deleted successfully' });
    }
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } 
}

module.exports = {
  createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
  