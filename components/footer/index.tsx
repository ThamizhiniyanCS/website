// import { TextHoverEffect } from "../unizoy-ui/text-hover-effect"
import dynamic from "next/dynamic"

const TextHoverEffect = dynamic(() =>
  import("../unizoy-ui/text-hover-effect").then((mod) => mod.TextHoverEffect)
)

const Footer = () => {
  const date = new Date()

  return (
    <footer className="sticky bottom-0 left-0 z-0 flex min-h-40 flex-col items-center overflow-clip py-10">
      <div className="flex w-full translate-y-[80%] flex-col items-center gap-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <p key={`testing-footer-array-${index}`} className="">
            testing
          </p>
        ))}
      </div>

      <TextHoverEffect
        text="Thamizhiniyan C S"
        fontSize={33}
        className="translate-y-[30%]"
      />
    </footer>
  )
}

export default Footer
