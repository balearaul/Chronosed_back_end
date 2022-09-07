import * as functions from "firebase-functions";
import connectToDatabase from "./mongodb";
import { ObjectId } from "mongodb";

const updateGoal = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With,content-type"
    );
    response.set("Access-Control-Allow-Credentials", "true");

    const body = request.body;
    const filter = { _id: new ObjectId(body.id) };

    const db = await connectToDatabase("chronosed");
    const collection = db.collection("Goals");
    const data = collection.updateOne(filter, { $set: body.updatedData });
    response.send(data);
  });

export default updateGoal;
