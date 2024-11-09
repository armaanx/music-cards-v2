import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl  mx-auto flex flex-col items-start justify-center gap-5">
        <h1 className="font-semibold text-4xl text-balance">
          Get your Spotify stats in an aeshtetic format!
        </h1>
        <Button
          className="rounded-full font-semibold text-2xl"
          variant={"default"}
          size={"lg"}
        >
          Login with Spotify
        </Button>
      </div>
    </div>
  );
}
