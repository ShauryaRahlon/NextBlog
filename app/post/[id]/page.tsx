import { prisma } from "@/app/utils/db";
import { Card, CardContent } from "@/Components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

// Correct type for params
type IdPageProps = {
  params: {
    id: string;
  };
};

export default async function IdPage({ params }: IdPageProps) {
  // Correctly destructure id from params
  const { id } = params;
  const data = await getData(id);

  // Basic display (can be enhanced later)
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link href={"/dashboard"}>Back</Link>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-96 object-cover rounded-lg mb-6" // Added image display
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-4">
        By {data.authorName} on {new Date(data.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg dark:prose-invert">
        {" "}
        {/* Basic content styling */}
      </div>
      <Card>
        <CardContent>
          <p>{data.content}</p>
        </CardContent>
      </Card>
      {/* Removed duplicate h1 tag here */}
    </div>
  );
}
