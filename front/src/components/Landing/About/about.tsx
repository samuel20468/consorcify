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
                                RAPIDO. FACIL. CONFIABLE.
                            </span>
                            <br />
                            En Consorcify, entendemos las necesidades y desafíos
                            tanto de los administradores de consorcios como de
                            los propietarios. Nuestra plataforma está diseñada
                            para ofrecer una gestión eficiente, transparente y
                            colaborativa que beneficia a toda la comunidad.
                        </p>
                        <div className="flex items-center mt-5">
                            <h2 className="text-black font-[clash-medium] lg:text-5xl mx-[140px]">
                                Simplifica la Gestión de tu Edificio.
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="parent">
                    <div className="child">
                        <div className="p-10 pt-[100px]">
                            <h2 className="pb-[80px] font-[clash-regular] font-semibold -tracking-tighter text-black text-4xl">
                                Accede a la información de gastos de tu edificio
                                en tiempo real.
                            </h2>
                            <h2 className="w-[300px] text-3xl font-[clash-regular] text-black">
                                Propietarios:
                            </h2>
                            <span className="text-2xl">
                                Visualiza los costos de servicios públicos,
                                reparaciones y más, todo desde una plataforma
                                intuitiva y fácil de usar.
                            </span>
                            <h2 className="w-[300px] text-3xl font-[clash-regular] text-black">
                                Administradores:
                            </h2>
                            <span className="text-2xl">
                                Optimiza tu trabajo y mantén todo bajo control.
                                Carga y gestiona los gastos del edificio,
                                verifica los pagos realizados y sigue el estado
                                de cada edificio.
                            </span>
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
