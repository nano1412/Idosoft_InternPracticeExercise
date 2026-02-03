import { useNavigate } from "react-router";
import { useState } from "react";

import Button from "@/components/ButtonComponent";
import Container from "@/components/Container";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useBillStore } from "@/store";


const ManageBill = () => {
  const bills = useBillStore((state) => state.bills)
  const removeBill = useBillStore((state) => state.deleteBill)

  const [isModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [billIdToModify, setBillIdToModify] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Container>
          <h1 className="font-bold text-3xl">Manage Bill</h1>
          <div className="text-center mt-5">
            {bills.length === 0 ? (
              <p>there is no bill here, please add a new one</p>
            ) : (
              <table className="min-w-full divide-y divide-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 hidden md:table-cell">
                      Id
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Shop Name
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 hidden md:table-cell">
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
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 hidden lg:table-cell">
                      Note
                    </th>

                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {bills.map((bill) => (
                    <tr key={bill.billId}>
                      <td className="hidden md:table-cell w-20">
                        {bill.billId}
                      </td>
                      <td className="min-w-15">{bill.shopName}</td>
                      <td className="max-w-1 whitespace-normal wrap-break-word hidden md:table-cell">
                        {bill.description}
                      </td>
                      <td>{bill.amount}</td>
                      <td className="min-w-20">{bill.date}</td>
                      <td className="min-w-20">{bill.category}</td>
                      <td className="max-w-1 whitespace-normal wrap-break-word hidden lg:table-cell">
                        {bill.note}
                      </td>

                      <td className="">
                        <button
                          className="hover:bg-blue-600 bg-blue-500 text-white px-1 m-1 rounded-lg shadow-md
          active:scale-95
          transition
          ease-in-out
          cursor-pointer"
                          onClick={() => {
                            navigate(`/edit/${bill.billId}`);
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
                          onClick={() => {
                            setDeleteConfirmationModalOpen(true);
                            setBillIdToModify(bill.billId);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <Button
              AdditionalClass="text-white bg-blue-500 hover:bg-blue-600"
              children="Add New Bill"
              onClick={() => {
                navigate("/add");
              }}
            />
          </div>
          {isModalOpen && (
            <ConfirmationModal
              onClose={() => setDeleteConfirmationModalOpen(false)}
              onConfirm={() => {removeBill(billIdToModify);setDeleteConfirmationModalOpen(false)}}
            >
              <p>are you sure you want to delete bill {billIdToModify}</p>
            </ConfirmationModal>
          )}
        </Container>
      </div>
    </>
  );
};

export default ManageBill;
