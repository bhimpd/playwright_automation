import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

const filePath = "./tmp/credentials.txt";

export function saveCredentials(email: string, password: string): void {

    const dir = dirname(filePath);
    
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const data = { email, password, createdAt: timestamp };
    
    writeFileSync(filePath, JSON.stringify(data, null, 2)); //  Save as JSON with formatting
}

export function getCredentials(): { email: string; password: string } {

    if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, "utf-8").trim();
        return JSON.parse(fileData);
    } else {
        throw new Error("Credentials file does not exist. Run the registration test first.");
    }

}
