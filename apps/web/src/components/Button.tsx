import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@flairpay/shared';

const MotionAntButton = motion.create(AntButton);

const buttonStyles = cva(
  '!bg-transparent !font-sans rounded-2xl! !shadow-none !flex !items-center !justify-center !gap-2 !font-medium !transition-colors focus:!outline-none focus:!ring-2 focus:!ring-primary/30 focus-visible:outline-hidden focus:ring-offset-2 disabled:pointer-events-none disabled:!cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          '!bg-primary !text-on-primary !border-0 hover:!bg-primary-hover active:!bg-primary-active hover:!text-on-primary',
        destructive: '!bg-error !text-on-error !border-0 hover:!bg-error/90',
        outline:
          '!border !border-outline-variant !bg-transparent !text-on-surface hover:!bg-surface-container hover:!text-on-surface',
        secondary:
          '!bg-surface-container !text-on-surface hover:!bg-surface-container-high !border-0',
        ghost:
          '!border-0 !shadow-none hover:!bg-surface-container !text-on-surface-variant',
        link: '!text-primary !border-0 !shadow-none underline-offset-4 hover:underline !bg-transparent',
        filled: '!bg-surface !text-on-surface hover:!bg-surface-container !border-0',
      },
      size: {
        default: 'min-h-10! md:min-h-11! lg:min-h-12! px-4! py-2.5! md:py-3!',
        sm: 'h-[38px]! !px-4 !text-xs',
        lg: '!h-15 !px-8 text-sm!',
        icon: '!h-10 !w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      radius: {
        sm: '!rounded-sm',
        md: '!rounded-md',
        lg: '!rounded-lg',
        xl: 'rounded-xl!',
        full: '!rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      radius: 'sm',
    },
  },
);

export interface ButtonProps
  extends Omit<AntButtonProps, 'size' | 'variant'>,
    VariantProps<typeof buttonStyles> {
  className?: string;
  icon?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  animate?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      icon,
      htmlType = 'button',
      children,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';

    const shouldAnimate = animate && !props.disabled && !props.loading;

    return (
      <MotionAntButton
        className={cn(
          buttonStyles({ variant, size, fullWidth, className }),
        )}
        size={antSize}
        icon={icon}
        htmlType={htmlType}
        ref={ref}
        {...(props as any)}
        whileHover={shouldAnimate ? 'hover' : undefined}
        whileTap={shouldAnimate ? 'tap' : undefined}
        style={variant === 'default' && shouldAnimate ? { position: 'relative', overflow: 'hidden' } : {}}
      >
        {children}
      </MotionAntButton>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonStyles as buttonVariants };
