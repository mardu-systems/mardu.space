import {promises as fs} from "fs";
import path from "path";

const PREORDERS_FILE = path.join(process.cwd(), "data", "preorders.json");

export async function savePreorder(email: string) {
    try {
        let preorders: string[] = [];
        try {
            const data = await fs.readFile(PREORDERS_FILE, "utf8");
            preorders = JSON.parse(data);
        } catch {
        }
        if (!preorders.includes(email)) {
            preorders.push(email);
            await fs.mkdir(path.dirname(PREORDERS_FILE), {recursive: true});
            await fs.writeFile(PREORDERS_FILE, JSON.stringify(preorders, null, 2));
        }
    } catch (err) {
        console.error("Failed to save preorder", err);
    }
}

export async function listPreorders(): Promise<string[]> {
    try {
        const data = await fs.readFile(PREORDERS_FILE, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}
