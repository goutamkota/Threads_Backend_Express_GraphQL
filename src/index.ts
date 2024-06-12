import { ApolloServer } from '@apollo/server';
import express, { Express } from 'express';
import { expressMiddleware } from "@apollo/server/express4";
import { prisma } from "./lib/db";

const typeDefs = `
  type Query {
    hello: String
    say(name: String): String
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageURl: String!): Boolean
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hey there I\'m from graphql server!',
        say: (_: any, { name }: { name: string }) => `Hello ${name}, How are you?`,
    },
    Mutation: {
        createUser: async (_: any, { firstName, lastName, email, password, profileImageURl }: { firstName: string; lastName: string; email: string; password: string; profileImageURl: string }) => {
            try {
                await prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password,
                        salt: 'random_salt',
                        profileImageURl,
                    },
                });
                return true;
            } catch (error) {
                console.error("Error creating user:", error);
                return false;
            }
        },
    },
};

async function init() {
    const port: number = Number(process.env.PORT) || 3000;
    const app: Express = express();

    // Create GraphQL Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/graphql', expressMiddleware(server));

    app.get('/', (req: express.Request, res: express.Response) => {
        const name = req.query.name;
        return res.status(200).json({ message: `Hello ${name}!` });
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));
}

init().then(() => console.log('Initialization complete')).catch(error => console.error("Initialization error:", error));
