import React from 'react'
import { useEffect } from 'react';
import ProjectIntro from '../components/ProjectIntro'
import Showcase from '../components/Showcase'
import ShowcaseMobile from '../components/ShowcaseMobile'
import ProjectNav from '../components/ProjectNav'

const LkfImg = [
    { src: "https://i.ibb.co/qjNdH4n/list-components-1.png", legend:"A component that displays a preview of a specific component and the code attached to it", alt:"list", importance:"high" },
    { src: "https://i.ibb.co/2hb7RqC/list-components-2.png", legend:"The code attached to the component is displayed here", alt:"list", importance:"low" },
    { src: "https://i.ibb.co/k3bZVtx/playground-1.png", legend:"This is a Playground component to allow the user to play with the props of a component", alt:"playground", importance:"low" },
    { src: "https://i.ibb.co/ZLDKVRQ/playground-2.png", legend:"Live preview of the Playground, modifying the component and the code attached to it", alt:"playground", importance:"low" },
    { src: "https://i.ibb.co/vYDmN45/toolbox.png", legend:"Toolbox allowing to change some properties when we don't use the Playground component", alt:"toolbox", importance:"low" },
    { src: "https://i.ibb.co/z4VGM4R/props-Table.png", legend:"PropsTable component to display the declared propsTypes of a component", alt:"propsTable", importance:"low" },
    { src: "https://i.ibb.co/bRMt4Rj/documentation-1.png", legend:"Example of a documentaion page created with multiple custom components (Titles, Section togglable ...)", alt:"documentation", importance:"low" },
    { src: "https://i.ibb.co/P5PQxJN/documentation-2.png", legend:"Example of a documentaion page (2)", alt:"documentation", importance:"low" },
    { src: "https://i.ibb.co/3C39YZb/before-black-theme.png", legend:"Example of the white theme", alt:"white-theme", importance:"low" },
    { src: "https://i.ibb.co/LprH0Cz/after-black-theme.png", legend:"Example of the dark theme", alt:"black-theme", importance:"low" },
  ]

const Linkfluence = () => {

  useEffect( () => {
    window.setTimeout(() => {
      window.scrollTo(0, 0);
    }, 400);

    document.title = " ~ hedik/linkfluence"
    return () => document.title = " ~ hedik/"

  })

  return (
    <div>
      <ProjectIntro title="Linkfluence Styleguide" react js html css webpack>
        Storybook ? Styleguidist ? Docz ? Docusaurus ?  All of these tools in one place ? That's what I did for Linkfluence.
        <div>
          I built a library of components allowing web engineering to easily build a complete styleguide application matching all their needs.
        </div>
      </ProjectIntro>

      <div id="showcase">
        <Showcase dataImg={LkfImg} />
        <ShowcaseMobile dataImg={LkfImg} />
      </div>

      <ProjectNav noLive />
    </div>
  )
}

export default Linkfluence
