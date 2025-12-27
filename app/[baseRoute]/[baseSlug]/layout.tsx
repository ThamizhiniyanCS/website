import { DIRECTORIES } from "@/lib/constants"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Sidebar from "@/components/sidebar"

interface Props {
  children: React.ReactNode
  params: Promise<{ baseRoute: string; baseSlug: string }>
}

export default async function Layout({ params, children }: Readonly<Props>) {
  const { baseRoute, baseSlug } = await params

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full max-w-[calc(100vw-15px)]"
      style={{ overflow: "visible" }}
    >
      <ResizablePanel
        defaultSize={20}
        minSize={10}
        style={{ overflow: "visible" }}
        order={1}
      >
        <div className="sticky top-0 h-screen w-full px-4 pt-18">
          <Sidebar
            baseRoute={baseRoute}
            baseSlug={baseSlug}
            variant={DIRECTORIES.includes(baseRoute) ? "directory" : "default"}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {children}
    </ResizablePanelGroup>
  )
}
