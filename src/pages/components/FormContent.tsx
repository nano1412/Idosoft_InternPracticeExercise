import { BillCategory, type Bill } from "@/pages/components/types"

type FormContentProps = Partial<Bill>

function FormContent({shopName,description,amount,date,category,note}: FormContentProps) {
  return(
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className="mr-1">ShopName*</label><br/>
          <input className="w-full border rounded-xl pl-2" type="text" id="shopName" name="shopName" placeholder="Shop Name" defaultValue={shopName}></input>
        </div>

        <div>
          <label className="mr-1">Date*</label><br/>
          <input className="w-full border rounded-xl pl-2" type="date" id="date" name="date" placeholder="Date" defaultValue={date}></input>
        </div>

        <div>
          <label className="mr-1">Amount*</label><br/>
          <input className="w-full border rounded-xl pl-2" type="number"inputMode="decimal" step="0.01" id="amount" name="amount" placeholder="Amount" defaultValue={amount}></input>
        </div>

        <div>
          <label className="mr-1">Category*</label><br/>
          <select className="w-full border rounded-xl pl-2" id="category" name="category" defaultValue={category ?? ""}>
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

        <div className="row-span-2">
          <label className="mr-1">Description*</label><br/>
          <textarea className="w-full border rounded-xl pl-2 pb-10" id="description" name="description" placeholder="Description" defaultValue={description}></textarea>
        </div>

        <div className="row-span-2">
          <label className="mr-1">Note (optional)</label><br/>
          <textarea className="w-full border rounded-xl pl-2 pb-10" id="note" name="note" placeholder="Note" defaultValue={note}></textarea>
        </div>
      </div>
    </>
  )
}

export default FormContent
