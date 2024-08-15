import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Landing() {
  return (
<div className="flex flex-col items-center justify-center h-screen">
      <div className="space-y-2 mb-10 text-center">
        <h1 className="text-4xl font-bold ">Find Your Roommate </h1>
        <p className="text-2xl font-medium text-foreground">
        using AI
        </p>
      </div>
      <div className="mt-20 w-fit text-center">
        <h2 className="text-xl text-foreground">What do you need?</h2>
        <div className="flex mt-5 flex-row gap-4 justify-center">
          <Button variant="accent" size="lg">
            <Link href={"/roommate/create"}>
              Searching for a place
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href={"/rooms/create"}>
              Need a roommate
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}