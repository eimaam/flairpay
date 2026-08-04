import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@flairpay/shared';

const inputVariants = cva(
  '!bg-transparent !shadow-none !border !transition-all !w-full !flex !items-center focus:!shadow-none focus-within:!shadow-none focus:!outline-none focus:!ring-2 focus:!ring-primary/20 focus-visible:outline-hidden disabled:!bg-surface-dim disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          '!border-outline-variant !text-on-surface focus:!border-primary hover:!border-primary/50 focus-within:!border-primary focus:!ring-primary/20 focus-within:!ring-primary/20',
        filled:
          '!border-0 !bg-surface-container !text-on-surface focus:!bg-surface-container-lowest focus-within:!bg-surface-container-lowest focus:!ring-primary/20 focus-within:!ring-primary/20',
        outline:
          '!border-2 !border-outline !text-on-surface focus:!border-primary focus-within:!border-primary focus:!ring-primary/20 focus-within:!ring-primary/20',
      },
      size: {
        default: '!h-10 md:!h-11 lg:!h-12 !px-3.5',
        sm: '!h-[38px] !px-3 !text-xs',
        lg: '!h-14 !px-4 !text-base',
      },
      radius: {
        sm: '!rounded-sm',
        md: '!rounded-md',
        lg: '!rounded-lg',
        xl: '!rounded-xl',
        full: '!rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'sm',
    },
  }
);

interface InputProps
  extends Omit<AntInputProps, 'size' | 'variant'>,
    VariantProps<typeof inputVariants> {
  animate?: boolean;
}

const InputComponent = forwardRef<any, InputProps>(
  ({ className, variant, size, radius, animate = true, ...props }, ref) => {
    const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';
    const shouldAnimate = animate && !props.disabled;

    return (
      <motion.div
        className={cn(inputVariants({ variant, size, radius, className }))}
        whileFocus={shouldAnimate ? { scale: 1.005 } : undefined}
        transition={{ duration: 0.15 }}
      >
        <AntInput
          size={antSize}
          ref={ref}
          className="!bg-transparent !border-0 !shadow-none !p-0 !w-full focus:!shadow-none focus:!outline-none focus:!ring-0 [&_.ant-input]:!bg-transparent [&_.ant-input]:!text-on-surface"
          {...props}
        />
      </motion.div>
    );
  }
);

InputComponent.displayName = 'Input';

const Password = forwardRef<any, InputProps>(
  ({ className, variant, size, radius, animate = true, ...props }, ref) => {
    const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';
    const shouldAnimate = animate && !props.disabled;

    return (
      <motion.div
        className={cn(inputVariants({ variant, size, radius, className }))}
        whileFocus={shouldAnimate ? { scale: 1.005 } : undefined}
        transition={{ duration: 0.15 }}
      >
        <AntInput.Password
          size={antSize}
          ref={ref}
          className="!bg-transparent !border-0 !shadow-none !p-0 !w-full focus:!shadow-none [&_.ant-input]:!bg-transparent [&_.ant-input]:!text-on-surface [&_.ant-input-password-icon]:!text-on-surface-variant"
          {...props}
        />
      </motion.div>
    );
  }
);
Password.displayName = 'Input.Password';

const TextArea = forwardRef<any, any>(
  ({ className, variant, radius, ...props }, ref) => {
    return (
      <AntInput.TextArea
        className={cn(
          inputVariants({ variant, radius, className }),
          '!h-auto !py-2 [&_.ant-input]:!text-on-surface'
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'Input.TextArea';

type CompoundedInput = typeof InputComponent & {
  Password: typeof Password;
  TextArea: typeof TextArea;
};

const Input = InputComponent as CompoundedInput;
Input.Password = Password;
Input.TextArea = TextArea;

export { Input, inputVariants };
