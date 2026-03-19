import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/animation/Reveal';
import PageHero from '@/components/layout/PageHero';
import ShopCartPanel from '@/components/cart/ShopCartPanel';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import SEOMeta from '@/components/SEOMeta';
import { useCartStore } from '@/stores/cartStore';

const styles = ['All', 'Abstract', 'Landscape', 'Portrait', 'Still Life', 'Modern'];
const sizes = ['All', 'Small', 'Medium', 'Large'];

const normalizeStyle = (value: string | null) => {
  if (!value) return 'All';
  const match = styles.find((style) => style.toLowerCase() === value.toLowerCase());
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
  const hasCartItems = useCartStore((state) => state.items.length > 0);

  useEffect(() => {
    const nextStyle = normalizeStyle(searchParams.get('style'));
    setStyle((currentStyle) => (currentStyle === nextStyle ? currentStyle : nextStyle));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query),
      );
    }

    if (style !== 'All') {
      result = result.filter((product) => product.style.toLowerCase() === style.toLowerCase());
    }

    if (size !== 'All') {
      result = result.filter((product) => product.size.toLowerCase() === size.toLowerCase());
    }

    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    if (inStockOnly) {
      result = result.filter((product) => product.stock > 0);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [inStockOnly, priceRange, search, size, sort, style]);

  const hasActiveFilters =
    search.length > 0 ||
    style !== 'All' ||
    size !== 'All' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 5000 ||
    inStockOnly;

  const resetFilters = () => {
    setSearch('');
    setStyle('All');
    setSize('All');
    setPriceRange([0, 5000]);
    setInStockOnly(false);
    setSort('newest');
  };

  const featuredCount = products.filter((product) => product.featured).length;
  const activeFilters = [
    search ? `Search: ${search}` : null,
    style !== 'All' ? `Style: ${style}` : null,
    size !== 'All' ? `Size: ${size}` : null,
    (priceRange[0] !== 0 || priceRange[1] !== 5000)
      ? `Budget: $${priceRange[0]}-$${priceRange[1]}`
      : null,
    inStockOnly ? 'In stock only' : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <SEOMeta
        title="Shop Original Paintings — Browse the Collection"
        description="Browse original hand-painted works by Amulyaa. Filter by style (Abstract, Landscape, Portrait), size, and price. Each piece is a single original — worldwide shipping."
        canonical="/shop"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Amulyaa — Original Paintings Shop',
          url: 'https://www.amulyaa.art/shop',
          description: 'Browse original hand-painted artworks available for purchase.',
        }}
      />
      <PageHero
        eyebrow="Original collection"
        title="Browse the current wall of available works."
        description="Filter by mood, size, and price to find a piece that fits the room and the scale you need."
        stats={[
          { label: 'Available now', value: `${products.length}` },
          { label: 'Featured works', value: `${featuredCount}` },
          { label: 'Styles represented', value: `${styles.length - 1}` },
        ]}
        aside={(
          <div className="surface-panel-muted p-6">
            <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Curator note
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Each piece is a single original. When a work is marked sold out, it is archived rather than reproduced.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="surface-panel bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Best for</p>
                <p className="mt-2 text-sm text-foreground">Living rooms, hospitality suites, and quiet statement corners.</p>
              </div>
              <div className="surface-panel bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Need guidance?</p>
                <p className="mt-2 text-sm text-foreground">Shortlist your favorites, then use the contact page for placement advice.</p>
              </div>
            </div>
          </div>
        )}
      />

      <section className="container px-2 pb-14 md:px-3">
        <div
          className={`grid gap-8 lg:items-start ${
            hasCartItems
              ? 'lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_22rem]'
              : 'lg:grid-cols-[18rem_minmax(0,1fr)]'
          }`}
        >
          <Reveal className="lg:sticky lg:top-28">
            <aside className="surface-panel p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12">
                    <SlidersHorizontal className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Refine the collection</p>
                    <p className="text-sm text-muted-foreground">Adjust mood, scale, and budget.</p>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search paintings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-11"
                  />
                </div>

                <div>
                  <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Style
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Size
                  </Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Budget
                  </Label>
                  <p className="mt-2 text-sm text-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mt-4"
                  />
                </div>

                <div className="surface-panel-muted flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Only show available works</p>
                    <p className="mt-1 text-xs text-muted-foreground">Hide archived sold pieces.</p>
                  </div>
                  <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} id="stock" />
                </div>
              </div>
            </aside>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} painting{filtered.length !== 1 ? 's' : ''} shown
                  </p>
                  {activeFilters.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <span key={filter} className="info-chip">
                          {filter}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest arrivals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to high</SelectItem>
                    <SelectItem value="price-desc">Price: High to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Reveal>

            {filtered.length === 0 ? (
              <div className="surface-panel mt-8 px-6 py-16 text-center">
                <p className="font-serif text-4xl text-foreground">No matches yet.</p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                  Try broadening your filters or resetting the search to see the full collection again.
                </p>
                <Button variant="outline" className="mt-6" onClick={resetFilters}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div
                className={`mt-8 grid gap-6 sm:grid-cols-2 ${
                  hasCartItems ? '2xl:grid-cols-3' : 'xl:grid-cols-3'
                }`}
              >
                {filtered.map((product, index) => (
                  <ShopProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>

          {hasCartItems && (
            <Reveal delay={0.12} className="lg:col-span-2 xl:col-span-1 xl:sticky xl:top-28">
              <ShopCartPanel />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
