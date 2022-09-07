import * as functions from "firebase-functions";
import connectToDatabase from "./mongodb";
import { ObjectId } from "mongodb";

const getGoals = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");

    const params: any = request.query;
    const filterParams = JSON.parse(params.filter)
    console.log("filterParams", filterParams);

    let filter :any={};
    
    if (filterParams?.parent) {
      filter.parent = filterParams.parent;
    }
    if (filterParams?.id) {
      filter._id = new ObjectId(filterParams.id);
    }
    console.log("filter", filter)

    const db = await connectToDatabase("chronosed");
    const collection = db.collection("Goals");
    const data = await collection.find(filter).toArray();
    response.send(data);
  });

export default getGoals;
