import { useState } from "react";
import type { Bill } from "@/pages/components/types"
import {BrowserRouter, Route, Routes } from 'react-router'

import './App.css'
import Addbill from './pages/add-bill/AddBill.tsx'
import Editbill from './pages/edit-bill/EditBill.tsx'
import Managebill from './pages/manage-bill/ManageBill.tsx'
import Header from "./pages/header/Header.tsx";

function App() {
  const [bills, setBills] = useState<Bill[]>([]);

  return (
    <>
    <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
      <Header/>
      <div className='py-8 px-12'>
          <Routes>
            <Route path = '/add' element = {<Addbill setBills = {setBills}/>}> </Route>
            <Route path = '/edit/:id' element = {<Editbill bills = {bills} setBills = {setBills}/>}> </Route>
            <Route path = '/' element = {<Managebill bills = {bills} setBills = {setBills}/>}> </Route>
          </Routes>
      </div>
        </BrowserRouter> 
    </div>
      
    </>
  )
}

export default App
