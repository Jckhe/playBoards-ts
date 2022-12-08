const User = require('./models/userModel');
const Board = require('./models/boardModel.js');
const { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLInputObjectType } = require('graphql');
const { ApolloServer, gql } = require('apollo-server-express');


const typeDefs = gql`
type Board {
  projectName: String,
  uuid: String,
  toDo: [Task],
  inProgress: [Task],
  toDelete: [Task],
  backgroundColor: String
}

input BoardType {
  projectName: String,
  uuid: String,
  assocuser: String,
  backgroundColor: String,
  inProgress: [TaskType!],
  toDelete: [TaskType!],
  toDo: [TaskType!]
}

union storedContainers = Task 



type Task {
  content: String,
  status: String,
  uid: String,
  boardID: String
}

input TaskType {
  content: String,
  status: String,
  uid: String,
  boardID: String
}

type User {
  id: ID,
  username: String,
  boards: [Board]
}

type Query {
  login(username: String, password: String): User
}

type Mutation {
  signup(username: String, password: String): User
  storeBoards(username: String, board: BoardType): Boolean
}
`

const resolvers = {
  //parent, args, context, info.
  User: {
    boards: async (parent, args, context, info) => {
      const boards = await Board.find({assocuser: parent.username});
      console.log("why not checking boards here: ", boards)
      return boards;
    }
  },
  Query: {
    login: async (root, args, context, info) => {
      const username = args.username;
      const password = args.password;
      const user = await User.findOne({username: username, password: password});
      console.log("Checking user in Query resolver: ", user)
      return user;
    }
  },
  Mutation: {
    signup: async (root, args, context, info) => {
      const username = args.username;
      const password = args.password;
      const createdUser = await User.create({'username' : username, 'password' : password});
      console.log("Checking createdUser in Mutation resolver: ", createdUser)
      return createdUser;
    },
    storeBoards: async (root, args, context, info) => {
      console.log("checking board in Mutation resolver: ", args.board)
      const store = await Board.findOneAndUpdate({uuid: args.board.uuid}, args.board, {upsert: true});
      console.log("Checking storedBoard in Mutation resolver: ", store)
      return true;
    }
  }
}

module.exports = {typeDefs, resolvers};


//         Board.find({assocuser: parent.username})
      //           .then((res) => console.log(res))
      //       }

// const BoardType = new GraphQLObjectType({
//   name: 'Board',
//   fields: () => ({
//     id: {type: GraphQLID},
//     assocuser: {type: GraphQLString},
//     uuid: {type: GraphQLString},
//     toDo: {type: GraphQLString},
//     inProgress: {type: GraphQLString},
//     toDelete: {type: GraphQLString},
//     backgroundColor: {type: GraphQLString}
//   })
// })



// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: {type: GraphQLString},
//     username: { type: GraphQLString },
//     boards: {
//       type: new GraphQLList(BoardType),
//       async resolve(parent, args) {
//         Board.find({assocuser: parent.username})
//           .then((res) => console.log(res))
//       }
//     }
//   })
// })


// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     login: {
//       type: UserType,
//       args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
//       async resolve(parent, args) {
//         const loginUser = await Board.find({assocuser: args.username, password: args.password});
//         console.log(loginUser);
//         return loginUser;
//     }
//   }
// }
// })

// const RootMutations = new GraphQLObjectType({
//   name: 'RootMutationType',
//   fields: {
//     signup: {
//       type: GraphQLBoolean,
//       args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
//       async resolve(parent, args) {
//         try {
//           await User.create({'username' : args.username, 'password' : args.password});
//           return true;
//         } catch {
//           return false;
//         }
//       }
//     },
//     storeBoards: {
//       type: GraphQLBoolean,
//       args: {uuid: {type: GraphQLString}, updatedBoard: {type: Object}},
//       async resolve(parent, args) {
//         try {
//           await Board.findOneAndUpdate({'uuid' : args.uuid}, args.updatedBoard);
//           return true;
//         }
//         catch {
//           return false;
//         }
//       }
//     }
//   }
// })


// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: RootMutations,
//   types: [BoardType, UserType]
// })