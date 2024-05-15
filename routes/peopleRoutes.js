const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.post('/', peopleController.createPeople);
// router.get('/', peopleController.getAllPeople);
 router.get('/', peopleController.getAllPeople);
router.get('/:peopleId', peopleController.getPeopleById);
router.put('/:peopleId', peopleController.updatePeople);
router.delete('/:peopleId', peopleController.deletePeople);

module.exports = router;
