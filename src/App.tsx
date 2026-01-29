import { useState } from "react";
import type { Bill } from "@/pages/components/types"
import { BillCategory } from "@/pages/components/types";
import {BrowserRouter, Route, Router, Routes } from 'react-router'

import './App.css'
import Addbill from './pages/add-bill/AddBill.tsx'
import Editbill from './pages/edit-bill/EditBill.tsx'
import Managebill from './pages/manage-bill/ManageBill.tsx'

const defaultBills = [{
        billId: "1",
        shopName: "lazada",
        description: "abc",
        amount: "30",
        date: "5/7/2029",
        category: BillCategory.TRANSPORT,
        note: "งง",
      },{
        billId: "2",
        shopName: "shopee",
        description: "def",
        amount: "25",
        date: "20/8/2030",
        category: BillCategory.UTILITIES,
        note: "-",
      },
    ]


function App() {
  const [bills, setBills] = useState<Bill[]>(defaultBills);

  return (
    <>
    <div className="min-h-screen bg-blue-200">
      <div className='py-8 px-12'>
        <BrowserRouter>
          <Routes>
            <Route path = '/add' element = {<Addbill setBills = {setBills}/>}> </Route>
            <Route path = '/edit/:id' element = {<Editbill bills = {bills} editBills = {setBills}/>}> </Route>
            <Route path = '/' element = {<Managebill bills = {bills}/>}> </Route>
          </Routes>
        </BrowserRouter> 
      </div>
    </div>
      
    </>
  )
}

export default App
