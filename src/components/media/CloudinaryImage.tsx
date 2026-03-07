import { AdvancedImage } from '@cloudinary/react';
import { useMemo } from 'react';
import { buildCloudinaryImage } from '@/lib/cloudinary';

type CloudinaryImageProps = {
  publicId: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
};

const CloudinaryImage = ({
  publicId,
  width,
  height,
  className,
  alt = '',
  loading = 'lazy',
}: CloudinaryImageProps) => {
  const cldImg = useMemo(() => buildCloudinaryImage(publicId, { width, height }), [publicId, width, height]);
  return <AdvancedImage cldImg={cldImg} className={className} alt={alt} loading={loading} />;
};

export default CloudinaryImage;
