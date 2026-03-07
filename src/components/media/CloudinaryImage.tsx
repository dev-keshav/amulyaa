import { AdvancedImage } from '@cloudinary/react';
import { useMemo, useState } from 'react';
import { buildCloudinaryImage } from '@/lib/cloudinary';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CloudinaryImageProps = {
  publicId: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
};

const CloudinaryImage = ({
  publicId,
  width,
  height,
  className,
  wrapperClassName,
  alt = '',
  loading = 'lazy',
}: CloudinaryImageProps) => {
  const cldImg = useMemo(() => buildCloudinaryImage(publicId, { width, height }), [publicId, width, height]);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative h-full w-full', wrapperClassName)}>
      {!isLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
      <AdvancedImage
        cldImg={cldImg}
        className={cn(
          'h-full w-full transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default CloudinaryImage;
