import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>limpieza</h1>
    </main>
  );
}
