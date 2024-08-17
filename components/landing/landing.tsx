import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Landing() {
  return (
<div className="flex flex-col items-center justify-center h-screen">
<div
  className="absolute -z-10 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
></div>
      <div className="space-y-2 mb-5 text-center">
        <h1 className="text-6xl font-bold ">Find a Roommate</h1>
        <h2 className="text-xl text-muted-foreground"> just tell us what you need and we will help you using AI</h2>
      </div>
      <div className="mt-3 w-full text-center">
        <div className="flex flex-row gap-4 justify-center">
          <Button variant="accent" size="lg">
            <Link href={"/roommate/create"}>
              Searching for a place
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href={"/"}>
              Need a roommate
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}