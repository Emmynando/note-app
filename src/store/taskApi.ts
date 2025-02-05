import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserInfo, clearUserInfo } from "@/store/UserReducer";
import { refreshAccessToken } from "@/utils/refreshToken";
import { RootState } from "@/store/store";
import { api } from "@/utils/baseUrl";

interface Task {
  id: string;
  task_title: string;
  task_body: string;
  reminder?: string;
  scheduleStart?: string;
  scheduleEnd?: string;
  taskCategory?: string;
  userId?: string;
}

interface AddTaskProps {
  id: string;
  task_title: string;
  task_body: string;
  reminder: Date;
  scheduleStart: Date;
  scheduleEnd?: Date;
  taskCategory: string;
  userId: string;
}

interface GetTasksResponse {
  message: string;
  data: Task[];
}

// Create a custom baseQuery to handle token expiration
const baseQueryWithAuth = async (args, queryApi, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: api,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.userToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  });

  let result = await baseQuery(args, queryApi, extraOptions);

  // If the request fails with 401 (Unauthorized), attempt to refresh the token
  if (result?.error?.status === 401) {
    console.log("Access token expired, refreshing...");

    const refreshedData = await refreshAccessToken();

    if (!refreshedData || !refreshedData.newAccessToken) {
      console.error("Token refresh failed, logging out...");
      localStorage.clear();
      queryApi.dispatch(clearUserInfo());
      window.location.href = "/login";
      return result;
    }

    // Store new access token
    const { newAccessToken, userId } = refreshedData;
    localStorage.setItem("accessToken", newAccessToken);
    queryApi.dispatch(setUserInfo({ userId, userToken: newAccessToken }));

    // Retry the original request with the new token
    const retryHeaders = new Headers(args.headers || {});
    retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

    result = await baseQuery(
      { ...args, headers: retryHeaders },
      queryApi,
      extraOptions
    );
  }

  return result;
};

// Define API slice using the new baseQuery
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (userId) => `/task/${userId}`,
    }),
    addTask: builder.mutation<Task, Partial<AddTaskProps>>({
      query: ({ userId, ...newTask }) => ({
        url: `/task/${userId}`,
        method: "POST",
        body: newTask,
        credentials: "include",
      }),
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
