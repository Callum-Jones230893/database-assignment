import React from 'react';
import { headerBoxStyle } from './styles';

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';

type IBoxProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof headerBoxStyle> & { className?: string };

const HeaderBox = React.forwardRef<HTMLDivElement, IBoxProps>(function Box(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} className={headerBoxStyle({ class: className })} {...props} />
  );
});

HeaderBox.displayName = 'HeaderBox';
export { HeaderBox };
