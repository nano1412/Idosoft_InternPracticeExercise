import Container from "@/pages/components/Container";
import { useNavigate } from "react-router";

import Button from "@/pages/components/ButtonComponent";
import { BillCategory } from "@/pages/components/types";
import type { Bill } from "@/pages/components/types";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

type Props = {
  bills: Bill[];
  setBills: any;
};

function ManageBill({ bills, setBills }: Props) {
  const [isModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [billIdToModify, setBillIdToModify] = useState("");
  const navigate = useNavigate();

  const deleteContent = (idToDelete: any) => {
    console.log(`delete ${idToDelete}`);

    setBills((prevBills: any[]) =>
    prevBills.filter(bill => bill.billId !== idToDelete)
  );
    setDeleteConfirmationModalOpen(false);
  };

  return (
    <>
      <div className="text-center">
        <Container>
          <div>
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
                    <td className="hidden md:table-cell w-20">{bill.billId}</td>
                    <td className="min-w-15">{bill.shopName}</td>
                    <td className="max-w-1 whitespace-normal wrap-break-word hidden md:table-cell">{bill.description}</td>
                    <td>{bill.amount}</td>
                    <td className="min-w-20">{bill.date}</td>
                    <td className="min-w-20">{bill.category}</td>
                    <td className="max-w-1 whitespace-normal wrap-break-word hidden lg:table-cell">{bill.note}</td>

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
              onConfirm={() => deleteContent(billIdToModify)}
            >
              <p>are you sure you want to delete bill {billIdToModify}</p>
            </ConfirmationModal>
          )}
        </Container>
      </div>
    </>
  );
}

export default ManageBill;
