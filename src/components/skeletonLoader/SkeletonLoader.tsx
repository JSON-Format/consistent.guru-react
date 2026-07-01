const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl animate-pulse">

        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mx-auto h-20 w-[550px] max-w-full rounded-2xl bg-secondary" />

          <div className="mx-auto mt-5 h-6 w-[380px] max-w-full rounded-lg bg-secondary" />

          <div className="mt-10 flex justify-center gap-4">
            <div className="h-14 w-36 rounded-xl bg-secondary" />
            <div className="h-14 w-40 rounded-xl bg-secondary" />
            <div className="h-14 w-32 rounded-xl bg-secondary" />
          </div>
        </div>

        {/* Activity Cards */}
        {[1, 2].map((item) => (
          <div
            key={item}
            className="mb-8 rounded-3xl border border-border bg-card p-8 shadow-lg"
          >
            {/* Habit Name */}
            <div className="mb-6 flex items-center justify-between">
              <div className="h-10 w-72 rounded-xl bg-secondary" />
              <div className="h-10 w-10 rounded-xl bg-secondary" />
            </div>

            {/* Level Badges */}
            <div className="mb-6 flex gap-3">
              <div className="h-8 w-24 rounded-full bg-secondary" />
              <div className="h-8 w-24 rounded-full bg-secondary" />
            </div>

            {/* Mark Complete */}
            <div className="mb-8 h-16 rounded-2xl bg-secondary" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              <div className="h-36 rounded-2xl bg-secondary" />
              <div className="h-36 rounded-2xl bg-secondary" />
            </div>

            {/* Calendar Arrows */}
            <div className="mt-8 flex justify-between">
              <div className="h-12 w-12 rounded-xl bg-secondary" />
              <div className="h-12 w-12 rounded-xl bg-secondary" />
            </div>

            {/* Month Dropdown */}
            <div className="mt-6 flex gap-4">
              <div className="h-12 w-40 rounded-xl bg-secondary" />
              <div className="h-12 w-28 rounded-xl bg-secondary" />
            </div>

            {/* Week Days */}
            <div className="mt-8 grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 rounded bg-secondary"
                />
              ))}
            </div>

            {/* Calendar */}
            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-secondary"
                />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6">
              <div className="h-4 w-24 rounded bg-secondary" />
              <div className="h-4 w-24 rounded bg-secondary" />
              <div className="h-4 w-24 rounded bg-secondary" />
              <div className="h-4 w-24 rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;