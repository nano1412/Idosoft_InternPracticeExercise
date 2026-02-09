import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import Button from "@/components/ButtonComponent";
import Container from "@/components/Container";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useBillStore } from "@/store";
import LoadingModal from "@/components/LoadingModal";
import Modal from "@/components/modal";

import EditIcon from "@/assets/pencil-edit-button.svg?react";
import DeleteIcon from "@/assets/delete-189.svg?react";
import { PATH } from "@/components/path";

const ManageBill = () => {
  const fetchBills = useBillStore((s) => s.fetchBills);
  const deleteBills = useBillStore((s) => s.deleteBills);
  const bills = useBillStore((s) => s.asyncBills);
  const isLoading = useBillStore((s) => s.isLoading);
  const error = useBillStore((s) => s.error);
  const clearError = useBillStore((s) => s.clearError);

  useEffect(() => {
    fetchBills();
  }, []);

  const [isModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [billIdToModify, setBillIdToModify] = useState(Number);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Container>
          <h1 className="font-bold text-3xl">Manage Bill</h1>
          <div className="text-center">
            {bills.length === 0 ? (
              <div className="m-5 text-lg font-bold text-gray-400">
                <p>there is no bill here, please add a new one</p>
              </div>
            ) : (
              <table className=" my-5 min-w-full divide-y divide-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black">
                      Shop Name
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black hidden md:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black hidden sm:table-cell">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black">
                      Purchase Date
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black">
                      Category
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-black hidden lg:table-cell">
                      Note
                    </th>

                    <th className="px-4 py-3 text-center text-sm font-semibold text-black">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {bills.map((bill) => (
                    <tr key={bill.billId} className="hover:bg-blue-50">
                      <td className="min-w-15">{bill.shopName}</td>
                      <td className="max-w-1 whitespace-normal wrap-break-word hidden md:table-cell">
                        {bill.description}
                      </td>
                      <td className="hidden sm:table-cell">{bill.amount}</td>
                      <td className="min-w-20">{bill.date}</td>
                      <td className="min-w-20">{bill.category}</td>
                      <td className="max-w-1 whitespace-normal wrap-break-word hidden lg:table-cell">
                        {bill.note}
                      </td>

                      <td className="">
                        <button
                          className="py-1 hover:bg-blue-600 bg-blue-500 text-white px-1 m-1 rounded-lg shadow-md
          active:scale-95
          transition
          ease-in-out
          cursor-pointer"
                          onClick={() => {
                            navigate(`${PATH.EDIT_PAGE}/${bill.billId}`);
                          }}
                        >
                          <EditIcon className="text-center w-4 h-4 text-white p-0.5" />
                        </button>
                        <button
                          className="py-1 hover:bg-red-600 bg-red-500 text-white px-1 m-1 rounded-lg shadow-md
          active:scale-95
          transition
          ease-in-out
          cursor-pointer"
                          onClick={() => {
                            setDeleteConfirmationModalOpen(true);
                            setBillIdToModify(Number(bill.billId));
                          }}
                        >
                          <DeleteIcon className="w-4 h-4 text-white" />
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
        </Container>

          {isModalOpen && (
          <ConfirmationModal
            onClose={() => setDeleteConfirmationModalOpen(false)}
            onConfirm={() => {
              deleteBills(billIdToModify);
              setDeleteConfirmationModalOpen(false);
            }}
          >
            <p>are you sure you want to delete bill {billIdToModify}</p>
          </ConfirmationModal>
        )}

        {isLoading && (
          <LoadingModal text="fetching new data"/>
        )}

        {!!error && (
          <Modal
            onClose={() => {
              clearError();
            }}
          >
            <p>{error}</p>
          </Modal>
        )}

        
      </div>
    </>
  );
};

export default ManageBill;
