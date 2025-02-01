import { refreshAccessToken } from "./refreshToken";
import { setUserInfo, clearUserInfo } from "@/store/UserReducer";
import type { UnknownAction } from "redux";

// `fetchWithToken` is a wrapper around the `fetch` API.
export async function fetchWithToken(
  url: string,
  options: RequestInit = {},
  accessToken: string | null,
  dispatch: (action: UnknownAction) => void
) {
  // If no access token, you can't make the request, so redirect to login
  if (!accessToken) {
    window.location.href = "/login";
    return;
  }

  // Try the request with the current access token
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // Include access token in Authorization header
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If the access token has expired, refresh it and retry the request
  if (response.status === 401) {
    const refreshedData = await refreshAccessToken(); // Get new token

    // If refresh fails, clear storage and redirect
    if (
      !refreshedData ||
      !refreshedData?.newAccessToken ||
      !refreshedData.userId
    ) {
      // If refresh fails, force logout
      localStorage.clear();
      dispatch(clearUserInfo());
      window.location.href = "/login";
      return;
    }

    const { newAccessToken, userId } = refreshedData;

    if (accessToken) {
      // Store the new access token and retry the request
      localStorage.setItem("accessToken", newAccessToken);
      // Dispatch updated user info to Redux
      dispatch(setUserInfo({ userId, userToken: newAccessToken }));

      // Retry the request with the new access token
      response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`, // Use new access token
        },
      });
    }
  }

  return response;
}
