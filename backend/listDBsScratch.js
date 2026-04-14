const mongoose = require("mongoose");
require("dotenv").config();

async function listDBs() {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI).asPromise();
    const adminDb = conn.db.admin();
    const list = await adminDb.listDatabases();
    console.log(JSON.stringify(list.databases.map(db => db.name), null, 2));
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

listDBs();
