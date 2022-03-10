import { ApiError, Client, Environment } from "square";
// Create a unique key for this creation operation so you don't accidentally
// create the customer multiple times if you need to retry this operation.
// Here we use the npm package uuid
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";

const { locationsApi, customersApi, paymentsApi } = new Client({
  environment: dev ? Environment.Sandbox : Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

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
  locationsApi,
  customersApi,
  idempotencyKey,
  paymentsApi,
  createCustomer,
};
