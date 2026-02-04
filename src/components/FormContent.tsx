import { BillCategory, type Bill } from "@/components/types";
import type React from "react";
import type { FormHTMLAttributes } from "react";
import type { BillFormValidation } from "./FormValidation";

type FormContentProps = Partial<Bill> &
  Partial<BillFormValidation> & {
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  } & FormHTMLAttributes<HTMLFormElement>;

const FormContent: React.FC<FormContentProps> = ({
  billId,
  shopName,
  description,
  amount,
  date,
  category,
  note, //Bill
  isShopNameValid,
  isDescriptionValid,
  isAmountValid,
  isDateValid,
  isCategoryValid, //BillFormValidation
  handleOnSubmit,
  ...rest
}) => {
  return (
    <>
      <form onSubmit={handleOnSubmit} {...rest} className="mb-4 px-6">
        <div className="grid grid-cols-1 gap-x-11 lg:grid-cols-2">
          <div
            key={isShopNameValid ? "valid" : "invalid"}
            className={`group ${!isShopNameValid ? "invalid" : ""}`}
          >
            <label className="pl-2 mr-1 group-[.invalid]:text-red-500">
              Shop Name <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              className="w-full border rounded-xl pl-2
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              type="text"
              id="shopName"
              name="shopName"
              placeholder="Shop Name"
              defaultValue={shopName}
            ></input>
            <p className="pl-2 invisible group-[.invalid]:visible  text-red-400 text-xs">
              this field is required
            </p>
          </div>

          <div className={`group ${!isDateValid ? "invalid" : ""}`}>
            <label className="pl-2 mr-1 group-[.invalid]:text-red-500">
              Purchase Date <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              className="w-full border rounded-xl pl-2
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              defaultValue={date}
            ></input>
            <p className="pl-2 invisible group-[.invalid]:visible  text-red-400 text-xs">
              this field is required
            </p>
          </div>

          <div className={`group ${!isAmountValid ? "invalid" : ""}`}>
            <label className="pl-2 mr-1 group-[.invalid]:text-red-500">
              Amount <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              className="w-full border rounded-xl pl-2
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              type="number"
              inputMode="decimal"
              step="0.01"
              id="amount"
              name="amount"
              placeholder="Amount"
              defaultValue={amount}
            ></input>
            <p className="pl-2 invisible group-[.invalid]:visible  text-red-400 text-xs">
              this field is required
            </p>
          </div>

          <div className={`group ${!isCategoryValid ? "invalid" : ""}`}>
            <label className="pl-2 mr-1 group-[.invalid]:text-red-500">
              Category <span className="text-red-600">*</span>
            </label>
            <br />
            <select
              className="w-full border rounded-xl pl-2 py-1
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              id="category"
              name="category"
              defaultValue={category ?? ""}
            >
              <option value="" disabled>
                Select category
              </option>

              {Object.values(BillCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="pl-2 invisible group-[.invalid]:visible  text-red-400 text-xs">
              this field is required
            </p>
          </div>

          <div
            className={`row-span-2 group ${!isDescriptionValid ? "invalid" : ""}`}
          >
            <label className="pl-2 mr-1 group-[.invalid]:text-red-500">
              Description <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              className="w-full border rounded-xl pl-2 pb-10
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={description}
            ></input>
            <span className="pl-2 invisible group-[.invalid]:visible  text-red-400 text-xs">
              this field is required
            </span>
          </div>

          <div className="row-span-2">
            <label className="pl-2 mr-1">Note</label>
            <br />
            <input
              type="text"
              className="w-full border rounded-xl pl-2 pb-10"
              id="note"
              name="note"
              placeholder="Note"
              defaultValue={note}
            ></input>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormContent;
