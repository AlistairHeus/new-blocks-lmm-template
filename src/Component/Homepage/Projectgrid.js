import React, { useEffect, useRef, useState } from 'react';
import { getRequest } from '../../APIs/Apirequest';
import Section from '../Section/Section';
import { getTranslationDistance, getDistance, map } from '../../Functions/utils';
import gsap from 'gsap';

const Projectgrid = () => {

    // Refs
    const animationRef = useRef([]);
    animationRef.current = [];

    const imageRefs = useRef([]);
    imageRefs.current = [];

    const divRef = useRef([]);
    divRef.current = [];


    // Adding To Ref Function
    const addToRefs = (el) => {
        if (el && !animationRef.current.includes(el)) {
            animationRef.current.push(el);
        }
    };

    const addToImageRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    const addToDivRefs = (el) => {
        if (el && !divRef.current.includes(el)) {
            divRef.current.push(el);
        }
    };


    // State
    const [responseData, setresponseData] = useState([]);
    const [loaded, setloaded] = useState(false);
    const [options, setoptions] = useState({
        duration: 0.8,
        ease: "power4",
        scale: 1.4,
        skew: 0,
        maxRotation: 0,
        spread: 80,
        maxDistance: 500,
    });



    // Effects
    useEffect(() => {
        getRequest("caseStudy")
            .then((res) => {
                setresponseData(res.data.data)
                setloaded(true)
            }
            )
    }, []);

    useEffect(() => {
        for (const item of animationRef.current) {
            item.addEventListener("mouseenter", () => expand(item));
        }
    }, [loaded]);



    // Animation Function
    let expanded = -1;
    let previousExpanded = -1;

    const expand = (item) => {
        const itemIndex = animationRef.current.indexOf(item);

        previousExpanded =
            expanded !== -1 && expanded !== itemIndex ? expanded : -2;

        expanded = expanded === itemIndex ? -1 : itemIndex;

        let tl = gsap
            .timeline({
                defaults: {
                    duration: options.duration,
                    ease: options.ease,
                },
            })
            .addLabel("start", 0)
            .addLabel("end", options.duration)
            .set(
                item,
                {
                    zIndex: expanded === -1 ? 1 : 999,
                },
                expanded === -1 ? "end" : "start"
            );

        if (options.skew) {
            tl.to(
                item,
                {
                    duration: options.duration * 0.4,
                    ease: "sine.in",
                    scale: 1 + (options.scale - 1) / 2,
                    skewX: expanded === -1 ? -1 * options.skew : options.skew,
                    skewY: expanded === -1 ? -1 * options.skew : options.skew,
                    x: 0,
                    y: 0,
                    rotation: 0,
                },
                "start"
            ).to(
                item,
                {
                    duration: options.duration * 0.6,
                    ease: "power4",
                    scale: expanded === -1 ? 1 : options.scale,
                    skewX: 0,
                    skewY: 0,
                },
                `start+=${options.duration * 0.4}`
            );
        } else {
            tl.to(
                item,
                {
                    scale: expanded === -1 ? 1 : options.scale,
                    x: 0,
                    y: 0,
                    rotation: 0,
                },
                "start"
            );
        }

        if (previousExpanded !== -1) {
            const prevItem = animationRef.current[previousExpanded];
            const delay = 0;

            tl.set(
                prevItem,
                {
                    zIndex: 1,
                    delay: delay,
                },
                "start"
            ).to(
                prevItem,
                {
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    delay: delay,
                },
                "start"
            );
        }

        const filteredArray = animationRef.current.filter((otherItem) => otherItem != item);

        for (let otherItem of filteredArray) {
            const { x, y } =
                expanded === -1
                    ? { x: 0, y: 0 }
                    : getTranslationDistance(
                        otherItem,
                        item,
                        options.spread,
                        options.maxDistance
                    );
            const delay = 0; //this.expanded === -1 ? 0 : map(getDistance(otherItem.DOM.el, item.DOM.el), 0, 1500, 0, 0.2);

            const zIndex = Math.round(
                map(getDistance(otherItem, item), 0, 100000, 998, 1)
            );

            const rotationInterval = options.maxRotation
                ? Math.max(
                    Math.round(
                        map(
                            getDistance(otherItem, item),
                            0,
                            500,
                            options.maxRotation,
                            0
                        )
                    ),
                    0
                )
                : 0;

            tl
                .set(
                    otherItem,
                    {
                        zIndex: expanded === -1 ? 1 : zIndex,
                        delay: delay,
                    },
                    expanded === -1 ? "end" : "start"
                )
                .to(
                    otherItem,
                    {
                        x: x,
                        y: y,
                        rotation:
                            expanded === -1
                                ? 0
                                : gsap.utils.random(rotationInterval * -1, rotationInterval),
                        delay: delay,
                    },
                    "start"
                );
        }
    };


    return (
        <Section className="project__grid">
            <div className="content">
                <div className="grid grid--medium" data-duration="0.8"
                    data-ease="expo"
                    data-scale="1.5"
                    data-max-rotation="8"
                    data-spread="100"
                    data-max-distance="2000"
                    ref={addToDivRefs}
                >

                    {responseData?.map((val, i) => (
                        <div key={i} className="grid__item" ref={addToRefs}>
                            <div
                                className="grid__item-img"
                                ref={addToImageRefs}
                                style={{ backgroundImage: `url(${val.img_src})` }}
                            ></div>
                        </div>
                    ))}

                </div>
            </div>
        </Section>
    );
}

export default Projectgrid;
