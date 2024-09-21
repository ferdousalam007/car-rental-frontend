import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    //forgot password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    //reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password/" + data.id + "/" + data.token,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/auth/user-update",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});
