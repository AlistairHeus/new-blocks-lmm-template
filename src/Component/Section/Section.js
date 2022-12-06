import React from 'react';

const Section = (props) => {
    return (
        <section ref={props.ref} className={`main__section ${props.className}`}>
            {props.children}
        </section>
    );
}

export default Section;
