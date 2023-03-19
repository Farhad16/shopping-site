import mongoose from "mongoose";
import { dbConfig } from "../config/dbConfig";

const connection = {} as any;

async function connect() {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }
  if (mongoose.connections.length) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Connect with previouse connection");
      return;
    }
    await mongoose.disconnect();
  }
  const dbConnection = await mongoose.connect(dbConfig.dbUrl);
  console.log("New connection is ready");
  connection.isConnected = dbConnection.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV !== "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("Not connected");
    }
  }
}

const db = { connect, disconnect };

export default db;
