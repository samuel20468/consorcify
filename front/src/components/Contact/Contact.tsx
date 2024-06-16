// Estilos y componentes
import { CiMail } from "react-icons/ci";
import { MdOutlinePlace } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

// ---------------------

const Contact = () => {
    return (
        <div className="col-izquierda flex flex-col justify-center w-[45vw] px-[5rem] border-r border-white">
            <h1 className="text-4xl font-[clash-regular]">
                Ponerse en contacto.
            </h1>
            <p className="text-lg text-[#696969] mb-5">
                Nos encantaría saber de usted. Nuestro amigable equipo siempre
                está aquí para charlar.
            </p>
            <div className="flex flex-col space-y-10">
                <div className="flex items-center space-x-2">
                    <div>
                        <h2 className="flex text-2xl ">
                            <div className="absolute left-10 top-50">
                                <CiMail color="#696969" size={30} />
                            </div>
                            Contáctanos
                        </h2>
                        <p className="my-3  text-[#696969]">
                            Nuestro amigable equipo está aquí para ayudarlo.
                        </p>
                        <a href="#" className="">
                            consorcify@gmail.com
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div>
                        <h2 className="text-2xl ">
                            <div className="absolute left-10 top-50">
                                <MdOutlinePlace color="#696969" size={30} />
                            </div>
                            Oficina
                        </h2>
                        <p className="my-3 text-[#696969]">
                            Ven a saludar a nuestra oficina central.
                        </p>
                        <address className="not-italic">
                            Piedras 623
                            <br />
                            CABA C1070AAM ARG
                        </address>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div>
                        <h2 className="text-2xl ">
                            <div className="absolute left-10 top-50">
                                <FiPhone color="#696969" size={30} />
                            </div>
                            Teléfono
                        </h2>
                        <p className="my-3 text-[#696969]">
                            De lunes a viernes de 8am a 5pm.
                        </p>
                        <a href="#" className="">
                            +54 (011) 0303-456
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
