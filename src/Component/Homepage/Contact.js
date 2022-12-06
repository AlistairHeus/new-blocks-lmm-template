import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import Section from "../Section/Section";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);


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
                width: window.innerWidth,
                height: window.innerHeight
            },
        });

        Render.run(render);

        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        Composite.add(world, [
            Bodies.rectangle(400, 600, 1200, 5.5, { isStatic: true, render: { fillStyle: '#fff' } })
        ]);

        Composite.add(world, [
            Bodies.rectangle(0, 0, window.innerWidth, 15.5, { isStatic: true, render: { fillStyle: '#fff' } })
        ]);

        Composite.add(world, [
            Bodies.rectangle(-200, 120, 5.5, window.innerHeight, { isStatic: true, render: { fillStyle: '#fff' } })
        ]);

        Composite.add(world, [
            Bodies.rectangle(1000, 120, 5.5, window.innerHeight, { isStatic: true, render: { fillStyle: '#fff' } })
        ]);

        // var stack = Composites.stack(100, 0, 5, 5, 15, 25, function (x, y) {
        //     return Bodies.circle(x, y, 40, { restitution: 0.6, friction: 0.5 });
        // });

        var stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
            return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
        });


        // Composite.add(world, circle);


        Composite.add(world, stack,);


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

        //Need to add MouseConstraint for mouse events
        var mConstraint;
        // mConstraint = MouseConstraint.create(engine, options);
        Matter.World.add(world, mouseConstraint);


        // Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        // wrapping using matter-wrap plugin
        var allBodies = Composite.allBodies(world);


        for (var i = 0; i < allBodies.length; i += 1) {
            allBodies[i].plugin.wrap = {
                min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
                max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
            };
        }

    
        allBodies[10].render.visible = false

        //Add event with 'mousemove'
        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            //For Matter.Query.point pass "array of bodies" and "mouse position"
            var foundPhysics = Matter.Query.point(allBodies, event.mouse.position);

            allBodies[10].position = event.mouse.position

        });

        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);




        return () => {
            mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
            mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
        }

    });



    return (
        <>
            <div>
                <div ref={boxRef} className="render"></div>
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    );
}

export default Contact;
