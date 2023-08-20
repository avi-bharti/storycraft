import {BLOG_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const blogApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPosts: builder.query({
         query: ({userOnly}) => ({
            url:BLOG_URL,
            params: {userOnly}
         }),
         keepUnusedDataFor:5
      }),
      getPostDetails: builder.query({
         query: (slug) => ({
            url:`${BLOG_URL}/${slug}`,
         }),
         keepUnusedDataFor:5
      }),
      savePost: builder.mutation({
         query: (data) => ({
            url: BLOG_URL,
            method: 'POST',
            body: data
         })
      }),
      updatePost: builder.mutation({
         query: (data) => ({
            url: `${BLOG_URL}/${data.blogId}`,
            method: 'PUT',
            body: data
         })
      }),
      deletePost: builder.mutation({
         query: (id) => ({
            url: `${BLOG_URL}/${id}`,
            method: 'DELETE'
         })
      })
   })
})

export const {useGetPostsQuery,useGetPostDetailsQuery, useSavePostMutation,useUpdatePostMutation, useDeletePostMutation} = blogApiSlice;