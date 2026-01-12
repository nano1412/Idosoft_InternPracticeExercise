import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router'



import './App.css'
import Addbill from './pages/add-bill/AddBill.tsx'
import Editbill from './pages/edit-bill/EditBill.tsx'
import Managebill from './pages/manage-bill/ManageBill.tsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/add' element = {<Addbill />}> </Route>
          <Route path = '/edit/:id' element = {<Editbill />}> </Route>
          <Route path = '/manage' element = {<Managebill />}> </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
