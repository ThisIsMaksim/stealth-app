import { Skeleton } from '@gravity-ui/uikit'

export const PostsSkeleton = () => (
  <div className="space-y-4 w-[100vw] max-w-[650px]">
    {Array.from({length: 3}).map((_, index) => (
      <Skeleton key={index} className="w-full h-[250px]" />
    ))}
  </div>
) 