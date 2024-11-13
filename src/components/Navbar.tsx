"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { ToolTip } from "./ToolTip";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="w-full shadow-sm fixed top-0 h-fit p-3 mx-auto border-b px-4 bg-background z-50">
      <div className="w-full max-w-5xl mx-auto flex flex-row items-center justify-between">
        <Link
          href="/"
          className="bg-primary font-semibold text-lg text-white rounded-full py-2 px-2  hover:opacity-90 cursor-pointer"
        >
          Music Cards
        </Link>
        <div className="flex flex-row items-center gap-3">
          {session?.user ? (
            <Avatar className="border-4">
              <AvatarImage
                src={session?.user.image as string}
                alt={session?.user.name as string}
              />
              <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
            </Avatar>
          ) : null}
          {session?.user ? (
            <ToolTip content="Log out">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={async () => {
                  const data = await signOut({
                    callbackUrl: "/",
                    redirect: false,
                  });
                  router.push(data.url);
                }}
              >
                <LogOut />
              </Button>
            </ToolTip>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
