import React from 'react';

const About = () => {
    return (
        <div>
            <section>
                <h1>Our mission</h1>
                <p>
                    Futura is a circular economy platform that helps producers
                    to track and collect users waist, enabling our stakeholders
                    to earn a little profit, while helping the community to keep
                    the environment clean and supporting local economy{' '}
                </p>
            </section>
            <section>
                <article className={style.Box}>
                    <img src="/images/team.png" alt="team" />
                    <h3> Save the environment </h3>
                    <p className="text">
                        {' '}
                        We collect 50+ Kg recyclable material a day!
                    </p>
                    <a className="link-btn" href="#More">
                        More{' '}
                    </a>
                </article>
            </section>
        </div>
    );
};

export default About;
