import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  div.section-heading-custom {
    margin-top: 20px;
    margin-bottom: 10px;
    border-top: 1px dashed #ccc;
    text-align: center;

    span {
      font-size: var(--fz-md);
      position: relative;
      background: var(--navy);
      color: var(--slate);
      top: -12px;
      padding: 5px;
    }
  }
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--gray);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const SectionBreak = ({ section }) => (
  <>
    {section ? (
      <div className="section-heading-custom">
        <span>{section}</span>
      </div>
    ) : null}
  </>
);

SectionBreak.propTypes = {
  section: PropTypes.string,
};

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const programmingSkills = [
    'JavaScript (ES6+)',
    'React',
    'Node.Js',
    'Express',
    'SQL',
    'NoSQL',
    'Python',
    // 'Flask',
    // 'Algolia',
    'Docker',
    'Terraform',
    'Jenkins',

    // 'Shell Script',
  ];

  const awsSkills = [
    'RDS',
    // 'Neptune',
    'EC2',
    'ELB',
    'S3',
    'IAM',
    // 'CloudFormation',
    'CloudWatch',
    'ECS',
    // 'ECR',
    'Route 53',
    'VPC',
    'SQS',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Raju Lamsal, and I enjoy creating things that live on the internet.
              My interest in computer science began back in 2013 when I was pursuing my higher
              education. Since then, I've been passionate about exploring and developing innovative
              solutions in the digital space. Based in Brisbane, Australia, I recently completed my
              Master's degree in Technology, majoring in Software Engineering, from Federation
              University.
            </p>

            <p>
              My main focus these days is building accessible and cloud-friendly products based on
              micro-architecture. I strive to leverage cutting-edge technologies to create seamless
              user experiences and scalable applications that meet modern demands.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <SectionBreak section="Programming & Skills" />
          <ul className="skills-list">
            {programmingSkills && programmingSkills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <SectionBreak section="AWS" />
          <ul className="skills-list">
            {awsSkills && awsSkills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="personal_photo"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
