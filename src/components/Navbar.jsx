// Archivo: src/components/Navbar.jsx
import { Navbar as FlowbiteNavbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <div className="no-print">
            <FlowbiteNavbar fluid rounded className="bg-white shadow">
                <FlowbiteNavbar.Brand as={Link} to="/">
                    <img
                        src="/logo-santa-rosa.png"
                        className="mr-3 h-9"
                        alt="Logo Santa Rosa"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/36x36?text=SR';
                        }}
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Formularios Santa Rosa
                    </span>
                </FlowbiteNavbar.Brand>
                <FlowbiteNavbar.Toggle />
                <FlowbiteNavbar.Collapse>
                    <FlowbiteNavbar.Link
                        as={Link}
                        to="/"
                        active={location.pathname === '/'}
                    >
                        Formulario
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link
                        as={Link}
                        to="/respuestas"
                        active={location.pathname === '/respuestas'}
                    >
                        Ver Respuestas
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link
                        as={Link}
                        to="/estadisticas"
                        active={location.pathname === '/estadisticas'}
                    >
                        Estadísticas
                    </FlowbiteNavbar.Link>
                </FlowbiteNavbar.Collapse>
            </FlowbiteNavbar>
        </div>
    );
}

export default Navbar;
