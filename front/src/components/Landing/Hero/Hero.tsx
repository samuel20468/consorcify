import React, { forwardRef } from "react";
import "./style.css";
import img from '../../../../public/apartment-1920.png'

const image = img.src

const Hero = () => {
  return (
    <>
    <div className="block">
      <h1 className="text-white pt-[14rem] font-[clash-regular] text-[2rem] md:text-[4rem] text-center md:leading-[4rem] leading-[2.5rem]">
        Tus administraciones. <br/> Con un click.
      </h1>
      <p className="text-white font-sans md:text-[1.3rem] text-center text-[1rem] mt-5">
      Gestión eficiente y análisis integral para consorcios de viviendas. <br/>Potenciamos la administración y mejoramos la convivencia en tu <br/> comunidad.
      </p>
    </div>


    
    <img src={image} className="edificio w-[800px] h-[890px] absolute left-[-30px] top-[29.4px] rounded-[4%] z-[-1]"/>   
    
    </>
  );
};

export default Hero;
