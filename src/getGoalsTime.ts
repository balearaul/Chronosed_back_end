import * as functions from "firebase-functions";
import connectToDatabase from "./mongodb";

const getGoalsTime = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");

    const params: any = request.query;
      
    const filterParams = JSON.parse(params.filter)
      const sort = JSON.parse(params.sort);
      
      console.log("filterParams",filterParams);
      console.log("sort",sort);

    const db = await connectToDatabase("chronosed");
    const collection = db.collection("Goals");
    const data = await collection.find(filterParams).sort(sort).toArray();
    response.send(data);
  });

export default getGoalsTime;
