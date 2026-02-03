import { useState } from "react";
import type { Bill } from "@/pages/components/types";
import { BrowserRouter, Route, Routes } from "react-router";

import AddBill from "./pages/add-bill/AddBill.tsx";
import EditBill from "./pages/edit-bill/EditBill.tsx";
import ManageBill from "./pages/manage-bill/ManageBill.tsx";
import Header from "./pages/header/Header.tsx";

function App() {
  const [bills, setBills] = useState<Bill[]>([]);

  return (
    <>
      <div className="bg-gray-50">
        <BrowserRouter>
          <Header />
          <div className="py-8 px-12">
            <Routes>
              <Route path="/add" element={<AddBill setBills={setBills} />} />
              <Route
                path="/edit/:id"
                element={<EditBill bills={bills} setBills={setBills} />}
              />
              <Route
                path="/"
                element={<ManageBill bills={bills} setBills={setBills} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
