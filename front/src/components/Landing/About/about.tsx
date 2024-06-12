import "./style.css";
import img from "../../../../public/architecture2.jpg";

const imagen = img.src;

const About = () => {
    return (
        <>
            <div className="flex flex-col text-[#0e0e0e] h-screen">
                <div className="w-[90vw] bg-[#dadada] h-[20vh] rounded-[40px] mb-[10px] mt-[30px]  sombra">
                    <div className="flex font-[clash-regular]">
                        <p className="px-9 pt-4 w-[38vw] ">

                            <span className="font-[clash-medium] -tracking-tighter text-2xl text-black">
                                Lorem ipsum accusantium.
                            </span>
                            <br />
                            dolor sit, amet consectetur adipisicing elit. Sit
                            explicabo dolorum magni accusantium error autem
                            illum quisquam vel tempora.
                        </p>
                        <div className="flex items-center mt-5">
                            <h2 className="text-black font-[clash-medium] lg:text-5xl mx-[140px]">
                                LOREM IPSUM DOLOR.
                            </h2>
                        </div>

                    </div>
                </div>

                <div className="parent">
                    <div className="child">
                        <div className="p-10 pt-[100px]">
                            <h2 className="pb-[80px] font-[clash-regular] font-semibold -tracking-tighter text-black text-4xl">
                                Lorem ipsum dolor
                            </h2>
                            <span className="text-2xl">Introduccion</span>
                            <h2 className="w-[300px] text-3xl font-[clash-regular] text-black">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Praesentium, maxime! Hic
                                tenetur facere animi velit atque, dignissimos
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden child">
                        <img
                            src={imagen}
                            alt="Edificio"

                            className=" rounded-[40px] object-cover w-[100%]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
