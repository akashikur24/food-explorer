import { Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
export interface HeaderProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({ setIsModal }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-slate-500 ">
      <div>
        <h1 className="font-semibold text-2xl text-white">Food Explorer</h1>
      </div>
      <div className="flex gap-5">
        <div onClick={() => navigate("/productCart")}>
          <ShoppingCart color="white" className="cursor-pointer" />
        </div>
        <div
          className="hidden max-lg:block cursor-pointer"
          onClick={() => setIsModal((prev) => !prev)}
        >
          <Menu color="white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
