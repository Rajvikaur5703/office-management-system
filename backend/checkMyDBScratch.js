const mongoose = require("mongoose");

async function checkMyDB() {
  try {
    // Try mydb
    const conn = await mongoose.createConnection("mongodb+srv://rajvi_10:oQXSxKITeO6OYr57@office-management.lbku7fo.mongodb.net/mydb").asPromise();
    const db = conn.db;
    const collections = await db.collections();
    console.log("Collections in mydb:", collections.map(c => c.collectionName));
    
    if (collections.map(c => c.collectionName).includes('users')) {
      const users = await db.collection('users').find({}).toArray();
      console.log("Users in mydb:", users);
    }
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkMyDB();
