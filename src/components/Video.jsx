import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Video = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div
      data-aos="zoom-in"
      className="w-full h-[70vh] overflow-hidden shadow-sm my-10"
    >
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/e1I-Lij2mNg"
        title="YouTube video player"
        frameBorder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
