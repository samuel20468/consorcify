"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Landing/Hero/Hero";
import Background from "../../components/Landing/Background/background";
import About from "@/components/Landing/About/about";
import Reviews from "../Landing/Reviews/Reviews";
import { EmblaOptionsType } from 'embla-carousel'
import { reviews } from "@/utils/data";

type SectionType = "home" | "about" | "questions";
const OPTIONS: EmblaOptionsType = { loop: true };



const Section: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("home");

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionType);
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
      <Navbar activeSection={activeSection} />
      <Background />
      <section
        id="inicio"
        ref={homeRef}
        className="flex justify-center h-screen "
      >
        <span className="text-[#ffffff3a] absolute top-40 font-[clash-regular]">
          CONSORCIFY
        </span>
        <Hero />
      </section>
      <section
        id="nosotros"
        ref={aboutRef}
        className="flex items-center justify-center h-screen bg-[#f5f5f5]"
      >
        <About />
      </section>
      <section
        id="preguntas"
        ref={questionsRef}
        className="flex items-center justify-center h-screen bg-[#0b0c0d]"
      >
        <Reviews  reviews={reviews} options={OPTIONS} />
      </section>
    </>
  );
};

export default Section;
