import { BillCategory, type Bill } from "@/pages/components/types";
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
      <form onSubmit={handleOnSubmit} {...rest}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div
            key={isShopNameValid ? "valid" : "invalid"}
            className={`group ${!isShopNameValid ? "invalid" : ""}`}
          >
            <label className="mr-1 group-[.invalid]:text-red-500">
              Shop Name* {!isShopNameValid && " this field is required"}
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
          </div>

          <div className={`group ${!isDateValid ? "invalid" : ""}`}>
            <label className="mr-1 group-[.invalid]:text-red-500">
              Date* {!isDateValid && " this field is required"}
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
          </div>

          <div className={`group ${!isAmountValid ? "invalid" : ""}`}>
            <label className="mr-1 group-[.invalid]:text-red-500">
              Amount* {!isAmountValid && " this field is required"}
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
          </div>

          <div className={`group ${!isCategoryValid ? "invalid" : ""}`}>
            <label className="mr-1 group-[.invalid]:text-red-500">
              Category* {!isCategoryValid && " this field is required"}
            </label>
            <br />
            <select
              className="w-full border rounded-xl pl-2
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
          </div>

          <div
            className={`row-span-2 group ${!isDescriptionValid ? "invalid" : ""}`}
          >
            <label className="mr-1 group-[.invalid]:text-red-500">
              Description* {!isDescriptionValid && " this field is required"}
            </label>
            <br />
            <textarea
              className="w-full border rounded-xl pl-2 pb-10
               border-black
               group-[.invalid]:border-red-500
               focus:outline-none
               group-[.invalid]:focus:ring-red-500"
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={description}
            ></textarea>
          </div>

          <div className="row-span-2">
            <label className="mr-1">Note (optional)</label>
            <br />
            <textarea
              className="w-full border rounded-xl pl-2 pb-10"
              id="note"
              name="note"
              placeholder="Note"
              defaultValue={note}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormContent;
