import { authOptions } from "@/auth";
import TopStats from "@/components/TopStats";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Main() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        <TopStats username={session.user.name!} userImg={session.user.image!} />
      </div>
    </div>
  );
}
