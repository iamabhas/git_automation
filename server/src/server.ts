import express, { Application } from "express";
import initializeMiddlewares from "./middlewares/server.middleware";
import initializeRoutes from "./routes/server.routes";
import Logger from "./libs/logger";

class App {
  public expressApplication: Application;
  public serverPort: string | undefined;

  constructor(serverPort: string | undefined) {
    this.expressApplication = express();
    this.serverPort = serverPort;
    initializeMiddlewares(this.expressApplication);
    initializeRoutes(this.expressApplication);
  }

  public listen = (): void => {
    this.expressApplication.listen(this.serverPort, () => {
      Logger.http(`Server running on port ${this.serverPort}`);
    });
  };
}

export default App;
