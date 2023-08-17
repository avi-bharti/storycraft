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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/create' element={<AddBlogScreen />} />
      <Route path='/:id' element={<BlogScreen />} />
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
