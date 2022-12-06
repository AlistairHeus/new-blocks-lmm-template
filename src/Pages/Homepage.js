import React, { useEffect, useRef, useState } from "react";
import About from "../Component/Homepage/About";
import Bannerscroll from "../Component/Homepage/Bannerscroll";
import Showreel from "../Component/Homepage/Showreel";
import Projectgrid from "../Component/Homepage/Projectgrid";
import Services from "../Component/Homepage/Services";
import Clients from "../Component/Homepage/Clients";
import Contact from "../Component/Homepage/Contact";
import Avalanch from "../TestComponent/Test_Matter";
import Lenis from "@studio-freight/lenis";
import TestText from "../TestComponent/Test_Text";
import Loading from "../Component/Loading/Loading";
import gsap from "gsap/all";

const Homepage = () => {
  let lenis;

  const [bannerVisible, setBannerVisible] = useState(false);
  const bannerVideoRef = useRef();

  console.log(bannerVisible);

  useEffect(() => {
    const initSmoothScrolling = () => {
      lenis = new Lenis({
        lerp: 0.1,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const scrollFn = (time) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
      };
      requestAnimationFrame(scrollFn);
    };

    initSmoothScrolling();

    return () => {};
  }, []);

  //   useEffect(() => {
  //     const timeline = gsap.timeline({
  //       scrollTrigger: {
  //         start: "top top",
  //         end: "+=100",
  //         pin: true,
  //       },
  //     });

  //     timeline.to(bannerVideoRef.current, {
  //       scale: 2,
  //       duration: 5,
  //     });
  //   }, []);

  return (
    <>
      <Loading setBannerVisible={setBannerVisible} />
      <Bannerscroll bannerVisible={bannerVisible} ref={bannerVideoRef} />
      {/* <Showreel />
            <About />
            <Projectgrid />
            <Services />
            <Clients />
            <Contact /> */}
    </>
  );
};

export default Homepage;
