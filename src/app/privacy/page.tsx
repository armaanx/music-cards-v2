import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full  mx-auto flex flex-col items-center justify-center gap-2 text-center  mt-36 p-6 max-w-prose">
      <h1 className="font-semibold text-2xl">Privacy Policy</h1>
      <p className="text-lg text-muted-foreground">
        This website uses Spotify Web API to fetch user details and top
        tracks/artists to display your card. None of the data is
        stored/collected or shared with third parties. This website can&apos;t
        change any information in your Spotify Account.
      </p>
      <p className="mt-3 text-muted-foreground">
        You can follow this{" "}
        <Link
          href="https://support.spotify.com/us/article/spotify-on-other-apps/"
          className="underline text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          guide
        </Link>{" "}
        to revoke this websites permissions.
      </p>
    </div>
  );
};
export default Page;
