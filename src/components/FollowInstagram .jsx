import React, { useEffect } from 'react';
import AOS from 'aos';

const FollowInstagram = () => {
  useEffect(()=>{
    AOS.init({ duration: 1000, once: true });
  })
  return (
    <div className="text-center py-10">
      <h2 data-aos="zoom-in" className="text-2xl md:text-3xl font-semibold text-gray-900">
        Follow Me Instagram
      </h2>
      <p data-aos="fade-up" className="text-orange-500 font-semibold mt-1 text-lg md:text-xl">
        @KISHALAY_DAS971
      </p>
    </div>
  );
};

export default FollowInstagram;
