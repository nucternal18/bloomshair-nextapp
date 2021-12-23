import { ApiError, Client, Environment } from "square";
// Create a unique key for this creation operation so you don't accidentally
// create the customer multiple times if you need to retry this operation.
// Here we use the npm package uuid
import { v4 as uuidv4 } from "uuid";

const client = new Client({
  timeout: 3000,
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Get an instance of the Square API you want call
const { locationsApi, customersApi, paymentsApi } = client;

const idempotencyKey = uuidv4();

const createCustomer = async (firstName: string, lastName: string) => {
  // To create a customer, you only need 1 of 5 identity values but you'll be
  // specifying two.
  const requestBody = {
    idempotencyKey: idempotencyKey, // A unique id for the request
    givenName: firstName, // The given name of the customer
    familyName: lastName, // The family name of the customer
  };

  try {
    const { result } = await customersApi.createCustomer(requestBody);
    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    } else {
      throw new Error("Unexpected Error: " + error);
    }
  }
};

export {
  client,
  locationsApi,
  customersApi,
  idempotencyKey,
  paymentsApi,
  createCustomer,
};
