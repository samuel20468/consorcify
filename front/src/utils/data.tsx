// Iconos
import { PiBuildingLight } from "react-icons/pi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineInboxArrowDown,
} from "react-icons/hi2";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";

// SideBarAdmin
export const itemsNavbarAdmin = [
  {
    id: 1,
    title: "Consorcios",
    icon: <PiBuildingLight size={40} />,
    link: "/dashboard/admin/consortiums",
  },
  {
    id: 2,
    title: "Cobranzas",
    icon: <GiReceiveMoney size={40} />,
    link: "/dashboard/admin/charge",
  },
  {
    id: 3,
    title: "Expensas",
    icon: <HiOutlineClipboardDocumentList size={40} />,
    link: "/dashboard/admin/expenses",
  },
  {
    id: 4,
    title: "Gastos",
    icon: <GiPayMoney size={40} />,
    link: "/dashboard/admin/spent",
  },
  {
    id: 5,
    title: "Portal",
    icon: <IoIosInformationCircleOutline size={40} />,
    link: "/dashboard/admin/portal",
  },
];

// SideBarUser
export const itemsNavbarUser = [
  {
    id: 1,
    title: "Consorcio",
    icon: <IoHomeOutline size={40} />,
    link: "/dashboard/usuario/consortium",
  },
  {
    id: 2,
    title: "Expensas",
    icon: <HiOutlineClipboardDocumentList size={40} />,
    link: "/dashboard/usuario/expenses",
  },
  {
    id: 3,
    title: "Proveedores",
    icon: <GrUserWorker size={40} />,
    link: "/dashboard/usuario/workers",
  },
  {
    id: 4,
    title: "Mensajes",
    icon: <HiOutlineInboxArrowDown size={40} />,
    link: "/dashboard/usuario/news",
  },
];

// reviews de las cards
export const reviews = [
  {
    profilePic: "https://randomuser.me/api/portraits/men/31.jpg",
    text: "Como dueños del consorcio, nos ha sorprendido la organización y el compromiso del grupo. Hemos logrado muchas mejoras en el edificio.",
    author: "Carlos Gómez",
    type: "CEO, Acme Inc",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "Desde que nos unimos al consorcio, hemos visto un gran avance en el mantenimiento y la gestión de nuestra propiedad. ¡Muy recomendable!",
    author: "Ana López",
    type: "Dueña, Edificio Central",
    rating: 4,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    text: "Como inquilinos, hemos disfrutado de un ambiente tranquilo y bien mantenido, gracias a la eficiente administración del consorcio.",
    author: "Luis Martínez",
    type: "Inquilino",
    rating: 4,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/40.jpg",
    text: "Ser parte de este consorcio ha sido una excelente decisión. La comunicación y el apoyo entre los propietarios son inmejorables.",
    author: "María Pérez",
    type: "Dueña, Residencial Primavera",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    text: "Gracias al consorcio, hemos mejorado significativamente las áreas comunes del edificio. Todos los dueños estamos muy contentos.",
    author: "Jorge Ramírez",
    type: "Dueño, Edificio Las Flores",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
    text: "El consorcio nos ha brindado la seguridad de vivir en un lugar bien administrado y con excelentes servicios. Muy satisfechos como inquilinos.",
    author: "Carmen Herrera",
    type: "Inquilina",
    rating: 4,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    text: "Como dueños, apreciamos la transparencia y el compromiso del consorcio para mantener y mejorar nuestro edificio.",
    author: "Roberto Sánchez",
    type: "Dueño, Torre Norte",
    rating: 4,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    text: "Ser inquilinos en un edificio gestionado por este consorcio ha sido una experiencia muy positiva. Todo está siempre en perfecto estado.",
    author: "Laura Díaz",
    type: "Inquilina",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
    text: "La administración del consorcio ha hecho un trabajo fenomenal en la renovación de nuestras instalaciones. ",
    author: "Fernando Torres",
    type: "Dueño, Edificio Santa María",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
    text: "La eficiencia y el buen trato del consorcio nos han brindado una gran tranquilidad como inquilinos. Siempre están atentos a nuestras necesidades.",
    author: "Sofía Gutiérrez",
    type: "Inquilina",
    rating: 4,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
    text: "Como propietarios, valoramos mucho la claridad y el orden que el consorcio ha traído a la gestión de nuestro edificio.",
    author: "Andrés Morales",
    type: "Dueño, Condominio El Sol",
    rating: 5,
  },
  {
    profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "Vivir en un edificio bajo la administración de este consorcio ha sido una experiencia muy positiva. Las áreas comunes están siempre impecables.",
    author: "Paola Navarro",
    type: "Inquilina",
    rating: 4,
  },
];

// SideBarSuperAdmin
export const itemsNavbarSuperAdmin = [
  {
    id: 1,
    title: "Consorcios",
    icon: <PiBuildingLight size={40} />,
    link: "/dashboard/superadmin/consorcios",
  },
  {
    id: 2,
    title: "Admins",
    icon: <RiAdminLine size={40} />,
    link: "/dashboard/superadmin/administracion",
  },
];
