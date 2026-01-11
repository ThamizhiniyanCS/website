import { ImageResponse } from "next/og"
import loadGoogleFont from "@/utils/load-google-font"

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  const text =
    "Hi Folks, This is Thamizhiniyan C S, Ethical Hacker | Web Developer"

  return new ImageResponse(
    <div tw="flex w-full h-full flex-col items-center justify-center text-white relative bg-black">
      <h1 tw="text-[10vw]">Thamizhiniyan C S</h1>
      <div
        tw="flex items-center justify-center"
        style={{
          gap: 20,
        }}
      >
        <p tw="text-xl md:text-2xl">Ethical Hacker</p>
        <div tw="w-1px h-7 rounded-full bg-white md:h-10 md:w-[2px]" />
        <p tw="text-xl md:text-2xl">Web Developer</p>
      </div>
    </div>,

    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Josefin Sans",
          data: await loadGoogleFont("Josefin Sans", text),
          style: "normal",
        },
      ],
    }
  )
}
