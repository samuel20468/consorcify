// Estilos y componentes
import { FaUserSecret, FaUserTie, FaUser } from "react-icons/fa";

const RoleIcon = ({ role }: { role: string }) => {
    // Renderizar SVG según el rol
    switch (role) {
        case "superadmin":
            return <FaUserSecret size={25} />;
        case "cadmin":
            return <FaUserTie size={25} />;
        case "user":
            return <FaUser size={25} />;
        default:
            return null;
    }
};

export default RoleIcon;
