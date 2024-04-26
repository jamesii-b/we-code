import { exec, spawn } from 'child_process'
import fs from 'fs'
import express from 'express';
import { Request, Response, Express } from 'express';
import cors from 'cors'

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

app.post("/code", (req: Request, res: Response) => {
    console.log("received request", req.body)
    const code = req.body.data; // Assuming the code is received in the 'data' property

    // Write the received code to a Python file
    fs.writeFile('script.py', code, (err: any) => {
        if (err) {
            console.error("Error writing Python file:", err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log("Python file written successfully");
            exec('python3 script.py', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    console.log(stdout);
                    res.status(202).json(stdout)
                }
            });
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 