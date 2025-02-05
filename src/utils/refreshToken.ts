import { api } from "./baseUrl";
export async function refreshAccessToken() {
  try {
    const response = await fetch(`${api}/auth/refresh-token`, {
      method: "POST",
      // Include cookies for refresh token
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to refresh token, status:", response.status);
      return null; // Instead of redirecting immediately
    }
    const data = await response.json();
    return { newAccessToken: data.accessToken, userId: data.id };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
