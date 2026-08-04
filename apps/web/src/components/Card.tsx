import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@flairpay/shared';

const MotionAntCard = motion.create(AntCard);

const cardVariants = cva(
  '!bg-transparent !transition-all !border-0 [&_.ant-card-head]:!border-b [&_.ant-card-head]:!border-outline-variant/30 [&_.ant-card-head-title]:!text-on-surface [&_.ant-card-head-title]:!font-semibold [&_.ant-card-body]:!text-on-surface-variant',
  {
    variants: {
      variant: {
        default:
          '!bg-surface-container-lowest !border !border-outline-variant/30 !shadow-xs',
        filled:
          '!bg-surface-container !border-0',
        outline:
          '!border-2 !border-outline-variant !bg-transparent',
        glass:
          '!bg-surface-container/60 !backdrop-blur-md !border !border-outline-variant/20 !shadow-sm',
        primary:
          '!bg-primary-container !text-on-primary-container [&_.ant-card-head-title]:!text-on-primary-container [&_.ant-card-body]:!text-on-primary-container/80',
        secondary:
          '!bg-secondary-container !text-on-secondary-container [&_.ant-card-head-title]:!text-on-secondary-container [&_.ant-card-body]:!text-on-secondary-container/80',
      },
      radius: {
        sm: '!rounded-sm [&_.ant-card-head]:!rounded-t-sm [&_.ant-card-body]:!rounded-b-sm',
        md: '!rounded-md [&_.ant-card-head]:!rounded-t-md [&_.ant-card-body]:!rounded-b-md',
        lg: '!rounded-lg [&_.ant-card-head]:!rounded-t-lg [&_.ant-card-body]:!rounded-b-lg',
        xl: '!rounded-xl [&_.ant-card-head]:!rounded-t-xl [&_.ant-card-body]:!rounded-b-xl',
      },
      hoverable: {
        true: 'hover:!shadow-md hover:!border-primary/20 cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      radius: 'md',
      hoverable: false,
    },
  }
);

interface CardProps
  extends Omit<AntCardProps, 'variant' | 'hoverable'>,
    VariantProps<typeof cardVariants> {
  animate?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, radius, hoverable, animate = true, ...props }, ref) => {
    const shouldAnimate = animate && hoverable;

    return (
      <MotionAntCard
        className={cn(cardVariants({ variant, radius, hoverable, className }))}
        ref={ref as any}
        {...(props as any)}
        whileHover={shouldAnimate ? { y: -4, scale: 1.01 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
