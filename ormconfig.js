module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*.js"],
  migrationsRun: true,
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/*.entity{.ts,.js}"
  }
}


