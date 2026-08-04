import logo from '@flairpay/assets/images/logo.png';
import { cn } from '../utils/cn';

interface ILogo {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  width?: string;
  height?: string;
  withText?: boolean;
  className?: string;
  textClassName?: string;
}

const sizeMap = {
  sm: { image: 'h-6 w-6', text: 'text-sm font-semibold' },
  md: { image: 'h-8 w-8', text: 'text-lg font-bold' },
  lg: { image: 'h-10 w-10', text: 'text-xl font-bold' },
  xl: { image: 'h-12 w-12', text: 'text-2xl font-bold' },
  xxl: { image: 'h-14 w-14', text: 'text-2xl font-bold' },
  '2xl': { image: 'h-16 w-16', text: 'text-3xl font-extrabold' },
  '3xl': { image: 'h-20 w-20', text: 'text-4xl font-extrabold' },
  '4xl': { image: 'h-24 w-24', text: 'text-5xl font-extrabold' },
  '5xl': { image: 'h-28 w-28', text: 'text-6xl font-extrabold' },
  '6xl': { image: 'h-32 w-32', text: 'text-7xl font-extrabold' },
  '7xl': { image: 'h-36 w-36', text: 'text-8xl font-extrabold' },
  '8xl': { image: 'h-40 w-40', text: 'text-9xl font-extrabold' },
  '9xl': { image: 'h-48 w-48', text: 'text-9xl font-extrabold' },
};

const Logo = ({
  size = 'sm',
  width,
  height,
  withText = true,
  className,
  textClassName,
}: ILogo) => {
  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <img
        src={logo}
        alt="FlairPay logo"
        className={cn(
          "object-contain transition-transform duration-200 hover:scale-105",
          !width && !height && currentSize.image
        )}
        style={{
          width: width,
          height: height,
        }}
      />
      {withText && (
        <span
          className={cn(
            "font-sans text-primary tracking-tight font-bold",
            currentSize.text,
            textClassName
          )}
        >
          FlairPay
        </span>
      )}
    </div>
  );
};

export default Logo;