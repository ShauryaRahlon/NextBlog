import { prisma } from "@/app/utils/db";
import { Card, CardContent } from "@/Components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react"; // Keep React import if needed elsewhere or as good practice

// Adjust PostPageProps to match Next.js expectations
type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params; // Resolve the promise
  const post = await getData(resolvedParams.id);
  if (!post) {
    return { title: "Post Not Found" }; // Handle case where post isn't found
  }
  return {
    title: post.title,
    description: post.content.slice(0, 160), // First 160 characters as description
  };
}

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const resolvedParams = await params; // Resolve the promise
  const resolvedSearchParams = searchParams ? await searchParams : undefined; // Resolve searchParams if present
  const { id } = resolvedParams;
  if (!id || typeof id !== "string") {
    console.error("Invalid or missing ID parameter");
    return notFound();
  }

  const data = await getData(id);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link href={"/dashboard"}>Back</Link>
      {data.imageUrl && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill={true}
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-4">
        By {data.authorName} on {new Date(data.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg dark:prose-invert mt-4">
        <Card>
          <CardContent>{data.content}</CardContent>
        </Card>
      </div>
    </div>
  );
}
