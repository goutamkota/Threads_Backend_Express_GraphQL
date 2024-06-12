import { ApolloServer } from "@apollo/server";
import { User } from "../user";

async function createApolloServer() {
    const server = new ApolloServer({
            typeDefs : `
                type Query {
                    hello: String
                }
                type Mutation {
                    createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageURl: String!): String
                }
        `,
            resolvers : {
                Query : {
                    ...User.resolvers.queries
                },
                Mutation : {
                    createUser :
                        (_ : any, {}: {}) => {
                            return "hello there";
                        }
                }
            },
        });

    await server.start();

    return server;
}


export default createApolloServer;