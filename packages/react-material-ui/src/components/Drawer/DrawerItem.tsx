import React, { FC } from 'react';
import { DrawerButton, DrawerButtonProps } from './Styles';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type DrawerItemProps = {
  id?: string;
  component?: React.ReactNode;
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode);
  text?: string;
  onClick?: () => void;
  textProps?: TextProps;
} & DrawerButtonProps;

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const {
    icon,
    text,
    active,
    collapsed,
    onClick,
    textProps = {
      fontSize: 12,
      fontWeight: 400,
      color: 'common.white',
    },
    sx,
    horizontal,
    iconColor,
    activeIconColor,
  } = props;

  const handleClick = () => {
    return onClick?.();
  };

  return (
    <DrawerButton
      active={active}
      collapsed={collapsed}
      onClick={handleClick}
      sx={sx}
      horizontal={horizontal}
      iconColor={iconColor}
      activeIconColor={activeIconColor}
    >
      {typeof icon === 'function' ? icon(!!active) : icon}
      {text && <Text {...textProps}>{text}</Text>}
    </DrawerButton>
  );
};

export default DrawerItem;
