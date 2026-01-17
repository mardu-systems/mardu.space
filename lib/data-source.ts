import "reflect-metadata"
import { DataSource } from "typeorm"
import { Subscriber } from "./entities/Subscriber"

export const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    synchronize: true, // Erstellt Tabellen automatisch (ideal für dieses Setup)
    logging: false,
    entities: [Subscriber],
    migrations: [],
    subscribers: [],
})