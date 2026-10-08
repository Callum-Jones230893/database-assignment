import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';
const baseStyle = isWeb ? 'flex flex-col relative z-0' : '';

export const cardStyle = tva({
  base: `${baseStyle} flex-col items-center bg-card border border-border rounded-xl shadow-sm`,
  variants: {
    size: {
      lg: 'p-6',
      default: 'w-4/5 my-5 p-4 gap-6',
      sm: 'p-3 gap-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
