import { AnchorButton, Callout, H1, H4, H5, Pre, Code } from '@blueprintjs/core';
import * as React from 'react';
import { FeatherIcon, Footer } from '../../components';
import './downloads.scss';
import axios from 'axios';

const VERSION_URL =
  'https://raw.githubusercontent.com/gamer-gang/monument-platformer-website/master/version.json';

interface Version {
  major: number;
  minor: number;
  patch: number;
}

interface Versions {
  master: Version;
  apk: Version;
  website: Version;
}

let versionCache: { versions?: Versions } = {};

async function getVersions() {
  if (versionCache.versions) return versionCache.versions;

  const res = await axios.get(VERSION_URL);

  const versions = res.data as Versions;

  versionCache = { versions };

  return versions;
}

function versionString(ver: Version) {
  if (!ver) return '';

  return ` (${ver.major}.${ver.minor}.${ver.patch})`;
}

export class Downloads extends React.Component {
  state: { versions?: Versions } = {};

  constructor(props) {
    super(props);
    getVersions().then(versions => this.setState({ versions }));
  }
  render() {
    return (
      <>
        {/* <main> */}
          <section className="download-section">
            <H1>Downloads</H1>
            <H4 className="subtitle">Download app!!!!!</H4>
            <H5>Source</H5>
            <Callout
              intent="warning"
              title="Unstable code"
              icon={<FeatherIcon icon="alert-triangle" />}
            >
              Be warned: code from <Code>master</Code> may be extremely buggy or unstable.
            </Callout>

            <p>
              The source code for Monument Platformer can be found on GitHub (see icon at top). You
              will need Git to clone it to your computer.
            </p>
            <p>
              Alternatively, you can download a zip file of the <Code>master</Code> branch here.
            </p>
            <AnchorButton
              icon={<FeatherIcon icon="arrow-down" />}
              intent="primary"
              href="https://github.com/gamer-gang/monument-platformer/archive/master.zip"
              rel="noreferrer"
              target="_blank"
            >
              Download .zip
              {this.state.versions?.master && versionString(this.state.versions?.master)}
            </AnchorButton>
          </section>
          <section className="download-section">
            <H5>Precompiled Binaries</H5>

            <p>
              Every so often, the code will be built as an APK and uploaded here, when the code is
              somewhat stable. Note that the version of the app might be behind <Code>master</Code>.
            </p>

            <AnchorButton
              icon={<FeatherIcon icon="arrow-down" />}
              intent="primary"
              disabled
              // onClick={goto('https://github.com/gamer-gang/monument-platformer/archive/master.zip')}
            >
              Download .apk
              {this.state.versions?.apk && versionString(this.state.versions?.apk)}
            </AnchorButton>
          </section>
        {/* </main> */}
        {/* <Footer /> */}
      </>
    );
  }
}
