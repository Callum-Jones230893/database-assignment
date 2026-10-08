import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';

const baseStyle = isWeb
  ? 'flex justify-between z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent text-decoration-none p-10'
  : '';

export const boxStyle = tva({
  base: baseStyle,
});
