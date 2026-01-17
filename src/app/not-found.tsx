import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[90vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Large 404 Background Text */}
      <h1 className="text-primary/20 text-[10rem] leading-none font-black select-none md:text-[14rem]">
        404
      </h1>

      {/* Content Overlay */}
      <div className="relative -mt-20 flex flex-col gap-4 md:-mt-32">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Page not found
        </h2>
        <p className="mx-auto max-w-[500px] text-lg text-gray-400">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>

        <div className="mt-6 flex justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
