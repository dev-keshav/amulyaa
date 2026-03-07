import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import { products } from '@/data/products';

const styles = ['All', 'Abstract', 'Landscape', 'Portrait', 'Still Life', 'Modern'];
const sizes = ['All', 'Small', 'Medium', 'Large'];

const normalizeStyle = (value: string | null) => {
  if (!value) return 'All';
  const match = styles.find((s) => s.toLowerCase() === value.toLowerCase());
  return match ?? 'All';
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialStyle = normalizeStyle(searchParams.get('style'));

  const [search, setSearch] = useState('');
  const [style, setStyle] = useState(initialStyle);
  const [size, setSize] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const nextStyle = normalizeStyle(searchParams.get('style'));
    setStyle((prevStyle) => (prevStyle === nextStyle ? prevStyle : nextStyle));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }
    if (style !== 'All') result = result.filter((p) => p.style.toLowerCase() === style.toLowerCase());
    if (size !== 'All') result = result.filter((p) => p.size.toLowerCase() === size.toLowerCase());
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (inStockOnly) result = result.filter((p) => p.stock > 0);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [products, search, style, size, priceRange, inStockOnly, sort]);

  return (
    <div className="container py-12 px-4">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Shop Originals</h1>
      <p className="text-muted-foreground mb-10">Browse our collection of handmade paintings.</p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search paintings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {styles.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {sizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider min={0} max={5000} step={50} value={priceRange} onValueChange={(value) => setPriceRange([value[0], value[1]])} className="mt-3" />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} id="stock" />
            <Label htmlFor="stock" className="text-sm">In stock only</Label>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} painting{filtered.length !== 1 ? 's' : ''}</p>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low - High</SelectItem>
                <SelectItem value="price-desc">Price: High - Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No paintings match your filters.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to={`/shop/${p.slug}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <CloudinaryImage
                      publicId={p.images[0]}
                      width={600}
                      height={750}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{p.style}</p>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{p.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">${p.price}</span>
                      {p.stock <= 0 && <span className="text-xs text-destructive font-medium">Sold Out</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
