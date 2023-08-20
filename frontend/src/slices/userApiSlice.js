import {USERS_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const userApiSlice =  apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (data) => ({
            url: USERS_URL,
            method: 'POST',
            body: data
         }),
         keepUnusedDataFor: 5
      }),
      loginUser: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data
         }),
         keepUnusedDataFor:5
      }),
      logoutUser: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST'
         })
      })
   })
})

export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation} = userApiSlice;