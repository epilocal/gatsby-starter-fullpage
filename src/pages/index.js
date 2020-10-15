import React, { useState } from "react";
import { Link, graphql } from "gatsby";

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
  const siteTitle = data.site.siteMetadata.title

  //set original slide colors and function for changing
  const originalColors = ['#ff5f45', '#0798ec', '#fc6c7c'];
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
      }
    ];
  const [fullPages, setFullPages] = useState(originalFullPages);

  //set original anchors and function for changing
  const originalAnchors = ['page1', 'page2', 'page3'];
  const [anchors, setAnchors] = useState(originalAnchors);



  const handleChangeColors = () => {
    const newColors =
      sectionsColor[0] === 'yellow'
        ? originalColors
        : ['yellow', 'blue', 'white'];
    setSectionsColor(newColors);
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


  if (!fullPages.length) {
    return null;
  }
  const NavMenu = () => (
    <ul
      style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.9rem',
        right: '20px',
        top: '20px',
        position: 'fixed',
        zIndex: 99,
        letterSpacing: '1px',
        marginTop: 0

      }}>
      {fullPages.map( (page, i) => {
        return (
          <li
            style={{
              display: 'inline-block',
              margin: '10px 0',
              position: 'relative'
            }}
             data-menuanchor={anchors[i]}>
             <a
               href={`#${anchors[i]}`}
               style={{
                 color: '#fff',
                 padding: '0 1.1rem 1.1rem 1.1rem'
               }}
               className="navmenu-item"
               >
               {page.text}
             </a></li>
        )
      })
    }
    </ul>
  );


  const Menu = () => (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        zIndex: 99,
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
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <div
        style={{
          height: '100%'
        }}
        >
        <Link
          to="https://alvarotrigo.com/fullPage/"
          style={{
            textDecoration: 'none',
            zIndex: 99,
            top: `20px`,
            left: '20px',
            position: 'fixed'
          }}

        ><div
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.9rem',


          }}
          >fullPage</div></Link>
        <NavMenu />
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
  </Layout>
  );
}

export default MainPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
