import { NEXT_URL } from "../config";

export const verifyEmail = async (user): Promise<string> => {
  try {
    const response = await fetch(`${NEXT_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
      }),
    });

    if (response.status === 204) {
      return "Email verification request sent";
    }
  } catch (error) {
    throw new Error("Unable to fetch user: " + error.message);
  }
};
