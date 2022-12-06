import React, { useEffect, useRef } from 'react';
import "../../Styles/styles.css";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

const Showreel = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Res
    const showreelRef = useRef();
    const videoRef = useRef();
    const btnRef = useRef();

    useEffect(() => {

        const tl = gsap.timeline({

            scrollTrigger: {
                trigger: showreelRef.current,
                pin: btnRef.current,
                start: "top center-=175",
                end: "top center-=500",
                scrub: 2,
                markers: true,
                // immediateRender: false,
            },
        });

        tl.to(showreelRef.current, {
            width: window.innerWidth / 2,
            height: window.innerWidth / 2,
            borderRadius: "50%",
            transformOrigin: "center center",

        }).to(
            showreelRef.current,
            {
                immediateRender: false,
                width: "100vw",
                height: "100vh",
                borderRadius: "0.5%",
                transformOrigin: "center center",
            }
        );


        return () => {
            ScrollTrigger.refresh();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                </Box>
            </Modal> */}
            <div
                className="bannerContainer flex-col w-screen relative"
                data-scroll-section
            >
                <div className="buttonContainer" ref={btnRef}>
                    <div
                        ref={showreelRef}
                        className="buttonContainer__showreel flex items-center justify-center overflow-hidden"
                    >
                        <video
                            ref={videoRef}
                            className=""
                            autoPlay
                            muted
                            loop
                            src="https://d3kuxj311ts9a8.cloudfront.net/showreel_final_optimized.mp4"
                        ></video>
                    </div>
                </div>
            </div>
            <div className="dummy" style={{ width: "100vw", height: "100vh" }}></div>
        </>
    );
}

export default Showreel;
