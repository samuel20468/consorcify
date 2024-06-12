import "./style.css";
import img from "../../../../public/apartment-1920.png";

const image = img.src;

const Hero = () => {
    return (
        <>
            <div className="gradient">
                <div className="block ">
                    <h1 className="text-white pt-[5rem] font-[clash-regular] text-[2rem] md:text-[4rem] text-center md:leading-[4rem] leading-[2.5rem]  overflow-hidden">
                        <span className="reveal-text ">
                            Tus administraciones, <br /> con un click.

                        </span>
                    </h1>
                    <h3 className=" overflow-hidden">
                        <p className="text-white font-sans md:text-[1.3rem] text-center text-[1rem] mt-5 reveal-text">
                            Gestión eficiente y análisis integral para
                            consorcios de viviendas. <br />
                            Potenciamos la administración y mejoramos la
                            convivencia en tu <br /> comunidad.
                        </p>
                    </h3>

                    <div className="lighting"></div>
                    <img src={image} className="building z-20" />

                </div>
            </div>
        </>
    );
};

export default Hero;
