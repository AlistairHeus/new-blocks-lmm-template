import React, { useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import Section from "../Section/Section";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "../../Styles/styles.css";
import img0 from "../../Assets/Images/slideshow/0.png";
import img1 from "../../Assets/Images/slideshow/1.png";
import img2 from "../../Assets/Images/slideshow/2.png";
import img3 from "../../Assets/Images/slideshow/3.png";
import img4 from "../../Assets/Images/slideshow/4.png";
import img5 from "../../Assets/Images/slideshow/5.png";
import img6 from "../../Assets/Images/slideshow/6.png";
import img7 from "../../Assets/Images/slideshow/7.png";
import img8 from "../../Assets/Images/slideshow/8.png";
import { useRef } from "react";
const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8];

let index = 0;

gsap.registerPlugin(ScrollTrigger);

const Loading = ({ setBannerVisible }) => {
  // States
  const [pageLoadValue, setPageLoadValue] = useState(0);
  const [randomNumber, setrandomNumber] = useState(10);
  const [higgerRandom, sethiggerRandom] = useState(randomNumber);
  const [loaded, setloaded] = useState(false);
  const [secondLoded, setsecondLoded] = useState(false);
  const [loaderValue, setloaderValue] = useState(100);

  const slideShowRef = useRef();
  useEffect(() => {
    function change() {
      slideShowRef.current.src = images[index];
      index >= images.length ? (index = 0) : index++;
      console.log(images[index]);
    }

    const interval = setInterval(change, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const randomNumberGenerate = () => {
    setrandomNumber(Math.floor(Math.random() * (50 + 1)) + 1);
    sethiggerRandom(Math.floor(Math.random() * (81 - 52 + 1)) + 52);
  };

  useLayoutEffect(() => {
    randomNumberGenerate();

    window.addEventListener("load", () => {
      setloaded(true);
    });

    let interval;
    let higgerInterval;
    let FinishedInterval;

    if (pageLoadValue !== 100) {
      document.querySelector("body").classList.add("loading");
    }

    interval = setInterval(() => {
      if (pageLoadValue < randomNumber) {
        setPageLoadValue((prev) => prev + 1);
        setTimeout(() => {
          setsecondLoded(true);
        }, 10);
      }
    }, 25);

    higgerInterval = setInterval(() => {
      if (
        pageLoadValue < higgerRandom &&
        pageLoadValue >= randomNumber &&
        secondLoded
      ) {
        setPageLoadValue((prev) => prev + 1);
      }
    }, 80);

    FinishedInterval = setInterval(() => {
      if (
        pageLoadValue >= randomNumber &&
        pageLoadValue >= higgerRandom &&
        pageLoadValue < 100
      ) {
        setPageLoadValue((prev) => prev + 1);
      }
    }, 15);

    setloaderValue(100 - pageLoadValue);

    const tl = gsap.timeline({});

    if (pageLoadValue == 100) {
      tl.to(".loader__container h1", {
        opacity: 0,
        duration: 1,
        delay: 1,
      }).to(".loader__container", {
        display: "none",
        onComplete: () => {
          document.querySelector("body").classList.remove("loading");
          setBannerVisible(true);
        },
      });
    }

    return () => {
      clearInterval(interval);
      clearInterval(higgerInterval);
      clearInterval(FinishedInterval);
    };
  }, [pageLoadValue, loaded, secondLoded]);

  useEffect(() => {
    let sections = gsap.utils.toArray("section.loader__container");

    sections.forEach((section) => {
      let canvas = section.querySelector("canvas");
      canvas ? initCanvas(section, canvas) : initOther(section);
    });

    function initCanvas(section, canvas) {
      let context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      //   let frameCount = 10;
      //   const currentFrame = (index) => `/slideshow/${index}.png`;

      let frameCount = 30;
      const currentFrame = (index) => `/banner/reversed/sample${index}.png`;

      let images = [];
      let airpods = {
        frame: 0,
      };

      for (let i = 0; i < frameCount; i++) {
        let img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      gsap
        .timeline({
          onUpdate: render,
        })
        .to(
          airpods,
          {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 5,
          },
          0
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
    <div>
      <Section className="flex flex-col items-center justify-center loader__container">
        <canvas
          style={{
            transform: "scale(1.2)",
          }}
        ></canvas>
        {/* <h1 style={{ position: "absolute", fontSize: "8rem" }}>
          {pageLoadValue}
        </h1> */}
        <img ref={slideShowRef} className="loading-slideshow" />
      </Section>
    </div>
  );
};

export default Loading;
