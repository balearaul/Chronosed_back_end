import * as functions from "firebase-functions";
import connectToDatabase from "./mongodb";
const cors = require("cors")({ origin: true });

const createGoal = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    cors(request, response, async () => {
      if (!!request.body) {
        const db = await connectToDatabase("chronosed");
        const collection = db.collection("Goals");
        const data = await collection.insertOne(request.body);
        response.send(data);
      }
    });
  });

export default createGoal;
