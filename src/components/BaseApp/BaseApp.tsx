import { H1, H2 } from '@blueprintjs/core';
import * as React from 'react';
import { AppBar, Footer } from '..';

interface BaseAppProps {
  title: string;
}

export class BaseApp extends React.Component<BaseAppProps> {
  render() {
    return (
      <>
        <AppBar title={this.props.title} />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}
