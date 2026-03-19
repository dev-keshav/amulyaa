import { motion } from 'framer-motion';
import AmulyaaLogo from '@/components/AmulyaaLogo';

type PageLoaderProps = {
  label?: string;
};

const PageLoader = ({ label = 'Loading collection' }: PageLoaderProps) => (
  <div className="container px-2 pb-16 pt-10 md:px-3 md:pb-20 md:pt-14">
    <div
      className="surface-panel flex min-h-[52vh] items-center justify-center px-6 py-16 md:px-10"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
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
    </div>
  </div>
);

export default PageLoader;
