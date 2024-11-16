import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full max-w-sm mx-auto text-center mt-36 p-6 text-2xl text-muted-foreground">
      <p>
        hi 👋🏻,more info here-{" "}
        <Link
          href={"https://armaan.live"}
          className="underline text-blue-400 hover:text-blue-500 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          armaan.live
        </Link>
      </p>
    </div>
  );
};
export default Page;
