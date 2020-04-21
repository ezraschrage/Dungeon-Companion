const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema({
    dm: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    monsters: [ 
        {
            id: { 
                type: String,
                required: true
            },
            hp: {
                type: Number,
                required: true
            },
            initiative: {
                type: Number,
                required: true
            }
        }
    ],
    players: [ 
        {
            id: { 
                type: Schema.Types.ObjectId,
                ref: 'characters'
            },
            hp: {
                type: Number,
                required: true
            },
            initiative: {
                type: Number,
                required: true
            }
        }
    ],
    title: {
        type: String,
        required: true
    },
    turns:{
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })

  module.exports = Game = mongoose.model('Game', GameSchema);