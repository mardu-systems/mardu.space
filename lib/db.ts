import { AppDataSource } from "./data-source"

const globalForDb = global as unknown as { appDataSource: typeof AppDataSource }

export const db = globalForDb.appDataSource || AppDataSource

if (!db.isInitialized) {
    db.initialize()
        .then(() => {
            // Success
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
}

if (process.env.NODE_ENV !== "production") globalForDb.appDataSource = db
