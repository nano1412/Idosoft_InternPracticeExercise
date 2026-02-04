import { NavLink } from "react-router";

const Header = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `mx-2 cursor-pointer pb-1 ${
      isActive
        ? "border-b-3 border-blue-500 text-blue-500"
        : "hover:text-blue-500"
    }`;

  return (
    <div className="bg-white px-5 pt-2 flex items-center justify-between border-b border-gray-200 drop-shadow-md font-bold">
      <div className="pb-2">Simple Bill Management System</div>

      <div className="flex">
        <NavLink to="/" className={linkClasses}>
          Manage Bills
        </NavLink>

        <NavLink to="/add" className={linkClasses}>
          Add Bill
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
