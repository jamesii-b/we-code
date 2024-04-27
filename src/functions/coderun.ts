import { exec } from 'child_process';
import fs from 'fs';

export async function CodeExecute(code: any) {
    const directory = 'client_codes';

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    try {
        await fs.promises.writeFile('client_codes/index.py', code);
        console.log("Python file written successfully");
        return new Promise((resolve, reject) => {
            exec('bash ./server_confs/dockerwb.bash', (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("stdout", stdout);
                    resolve(stdout);
                }
            });
        });

    } catch (err) {
        console.error("Error executing Python code:", err);
        throw err;
    }
}
