import { handleSubmission } from "@/app/actions";
import { Button } from "@/Components/ui/button";
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

export default function createBlogRoute() {
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
            <Button className="mt-2">Create Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
