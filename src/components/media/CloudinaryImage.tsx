import { useMemo, useState } from 'react';
import { buildCloudinaryUrl } from '@/lib/cloudinary';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CloudinaryImageProps = {
  publicId: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  skeletonClassName?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
};

const CloudinaryImage = ({
  publicId,
  width,
  height,
  className,
  wrapperClassName,
  skeletonClassName,
  alt = '',
  loading = 'lazy',
  sizes,
  fetchPriority = 'auto',
  decoding = 'async',
}: CloudinaryImageProps) => {
  const imageUrl = useMemo(() => buildCloudinaryUrl(publicId, { width, height }), [publicId, width, height]);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative h-full w-full', wrapperClassName)}>
      {!isLoaded && <Skeleton className={cn('absolute inset-0 h-full w-full', skeletonClassName)} />}
      <img
        src={imageUrl}
        className={cn(
          'h-full w-full transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        fetchPriority={fetchPriority}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default CloudinaryImage;
