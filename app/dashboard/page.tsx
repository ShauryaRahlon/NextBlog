import { buttonVariants } from "@/Components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user.id);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link
          href="/dashboard/create"
          className={buttonVariants({ variant: "default" })}
        >
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="mt-2 w-full h-auto rounded-md hover:scale-105 transition-transform duration-300"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              By {item.authorName} on{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
