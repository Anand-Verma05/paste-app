import React from 'react'; 
import './App.css'
import {createBrowserRouter,RouterProvider}from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Changebg from './components/changebg';

const router =createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div className='flex flex-row'>
        <div>
        <Navbar/>
        <Home />
        </div>
        {/* <Changebg/> */}
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className='flex flex-row'>
        <div>
        <Navbar />
        <Paste />
        </div>
        {/* <Changebg/> */}
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div className='flex flex-row'>
        <div>
        <Navbar />
        <ViewPaste />
        </div>
        {/* <Changebg/> */}
      </div>
    },
  ]
);
function App() {


  return (
  
      <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App
