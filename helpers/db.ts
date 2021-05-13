import * as mongoose from "mongoose";

export interface SystemDoc extends mongoose.Document {
  name: String;
  url: String;
  type: String;
  status: String;
  logs: [{ status: String; time: Date }];
}

const systemSchema = new mongoose.Schema({
  name: String,
  url: String,
  type: String,
  status: String,
  logs: [],
});

const System = mongoose.model<SystemDoc>("System", systemSchema);

export async function updateStatus(id: mongoose.ObjectId, status: String) {
  const system = await System.findByIdAndUpdate(id, {
    $set: { status: status },
  });
  const system_logs = await System.findById(id);
  if (!system_logs) {
    return;
  }
  system_logs.logs.push({
    status: status,
    time: new Date(),
  });
  system_logs.save();
  //console.log(system_logs)
}

export async function getSystems() {
  const system = await System.find({});
  //console.log(system)
  return system;
}
export async function deleteSystem() {
  const system = await System.deleteMany({});
  console.log(system);
}

module.exports = {
  getSystems,
  updateStatus,
};

//deleteSystem()
//createSampleDoc()
//getSystems();
