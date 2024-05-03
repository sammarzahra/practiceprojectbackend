const People = require('../models/peopleModel');

// Create a new people record
const createPeople = async (req, res) => {
  try {
    const { customerName, projectName, taskStart, taskEnd, overdueDate, user, task, notifications } = req.body;
    const people = new People({ customerName, projectName, taskStart, taskEnd, overdueDate, user, task, notifications });
    await people.save();
    res.status(201).json(people);
  } catch (error) {
    console.error('Error creating people record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all people records
const getAllPeople = async (req, res) => {
  try {
    const people = await People.find();
    res.status(200).json(people);
  } catch (error) {
    console.error('Error getting people records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single people record by ID
const getPeopleById = async (req, res) => {
  try {
    const { peopleId } = req.params;
    const people = await People.findById(peopleId);
    if (!people) {
      return res.status(404).json({ message: 'People record not found' });
    }
    res.status(200).json(people);
  } catch (error) {
    console.error('Error getting people record by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a people record by ID
const updatePeople = async (req, res) => {
  try {
    const { peopleId } = req.params;
    const { customerName, projectName, taskStart, taskEnd, overdueDate, user, task, notifications } = req.body;
    const updatedPeople = await People.findByIdAndUpdate(
      peopleId,
      { customerName, projectName, taskStart, taskEnd, overdueDate, user, task, notifications },
      { new: true }
    );
    if (!updatedPeople) {
      return res.status(404).json({ message: 'People record not found' });
    }
    res.status(200).json(updatedPeople);
  } catch (error) {
    console.error('Error updating people record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a people record by ID
const deletePeople = async (req, res) => {
  try {
    const { peopleId } = req.params;
    const deletedPeople = await People.findByIdAndDelete(peopleId);
    if (!deletedPeople) {
      return res.status(404).json({ message: 'People record not found' });
    }
    res.status(200).json({ message: 'People record deleted successfully' });
  } catch (error) {
    console.error('Error deleting people record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get paginated list of people
const getPeople = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5; // Number of people per page
    const skip = (page - 1) * pageSize;

    const people = await People.find().skip(skip).limit(pageSize);
    const totalPeople = await People.countDocuments();

    res.status(200).json({
      data: people,
      currentPage: page,
      totalPages: Math.ceil(totalPeople / pageSize)
    });
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createPeople,
  getAllPeople,
  getPeopleById,
  updatePeople,
  deletePeople,
  getPeople
};
