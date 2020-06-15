import * as React from 'react';
import './Footer.scss';

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-group-left">
          <span>© 2020 gamer-gang</span>
          <span>
            Licensed under {' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
              CC BY 4.0
            </a>
          </span>
        </div>

        <div className="footer-group-right">
          <a href="#top">Go to top</a>
        </div>
      </footer>
    );
  }
}
