const express = require("express");
const router = express.Router();

// Import controller functions
const { addPerson, getPeople, getPersonById, updatePerson, deletePerson }  = require('../controllers/people');

// GET all people
router.get('/', getPeople);

// POST a new person
router.post('/', addPerson);

// GET a specific person by id
router.get('/:id', getPersonById);

// PUT (update) a specific person by id
router.put('/:id', updatePerson);

// DELETE a specific person by id
router.delete('/:id', deletePerson);



module.exports = router;