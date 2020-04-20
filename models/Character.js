const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'games'
    },
    name: {
        type: String,
        required: true
    },
    klass: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    hitPoints: {
        type: Number,
        required: true
    },
    armorClass: {
        type: Number,
        required: true
    },
    str: {
        type: Number,
        required: true
    },
    dex: {
        type: Number,
        required: true
    },
    con: {
        type: Number,
        required: true
    },
    int: {
        type: Number,
        required: true
    },
    wis: {
        type: Number,
        required: true
    },
    cha: {
        type: Number,
        required: true
    },
    lvl: {
        type: Number,
        required: true
    },
    allowMagic: {
        type: Boolean,
        required: true
    },
    proficiencies: {
        type: Array,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })

  module.exports = Character = mongoose.model('Character', CharacterSchema);