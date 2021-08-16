import { ApiError, Client, Environment } from "square";
// Create a unique key for this creation operation so you don't accidentally
// create the customer multiple times if you need to retry this operation.
// Here we use the npm package uuid
import { v4 as uuidv4 } from "uuid";

export const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Get an instance of the Square API you want call
const { locationsApi, customersApi } = client;

const idempotencyKey = uuidv4();

// Create wrapper async function
export const getLocations = async () => {
  // The try/catch statement needs to be called from within an asynchronous function
  try {
    // Call listLocations method to get all locations in this Square account
    const listLocationsResponse = await locationsApi.listLocations();

    // Get first location from list
    const firstLocation = listLocationsResponse.result.locations[0];

    console.log("Here is your first location: ", firstLocation);
  } catch (error) {
    if (error instanceof ApiError) {
      console.log("There was an error in your request: ", error.errors);
    } else {
      console.log("Unexpected Error: ", error);
    }
  }
};

export const createCustomer = async (firstName: string, lastName: string) => {
  // To create a customer, you only need 1 of 5 identity values but you'll be
  // specifying two.
  const requestBody = {
    idempotencyKey: idempotencyKey, // A unique id for the request
    givenName: firstName, // The given name of the customer
    familyName: lastName, // The family name of the customer
  };

  try {
    const { result } = await customersApi.createCustomer(requestBody);
    console.log(result);
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error.errors);
    } else {
      console.log("Unexpected Error: ", error);
    }
  }
};
