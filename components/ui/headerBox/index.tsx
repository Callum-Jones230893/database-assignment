import React from 'react';
import { View, ViewProps } from 'react-native';

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { headerBoxStyle } from './styles';

type IBoxProps = ViewProps &
  VariantProps<typeof headerBoxStyle> & { className?: string };

const HeaderBox = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  function HeaderBox({ className, ...props }, ref) {
    return (
      <View ref={ref} {...props} className={headerBoxStyle({ class: className })} />
    );
  }
);

HeaderBox.displayName = 'HeaderBox';
export { HeaderBox };
