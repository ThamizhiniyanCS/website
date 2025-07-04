import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="mx-auto grid w-full max-w-4xl items-start gap-4 px-10">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </Alert>

      <Alert>
        <PopcornIcon />
        <AlertTitle>
          This Alert has a title and an icon. No description.
        </AlertTitle>
      </Alert>

      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>

          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1621961458348-f013d219b50c"
              alt="Photo by Drew Beamer"
              fill
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </AlertDescription>
      </Alert>
    </div>
  );
}
