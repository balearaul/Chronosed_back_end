import * as functions from "firebase-functions";
import connectToDatabase from "./mongodb";
import { ObjectId } from "mongodb";
const cors = require("cors")({ origin: true });

const deleteGoal = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    cors(request, response, async () => {
      if (!!request.body) {
        console.log("request.body", request.body);
        const id = request.body.id;
        const idObj = new ObjectId(id);
        const filter = {
          $or: [{ _id: idObj }, { "ancestors.id": id }],
        };
        const db = await connectToDatabase("chronosed");
        const collection = db.collection("Goals");
        const data = await collection.deleteMany(filter);
        console.log("deleteGoal", data);
        console.log("filter", filter);
        response.send(data);
      }
    });
  });

export default deleteGoal;
