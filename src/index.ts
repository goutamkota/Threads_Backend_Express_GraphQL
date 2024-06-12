import express, { Express } from 'express';
import { expressMiddleware } from "@apollo/server/express4";
import createApolloServer from "./graphql";
import cors from 'cors';

const corsOptions = {
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};


async function init() {
    const port : number = Number(process.env.PORT) || 3000;
    const app : Express = express();

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended : true }));

    app.get('/', (req : express.Request, res : express.Response) => {
        const name = req.query.name;
        return res.status(200).json({ message : `Hello ${name}!` });
    });

    app.use('/graphql', expressMiddleware(await createApolloServer()))

    app.listen(port, () => console.log(`Server running on port ${port}`));
}

init().then(() => console.log('Initialization complete')).catch(error => console.error("Initialization error:", error));
