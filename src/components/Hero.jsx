import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className='relative w-full h-[99vh] overflow-hidden flex items-center justify-center'>
            <img
                src='/hero.jpg'
                className='w-full h-full object-cover'
                alt="background"
            />

            <div className="absolute inset-0 bg-black opacity-35 z-10" />

            <div className='absolute inset-0 z-20 flex justify-center items-center px-4'>
                <div
                    className='mb-10 max-w-4xl flex flex-col items-center justify-center gap-5 text-center'
                    data-aos="fade-down"
                >
                    <h1 className='text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-orange-400 leading-tight'>
                        Where will you go Next?
                    </h1>
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white' data-aos="fade-up" data-aos-delay="100">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. A amet, necessitatibus iure
                        consectetur sequi veniam impedit facilis fuga ducimus laborum earum ipsam similique
                        distinctio vitae neque deleniti assumenda eaque Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, culpa.
                    </p>
                    <h2
                        className='text-white text-xl md:text-2xl font-semibold'
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        Let’s Go…
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Hero;
