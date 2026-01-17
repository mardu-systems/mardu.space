import "reflect-metadata"
import { DataSource } from "typeorm"
import { Subscriber } from "./entities/Subscriber"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.POSTGRES_URL,
    synchronize: true,
    logging: false,
    entities: [Subscriber],
    migrations: [],
    subscribers: [],
})