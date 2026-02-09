import { BillCategory, type Bill } from "@/components/types";
import type React from "react";
import type { FormHTMLAttributes } from "react";
import type { BillFormValidation } from "./FormValidation";

type FormContentProps = Partial<Bill> &
  Partial<BillFormValidation> & {
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  } & FormHTMLAttributes<HTMLFormElement>;

const FormContent: React.FC<FormContentProps> = ({
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
  id,
}) => {
  return (
    <>
<form
  onSubmit={handleOnSubmit}
  id={id}
  className="mt-4"
>
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

    <div className={`group ${!isShopNameValid ? "invalid" : ""}`}>
      <label className="text-sm font-medium text-gray-700 group-[.invalid]:text-red-500">
        Shop Name <span className="text-red-500">*</span>
      </label>
      <input
        className="
          mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2
          text-gray-800 placeholder-gray-400
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
          group-[.invalid]:border-red-400 group-[.invalid]:focus:ring-red-200
        "
        type="text"
        name="shopName"
        placeholder="e.g. Shopee"
        defaultValue={shopName}
      />
      <p className="mt-1 text-xs text-red-400 invisible group-[.invalid]:visible">
        This field is required
      </p>
    </div>

    <div className={`group ${!isDateValid ? "invalid" : ""}`}>
      <label className="text-sm font-medium text-gray-700 group-[.invalid]:text-red-500">
        Purchase Date <span className="text-red-500">*</span>
      </label>
      <input
        className="
          mt-1 w-full rounded-lg border border-blue-200 px-3 py-2
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
          group-[.invalid]:border-red-400 group-[.invalid]:focus:ring-red-200
        "
        type="date"
        name="date"
        defaultValue={date}
      />
      <p className="mt-1 text-xs text-red-400 invisible group-[.invalid]:visible">
        This field is required
      </p>
    </div>

    <div className={`group ${!isAmountValid ? "invalid" : ""}`}>
      <label className="text-sm font-medium text-gray-700 group-[.invalid]:text-red-500">
        Amount <span className="text-red-500">*</span>
      </label>
      <input
        className=" appearance-none
          mt-1 w-full rounded-lg border border-blue-200 px-3 py-2
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
          group-[.invalid]:border-red-400 group-[.invalid]:focus:ring-red-200
        "
        type="number"
        min={1}
        pattern="[0-9]*"
        name="amount"
        placeholder="0"
        defaultValue={amount}
      />
      <p className="mt-1 text-xs text-red-400 invisible group-[.invalid]:visible">
        This field is required
      </p>
    </div>

    <div className={`group ${!isCategoryValid ? "invalid" : ""}`}>
      <label className="text-sm font-medium text-gray-700 group-[.invalid]:text-red-500">
        Category <span className="text-red-500">*</span>
      </label>

      <div className="relative mt-1">
        <select
          className="
            w-full appearance-none rounded-lg border border-blue-200
            bg-white px-3 py-2 pr-10
            focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
            group-[.invalid]:border-red-400 group-[.invalid]:focus:ring-red-200
          "
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

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
          ▾
        </span>
      </div>

      <p className="mt-1 text-xs text-red-400 invisible group-[.invalid]:visible">
        This field is required
      </p>
    </div>

    <div className={`lg:col-span-1 lg:row-span-2 group ${!isDescriptionValid ? "invalid" : ""}`}>
      <label className="text-sm font-medium text-gray-700 group-[.invalid]:text-red-500">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        className="
          mt-1 w-full resize-none rounded-lg border border-blue-200
          bg-blue-50 px-3 py-2
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
          group-[.invalid]:border-red-400 group-[.invalid]:focus:ring-red-200
        "
        rows={4}
        name="description"
        placeholder="Description"
        defaultValue={description}
      />
      <p className="mt-1 text-xs text-red-400 invisible group-[.invalid]:visible">
        This field is required
      </p>
    </div>

    <div className="lg:row-span-2">
      <label className="text-sm font-medium text-gray-700">
        Note
      </label>
      <textarea
        className="
          mt-1 w-full resize-none rounded-lg border border-blue-100
          bg-gray-50 px-3 py-2
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none
        "
        rows={4}
        name="note"
        placeholder="Optional notes"
        defaultValue={note}
      />
    </div>

  </div>
</form>

    </>
  );
};

export default FormContent;
