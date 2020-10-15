import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { TwitterPicker } from 'react-color';

import ReactFullpage from '@fullpage/react-fullpage';
import Layout from "../components/layout";
import SEO from "../components/seo";

import "./styles/index.css";


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
  //set original slide colors and function for picking new
  const originalColors = ['#ff5f45', '#0798ec', '#fc6c7c', '#0798ec'];
  const [sectionsColor, setSectionsColor] = useState(originalColors);

  //set original slide content and function for changing
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
      },
      {
        text: 'Section 4',
      }
    ];
  const [fullPages, setFullPages] = useState(originalFullPages);

  //set original anchors and function for changing
  const originalAnchors = ['page1', 'page2', 'page3', 'page4'];
  const [anchors, setAnchors] = useState(originalAnchors);

  //set display color pickers to false by default
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);


  const handleChangeColors = () => {
    const newColors =
      sectionsColor[0] === 'yellow'
        ? originalColors
        : ['yellow', 'blue', 'white'];
    setSectionsColor(newColors);
  }

  const handleShowBackgroundColorPicker = () => {
    setShowBackgroundColorPicker(true);
  }

  const handleCloseBackgroundColorPicker = () => {
    setShowBackgroundColorPicker(false);
  }

  const handleAddSection = () => {
    const newFullPages = [...fullPages];
    const newAnchors = [...anchors];
    const newSectionsColor = [...sectionsColor];
    newFullPages.push({
      text: `Section ${fullPages.length + 1}`
    });
    newAnchors.push(`page` +
      (fullPages.length + 1)
    );
    newSectionsColor.push(sectionsColor[fullPages.length - 1]);
    setFullPages(newFullPages);
    setAnchors(newAnchors);
    setSectionsColor(newSectionsColor);
  }

  const handleRemoveSection = () => {
    const newFullPages = [...fullPages];
    const newAnchors = [...anchors];
    const newSectionsColor = [...sectionsColor];
    newFullPages.pop();
    newAnchors.pop();
    newSectionsColor.pop();
    setFullPages(newFullPages);
    setAnchors(newAnchors);
    setSectionsColor(newSectionsColor);
  }

  const moveSectionDown = () => {
    if (typeof window !== `undefined`) {
      window.fullpage_api.moveSectionDown();
    }
  }



  const handleBackgroundColorChange = (color, event) => {
    if (typeof window !== `undefined`) {
      const slideIndex = window.fullpage_api.getActiveSection().index;
      let newSectionsColor = [...sectionsColor];
      newSectionsColor[slideIndex] = color.hex;
      setSectionsColor(newSectionsColor);
      handleCloseBackgroundColorPicker();
    }
  }


  if (!fullPages.length) {
    return null;
  }

  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
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
          <div style={{
            display: 'inline-block'
          }}>
          <button onClick={() => handleShowBackgroundColorPicker()}>Pick Background Color</button>
            {showBackgroundColorPicker && (
              <div style={ popover }>
              <div style={ cover } onClick={() => handleCloseBackgroundColorPicker()}/>
              <TwitterPicker onChange={ (color, event) => handleBackgroundColorChange(color, event) } />
            </div>
            )}
          </div>
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
        // Required when using extensions
        pluginWrapper={pluginWrapper}

        debug

        // fullpage options
        licenseKey={'YOUR_KEY_HERE'} // Get one from https://alvarotrigo.com/fullPage/pricing/
        navigation
        anchors={anchors}
        sectionSelector={SECTION_SEL}
        sectionsColor={sectionsColor}

        render={({ state, fullpageApi }) => {
          return (
          <ReactFullpage.Wrapper>
            {fullPages.map(({ text }, i) => (
              <div key={anchors[i]} className={SEL}>
                <h1>{text}</h1>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      }
      />
    </div>
  );
}

export default MainPage;
