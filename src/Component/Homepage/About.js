import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import Section from "../Section/Section";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRefContainer = useRef();
  const textRef = useRef([]);
  textRef.current = [];

  const addTextRefs = (el) => {
    if (el && !textRef.current.includes(el)) {
      textRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0.2, transition: "0.8s opacity ease" },
      {
        opacity: 1,
        transition: "0.8s opacity ease",
        stagger: 0.6,
        scrollTrigger: {
          trigger: ".text",
          start: "top center",
          end: "+=400",
          // pin: ".text",
          scrub: 1.5,
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section>
      <div
        className="text"
        ref={textRefContainer}
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#000000",
            fontSize: "4rem",
            maxWidth: "50%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span ref={addTextRefs}>Hello</span>
          <span ref={addTextRefs}>The</span>
          <span ref={addTextRefs}>Plan</span>
          <span ref={addTextRefs}>To</span>
          <span ref={addTextRefs}>Make</span>
          <span ref={addTextRefs}>This</span>
          <span ref={addTextRefs}>Part</span>
          <span ref={addTextRefs}>Change</span>
          <span ref={addTextRefs}>Color</span>
          <span ref={addTextRefs}>With</span>
          <span ref={addTextRefs}>The</span>
          <span ref={addTextRefs}>Scroll</span>
          <span ref={addTextRefs}>Anmation</span>
        </h1>
      </div>
    </Section>
  );
};

export default About;
