import { connect } from "mongoose";

const DB_URL =
  "mongodb+srv://brunoleandroperez:<password>@ecommerce.gpx0edf.mongodb.net/?retryWrites=true&w=majority";

//TODO:*** Aquí se reemplaza "<password>" por el pasword que envié por privado **********
const configConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBconnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log("==========================");
    console.log(
      `======== URL: ${configConnection.url.substring(0, 31)} ========`
    );
    console.log("==========================");
  } catch (error) {
    console.log(
      "🚀 ~ file: mongo.config.js:23 ~ mongoDBconnection ~ error:",
      error
    );
    throw new Error(error);
  }
};

export { configConnection, mongoDBconnection };
