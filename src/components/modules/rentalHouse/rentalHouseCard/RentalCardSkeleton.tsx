import React from "react";

const RentalCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="shadow-xl border border-gray-300 rounded p-5 animate-pulse space-y-4">
          {/* Image Skeleton */}
          <div className="rounded bg-gray-200 h-[200px] w-full" />

          {/* Info Skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-2/3 h-5 bg-gray-300 rounded" />
            {/* Amenities */}
            <div className="flex gap-2 flex-wrap">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-12 bg-gray-200 rounded border border-gray-300"
                />
              ))}
            </div>

            {/* Button */}
            <div className="w-24 h-8 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalCardSkeleton;
