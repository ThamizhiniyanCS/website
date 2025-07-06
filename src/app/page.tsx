import {
  Callout,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
} from "@/mdxComponents/callout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  return (
    <div className="mx-auto grid w-full max-w-4xl items-start gap-4 px-10">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <Callout>
        <CalloutTitle>Callout</CalloutTitle>
        <CalloutDescription>
          A callout is a short piece of text intended to attract attention.
        </CalloutDescription>
        <CalloutContent>Wksdflksjdlkfsdlkfjls</CalloutContent>
      </Callout>

      <Callout variant="info">
        <CalloutTitle>Callout</CalloutTitle>
        <CalloutDescription>
          A callout is a short piece of text intended to attract attention.
        </CalloutDescription>
        <CalloutContent>Wksdflksjdlkfsdlkfjls</CalloutContent>
      </Callout>

      <Callout variant="important">
        <CalloutTitle>Callout</CalloutTitle>
        <CalloutDescription>
          A callout is a short piece of text intended to attract attention.
        </CalloutDescription>
        <CalloutContent>Wksdflksjdlkfsdlkfjls</CalloutContent>
      </Callout>

      <Callout variant="warning">
        <CalloutTitle>Callout</CalloutTitle>
        <CalloutDescription>
          A callout is a short piece of text intended to attract attention.
        </CalloutDescription>
        <CalloutContent>Wksdflksjdlkfsdlkfjls</CalloutContent>
      </Callout>

      <Callout variant="error">
        <CalloutTitle>Callout</CalloutTitle>
        <CalloutDescription>
          A callout is a short piece of text intended to attract attention.
        </CalloutDescription>
        <CalloutContent>Wksdflksjdlkfsdlkfjls</CalloutContent>
      </Callout>
    </div>
  );
}
