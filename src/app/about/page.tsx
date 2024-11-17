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
      <p className="text-sm max-w-xs mt-16 text-center">
        Having trouble with the download? Don’t sweat it! 🚀 Try downloading
        multiple times, switching browsers, or giving it a go on a desktop. And
        hey, screenshots are always a classic move! 🖼️✨
      </p>
    </div>
  );
};
export default Page;
