const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema({
    dm: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    monsters: [ 
        {
            name: { 
                type: String,
                required: true
            }, 
            index: { 
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
            name: { 
                type: String,
                required: true
            },
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