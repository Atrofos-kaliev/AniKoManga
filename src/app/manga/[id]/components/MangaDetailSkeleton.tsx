export const MangaDetailSkeleton = () => {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8 text-neutral-100">
      <div className="mb-6">
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-700"></div>
      </div>
      <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-3 lg:md:grid-cols-12">
        <div className="md:col-span-1 lg:col-span-3">
          <div className="aspect-[2/3] w-full rounded-lg bg-neutral-700"></div> 
          <div className="mt-4 h-10 w-full rounded bg-neutral-700"></div>
        </div>
        <div className="md:col-span-2 lg:col-span-9"> 
          <div className="mb-2 h-10 w-3/4 rounded bg-neutral-700"></div>
          <div className="mb-4 h-6 w-1/2 rounded bg-neutral-700"></div>

          <div className="mb-4 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-20 rounded-full bg-neutral-700"></div>
            ))}
          </div>
          <div className="mb-6 mt-6 space-y-3">
            <div className="h-4 w-full rounded bg-neutral-700"></div>
            <div className="h-4 w-full rounded bg-neutral-700"></div>
            <div className="h-4 w-5/6 rounded bg-neutral-700"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-1/2 rounded bg-neutral-700"></div>
                <div className="h-5 w-3/4 rounded bg-neutral-700"></div>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </div>
  );
};