import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Avalanch = () => {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);
    const [constraints, setContraints] = useState();

    const [someStateValue, setSomeStateValue] = useState(false);

    const handleResize = () => {
        setContraints(boxRef.current.getBoundingClientRect());
    };

    useEffect(() => {
        let Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Bodies = Matter.Bodies;

        let engine = Engine.create();
        let world = engine.world;

        // Engine Run

        let render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                background: "transparent",
                wireframes: false,
            },
        });

        Render.run(render);

        var runner = Runner.create();
        Runner.run(runner, engine);


        let stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
            return Bodies.circle(x, y, Common.random(10, 30), {
                friction: 0.00001,
                restitution: 0.5,
                density: 0.001,
            });
        });



        gsap.to(".render", {
            scrollTrigger: {
                trigger: ".render",
                start: "80% bottom",
                onEnter: () => {
                    Composite.add(world, stack);
                    console.log("entered");
                },
                scrub: 0.5
            }
        })

        Composite.add(world, [
            Bodies.rectangle(200, 150, 700, 20, {
                isStatic: true,
                angle: Math.PI * 0.06,
                render: { fillStyle: "#060a19" },
            }),
            Bodies.rectangle(500, 350, 700, 20, {
                isStatic: true,
                angle: -Math.PI * 0.06,
                render: { fillStyle: "#060a19" },
            }),
            Bodies.rectangle(140, 580, 700, 20, {
                isStatic: true,
                angle: Math.PI * 0.09,
                render: { fillStyle: "#060a19" },
            }),
        ]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false,
                    },
                },
            });

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, Composite.allBodies(world));

        // wrapping using matter-wrap plugin
        for (var i = 0; i < stack.bodies.length; i += 1) {
            stack.bodies[i].plugin.wrap = {
                min: { x: render.bounds.min.x, y: render.bounds.min.y },
                max: { x: render.bounds.max.x, y: render.bounds.max.y },
            };
        }
    });

    return (
        <div>
            <div ref={boxRef} className="render"></div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Avalanch;
