import { ApolloServer } from '@apollo/server';
import express, { Express } from 'express';
import { expressMiddleware } from "@apollo/server/express4";
import { json } from 'body-parser';

const typeDefs = `
  type Query {
    hello: String
    say(name: String): String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hey there I\'m from graphql server!',
        say: (_: any, { name }: { name: string }) => `Hello ${name}, How are you?`,
    },
};

async function init() {
    const port : number = Number(process.env.PORT) || 3000;
    const app : Express = express();
    // Create GraphQL Server
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start()

    app.use(express.json());
    app.use(express.urlencoded({ extended : true }));


    app.use('/graphql',json(), expressMiddleware(server))

    app.get('/', (req : express.Request, res : express.Response) => {
        const name = req.query.name;
        return res.status(200).json({ message : `Hello ${name}jh90!` });
    })

    app.listen(port, () => console.log(`Server on port ${port}`));
}

init().then(r => console.log('init working'))