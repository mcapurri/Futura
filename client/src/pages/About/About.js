import React from 'react';
import style from './About.module.css';

const About = () => {
    return (
        <div className={style.About}>
            <section className={style.Section}>
                <h1 style={{ marginBottom: '5%', marginLeft: '5%' }}>
                    Our mission
                </h1>
                <p style={{ padding: '0 5%' }}>
                    Futura is a circular economy platform that helps producers
                    to track and collect users waist, enabling our stakeholders
                    to earn a little profit, while helping the community to keep
                    the environment clean and supporting local economy{' '}
                </p>
            </section>
            <section className={style.Section}>
                <article className={style.Box}>
                    <div className={style.ImgContainer}>
                        <img
                            src="../../assets/environment-logo.png"
                            alt="environment-logo"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </div>
                    <div style={{ padding: '0 25%', marginLeft: '-5%' }}>
                        <h5> Save the environment </h5>
                        <p className="text">
                            {' '}
                            We collect 50+ Kg recyclable material a day!
                        </p>
                    </div>
                </article>
                <hr style={{ width: '20rem', backgroundColor: 'green' }} />

                <article className={style.Box}>
                    {/* <div className={style.ImgContainer}> */}
                    <img
                        src="../../assets/local-business-logo.png"
                        alt="local-business-logo"
                        style={{ transform: 'scale(1.2)' }}
                    />
                    {/* </div> */}
                    <div style={{ padding: '0 10%' }}>
                        <h5> Help local business with sustanable grow</h5>
                        <p className="text">
                            {' '}
                            We promote the circular economy and involve local
                            waste stakeholders leveraging their business and
                            connecting them with financial institutions
                        </p>
                    </div>
                </article>
                <hr style={{ width: '20rem', backgroundColor: 'green' }} />

                <article className={style.Box}>
                    <div className={style.ImgContainer}>
                        <img
                            src="../../assets/education-logo.png"
                            alt="education-logo"
                            style={{ transform: 'scale(0.6)' }}
                        />
                    </div>
                    <div style={{ padding: '0 10%' }}>
                        <h5> Promote education </h5>
                        <p className="text">
                            {' '}
                            We sustain the spread of recycling culture among
                            west african countries, and the application of
                            efficient waste management policies.
                        </p>
                    </div>
                </article>
                <hr style={{ width: '20rem', backgroundColor: 'green' }} />

                <article className={style.Box}>
                    <div className={style.ImgContainer}>
                        <img
                            src="../../assets/fist-logo.png"
                            alt="fist-logo"
                            style={{ transform: 'scale(0.7)' }}
                        />
                    </div>
                    <div style={{ padding: '5% 10%' }}>
                        <h5> Empower the people </h5>
                        <p className="text">
                            {' '}
                            We allow the community to be actively operative in
                            self development, by empowering and motivating
                            individuals to take action.
                        </p>
                    </div>
                </article>
                <hr style={{ width: '20rem', backgroundColor: 'green' }} />
            </section>
        </div>
    );
};

export default About;
