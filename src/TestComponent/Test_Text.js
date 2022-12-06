import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls } from '@react-three/drei'
import randomWord from 'random-words'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap', fontSize: 5.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover
    useEffect(() => {
        console.log(ref.current);
        if (hovered) document.body.style.cursor = 'pointer'

        gsap.to(ref.current.rotation, {
            y: 1,
            duration: 2,
            scrollTrigger: {
                trigger: "body",
                pin: true,
                scrub: 1,
                start: "top top",
                end: "+=600"
            }
        })

        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
        // Make text face the camera
        // ref.current.quaternion.copy(camera.quaternion)
        // Animate font color
        ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'black'), 0.1)
    })
    return <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps} children={children} />
}

function Cloud({ count = 4, radius = 20 }) {
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count
        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), randomWord()])
        return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function TextFile() {

    return (
        <>
            {/* <div style={{ width: "100vw", height: "100vh" }}></div> */}
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }} style={{ width: "100vw", height: "100vh" }}>
                <fog attach="fog" args={['#202025', 0, 80]} />
                {/* <Cloud count={8} radius={20} /> */}
                <Word position={[0, 0, 0]} children={"Loudmob"} />
                {/* <TrackballControls /> */}
            </Canvas>
        </>

    )
}
