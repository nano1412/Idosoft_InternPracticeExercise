import { BrowserRouter, Route, Routes } from "react-router";

import AddBill from "@/pages/AddBill.tsx";
import EditBill from "@/pages/EditBill.tsx";
import ManageBill from "@/pages/ManageBill.tsx";
import Header from "@/pages/Header.tsx";
import { PATH } from "./components/path";

function App() {

  return (
    <>
      <div className="bg-gray-50">
        <BrowserRouter>
          <Header />
          <div className="py-8 px-12">
            <Routes>
              <Route path={PATH.ADD_PAGE} element={<AddBill/>} />
              <Route
                path={`${PATH.EDIT_PAGE}/:id`}
                element={<EditBill/>}
              />
              <Route
                path={PATH.MANAGE_PAGE}
                element={<ManageBill/>}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
