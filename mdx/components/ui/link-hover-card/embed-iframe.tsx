export default function EmbedIframe({ url }: { url: string }) {
  return (
    <div className="relative aspect-video w-full bg-white">
      <iframe
        src={url}
        loading="lazy"
        className="size-full border-0"
        title={`Preview of ${url}`}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
