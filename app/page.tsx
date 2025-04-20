import { prisma } from "./utils/db";
// import { Prisma } from "@prisma/client";
async function getData() {
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
      },
    });
    // console.log("Fetched data:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <h1 key={item.id}>{item.content}</h1>
        ))}
      </div>
    </div>
  );
}
