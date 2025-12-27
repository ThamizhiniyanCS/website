import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

export default function Page() {
  return (
    <>
      <ResizablePanel
        defaultSize={60}
        minSize={40}
        order={2}
        className="pt-18"
      ></ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel
        defaultSize={20}
        minSize={10}
        order={3}
        className="pt-18"
      ></ResizablePanel>
    </>
  )
}
