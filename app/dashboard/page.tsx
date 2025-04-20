import { buttonVariants } from "@/Components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import next/image
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
  if (!user) return null; // Handle the missing data, show a message, or return notFound()
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
          // Wrap with Link and apply matching styles from home page
          <Link href={`/post/${item.id}`} key={item.id} className="block">
            <div className="border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
              {" "}
              {/* Added flex flex-col */}
              {/* Image first using next/image */}
              {item.imageUrl && (
                <div className="relative w-full h-48 flex-shrink-0">
                  {" "}
                  {/* Added relative positioning and fixed height */}
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill={true} // Use fill to cover the container
                    className="object-cover hover:scale-105 transition-transform duration-300" // Keep object-cover
                  />
                </div>
              )}
              {/* Text content with padding and matching margins */}
              {/* Corrected structure: removed nested div and stray </p> */}
              <div className="p-4 flex-grow">
                {" "}
                {/* Keep flex-grow if needed for flex layout */}
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 mb-2">
                  {item.content.length > 34
                    ? item.content.substring(0, 34) + "..."
                    : item.content}
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  {/* Fixed class typo text -> text-sm */}
                  By {item.authorName} on{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
