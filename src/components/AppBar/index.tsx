import { Button, H3, Navbar } from '@blueprintjs/core';
import * as React from 'react';
import { FeatherIcon } from '..';
import './index.scss';

const goto = (url: string) => () => (location.href = url);

interface AppBarProps {
  title: string;
}

export class AppBar extends React.Component<AppBarProps> {
  render() {
    return (
      <Navbar fixedToTop className="app-bar">
        <Navbar.Group align="left">
          <Navbar.Heading>
            <H3 style={{ marginBottom: 0 }}>{this.props.title}</H3>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align="right" className="app-bar-buttons">
          <Button onClick={goto('/')} title="Home">
            <FeatherIcon icon="home" />
          </Button>
          <Button onClick={goto('/about')} title="About">
            <FeatherIcon icon="info" />
          </Button>
          <Button onClick={goto('/downloads')} title="Downloads">
            <FeatherIcon icon="download" />
          </Button>
          <Button
            onClick={goto('https://github.com/gamer-gang/monument-platformer')}
            title="GitHub repository"
          >
            <FeatherIcon icon="github" />
          </Button>
        </Navbar.Group>
      </Navbar>
    );
  }
}
