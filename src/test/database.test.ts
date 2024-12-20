import clientPromise from "../lib/mongodb";

describe("Database and Application Tests", () => {
  let db: any;
  let usersCollection: any;
  let registriesCollection: any;

  beforeAll(async () => {
    const client = await clientPromise;
    db = client.db("weddingRegistry");
    usersCollection = db.collection("users");
    registriesCollection = db.collection("registries");
  });

  afterAll(async () => {
    await usersCollection.drop().catch(() => console.log("No users collection to drop."));
    await registriesCollection.drop().catch(() => console.log("No registries collection to drop."));
    const client = await clientPromise;
    await client.close();
  });

  // Database Connection Test
  it("should connect to the database", async () => {
    const collections = await db.listCollections().toArray();
    expect(collections).toBeDefined();
  });

  // User CRUD Tests
  it("should insert a user into the users collection", async () => {
    const newUser = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      passwordHash: "hashedPassword456",
      accessCode: "ACCESS456",
    };

    const result = await usersCollection.insertOne(newUser);
    expect(result.insertedId).toBeDefined();
  });

  it("should retrieve a user from the users collection", async () => {
    const user = await usersCollection.findOne({ email: "jane@example.com" });
    expect(user).toBeDefined();
    expect(user.firstName).toBe("Jane");
  });

  it("should update a user in the users collection", async () => {
    const updateResult = await usersCollection.updateOne(
      { email: "jane@example.com" },
      { $set: { lastName: "Smith" } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    const updatedUser = await usersCollection.findOne({ email: "jane@example.com" });
    expect(updatedUser.lastName).toBe("Smith");
  });

  it("should delete a user from the users collection", async () => {
    const deleteResult = await usersCollection.deleteOne({ email: "jane@example.com" });
    expect(deleteResult.deletedCount).toBe(1);

    const deletedUser = await usersCollection.findOne({ email: "jane@example.com" });
    expect(deletedUser).toBeNull();
  });

  // Registry CRUD Tests
  it("should insert a registry into the registries collection", async () => {
    const newRegistry = {
      coupleId: "sampleCoupleId",
      weddingDate: new Date(),
      deliveryAddress: "123 Wedding St.",
      uniqueCode: "REG123",
      items: [],
    };

    const result = await registriesCollection.insertOne(newRegistry);
    expect(result.insertedId).toBeDefined();
  });

  it("should retrieve a registry by uniqueCode", async () => {
    const registry = await registriesCollection.findOne({ uniqueCode: "REG123" });
    expect(registry).toBeDefined();
    expect(registry.coupleId).toBe("sampleCoupleId");
  });

  it("should update a registry in the registries collection", async () => {
    const updateResult = await registriesCollection.updateOne(
      { uniqueCode: "REG123" },
      { $set: { deliveryAddress: "456 Reception Ave." } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    const updatedRegistry = await registriesCollection.findOne({ uniqueCode: "REG123" });
    expect(updatedRegistry.deliveryAddress).toBe("456 Reception Ave.");
  });

  it("should delete a registry from the registries collection", async () => {
    const deleteResult = await registriesCollection.deleteOne({ uniqueCode: "REG123" });
    expect(deleteResult.deletedCount).toBe(1);

    const deletedRegistry = await registriesCollection.findOne({ uniqueCode: "REG123" });
    expect(deletedRegistry).toBeNull();
  });

  // API Route Tests
  it("should generate a unique code for a registry", async () => {
    const response = await fetch("http://localhost:3000/api/registry/generateCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coupleId: "testCoupleId",
        firstName1: "John",
        firstName2: "Jane",
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.uniqueCode).toBeDefined();
  });

  it("should fetch the registry using the unique code", async () => {
    const uniqueCode = "TEST123";

    // Insert test registry
    await registriesCollection.insertOne({
      coupleId: "testCoupleId",
      weddingDate: new Date(),
      deliveryAddress: "789 Party Lane",
      uniqueCode,
      items: [],
    });

    const response = await fetch(`http://localhost:3000/api/registry/fetch?code=${uniqueCode}`, {
      method: "GET",
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.registry).toBeDefined();
    expect(data.registry.coupleId).toBe("testCoupleId");
  });
});
