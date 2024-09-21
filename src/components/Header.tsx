import { Menu } from "lucide-react";

const Header = ({ setIsModal }) => {
  return (
    <div className="w-full p-7 flex justify-between items-center bg-slate-500 ">
      <div>
        <h1 className="font-semibold text-2xl text-white">Food Explorer</h1>
      </div>
      <div
        className="hidden max-lg:block cursor-pointer"
        onClick={() => setIsModal((prev) => !prev)}
      >
        <Menu color="white" />
      </div>
    </div>
  );
};

export default Header;
