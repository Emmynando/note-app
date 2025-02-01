import { api } from "./baseUrl";
export async function refreshAccessToken() {
  try {
    const response = await fetch(`${api}/refresh-token`, {
      method: "POST",
      // Include cookies for refresh token
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { newAccessToken: data.accessToken, userId: data.id };
    } else {
      // If refresh fails
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
