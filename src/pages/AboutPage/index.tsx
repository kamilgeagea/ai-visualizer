import "./AboutPage.scss";
import AboutPageBackground from '../../assets/about-bg.png';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { Background } from '../../components';

const questions: { question: string; answer: string }[] = [
  {
    question: 'Why AI Visualizer',
    answer: `Learning Machine Learning through university classes was no easy task for me,
    especially with online classes during the pandemic, watching step-by-step explanation 
    videos on Youtube helped me understand the concepts. I wanted to create a tool that would 
    allow students to build their customized datasets and experience the learning process on
    their own.`
  },
  {
    question: 'Why 2D Data Points?',
    answer: `2D datasets is the easiest way to visualize how the Algorithm works. Once we
    understand the process, we can use as many features / dimensions as we want, it will behave
    the same way.`
  },
  {
    question: 'Will you make more models?',
    answer: `I am constantly learning new models, and new concepts in Artificial Intelligence.
    If they can be represented in an easy-to-understand visualizer, I would definitely add it
    on here.`
  },
  {
    question: 'How about the other fields in AI (Deep Learning, NLP...)?',
    answer: `I have mainly been focusing on Machine Learning. Incorporating other domains
    of Artificial Intelligence would be a great addition to the app. I will be incorporating
    many concepts / algorithms along the way. Coding them really helps me grasp the concepts
    on a Deeper level.`
  },
  {
    question: 'How to get Help / Make Suggestions?',
    answer: `You can reach out via the Form on the Contact Page or Socials
    (LinkedIn DM, Github Issues, or Email).`
  }
]

/**
 * About Page
 */

const AboutPage = () => {
  // Get my age
  const age = Math.abs(
    new Date(Date.now() - new Date('1999-08-01').getTime()).getUTCFullYear() - 1970
  );

  return (
    <div className="about-page">
      <Background src={AboutPageBackground} />
      <div className="about-page__content">
        <div className="about-page__content__spacer" />
        <div className="about-page__content__title">About</div>
        <div className="about-page__content__description">
        My name {age > 100 ? 'was' : 'is'} Kamil Geagea, I {age > 100 ? 'was a' : `am a ${age} years old`} Web Development 
        and Machine Learning enthusiast. I have created this website to help students learn about Machine Learning 
        in a visual and interactive way. The FAQ section below explains the purpose of this 
        project and how the idea came to mind.
        </div>
        <div className="about-page__content__faq">
          <div className="about-page__content__faq__title">FAQ</div>
          <div className="about-page__content__faq__questions">
              {questions.map(({ question, answer }) => (
                <Accordion key={question}>
                  <AccordionSummary>
                    <div className="about-page__content__faq__questions__question">
                      {question}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>{answer}</AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;