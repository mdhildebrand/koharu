import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import styled, { keyframes } from 'styled-components'

const BackgroundWrapper = styled.div`
  // width: 100vw;
  height: 100vh;
  position: relative;
`;

const BGImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const BGImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(8, 8, 8, 0.4) 80%);
  opacity: 0%;

  transition: opacity 0.35s ease-in-out;

  &.active {
    opacity: 100%;
  }
`;

const bxMove = keyframes`
  0%   { left: 0%; }
  50%  { left: 100%; }
  100% { left: 0%; }
`;

const arcBounce = keyframes`
  0%   { transform: translateY(0);     animation-timing-function: ease-out; }
  10%  { transform: translateY(-40%); animation-timing-function: ease-in;  }
  20%  { transform: translateY(0);     animation-timing-function: ease-out; }
  30%  { transform: translateY(-40%); animation-timing-function: ease-in;  }
  40%  { transform: translateY(0);     animation-timing-function: ease-out; }
  50%  { transform: translateY(-40%); animation-timing-function: ease-in;  }
  60%  { transform: translateY(0);     animation-timing-function: ease-out; }
  70%  { transform: translateY(-40%); animation-timing-function: ease-in;  }
  80%  { transform: translateY(0);     animation-timing-function: ease-out; }
  90%  { transform: translateY(-40%); animation-timing-function: ease-in;  }
  100% { transform: translateY(0); }
`;

const instantFlip = keyframes`
  0%, 49.999%  { transform: scaleX(-1); }
  50%, 100%    { transform: scaleX(1); }
`;

const KoharuTrackWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  bottom: 0;
`;

const KoharuTrack = styled.div`
  position: relative;
  flex-grow: 1;
`;

const KoharuPlaceholder = styled.img`
  max-width: 60vw;
  max-height: 60vh;
  opacity: 0%;
`

const KoharuContainer = styled.div`
  position: absolute;
  bottom: 0;
  max-width: fit-content;
  max-height: fit-content;

  animation:
    ${bxMove} 5s linear infinite,
    ${arcBounce} 5s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const KoharuSprite = styled.img`
  display: block;
  max-width: 60vw;
  max-height: 60vh;

  animation: ${instantFlip} 5s steps(1) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
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

const bgimages = [
  'BG_TrinityMarket.jpg',
  'BG_TrinityStreet.jpg',
  'BG_TrinityCampusPlaza.jpg',
]

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBG, setCurrentBG] = useState(0);
  const backgroundArray = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const cycleBG = () => {
      setCurrentBG((prevIndex) => (prevIndex + 1) % bgimages.length);
    };

    const bgCycle = setInterval(cycleBG, 7000);

    return () => clearInterval(bgCycle);
  }, [])

  return (
    <BackgroundWrapper>
      <BGImageWrapper ref={backgroundArray}>
        {bgimages.map((url, i) => (
          <BGImage
            key={i}
            src={`/images/${url}`}
            className={i === currentBG ? 'active' : ''}
          />
        ))}
      </BGImageWrapper>
      <KoharuTrackWrapper>
        <KoharuTrack>
          <KoharuContainer>
            <KoharuSprite src='/images/koharu_restricted.png' />
          </KoharuContainer>
        </KoharuTrack>
        <KoharuPlaceholder src='/images/koharu_restricted.png' />
      </KoharuTrackWrapper>
      <AppWrapper>
        <Header>
          <h1>Koharu</h1>
          <audio ref={audioRef} loop>
            <source src="/audio/takaramonogatari.mp3" type="audio/mpeg" />
          </audio>
          <AudioButton onClick={toggleAudio}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </AudioButton>
        </Header>
      </AppWrapper>
    </BackgroundWrapper>
  )
}

export default App
