import { ImageResponse } from "next/og"
import { env } from "@/env"
import loadGoogleFont from "@/utils/load-google-font"

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const key = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(env.OG_SECRET),
  { name: "HMAC", hash: { name: "SHA-256" } },
  false,
  ["sign"]
)

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, "0"))
    .join("")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const description = searchParams.get("description")
  const subdomain = searchParams.get("subdomain")
  let route = searchParams.get("route")
  const token = searchParams.get("token")

  const verifyToken = toHex(
    await crypto.subtle.sign(
      "HMAC",
      await key,
      new TextEncoder().encode(
        JSON.stringify({ title, description, subdomain, route })
      )
    )
  )

  if (token !== verifyToken) {
    return new Response("Invalid token.", { status: 401 })
  }

  if (route) {
    route = route.replaceAll("-", " ")
  }

  return new ImageResponse(
    <div tw="flex w-full h-full flex-col items-center justify-center text-white bg-black text-center">
      <p tw="capitalize text-4xl">{subdomain}</p>

      <div tw="w-3/4 h-1px bg-white mb-10"></div>

      <p tw="capitalize text-4xl">{route}</p>
      <p tw="text-5xl">{title}</p>

      <p tw="text-3xl">{description}</p>

      <div tw="w-1/2 h-1px bg-white mt-10 mb-5"></div>

      <p
        tw="text-5xl"
        style={{
          fontFamily: "Lavishly Yours",
        }}
      >
        Thamizhiniyan C S
      </p>
    </div>,

    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Josefin Sans",
          data: await loadGoogleFont(
            "Josefin Sans",
            "" + title + description + subdomain + route
          ),
          style: "normal",
        },
        {
          name: "Lavishly Yours",
          data: await loadGoogleFont("Lavishly Yours", "Thamizhiniyan C S"),
          style: "normal",
        },
      ],
    }
  )
}
