import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger);

function Box(props) {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        gsap.to(mesh.current.rotation, {
            x: 3.2,
            scrollTrigger: {
                trigger: ".canvasRotate",
                start: "top top",
                end: "+=600",
                pin: true,
                scrub: 1.5
            }
        })
    }, []);

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


const Fiber = () => {
    return (
        <>
            <div style={{ width: "100vw", height: "150vh" }}></div>
            <Canvas className='canvasRotate' style={{ width: "100vw", height: "100vh" }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
            </Canvas>
            <div style={{ width: "100vw", height: "150vh" }}></div>
        </>

    );
}

export default Fiber;
