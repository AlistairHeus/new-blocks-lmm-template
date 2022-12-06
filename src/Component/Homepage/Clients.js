import React, { useState, useEffect } from 'react';
import { getRequest } from '../../APIs/Apirequest';
import Section from '../Section/Section';
import { lerp, getMousePos, calcWinsize, distance } from '../../Functions/utils';
import { useRef } from 'react';


const ClientBtn = (props) => {
    // Refs
    const btnRef = useRef();

    let winsize = calcWinsize();
    let mousepos = { x: 0, y: 0 };

    // Effects
    useEffect(() => {

        let renderedStyles = {
            tx: { previous: 0, current: 0, amt: 0.1 },
            ty: { previous: 0, current: 0, amt: 0.1 },
            scale: { previous: 1, current: 1, amt: 0.2 }
        };

        let rect;
        let distanceToTrigger;

        const calculateSizePosition = () => {
            // size/position
            rect = btnRef.current.getBoundingClientRect();
            // the movement will take place when the distance from the mouse to the center of the button is lower than this value
            distanceToTrigger = rect.width * 1.5;
        }

        const initEvents = () => {
            let onResize = () => calculateSizePosition();
            window.addEventListener('resize', onResize);
        }


        const render = () => {
            // calculate the distance from the mouse to the center of the button
            const distanceMouseButton = distance(mousepos.x + window.scrollX, mousepos.y + window.scrollY, rect.left + rect.width / 2, rect.top + rect.height / 2);
            // new values for the translations and scale
            let x = 0;
            let y = 0;

            if (distanceMouseButton < distanceToTrigger) {
                x = (mousepos.x + window.scrollX - (rect.left + rect.width / 2)) * .3;
                y = (mousepos.y + window.scrollY - (rect.top + rect.height / 2)) * .3;
            }

            renderedStyles['tx'].current = x;
            renderedStyles['ty'].current = y;

            for (const key in renderedStyles) {
                renderedStyles[key].previous = lerp(renderedStyles[key].previous, renderedStyles[key].current, renderedStyles[key].amt);
            }

            btnRef.current.style.transform = `translate3d(${renderedStyles['tx'].previous}px, ${renderedStyles['ty'].previous}px, 0)`;


            requestAnimationFrame(() => render());
        }


        calculateSizePosition();
        // init events
        initEvents();
        // loop fn
        requestAnimationFrame(() => render());



        // Calculate the viewport size
        window.addEventListener('resize', () => winsize = calcWinsize());
        window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));


        return () => {
            cancelAnimationFrame(render)
        }
    }, []);

    return (
        <div className="content">
            <button ref={btnRef} className="button">
                <div className="button__deco">
                    <div className="button__deco-filler"></div>
                </div>
                <span className="button__text">
                    <img src={props.val} alt="" />
                </span>
            </button>
        </div>
    );

}


const Clients = (props) => {


    // States
    const [responseData, setresponseData] = useState();
    const [loaded, setloaded] = useState(false);


    // Effects
    useEffect(() => {
        getRequest("getclients")
            .then((res) => {
                setresponseData(res.data.data.clients);
                setloaded(true)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Section className="client__container">
            {responseData?.map((val, i) => (
                <ClientBtn key={i} val={val} />
            ))}
        </Section>
    );
}

export default Clients;
