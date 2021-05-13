import * as mongoose from "mongoose";

export interface ConfigDoc extends mongoose.Document {
  mailing: Boolean;
}

const configSchema = new mongoose.Schema({
  mailing: Boolean,
});

const Config = mongoose.model<ConfigDoc>("Config", configSchema);

export async function getConfig() {
  const config = await Config.find({});
  //console.log(config)
  return config[0].mailing;
}

module.exports = {
  getConfig,
};
