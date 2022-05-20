const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        building: ID
        towCompany: ID
    }

    type TowingCompany {
        _id: ID
        name: String
        buildings: [Building]
    }

    type License {
        _id: ID
        state: String
        number: String
        building: ID
    }

    type Building {
        _id: ID
        name: String
        towingCompany: ID
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        license(number: String, state: String): License
        licenses(building: ID): [License] 
    }

    type Mutation {
        addUser(username: String, password: String, building: ID, towCompany: ID): Auth
        login(username: String, password: String): Auth
        addTowingCompany(name: String, buildings: [Building]): TowingCompany
        addBuilding(name: String, towingCompany: ID): Building
        addLicense(state: String, number: String, building: ID): License
    }
`;

module.exports = typeDefs;