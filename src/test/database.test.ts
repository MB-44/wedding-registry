import clientPromise from "../lib/mongodb";

describe("Database CRUD Operations", () => {
  let db: any;
  let usersCollection: any;

  beforeAll(async () => {
    const client = await clientPromise;
    db = client.db("weddingRegistry"); // Ensure this matches your database name
    usersCollection = db.collection("users");
  });

  afterAll(async () => {
    // Clean up: Drop the "users" collection and close the connection
    await usersCollection.drop().catch(() => console.log("No collection to drop."));
    const client = await clientPromise;
    await client.close();
  });

  it("should connect to the database", async () => {
    const collections = await db.listCollections().toArray();
    expect(collections).toBeDefined();
  });

  it("should insert a user into the users collection", async () => {
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      passwordHash: "hashedPassword123",
      accessCode: "ACCESS123",
    };

    const result = await usersCollection.insertOne(newUser);
    expect(result.insertedId).toBeDefined();
  });

  it("should retrieve a user from the users collection", async () => {
    const user = await usersCollection.findOne({ email: "john@example.com" });
    expect(user).toBeDefined();
    expect(user.firstName).toBe("John");
  });

  it("should update a user in the users collection", async () => {
    const updateResult = await usersCollection.updateOne(
      { email: "john@example.com" },
      { $set: { lastName: "Smith" } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    const updatedUser = await usersCollection.findOne({ email: "john@example.com" });
    expect(updatedUser.lastName).toBe("Smith");
  });

  it("should delete a user from the users collection", async () => {
    const deleteResult = await usersCollection.deleteOne({
      email: "john@example.com",
    });

    expect(deleteResult.deletedCount).toBe(1);

    const deletedUser = await usersCollection.findOne({ email: "john@example.com" });
    expect(deletedUser).toBeNull();
  });
});


// import clientPromise from "../lib/mongodb";

// describe("Database CRUD Operations", () => {
//   let db: any;

//   beforeAll(async () => {
//     const client = await clientPromise;
//     db = client.db("weddingRegistry"); // Ensure this matches your database name
//   });

//   it("should connect to the database", async () => {
//     const collections = await db.listCollections().toArray();
//     expect(collections).toBeDefined();
//   });

//   it("should insert a user into the users collection", async () => {
//     const usersCollection = db.collection("users");

//     const newUser = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@example.com",
//       passwordHash: "hashedPassword123",
//       accessCode: "ACCESS123",
//     };

//     const result = await usersCollection.insertOne(newUser);
//     expect(result.insertedId).toBeDefined();
//   });

//   it("should retrieve a user from the users collection", async () => {
//     const usersCollection = db.collection("users");
//     const user = await usersCollection.findOne({ email: "john@example.com" });
//     expect(user).toBeDefined();
//     expect(user.firstName).toBe("John");
//   });

//   it("should update a user in the users collection", async () => {
//     const usersCollection = db.collection("users");

//     const updateResult = await usersCollection.updateOne(
//       { email: "john@example.com" },
//       { $set: { lastName: "Smith" } }
//     );

//     expect(updateResult.modifiedCount).toBe(1);
//   });

//   it("should delete a user from the users collection", async () => {
//     const usersCollection = db.collection("users");

//     const deleteResult = await usersCollection.deleteOne({
//       email: "john@example.com",
//     });

//     expect(deleteResult.deletedCount).toBe(1);
//   });
// });
