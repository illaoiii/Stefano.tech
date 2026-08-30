import { useState } from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import About from "./sections/About";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Creative from "./sections/Creative";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Skills from "./sections/Skills";

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Loader onDone={() => setLoaderDone(true)} />

      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[110] -translate-y-24 bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <div style={{ visibility: loaderDone ? "visible" : "hidden" }}>
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Services />
          <Experience />
          <Education />
          <Certifications />
          <Projects />
          <Creative />
          <Contact />
        </main>
        <Footer />
        <ChatbotWidget />
      </div>
    </>
  );
}

export default App;
