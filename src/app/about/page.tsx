import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full max-w-sm mx-auto text-center mt-36 p-6 text-2xl text-muted-foreground flex flex-col items-center justify-center gap-2">
      <p>
        Inspired by{" "}
        <Link
          href={"https://receiptify.herokuapp.com/"}
          className="underline text-blue-400 hover:text-blue-500 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Receiptify
        </Link>
      </p>
      <p>
        Built with <span className="font-bold">Next.js</span>
      </p>
      <p>❤️</p>
      <p className="text-xs mt-16">
        if the download button doesn&apos;t work, try again or try a different
        browser or use it on a pc. sorry for the inconvenience. 😔
      </p>
    </div>
  );
};
export default Page;
