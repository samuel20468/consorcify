import "./style.css";
import img from "../../../../public/architecture2.jpg";

const imagen = img.src;

const About = () => {
  return (
    <>
      <div className="flex flex-col text-[#0e0e0e]">
        <div className="w-[90vw] bg-[#dadada] h-[20vh] mt-[-230px] rounded-[40px] mb-[10px] sombra">
          <div className="flex font-[clash-regular]">
            <p className="px-9 pt-3 w-[38vw]">
          
              <span className="font-[clash-medium] -tracking-tighter text-2xl text-black">
                Lorem ipsum accusantium.
              </span>
              <br />
              dolor sit, amet consectetur adipisicing elit. Sit explicabo
              dolorum magni accusantium error autem illum quisquam vel tempora,
              rerum, vitae expedita non dolorem similique velit ipsum deleniti
              consectetur ratione. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
            <h2 className="text-black font-[clash-medium] lg:text-5xl items-center flex mx-[140px]">
              LOREM IPSUM DOLOR.
            </h2>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, maxime! Hic tenetur facere animi velit atque,
                dignissimos
              </h2>
            </div>
          </div>
          <div className="child overflow-hidden">
            <img src={imagen} className=" rounded-[40px] object-cover w-[100%]"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
