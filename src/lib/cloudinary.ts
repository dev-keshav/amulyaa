import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const fallbackCloudName = 'dqe88bfds';
const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || fallbackCloudName).trim();

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName,
  },
});

type ImageOptions = {
  width?: number;
  height?: number;
};

export const buildCloudinaryImage = (publicId: string, options: ImageOptions = {}) => {
  const image = cloudinary.image(publicId).format('auto').quality('auto');
  if (options.width || options.height) {
    const resizeAction = auto().gravity(autoGravity());
    if (options.width) resizeAction.width(options.width);
    if (options.height) resizeAction.height(options.height);
    image.resize(resizeAction);
  }
  return image;
};

export const buildCloudinaryUrl = (publicId: string, options: ImageOptions = {}) =>
  buildCloudinaryImage(publicId, options).toURL();
