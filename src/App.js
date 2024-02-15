import React from 'react'
import { Routes, Route } from 'react-router-dom';


/** import all components */
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Admin from './components/Admin';

import PageNotFound from './components/PageNotFound';
import ClaimInsurance from './components/ClaimInsurance';



export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/user' element={<User/>} />
      <Route path='*' element={<PageNotFound/>} />
      <Route path='/home/claiminsurance' element={<ClaimInsurance/>} />
    </Routes>
  )
}