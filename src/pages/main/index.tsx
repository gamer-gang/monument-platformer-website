import { H1, H2 } from '@blueprintjs/core';
import * as React from 'react';
import { renderApp } from '../../common/utils';
import { BaseApp } from '../../components';
import './index.scss';

const Header = () => (
  <>
    <header>
      <img src="https://cdn.discordapp.com/attachments/360228988477636621/719672599415881879/4fOGapweU0CcAAAAASUVORK5CYII.png" />
      <H1>Monument Platformer</H1>
      <H2 className="subtitle">
        A simple platformer game built with the Flame game engine, Flutter, and pure gamer skill.
      </H2>
    </header>
  </>
);

const Content = () => <></>;

function Home() {
  return (
    <BaseApp title="This is website">
      <Header />
      <Content />
    </BaseApp>
  );
}

renderApp(<Home />);
