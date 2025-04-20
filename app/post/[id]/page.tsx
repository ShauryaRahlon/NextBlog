import { prisma } from "@/app/utils/db";
import { Card, CardContent } from "@/Components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Update the props interface to match Next.js requirements
type PostPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

// Add generateMetadata for better SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.content.slice(0, 160), // First 160 characters as description
  };
}

// Remove custom type, define params directly in function signature
export default async function PostPage({
  params,
  searchParams, // Add searchParams parameter even if unused
}: PostPageProps) {
  // Correctly destructure id from params
  const { id } = params;
  const data = await getData(id);

  // Basic display (can be enhanced later)
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link href={"/dashboard"}>Back</Link>
      {data.imageUrl && (
        // Use next/image
        <div className="relative w-full h-96 mb-6">
          {" "}
          {/* Added relative positioning */}
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill={true} // Use fill
            className="object-cover rounded-lg" // Keep object-cover
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-4">
        By {data.authorName} on {new Date(data.createdAt).toLocaleDateString()}
      </p>
      {/* Render content inside the prose div */}
      <div className="prose prose-lg dark:prose-invert mt-4">
        <Card>
          <CardContent>{data.content}</CardContent>
        </Card>
      </div>
      {/* Removed duplicate h1 tag here */}
    </div>
  );
}
