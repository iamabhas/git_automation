import dotenv from "dotenv";
import path from "path";
import Logger from "./libs/logger";

const result = dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envVariableLoadingError = result.error;

if (envVariableLoadingError) {
  Logger.error(`'.env' file could not be loaded: ${envVariableLoadingError}`);
  throw envVariableLoadingError;
}

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  geminiApiKey: process.env.GEMINI_API_KEY,
  cryptrSecretKey: process.env.CRYPTR_SECRET_KEY
};

export default envConfig;
