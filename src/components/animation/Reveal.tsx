import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

const Reveal = ({ children, delay = 0, className, y = 24 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={cn('will-change-transform', className)}
  >
    {children}
  </motion.div>
);

export default Reveal;
