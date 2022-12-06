import React, { useEffect } from "react";
import "../../Styles/styles.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Section from "../Section/Section";
import { map, lerp, getMousePos, calcWinsize, getRandomNumber } from "./utils";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import video from "../../Assets/Video/showreel.mp4";

const Bannerscroll = React.forwardRef((props, ref) => {
  const bannerCanvasRef = useRef();

  let winsize = calcWinsize();
  let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let translationVals = { tx: 0, ty: 0 };
    // get random start and end movement boundaries
    // const xstart = getRandomNumber(15, 60);
    // const ystart = getRandomNumber(15, 60);
    const xstart = 0;
    const ystart = 0;

    // infinite loop
    const render = () => {
      // Calculate the amount to move.
      // Using linear interpolation to smooth things out.
      // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
      translationVals.tx = lerp(
        translationVals.tx,
        map(mousepos.x, 0, winsize.width, -xstart - 50, xstart + 50),
        0.02
      );
      translationVals.ty = lerp(
        translationVals.ty,
        map(mousepos.y, 0, winsize.height, -ystart, ystart + 30),
        0.02
      );
      if (bannerCanvasRef.current && props.bannerVisible) {
        gsap.set(bannerCanvasRef.current, {
          x: translationVals.tx,
          y: translationVals.ty,
        });
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    // move();
    window.addEventListener("resize", () => (winsize = calcWinsize()));
    window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));
    return () => {
      cancelAnimationFrame(render);
    };
  }, [props.bannerVisible]);

  // banner image sequence effect
  useEffect(() => {
    let sections = gsap.utils.toArray("section.banner_container");

    sections.forEach((section) => {
      let canvas = section.querySelector("canvas");
      canvas ? initCanvas(section, canvas) : initOther(section);
    });

    function initCanvas(section, canvas) {
      let context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let frameCount = 31;
      const currentFrame = (index) => `/banner/reversed/sample${index}.png`;

      let images = [];
      let airpods = {
        frame: 0,
      };

      // for (let i = 0; i < frameCount; i++) {
      //   let img = new Image();
      //   img.src = currentFrame(i);
      //   images.push(img);
      // }

      for (var i = frameCount - 1; i >= 0; i--) {
        let img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      gsap
        .timeline({
          onUpdate: render,
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 2,
            start: "top top",
            end: "+=180%",
          },
        })
        .to(
          airpods,
          {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          ref.current,
          {
            scale: 2,
            duration: 1,
          },
          "<"
        );

      images[0].onload = render;

      function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          images[airpods.frame],
          canvas.width / 2 - 1920 / 2,
          canvas.height / 2 - 1080 / 2
        );
      }
    }

    function initOther(section) {
      ScrollTrigger.create({
        trigger: section,
        end: "+=100%",
      });
    }
    return () => {};
  }, []);

  return (
    <>
      <Section className="flex flex-col items-center justify-center banner_container">
        <canvas
          ref={bannerCanvasRef}
          style={{
            transform: "scale(1.2)",
            opacity: props.bannerVisible ? 1 : 0,
          }}
        ></canvas>
        <div style={{ position: "absolute", textAlign: "center" }}>
          {/* <h1>Creative</h1>
          <h1>Apes</h1>
          <h1>Design</h1> */}
          <video
            ref={ref}
            src={video}
            autoPlay
            muted
            className="banner-slideshow"
          />
        </div>
      </Section>
    </>
  );
});

export default Bannerscroll;
