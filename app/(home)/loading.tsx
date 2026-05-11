export default function Loading() {
  return (
    <div className="font-josefin-sans bg-background flex min-h-svh w-full flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-2xl tracking-widest md:text-4xl">
        <span className="text-muted-foreground">INITIALIZING</span>
        {/* Blinking hacker terminal cursor */}
        <span className="bg-primary h-6 w-3 animate-pulse md:h-8 md:w-4" />
      </div>

      <p className="text-muted-foreground/50 animate-pulse font-mono text-sm tracking-widest uppercase">
        Establishing secure connection...
      </p>
    </div>
  )
}
