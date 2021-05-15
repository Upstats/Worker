const axios = require("axios").default;
import { getSystems, updateStatus } from "./helpers/db";
import { getConfig } from "./helpers/config";

import { mail } from "./helpers/mailer";
import { getStatus } from "./helpers/telegram";

import { EntityLike } from "telegram/define";

import * as mongoose from "mongoose";
import * as config from "config";

const uri: string = process.env.DB_URL || config.get("db");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);

const checkSite = async (url: String) => {
  try {
    const response = await axios.get(url);
    return response.data ? "up" : "down";
  } catch (e) {
    return "down";
  }
};

async function main() {
  const systems = await getSystems();
  for (let system of systems) {
    try {
      if (system.type === "web") {
        const result = await checkSite(system.url);
        await updateStatus(system._id, result);
        if (result === "down") {
          getConfig() && (await mail(system.name as string));
        }
        console.log(`Success ${system.name}`);
      } else if (system.type === "telegram") {
        const result = await getStatus(system.url as EntityLike);
        await updateStatus(system._id, result);
        if (result === "down") {
          getConfig() && (await mail(system.name as string));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

main();
