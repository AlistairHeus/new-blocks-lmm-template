import React, { useEffect, useRef } from 'react';
import Img1 from "../../Assets/Images/Servies/1.jpg"
import Img2 from "../../Assets/Images/Servies/2.jpg"
import Img3 from "../../Assets/Images/Servies/3.jpg"
import Img4 from "../../Assets/Images/Servies/4.jpg"
import Img5 from "../../Assets/Images/Servies/5.jpg"
import Img6 from "../../Assets/Images/Servies/6.jpg"
import Img7 from "../../Assets/Images/Servies/7.jpg"
import Img8 from "../../Assets/Images/Servies/8.jpg"
import Img9 from "../../Assets/Images/Servies/9.jpg"
import Img10 from "../../Assets/Images/Servies/10.jpg"
import Img11 from "../../Assets/Images/Servies/11.jpg"
import Img12 from "../../Assets/Images/Servies/12.jpg"
import Img13 from "../../Assets/Images/Servies/13.jpg"
import Img14 from "../../Assets/Images/Servies/14.jpg"
import Img15 from "../../Assets/Images/Servies/15.jpg"
import Section from '../Section/Section';
import { closestEdge } from '../../Functions/utils';
import gsap from 'gsap';



const Services = () => {

    const menuItems = useRef([]);
    menuItems.current = [];

    const addToMenuItem = (el) => {
        if (el && !menuItems.current.includes(el)) {
            menuItems.current.push(el)
        }
    }

    useEffect(() => {

        let animationDefaults = { duration: 0.6, ease: 'expo' };

        menuItems.current.forEach((item) => {
            let link = item.querySelector('a.menu__item-link');
            let marquee = item.querySelector('.marquee');
            let marqueeInner = item.querySelector('.marquee__inner-wrap')

            const mouseEnter = (ev) => {
                const edge = findClosestEdge(ev);

                gsap.timeline({ defaults: animationDefaults })
                    .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
                    .set(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
                    .to([marquee, marqueeInner], { y: '0%' }, 0);
            }

            const mouseLeave = (ev) => {
                const edge = findClosestEdge(ev);

                gsap.timeline({ defaults: animationDefaults })
                    .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
                    .to(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
            }

            const findClosestEdge = (ev) => {
                const x = ev.pageX - item.offsetLeft;
                const y = ev.pageY - item.offsetTop;
                return closestEdge(x, y, item.clientWidth, item.clientHeight);
            }

            const initEvents = () => {
                let onMouseEnterFn = ev => mouseEnter(ev)
                link.addEventListener('mouseenter', onMouseEnterFn);
                let onMouseLeaveFn = ev => mouseLeave(ev)
                link.addEventListener('mouseleave', onMouseLeaveFn);
            }

            initEvents();
        })
    }, []);


    return (
        <Section className="services__container">
            <div className="menu-wrap">
                <nav className="menu">
                    <div ref={addToMenuItem} className="menu__item">
                        <a className="menu__item-link" href="/">Branding</a>
                        <div className="marquee">
                            <div className="marquee__inner-wrap">
                                <div className="marquee__inner" aria-hidden="true">
                                    <span>Frank Tower</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img1})` }}></div>
                                    <span>Dom Dom</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img2})` }}></div>
                                    <span>Santa Maria</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img3})` }}></div>
                                    <span>Big Molly</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img4})` }}></div>
                                    <span>Frank Tower</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img1})` }}></div>
                                    <span>Dom Dom</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img2})` }}></div>
                                    <span>Santa Maria</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img3})` }}></div>
                                    <span>Big Molly</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img4})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={addToMenuItem} className="menu__item">
                        <a className="menu__item-link" href="/">Design</a>
                        <div className="marquee">
                            <div className="marquee__inner-wrap">
                                <div className="marquee__inner" aria-hidden="true">
                                    <span>Dome House</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img5})` }}></div>
                                    <span>Revellion High</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img6})` }}></div>
                                    <span>Wax Palace</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img7})` }}></div>
                                    <span>Cellar Tree</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img8})` }}></div>
                                    <span>Dome House</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img5})` }}></div>
                                    <span>Revellion High</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img6})` }}></div>
                                    <span>Wax Palace</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img7})` }}></div>
                                    <span>Cellar Tree</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img8})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={addToMenuItem} className="menu__item">
                        <a className="menu__item-link" href="/">Motion Graphics</a>
                        <div className="marquee">
                            <div className="marquee__inner-wrap">
                                <div className="marquee__inner" aria-hidden="true">
                                    <span>Mia Terra</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img9})` }}></div>
                                    <span>Quest Hill</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img10})` }}></div>
                                    <span>Bean Palace</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img11})` }}></div>
                                    <span>Treehouse</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img12})` }}></div>
                                    <span>Mia Terra</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img9})` }}></div>
                                    <span>Quest Hill</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img10})` }}></div>
                                    <span>Bean Palace</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img11})` }}></div>
                                    <span>Treehouse</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img12})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={addToMenuItem} className="menu__item">
                        <a className="menu__item-link" href="/">Web Developement</a>
                        <div className="marquee">
                            <div className="marquee__inner-wrap">
                                <div className="marquee__inner" aria-hidden="true">
                                    <span>Tia Alta</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img13})` }}></div>
                                    <span>Quadratic Bliss</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img14})` }}></div>
                                    <span>Host Mall</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img15})` }}></div>
                                    <span>Freefall Dome</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img1})` }}></div>
                                    <span>Tia Alta</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img13})` }}></div>
                                    <span>Quadratic Bliss</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img14})` }}></div>
                                    <span>Host Mall</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img15})` }}></div>
                                    <span>Freefall Dome</span>
                                    <div className="marquee__img" style={{ backgroundImage: `url(${Img1})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </Section>

    );
}

export default Services;
