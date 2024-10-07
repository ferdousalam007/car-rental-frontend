import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/Auth/AuthSlice";
const backendURL = import.meta.env.VITE_BACKEND_URL
// Base query configuration with the API base URL
const baseQuery = fetchBaseQuery({
  baseUrl: backendURL,
  // baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token; 

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); 
    }
    return headers;
  },
});

// Create a custom base query with refresh token logic
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt to refresh the token
    const res = await fetch(
      // "http://localhost:5000/api/auth/refresh-token,
      `${backendURL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const user = (api.getState() as RootState).auth.user;
    const data = await res.json(); // Parse the JSON response
    if (data?.data?.accessToken && user !== null) {
      // Get the current user
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions); 
    } else {
      api.dispatch(logOut()); 
    }
  }

  return result;
};

// Create the base API instance with tag types
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "booking", "car", "feedback"],
  endpoints: () => ({}),
});
