import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://car-warranty-backend-production.up.railway.app/api',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Claim', 'User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
      invalidatesTags: ['User'],
    }),
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (data) => ({ url: '/products', method: 'POST', body: data }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Product'],
    }),
    getClaims: builder.query({
      query: () => '/claims/my-claims',
      providesTags: ['Claim'],
    }),
    getAllClaims: builder.query({
      query: (params) => ({ url: '/claims', params }),
      providesTags: ['Claim'],
    }),
    getClaimById: builder.query({
      query: (id) => `/claims/${id}`,
      providesTags: (result, error, id) => [{ type: 'Claim', id }],
    }),
    createClaim: builder.mutation({
      query: (data) => ({ url: '/claims', method: 'POST', body: data }),
      invalidatesTags: ['Claim'],
    }),
    updateClaimStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/claims/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Claim'],
    }),
    updateClaim: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/claims/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Claim', id }, 'Claim'],
    }),
    deleteClaim: builder.mutation({
      query: (id) => ({ url: `/claims/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Claim'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetClaimsQuery,
  useGetAllClaimsQuery,
  useGetClaimByIdQuery,
  useCreateClaimMutation,
  useUpdateClaimStatusMutation,
  useUpdateClaimMutation,
  useDeleteClaimMutation,
} = api;
