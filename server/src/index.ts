import App from "./server";
import envConfig from "./config";

const { serverPort } = envConfig;

const app = new App(serverPort);

app.listen();
