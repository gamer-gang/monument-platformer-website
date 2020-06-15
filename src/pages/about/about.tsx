import {
  H1,
  H2,
  H3,
  H5,
  HTMLDivProps,
  Tab,
  Tabs,
  UL,
  Callout,
  H4,
  Button,
} from '@blueprintjs/core';
import * as React from 'react';
import './about.scss';

export class About extends React.Component {
  render() {
    return (
      <>
        {/* <main> */}
        <H1>About</H1>
        <H2 className="subtitle">Details and information</H2>
        <AboutTabs />
        {/* </main> */}

        {/* <Footer /> */}
      </>
    );
  }
}

const AboutTabs = () => (
  <Tabs vertical animate className="content-section" renderActiveTabPanelOnly>
    <Tab id="general-top" title="About" panel={<GeneralPanels.Top />} />
    <H5>Development</H5>
    <Tab id="devel-sources" title="Sources" panel={<DevelPanels.Sources />} />
    {/* <Tab id="devel-structure" title="Structure" panel={<DevelPanels.Structure />} />
    <Tab id="devel-mechanics" title="Mechanics" panel={<DevelPanels.Mechanics />} />
    <Tab id="devel-product" title="Product" panel={<DevelPanels.Product />} /> */}

    <H5>Capstone</H5>
    <Tab id="capstone-question" title="Question" panel={<CapstonePanels.Question />} />
    {/* <Tab id="capstone-hypothesis" title="Hypothesis" panel={<CapstonePanels.Hypothesis />} /> */}
    <Tab id="capstone-data" title="Data" panel={<CapstonePanels.Data />} />
    <Tab
      id="capstone-professionals"
      title="Professionals"
      panel={<CapstonePanels.Professionals />}
    />
    <Tab id="capstone-conclusion" title="Conclusion" panel={<CapstonePanels.Conclusion />} />

    <Tabs.Expander />

    <Tab id="general-about-us" title="About Us" panel={<GeneralPanels.AboutUs />} />
  </Tabs>
);

const Panel = (props: HTMLDivProps) => <div className="panel">{props.children}</div>;
Panel.Section = (props: HTMLDivProps) => (
  <section className="panel-section">{props.children}</section>
);

const GeneralPanels = {
  Top: () => (
    <Panel>
      <Panel.Section>
        <H3>About Monument Platformer</H3>
        <p>Monument Platfromer is our first mobile app/game. It is written in Dart.</p>
        <br /><br />
        <em>Screenshot coming soon</em>
      </Panel.Section>
    </Panel>
  ),
  _aboutUsText: 'Show email',
  AboutUs: () => {
    const [state, setState] = React.useState({
      emailButton1: (email: string) => {
        setState((prevState) => {
          return {
            ...prevState,
            emailButton1: () => state.mailto(email),
            emailText1: email,
          }
        })
      },
      emailButton2: (email: string) => {
        setState((prevState) => {
          return {
            ...prevState,
            emailButton2: () => state.mailto(email),
            emailText2: email,
          }
        })
      },
      mailto: (email: string) => window.open(`maito:${email}`),
      emailText1: 'Show email',
      emailText2: 'Show email'
    });
    return (
      <Panel>
        <Panel.Section>
          <H3>About Us</H3>
        </Panel.Section>
        <Panel.Section>
          <H4>wiisportsresort</H4>
          <Button
            dangerouslySetInnerHTML={{ __html: state.emailText1 }}
            onClick={() => state.emailButton1('devdoge1@gmail.com')}
          >
            {state.emailText1}
          </Button><br /><br />
          <p>I program things.</p>
        </Panel.Section>

        <Panel.Section>
          <H4>notrealn</H4>
          <Button
            dangerouslySetInnerHTML={{ __html: state.emailText2 }}
            onClick={() => state.emailButton2('notrealnobodey@gmail.com')}
          >
            {state.emailText2}
          </Button><br /><br />
          <p>I also code.</p>
        </Panel.Section>
      </Panel>
    );
  },
};

const DevelPanels = {
  Default: () => <div>devel panel</div>,
  Sources: () => (
    <Panel>
      <Panel.Section>
        <H3>Sources</H3>
        <p>These are some sources we used:</p>
        <UL>
          <li>
            <a href="https://flutter.dev/">Flutter documentation</a>
          </li>
          <li>
            <a href="https://flame-engine.org/">Flame documentation</a>
          </li>
          <li>
            <a href="https://dart.dev/">Dart documentation</a>
          </li>
          <li>
            <a href="https://jap.alekhin.io/create-mobile-game-flutter-flame-beginner-tutorial">
              Flame tutorial
            </a>
          </li>
        </UL>
        <p>
          Flutter and Flame are both libraries we used to create our game.{' '}
          <a href="https://en.wikipedia.org/wiki/Programming_language">Dart</a> is the programming
          language Flutter is written in and what we used to make our game.{' '}
        </p>
      </Panel.Section>
    </Panel>
  ),
  Structure: () => (
    <Panel>
      <Panel.Section>
        <H3>Structure</H3>
      </Panel.Section>
    </Panel>
  ),
  Mechanics: () => (
    <Panel>
      <Panel.Section>
        <H3>Mechanics</H3>
      </Panel.Section>
    </Panel>
  ),
  Product: () => (
    <Panel>
      <Panel.Section>
        <H3>Product</H3>
      </Panel.Section>
    </Panel>
  ),
};

const CapstonePanels = {
  Question: () => (
    <Panel>
      <Panel.Section>
        <H3>Testable Question</H3>

        <Callout style={{ fontWeight: 600 }}>
          How can one develop, test, and maintain a cross-platform 2D platformer game while
          including backend infrastructure for data management between devices while updating it
          with new features and bug fixes based on user feedback?
        </Callout>

        <p>In simpler terms, we are:</p>
        <UL>
          <li>Developing a cross-platform game (testing various methods, frameworks, etc.)</li>
          <li>Testing, debugging, and iterating over the design and structure of the game</li>
          <li>Publishing the game to some marketplace</li>
          <li>Updating it based on ratings and reviews</li>
        </UL>
      </Panel.Section>

      <Panel.Section>
        <H3>Goals</H3>

        <p>
          At the end of the project, we should have a completed game that is both engaging and
          performant.
        </p>
        <p>
          The app and source code should be available to the public, and the source code should be
          at least partially readable and documented.
        </p>
      </Panel.Section>
    </Panel>
  ),
  Hypothesis: () => (
    <Panel>
      <Panel.Section>
        <H3>Initial Hypothesis</H3>
      </Panel.Section>
    </Panel>
  ),
  Data: () => (
    <Panel>
      <Panel.Section>
        <H3>Data Collection</H3>
        <p>There are a few sources of data for this project:</p>
        <UL>
          <li># of commits</li>
          <li># of lines of code</li>
          <li># and content of reviews</li>
        </UL>
        <p>
          Luckily, GitHub automatically tracks some of these stats when you push code to a
          repository. Here is the graph of commits (as of 6/15/20):
        </p>
        <img src="/gh-commits.png" alt="Code frequency graph" />

        <p>And code frequency (as of 6/15/20):</p>
        <img src="/gh-code-freq.png" alt="Code frequency graph" />
      </Panel.Section>
      <Panel.Section>
        <H3>Analysis</H3>
      </Panel.Section>
    </Panel>
  ),
  Professionals: () => (
    <Panel>
      <Panel.Section>
        <H3>Professional Contact</H3>
      </Panel.Section>
      <p>
        Throughout our capstone project, we have contacted 2 professionals. One is a developer for
        flutter, and the other a developer and user of the flame game engine.
      </p>
      <img src="/professional-req.png" alt="Email to professional" />
      <p>This was our email sent to one flutter develpoer. His response is in the image below.</p>
      <img src="/professional-res.png" alt="Response from professional" />
    </Panel>
  ),
  Conclusion: () => (
    <Panel>
      <Panel.Section>
        <H3>Conclusion</H3>
        <p>
          Capstone was a fun year long project. It was a great learning experience. We learned how
          to code in another language. We have reached most of our goals for this project. In total,
          we have written about <strong>5,000</strong> lines of code.
        </p>

        <p>
          Next, we will probably add more levels and content to our game and possibly make it less
          buggy.
        </p>

        <p>
          Questions, suggestions, and everything else can be sent to us at our GitHub contact emails
          or on the repository itself.
        </p>
      </Panel.Section>
    </Panel>
  ),
};
