/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    server: Server
    mongo: Mongo
  }
  interface Mongo {
    host: string
    port: string
    database: string
    credentials: Credentials
  }
  interface Credentials {
    user: string
    password: string
  }
  interface Server {
    url: string
    port: number
    baseDir: string
  }
  export const config: Config
  export type Config = IConfig
}
