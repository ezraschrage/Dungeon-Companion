const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateCharacterInput(data) {
    let errors = {};
    
    const races = ["Dragonborn", "Dwarf", "Elf", "Half-Elf", "Halfling", "Human", "Gnome", "Tiefling"]
    const klasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
  
    data.name = validText(data.name) ? data.name : '';
    data.race = validText(data.race) ? data.race : '';
    data.klass = validText(data.klass) ? data.klass : '';
  
    if (!Validator.isLength(data.name, { min: 2, max: 35 })) {
      errors.text = 'Name must be between 2 and 35 characters';
    }
  
    if (Validator.isEmpty(data.name)) {
      errors.text = 'Name is required';
    }

    if (!Validator.isIn(data.race, races)) {
        errors.text = 'Not a valid race';
    }
    
    if (Validator.isEmpty(data.race)) {
        errors.text = 'Must choose a Race';
    }

    if (!Validator.isIn(data.klass, klasses)) {
        errors.text = 'Not a valid class';
    }
    
    if (Validator.isEmpty(data.klass)) {
        errors.text = 'Must choose a Class';
    }



    
    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };