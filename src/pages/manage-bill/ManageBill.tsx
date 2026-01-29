import Container from '@/pages/components/Container'
import { useNavigate } from "react-router";

import Button from "@/pages/components/ButtonComponent";
import TableContent from "@/pages/manage-bill/components/TableContent";
import { BillCategory } from "@/pages/components/types";
import type { Bill } from "@/pages/components/types";
import { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

type Props = {
  bills: Bill[];
};

function ManageBill({ bills }: Props) {
  const [showDeleteConfirmation, setDeleteConfirmation] = useState("");
  const navigate = useNavigate();

  console.log(showDeleteConfirmation)

  return(
    <>
    <div className='text-center'>
      
      <Container>
        <div>
      <table className="min-w-full divide-y divide-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Id
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Shop Name
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Description
            </th>
             <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Amount
            </th>
             <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Date
            </th>
             <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Note
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">

          {
            bills.map((bill) => (
              <TableContent key={bill.billId}
            billId={bill.billId}
            shopName={bill.shopName}
            description={bill.description}
            amount={bill.amount}
            date={bill.date}
            category = {bill.category}
            note={bill.note}
            // onDeleteClick={()=>{setDeleteConfirmation(bill.billId)}}
          />
            ))
          }
        </tbody>
      </table>

      <Button
        AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
        children="Add Bill"
        onClick={() => {
          navigate("/add");
        }}
      />
    </div>

    {showDeleteConfirmation != "" &&(
      <ConfirmationModal onClose = {() => {setDeleteConfirmation("")}} onConfirm = {() => {console.log(`delete ${showDeleteConfirmation}`)}}>
        <p>are you sure you want to delete bill {showDeleteConfirmation}</p>
      </ConfirmationModal>
    )}
      </Container>
    </div>
    </>
  )
}

export default ManageBill
