import { Suspense } from "react";
import { prisma } from "./utils/db";
import Link from "next/link";
import Image from "next/image"; // Import next/image
import { Progress } from "@/Components/ui/progress"; // Correct import path
// import { Prisma } from "@prisma/client";
async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay})
  try {
    const data = await prisma.blogPost.findMany({
      select: {
        title: true,
        content: true,
        imageUrl: true,
        authorImage: true,
        authorName: true,
        id: true,
        createdAt: true,
        authorId: true,
        updatedAt: true,
      },
    });
    // console.log("Fetched data:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export default function Home() {
  // const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      {/* Use Progress component correctly in fallback */}
      <Suspense fallback={<Progress className="w-full h-2" />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}
async function BlogPosts() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <Link href={`/post/${item.id}`} key={item.id} className="block">
          {" "}
          {/* Wrap with Link */}
          <div
            className="border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col" // Added flex flex-col
          >
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
            {/* Text content with padding */}
            <div className="p-4 flex-grow">
              {" "}
              {/* Added flex-grow */}
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 mb-2">
                {/* Match content truncation from dashboard */}
                {item.content.length > 34
                  ? item.content.substring(0, 34) + "..."
                  : item.content}
              </p>
              <p className="text-sm text-gray-500">
                By {item.authorName} on{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link> // Close Link tag
      ))}
    </div>
  );
}
