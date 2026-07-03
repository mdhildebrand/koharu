import { useState } from "react";
import styled from "styled-components";

const ShowcaseWrapper = styled.div`
  display: flex;
`

const ProjectWrapper = styled.div`
  display: flex;
  margin: 0 -3rem;
`

const ImageWrapper = styled.div`
  display: flex;
  height: 600px;
  width: ${(props) => props.active ? '240px' : '200px'};
  overflow: hidden;
  position: relative;
  -webkit-clip-path: ${(props) => props.active
    ? 'polygon(30% 0, 100% 0, 100% 20%, 70% 80%, 70% 100%, 0 100%, 0 80%, 30% 20%)'
    : 'polygon(70% 0, 100% 0, 100% 20%, 30% 80%, 30% 100%, 0 100%, 0 80%, 70% 20%)'};
  clip-path: ${(props) => props.active
    ? 'polygon(30% 0, 100% 0, 100% 20%, 70% 80%, 70% 100%, 0 100%, 0 80%, 30% 20%)'
    : 'polygon(70% 0, 100% 0, 100% 20%, 30% 80%, 30% 100%, 0 100%, 0 80%, 70% 20%)'};
  margin-left: ${(props) => props.active ? '4rem' : '0'};

  img {
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TextWrapper = styled.div`
  display: block;
  text-align: left;
  overflow: hidden;
  margin: ${(props) => props.active ? '0 1rem' : '0'};
  width: ${(props) => props.active ? '180px' : '0'};
`;

const Project = ({project}) => {
  const [active, setActive] = useState(false);

  return (
    <ProjectWrapper onClick={() => setActive(!active)}>
      <ImageWrapper active={active}>
        <img src={`/images/${project.image}`} />
      </ImageWrapper>
      <TextWrapper active={active}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </TextWrapper>
    </ProjectWrapper>
  )
}

const ProjectShowcase = ({ projects }) => {
  return (
    <ShowcaseWrapper>
      {projects.map((project, i) => (
        <Project key={i} project={project} />
      ))}
    </ShowcaseWrapper>
  )
}

export default ProjectShowcase;