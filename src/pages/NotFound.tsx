import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <PageHero
      compact
      centered
      eyebrow="404"
      title="This page is not part of the current collection."
      description="The link may be outdated, or the route may have been moved."
      actions={(
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/92">
          <Link to="/">Return home</Link>
        </Button>
      )}
    />
  );
};

export default NotFound;
