import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="w-full shadow-sm fixed top-0 h-fit p-3 mx-auto border-b px-4">
      <div className="w-full max-w-4xl mx-auto flex flex-row items-center justify-between">
        <Link
          href="/"
          className="bg-primary font-semibold text-lg text-white rounded-full py-2 px-2  hover:opacity-90 cursor-pointer"
        >
          Music Cards
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Navbar;
