import {promises as fs} from "node:fs";
import path from "node:path";

import {dataPath} from "@/lib/data-dir";

const PREORDERS_FILE = dataPath("preorders.json");

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
