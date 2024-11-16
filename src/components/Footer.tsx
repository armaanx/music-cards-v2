import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full border-t h-14 p-2 bg-background flex flex-col items-center justify-center text-xs">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center  gap-1">
        <h1>Made with ❤️</h1>
        <div className="flex flex-row items-center justify-center gap-3">
          <Link href={"/about"} className="hover:text-blue-400 hover:underline">
            About
          </Link>
          <Link
            href={"/contact"}
            className="hover:text-blue-400 hover:underline"
          >
            Contact
          </Link>
          <Link
            href={"/privacy"}
            className="hover:text-blue-400 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
