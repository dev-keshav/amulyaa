import { motion } from 'framer-motion';
import AmulyaaLogo from '@/components/AmulyaaLogo';

type PageLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

const LoaderBody = ({ label }: { label: string }) => (
  <div className="flex max-w-sm flex-col items-center text-center">
    <motion.div
      initial={{ opacity: 0.45, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <AmulyaaLogo width={196} />
    </motion.div>

    <motion.div
      className="mt-8 h-[2px] w-36 overflow-hidden bg-border/70"
      initial={false}
    >
      <motion.div
        className="h-full bg-accent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>

    <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
      {label}
    </p>
  </div>
);

const PageLoader = ({ label = 'Loading collection', fullscreen = false }: PageLoaderProps) => {
  if (fullscreen) {
    return (
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center px-4 backdrop-blur-md"
        role="status"
        aria-live="polite"
        aria-label={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          background:
            'linear-gradient(180deg, rgba(16, 10, 7, 0.94) 0%, rgba(24, 14, 9, 0.96) 100%)',
        }}
      >
        <div
          className="flex min-h-[18rem] w-full max-w-xl items-center justify-center border border-white/10 px-6 py-12 md:px-10"
          style={{
            background:
              'linear-gradient(145deg, rgba(30, 19, 14, 0.97) 0%, rgba(52, 31, 20, 0.94) 100%)',
            boxShadow:
              '0 30px 80px -36px rgba(0,0,0,0.82), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <LoaderBody label={label} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container px-2 pb-16 pt-10 md:px-3 md:pb-20 md:pt-14">
      <div
        className="surface-panel flex min-h-[52vh] items-center justify-center px-6 py-16 md:px-10"
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        <LoaderBody label={label} />
      </div>
    </div>
  );
};

export default PageLoader;
