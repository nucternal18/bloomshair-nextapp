import { NEXT_URL } from "../config";
import { UserInfoProps } from "./types";

export const verifyEmail = async (user: UserInfoProps): Promise<string> => {
  try {
    const response = await fetch(`${NEXT_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    });

    if (response.status === 204) {
      return "Email verification request sent";
    }
    return "Email verification request failed";
  } catch (error: any) {
    throw new Error("Unable to fetch user: " + error.message);
  }
};
