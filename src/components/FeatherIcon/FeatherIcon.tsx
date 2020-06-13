import { HTMLDivProps } from '@blueprintjs/core';
import * as classNames from 'classnames';
import { icons } from 'feather-icons';
import * as React from 'react';
import { FeatherAttributes, IconName } from '../../common/feather-icons';

interface FeatherIconProps extends HTMLDivProps, FeatherAttributes {
  icon: IconName;
}

export class FeatherIcon extends React.Component<FeatherIconProps> {
  render() {
    const featherProps = this.props as Pick<FeatherIconProps, keyof FeatherAttributes>;
    const { className, ...otherProps } = this.props as Omit<
      FeatherIconProps,
      keyof FeatherAttributes
    >;
    return (
      <div
        className={classNames("feather-icon-class", className)}
        dangerouslySetInnerHTML={{
          // icon is a DOM string, so we set it this way
          __html: icons[this.props.icon].toSvg({
            class: 'bp3-icon',
            ...featherProps,
            color: this.props.color || '#5c7080',
          }),
        }}
        {...otherProps}
      ></div>
    );
  }
}
