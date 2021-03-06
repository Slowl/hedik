import React from 'react'
import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import uglyshit from '../assets/img/me.png'
import Parallax from 'parallax-js'
import Arrow from './Arrow'

const IntroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
`

const ProfilePic = styled.div`
  width: 200px;
  margin: auto;
  padding-top: 11%;
  opacity: 0;

  animation : profile 1s ease .3s forwards;

  @keyframes profile {
    100% { padding-top: 9%; opacity: 1;}
  }

  img {
    width: 100%;
    border-radius: 200px;
  }

  @media screen and (max-width: 45em) {
    padding-top: 40%;

    @keyframes profile {
      100% { padding-top: 30%; opacity: 1;}
    }
  }
`

const Desc = styled.div`
  text-align: center;
  margin-top: 1.5em;
  font-weight: 200;
  font-size : 30px;

  div {
    padding: .2em;
  }

  div:first-child {
    opacity: 0;
    letter-spacing: 1px;
    transform : translateY(-10px);
    animation: desc-1 1s ease .7s forwards;

    @keyframes desc-1 {
      100% {opacity: 1; transform: translateY(0px);}
    }

    span {
      font-weight: 300;
      font-size : 34px;
    }
  }

  div:nth-child(2) {
    letter-spacing: 2px;
    font-size : 20px;
    opacity: 0;
    transform : translateY(-10px);
    animation: desc-2 .8s ease .9s forwards;

  }

    @keyframes desc-2 {
      100% {opacity: 1; transform: translateY(0px);}
    }
  }
`

  const SwitchWordContainer = styled.span`
    .passionate {
      cursor:progress;
    }

    .weird .passionate {
      transition: 0.6s;
      transition-delay: 0.2s;
    }

    span:before,
    span:after {
      content: '';
      position: absolute;
      text-align: center;
      opacity: 0;
      transition: .4s,opacity .6s;
    }

    span:before {
      content: attr(data-hover);
      transform: translate(30px,0);
    }

    span:after {
      content: attr(data-active);
    }

    span:hover span,
    span:active span {
      opacity: 0;
    }

    span:hover:before,
    span:active:after {
      opacity: 1;
      transition-delay: .4s;
    }

    span:active:before {
      transition-delay: 0s;
    }
  `

const Intro = () => {

  let target = useRef()

  useEffect( () => {
    const parallax = new Parallax(target, {
      invertX: false,
      invertY: false,
      frictionX: 0.075,
      frictionY: 0.075
    })

    return () => {
      parallax.disable()
    }
  })

    return (
      <IntroContainer>

        <div ref={el => target = el}>
          <ProfilePic data-depth="0.15">
            <img src={uglyshit} alt="hedik"/>
          </ProfilePic>
        </div>

        <Desc>
          <div>Hi, I'm <span>Hedi K.</span></div>
          <div>A <SwitchWordContainer> <span className="weird" data-hover="weird"><span className="passionate">passionate</span></span> </SwitchWordContainer> guy who codes the web</div>

          <Arrow selector="projects"/>

        </Desc>
      </IntroContainer>
    )
}

export default Intro
