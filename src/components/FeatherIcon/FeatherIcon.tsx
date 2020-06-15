import { HTMLDivProps } from '@blueprintjs/core';
import * as classNames from 'classnames';
import { icons } from 'feather-icons';
import * as React from 'react';
import { FeatherAttributes, IconName } from '../../common/feather-icons';
import './FeatherIcon.scss';

interface FeatherIconProps extends HTMLDivProps, FeatherAttributes {
  icon: IconName;
  display?: 'inline' | 'block';
}

export class FeatherIcon extends React.Component<FeatherIconProps> {
  render() {
    const featherProps = this.props as Pick<FeatherIconProps, keyof FeatherAttributes>;
    const { className, display, ...otherProps } = this.props as Omit<
      FeatherIconProps,
      keyof FeatherAttributes
    >;
    return (
      <div
        className={classNames('feather-icon', className)}
        style={{ display: display ?? undefined }}
        dangerouslySetInnerHTML={{
          // icon is a DOM string, so we set it this way
          __html: icons[this.props.icon].toSvg({
            class: 'bp3-icon',
            ...featherProps,
          }),
        }}
        {...otherProps}
      ></div>
    );
  }
}
