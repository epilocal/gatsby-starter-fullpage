import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import ReactFullpage from "../components/fullpage"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "./styles/index.css"


const SEL = 'custom-section';
const SECTION_SEL = `.${SEL}`;

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
// This is no longer required for the scrollOverflow option.
const pluginWrapper = () => {
  /*
  * require('./fullpage.fadingEffect.min'); // Optional. Required when using the "fadingEffect" extension.
  */
};

const MainPage = ({ data, location }) => {
  const originalColors = ['#ff5f45', '#0798ec', '#fc6c7c', '#435b71', 'orange', 'blue', 'purple', 'yellow'];
  const originalFullPages =
    [
      {
        text: 'Section 1',
      },
      {
        text: 'Section 2',
      },
      {
        text: 'Section 3',
      }
    ];
  const [fullPages, setFullPages] = useState([...originalFullPages]);
  const [sectionsColor, setSectionsColor] = useState([...originalColors]);


  const onLeave = (origin, destination, direction) => {
    console.log('onLeave', { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }

  const handleChangeColors = () => {
    const newColors =
      sectionsColor[0] === 'yellow'
        ? [...originalColors]
        : ['yellow', 'blue', 'white'];
    setSectionsColor(newColors);
  }

  const handleAddSection = () => {
    let newFullPages = fullPages;
    newFullPages.push({
      text: `section ${fullPages.length + 1}`,
      id: Math.random(),
    });
    setFullPages([...newFullPages]);
  }

  const handleRemoveSection = () => {
    let newFullPages = fullPages;
    newFullPages.pop();
    setFullPages([...newFullPages]);
  }

  const moveSectionDown = () => {
    if (typeof window !== `undefined`) {
      window.fullpage_api.moveSectionDown();
    }
  }

  if (!fullPages.length) {
    return null;
  }

  const Menu = () => (
    <div
      className="menu"
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 100,
      }}
    >
      <ul className="actions">
        <li>
          <button onClick={() => handleAddSection()}>Add Section</button>
          <button onClick={() => handleRemoveSection()}>
            Remove Section
          </button>
          <button onClick={() => handleChangeColors()}>
            Change background colors
          </button>
          <button onClick={() => moveSectionDown()}>
            Move Section Down
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="App">
      <Menu />
      <ReactFullpage
        debug /* Debug logging */

        // Required when using extensions
        pluginWrapper={pluginWrapper}

        // fullpage options
        licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
        navigation
        anchors={['firstPage', 'secondPage', 'thirdPage']}
        sectionSelector={SECTION_SEL}
        onLeave={ () => onLeave() }
        sectionsColor={sectionsColor}

        render={comp => (
          <ReactFullpage.Wrapper>
            {fullPages.map(({ text }) => (
              <div key={text} className={SEL}>
                <h1>{text}</h1>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
}

export default MainPage;
