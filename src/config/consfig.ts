import dotenv from "dotenv"
dotenv.config()

const config = {
    connection_String: process.env.CONNECTION_STRING as string
}

export default config