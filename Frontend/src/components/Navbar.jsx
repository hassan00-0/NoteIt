import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="bg-base-300 border border-base-content/10 ">
      <div className="flex justify-between items-center p-4 mx-auto max-w-6xl">
        <h1 className="text-primary tracking-tight font-bold text-3xl">
          NoteIt
        </h1>
        <div className="flex items-center">
          <Link to={"/create"} className="btn btn-primary">
            <Plus size={20} />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
