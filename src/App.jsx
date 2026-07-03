import React, { useState, useRef } from 'react'
import './App.css'
import { projects } from './data/data'
import ProjectShowcase from './components/ProjectShowcase/ProjectShowcase'
import styled from 'styled-components'

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 10;

  h1 {
    font-size: 3.5rem;
    font-weight: 400;
    letter-spacing: 5%;
    line-height: 1;
    text-align: left;
  }
`

const Header = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 2rem 0;
  align-items: center;
`;

const AudioButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 2px solid white;
  cursor: pointer;
  background: transparent;
`;

export const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="100%"
    height="100%"
    fill="none"
    stroke="white"
  >
    <path
      strokeWidth="1.5"
      d="M 10,6 10,26 26,16 Z"
    />
  </svg>
);

export const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="100%"
    height="100%"
    fill="none"
    stroke="white"
  >
    <path
      strokeWidth="1.5"
      d="M 9,6 9,26 13,26 13,6 Z"
    />
    <path
      strokeWidth="1.5"
      d="M 19,6 19,26 23,26 23,6 Z"
    />
  </svg>
);

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <AppWrapper>
      <Header>
        <h1>Koharu</h1>
        <audio ref={audioRef} loop>
          <source src="/audio/midsummer_cat.mp3" type="audio/mpeg" />
        </audio>
        <AudioButton onClick={toggleAudio}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </AudioButton>
      </Header>
    </AppWrapper>
  )
}

export default App
