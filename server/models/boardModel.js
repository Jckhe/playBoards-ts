const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    projectName: {type: String, required: true},
    assocuser: {type: String, required: true, unique: true},
    uuid: {type: String, required: true },
    toDo: {type: Array, required: true },
    inProgress: {type: Array, required: true },
    toDelete: {type: Array, required: true },
    backgroundColor: {type: String, required: true }
  });




//   id: {type: GraphQLID},
//   assocuser: {type: GraphQLString},
//   uuid: {type: GraphQLString},
//   toDo: {type: GraphQLString},
//   inProgress: {type: GraphQLString},
//   toDelete: {type: GraphQLString},
//   backgroundColor: {type: GraphQLString}
// })





module.exports = mongoose.model('Board', boardSchema);