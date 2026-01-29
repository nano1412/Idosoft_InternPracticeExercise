import { useNavigate } from "react-router";
import type { Bill } from "@/pages/components/types";
import ConfirmationModal from "@/pages/components/ConfirmationModal";
import { useState } from "react";

const TableContent = ({
  billId,
  shopName,
  description,
  amount,
  date,
  category,
  note,
}: Bill) => {
  const [isModalOpen,setModalOpen] = useState(false)
  const navigate = useNavigate();

  const deleteContent = (id:any) =>{
    console.log(`delete ${id}`)
    setModalOpen(false)
  }

  return (
    <>
    {isModalOpen && (<ConfirmationModal onClose = {() => setModalOpen(false)} onConfirm = {() => deleteContent(billId)}>
        <p>are you sure you want to delete bill {billId}</p>
      </ConfirmationModal>)}
      
      <tr>
        <td>{billId}</td>
        <td>{shopName}</td>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{date}</td>
        <td>{category}</td>
        <td>{note}</td>

        <td>
          <button
            className="hover:bg-blue-600 bg-blue-500 text-white px-1 m-1 rounded-lg shadow-md
          active:scale-95
          transition
          ease-in-out
          cursor-pointer"
            onClick={() => {
              navigate(`/edit/${billId}`);
            }}
          >
            edit
          </button>
          <button
            className=" hover:bg-red-600 bg-red-500 text-white px-1 m-1 rounded-lg shadow-md
          active:scale-95
          transition
          ease-in-out
          cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableContent;
