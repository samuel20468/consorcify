// Estilos y componentes
import './style.css';
import { CiMail, CiInstagram } from 'react-icons/ci';
import { VscGithubAlt } from 'react-icons/vsc';

// -------------------------

export const Footer = () => {
    return (
        <>
            <footer className="relative bg-[#0b0c0d] z-1 font-sans">
                <hr className="my-0 border-white" />
                <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex items-center w-1/3 space-x-3 no-underline rtl:space-x-reverse">
                            <h1 className="text-3xl font-[clash-medium] duration-500 delay-100 whitespace-nowrap dark:text-white hover:text-Principal">
                                CONSORCIFY
                            </h1>
                        </div>
                        <div className="flex justify-center gap-[16px] w-1/3 my-4">
                            <a href="mailTo: consorcify@gmail.com">
                                <CiMail size={35} />
                            </a>

                            <a href="https://www.instagram.com/consorcify.latam?igsh=ZGw2ZDl4d24yaDRt">
                                <CiInstagram size={35} />
                            </a>

                            <a href="https://github.com/samuel20468/consorcify">
                                <VscGithubAlt size={33} />
                            </a>
                        </div>
                    </div>
                    <hr className="my-6 border-white sm:mx-auto lg:my-8" />
                    <span className="block text-white sm:text-center font-[clash-regular] -tracking-[-3px]">
                        © 2024. All rights reserved to Consorcify.
                    </span>
                </div>
            </footer>
        </>
    );
};

export default Footer;
