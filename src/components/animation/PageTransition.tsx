import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variant = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

const PageTransition = ({ children, className }: PageTransitionProps) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variant}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className={cn('min-h-full will-change-transform', className)}
  >
    {children}
  </motion.div>
);

export default PageTransition;
