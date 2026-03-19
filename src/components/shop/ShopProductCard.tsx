import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import ProductCardActions from '@/components/shop/ProductCardActions';

type ShopProductCardProps = {
  product: Product;
  index: number;
};

const ShopProductCard = ({ product, index }: ShopProductCardProps) => {
  return (
    <motion.article
      className="surface-panel card-hover group relative h-full p-3"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <ProductCardActions product={product} />

      <Link to={`/shop/${product.slug}`} className="flex h-full flex-col">
        <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
          <CloudinaryImage
            publicId={product.images[0]}
            width={800}
            height={1000}
            alt={product.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="gap-4 px-2 pb-2 pt-5">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground">
              {product.title}
            </h3>
          </div>
          <div className="shrink-0 mt-2">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background:
                  'linear-gradient(135deg, hsl(22 82% 50% / 0.12) 0%, hsl(28 90% 58% / 0.09) 100%)',
                border: '1px solid hsl(22 82% 50% / 0.22)',
                color: 'hsl(22 68% 36%)',
              }}
            >
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ShopProductCard;
