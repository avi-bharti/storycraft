import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './assets/css/index.css';
import store from './store';
import {Provider} from 'react-redux';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';
import AddBlogScreen from './screens/AddBlogScreen';
import EditBlogScreen from './screens/EditBlogScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import PrivateRoutes from './components/PrivateRoutes';
import MyPost from './screens/MyPost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route element={<PrivateRoutes />} >
        <Route path='/create' element={<AddBlogScreen />} />
        <Route path='/mypost' element={<MyPost />} />
        <Route path='/:slug/edit' element={<EditBlogScreen />} />
      </Route>
      <Route path='/:slug' element={<BlogScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </React.StrictMode>
);
