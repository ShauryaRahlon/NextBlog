"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return redirect("/api/auth/register"); // Redirect to login if user is not authenticated
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  // Basic validation
  if (
    !title ||
    typeof title !== "string" ||
    !content ||
    typeof content !== "string"
  ) {
    throw new Error("Title and Content are required and must be strings.");
  }

  await prisma.blogPost.create({
    data: {
      title: title,
      imageUrl: typeof url === "string" ? url : "", // Provide empty string if null
      authorId: user.id,
      content: content,
      authorImage: user.picture ?? "", // Provide empty string if null
      authorName: user.given_name ?? user.family_name ?? "Unknown User", // Provide fallbacks
    },
  });
  return redirect("/dashboard");
}
