import { H1, H2, Button } from '@blueprintjs/core';
import * as React from 'react';
import { renderApp } from '../../common/utils';
import { BaseApp } from '../../components';
import './index.scss';

const Content = () => <></>;

function About() {
  return (
    <BaseApp title="This is website">
      <Button>about page!!!!!!!</Button>
    </BaseApp>
  );
}

renderApp(<About />);
