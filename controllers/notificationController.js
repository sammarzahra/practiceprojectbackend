const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { message, date, user, task } = req.body;
    const notification = new Notification({ message, date, user, task });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error getting notification by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a notification by ID
const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { message, date, user, task, status } = req.body;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { message, date, user, task, status },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification
};
