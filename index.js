import { ApolloServer,UserInputError ,gql } from "apollo-server";
import './db.js'
import Person from './models/person.js'
const persons = [
  {
    name: "uziel",
    phone: "6691670456",
    street: "mision san elias",
    city: "jalisco",
    id: "1234-1234-1234-1234",
  },
  {
    name: "mario",
    phone: "669167789",
    street: "mision san julio",
    city: "jalisco",
    id: "5678-1234-1234-5678",
  },
  {
    name: "ariel",
    phone: "6691670123",
    street: "mision san jose",
    city: "jalisco",
    id: "1234-5634-7834-3455",
  },
  {
    name: "jose",
    phone: "6691670345",
    street: "mision san fernando",
    city: "jalisco",
    id: "1234-5674-1234-7890",
  },
];

const typeDefs = gql`
  enum YesNo {
    Yes
    No
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
 
  type Query {
    personsCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    editNumber(name: String!, phone: String!): Person
  }
`;
const resolvers = {
  Query: {
    personsCount: () => persons.length,
    allPersons: (root, args) => {
     const result = !args.phone ? persons : persons.filter(person => args.phone === "Yes" ? person.phone : !person.phone )
    return result  
    },
    findPerson: (_, args) =>
      persons.find((person) => person.name === args.name),
  },
  Mutation:{
    addPerson:(root, args) =>{
      if(persons.find(person => person.name === args.name)){
        throw new UserInputError('Name must be unique',   {
          invalidArgs: args.name
        })
      }
      let newPerson = {...args, id: "123-345"}
      persons.push(newPerson)
      return newPerson
    },
    editNumber: (root, args) => {
      const {name, phone} = args
      let findPersonIndex = persons.findIndex(person => person.name === name)
      if(findPersonIndex === -1) return null
      let tempPerson = persons[findPersonIndex]
      let newPerson = {...tempPerson, phone: phone}
      persons[findPersonIndex] = newPerson
      return newPerson
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const runServer = async () => {
  const { url } = await server.listen();
  console.log(await url);
};

runServer();
