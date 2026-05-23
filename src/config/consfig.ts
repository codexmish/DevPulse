import dotenv from "dotenv"
dotenv.config()

const config = {
    connection_String: process.env.CONNECTION_STRING as string,
    JWT_SEC: process.env.JWT_SEC as string
}

export default config