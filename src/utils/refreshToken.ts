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
    const { id: newAccessToken, accessToken: userId } = data;
    // Update localStorage
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("userId", userId);
    return { newAccessToken, userId };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
