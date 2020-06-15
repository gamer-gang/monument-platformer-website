import * as React from 'react';
import { Route, BrowserRouter, Switch, useLocation, withRouter } from 'react-router-dom';
import { renderApp } from '../common/util';
import { About } from './about/about';
import { Downloads } from './downloads/downloads';
import { Home } from './home/home';
import { AppBar, Footer } from '../components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface AppProps {
  location?: {
    pathname: string;
    search: string;
    hash: string;
    state: any;
    key: string;
  };
}

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar title="Monument Platformer" />
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.key} classNames="fade" timeout={75}>
          <div className="router-switch">
            <main>
              <Switch location={location}>
                <Route path="/downloads">
                  <Downloads />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />

    </>
  );
}

renderApp(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
