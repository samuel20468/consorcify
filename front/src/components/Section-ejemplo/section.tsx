import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";



const Section = () => {
  const [activeSection, setActiveSection] = useState("home");

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const questionsRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const sections = [homeRef.current, aboutRef.current, questionsRef.current];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  return (
    <>
    <Navbar activeSection={activeSection}/>
      <section
        id="inicio"
        ref={homeRef}
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-white ">HOME</h1>
      </section>
      <section
        id="nosotros"
        ref={aboutRef}
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-white">ABOUT</h1>
      </section>
      <section
        id="preguntas"
        ref={questionsRef}
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-white">SERVICE</h1>
      </section>
    </>
  );
};


export default Section