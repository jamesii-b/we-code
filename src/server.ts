
import express from 'express';
import { Request, Response, Express } from 'express';
import cors from 'cors'
// import { CodeExecute } from './functions/coderun';
import { CodeExecute } from './functions/coderun';

const app: Express = express();

const port: Number = 8080;
app.use(cors(
    {
        origin: "*",
        credentials: true
    },

));
// Add middleware to parse JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.post("/code",  async (req, res) => {
    console.log("received request", req.body);
    const code = req.body['data'];

    try {
        const returned = await CodeExecute(code);
        res.status(202).json({ "msg": returned });
    } catch (err) {
        console.error("Error handling code execution:", err);
        res.status(500).json({ "err": "Something went wrong with code compilation" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 