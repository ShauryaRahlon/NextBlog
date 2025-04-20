import { handleSubmission } from "@/app/actions";
import { SubmitButton } from "@/Components/general/Submitbuttion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

// Helper function for delay
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function createBlogRoute() {
  // Add a 3-second delay for testing loading state
  // await sleep(3000);

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post </CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-1" action={handleSubmission}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input placeholder="Title" name="title" required type="text" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Label>Content</Label>
              <Textarea name="content" placeholder="content" required />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="mt-2">Image URL</Label>
              <Input name="url" placeholder="Image URL" />
            </div>
            <SubmitButton />
            {/* <Button className="mt-2">Create Post</Button> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
