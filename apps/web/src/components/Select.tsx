import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@flairpay/shared';

const selectVariants = cva(
  '!w-full !transition-all focus-within:!ring-2 focus-within:!ring-primary/20 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selector]:!h-full [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selection-search-input]:!h-full [&_.ant-select-selection-placeholder]:!text-on-surface-variant/60 [&_.ant-select-selection-item]:!text-on-surface',
  {
    variants: {
      variant: {
        default:
          '!border !border-outline-variant hover:!border-primary/50 focus-within:!border-primary',
        filled:
          '!border-0 !bg-surface-container hover:!bg-surface-container-high focus-within:!bg-surface-container-lowest focus-within:!border !border-primary/20',
        outline:
          '!border-2 !border-outline focus-within:!border-primary',
      },
      size: {
        default: '!h-10 md:!h-11 lg:!h-12 [&_.ant-select-selector]:!px-3.5',
        sm: '!h-[38px] [&_.ant-select-selector]:!px-3 !text-xs',
        lg: '!h-14 [&_.ant-select-selector]:!px-4 !text-base',
      },
      radius: {
        sm: '!rounded-sm [&_.ant-select-selector]:!rounded-sm',
        md: '!rounded-md [&_.ant-select-selector]:!rounded-md',
        lg: '!rounded-lg [&_.ant-select-selector]:!rounded-lg',
        xl: '!rounded-xl [&_.ant-select-selector]:!rounded-xl',
        full: '!rounded-full [&_.ant-select-selector]:!rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'sm',
    },
  }
);

interface SelectProps
  extends Omit<AntSelectProps, 'size' | 'variant'>,
    VariantProps<typeof selectVariants> {}

const SelectComponent = forwardRef<any, SelectProps>(
  ({ className, variant, size, radius, popupClassName, ...props }, ref) => {
    return (
      <AntSelect
        className={cn(selectVariants({ variant, size, radius, className }))}
        popupClassName={cn(
          '!bg-surface-container-lowest !border !border-outline-variant !rounded-md !shadow-lg [&_.ant-select-item]:!text-on-surface [&_.ant-select-item-option-selected]:!bg-primary/10 [&_.ant-select-item-option-selected]:!text-primary [&_.ant-select-item-option-active]:!bg-surface-container-low',
          popupClassName
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

SelectComponent.displayName = 'Select';

const Option = AntSelect.Option;

type CompoundedSelect = typeof SelectComponent & {
  Option: typeof Option;
};

const Select = SelectComponent as CompoundedSelect;
Select.Option = Option;

export { Select, selectVariants };
