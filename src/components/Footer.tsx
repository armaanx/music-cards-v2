import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full border-t h-14 p-2">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-xs gap-1">
        <h1>
          Made by <Link href={"/"}>Armaan</Link>
        </h1>
        <div className="flex flex-row items-center justify-center gap-2">
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Privacy Policy</Link>
          <Link href={"/"}>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
