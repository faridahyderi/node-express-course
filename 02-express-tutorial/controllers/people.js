const { people } = require('../data'); // Import people array from data.js

// Get all people
const getPeople = (req, res) => {
    res.json(people); // Return all people
  };
  
  // Add a new person
  const addPerson = (req, res) => {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    
    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    
    res.status(201).json({ success: true, name });
  };

  // Get a specific person by id
const getPersonById = (req, res) => {
    const personId = parseInt(req.params.id, 10); // Convert id to integer
    const person = people.find(p => p.id === personId);
    
    if (!person) {
      return res.status(404).json({ success: false, message: "Person not found" });
    }
  
    res.json(person);
  };

  // Update a person by id
const updatePerson = (req, res) => {
    const personId = parseInt(req.params.id, 10); // Convert id to integer
    const { name } = req.body;
    
    const person = people.find(p => p.id === personId);
    
    if (!person) {
      return res.status(404).json({ success: false, message: "Person not found" });
    }
    
    person.name = name; // Update the person's name
    res.json({ success: true, name: person.name });
  };
  
  // Delete a person by id
  const deletePerson = (req, res) => {
    const personId = parseInt(req.params.id, 10); // Convert id to integer
    const personIndex = people.findIndex(p => p.id === personId);
  
    if (personIndex === -1) {
      return res.status(404).json({ success: false, message: "Person not found" });
    }
  
    // Remove the person from the array
    people.splice(personIndex, 1);
    res.json({ success: true, message: "Person deleted" });
  };
  
  

  // Export the controller functions
  module.exports = { addPerson, getPeople,getPersonById,updatePerson,deletePerson};