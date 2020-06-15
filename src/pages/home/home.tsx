import { H1, H2 } from '@blueprintjs/core';
import * as React from 'react';
import './home.scss';
import { Footer } from '../../components';

const Content = () => <></>;

export class Home extends React.Component {
  render() {
    return (
      <>
        {/* <main> */}
          <header>
            <img
              src="https://cdn.discordapp.com/attachments/360228988477636621/719672599415881879/4fOGapweU0CcAAAAASUVORK5CYII.png"
              alt="Game logo"
            />
            <H1>Monument Platformer</H1>
            <H2 className="subtitle">
              A simple platformer game built with the Flame game engine, Flutter, and pure gamer
              skill.
            </H2>
          </header>
          <Content />
        {/* </main> */}
        {/* <Footer /> */}
      </>
    );
  }
}
