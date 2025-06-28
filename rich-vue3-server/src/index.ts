import AppDataSource from "../ormconfig";
import { User } from "./user/user.entity";

AppDataSource.initialize()
  .then(async () => {
    const res = await AppDataSource.manager.find(User);

    console.log(
      "Here you can setup and run express / fastify / any other framework.",
      res
    );
  })
  .catch((error) => console.log(error));
