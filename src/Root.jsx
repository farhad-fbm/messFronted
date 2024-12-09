
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navbar_footer/Navbar';
import { Footer } from './components/navbar_footer/Footer';
import { useState } from 'react';
export const Root = () => {


  return (
    <div className=''>
      <div className="w-full bg-slate-200"><Navbar /></div>
      
      <div className="max-w-4xl mx-auto"> <Outlet /></div>
      <div className="w-full"><Footer /></div>
    </div>
  )
}
