import { Button, H3, Navbar, Tooltip, ButtonGroup, AnchorButton } from '@blueprintjs/core';
import * as React from 'react';
import { FeatherIcon } from '..';
import './AppBar.scss';
import { goto, renderApp } from '../../common/util';
import { NavLink } from 'react-router-dom';

interface AppBarProps {
  title: string;
}

export class AppBar extends React.Component<AppBarProps> {
  render() {
    return (
      <>
        <div id="top"></div>
        <Navbar fixedToTop className="app-bar">
          <Navbar.Group align="left">
            <Navbar.Heading>
              <H3 style={{ marginBottom: 0 }}>{this.props.title}</H3>
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align="right" className="app-bar-buttons">
            <ButtonGroup>
              <Tooltip content="Home">
                <NavLink exact to="/">
                  <Button aria-label="Home" icon={<FeatherIcon icon="home" />} />
                </NavLink>
              </Tooltip>
              <Tooltip content="About">
                <NavLink to="/about">
                  <Button aria-label="About" icon={<FeatherIcon icon="info" />} />
                </NavLink>
              </Tooltip>
              <Tooltip content="Downloads">
                <NavLink to="/downloads">
                  <Button aria-label="Downloads" icon={<FeatherIcon icon="download" />} />
                </NavLink>
              </Tooltip>
            </ButtonGroup>
            <Tooltip
              content={
                <span>
                  GitHub{' '}
                  <FeatherIcon icon="external-link" height={18} width={18} />
                </span>
              }
            >
              <AnchorButton
                aria-label="GitHub repository"
                href="https://github.com/gamer-gang/monument-platformer"
                rel="noreferrer"
                target="_blank"
                icon={<FeatherIcon icon="github" />}
              />
            </Tooltip>
          </Navbar.Group>
        </Navbar>
      </>
    );
  }
}
