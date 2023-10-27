import { MongoClient } from "mongodb";
const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.1k1pn.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
// "mongodb+srv://kamlesh_1997:kamlesh_1997@shah-collections.1k1pn.mongodb.net/my-site?retryWrites=true&w=majority"
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kamlesh_1997:kamlesh_1997@shah-collections.1k1pn.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}


