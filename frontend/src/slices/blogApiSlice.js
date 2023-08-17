import {BLOG_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const blogApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPosts: builder.query({
         query: () => ({
            url:BLOG_URL,
         }),
         keepUnusedDataFor:5
      }),
      savePost: builder.mutation({
         query: (data) => ({
            url: BLOG_URL,
            method: 'POST',
            body: data
         })
      })
   })
})

export const {useGetPostsQuery, useSavePostMutation} = blogApiSlice;