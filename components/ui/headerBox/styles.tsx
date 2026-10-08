import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';

const baseStyle = isWeb
  ? 'flex justify-between z-0 border-b-2 bg-transparent p-10'
  : '';

export const headerBoxStyle = tva({
  base: baseStyle,
});
