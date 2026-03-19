import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

/**
 * Home Page - Main Portfolio View
 */
const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
