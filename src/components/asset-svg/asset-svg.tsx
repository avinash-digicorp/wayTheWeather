import React from 'react';
import {SvgXml} from 'react-native-svg';
import {hasValue} from 'utils/condition';
import {ButtonView} from '@/components';
import {View} from 'react-native';
import {ASSET_SVGS} from './svg-icons';
import {AssetSvgProps} from './type.d';

export const AssetSvg = (props: AssetSvgProps) => {
  const {
    hide = false,
    preserveAspectRatio,
    name,
    fill,
    width = 22,
    height,
    style,
    buttonViewProps,
    viewProps,
  } = props;
  if (hide || !name) return <React.Fragment />;
  const icon = ASSET_SVGS?.[name as keyof typeof ASSET_SVGS];
  const Container = buttonViewProps ? ButtonView : View;

  return (
    <Container {...viewProps} {...buttonViewProps}>
      <SvgXml
        preserveAspectRatio={preserveAspectRatio}
        xml={icon}
        width={width}
        {...(hasValue(height) && {height})}
        stroke={fill}
        style={style}
      />
    </Container>
  );
};
