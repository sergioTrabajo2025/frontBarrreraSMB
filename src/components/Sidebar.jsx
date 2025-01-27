import { Link, NavLink } from "react-router-dom";
import mainLogo from "../data/logomonitor.png";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
    const context = useStateContext();

    // Verificar si el contexto está definido
    if (!context) {
        // Si el contexto no está definido, puedes devolver un elemento nulo o un indicador de carga
        return null; // O cualquier otra cosa que quieras hacer en este caso
    }

    // Desestructurar las propiedades del contexto
    const { currentColor, activeMenu, setActiveMenu, screenSize } = context;

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const activeLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2 rounded-lg text-2xl text-white text-md m-2";
    const normalLink =
        "flex items-center gap-5 pl-2 pt-3 pb-4 rounded-lg text-xl text-gray-200 hover:text-black hover:bg-blue-700  m-2";

    return (
        <div className=" h-screen   bg-light-gray   pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            to="/"
                            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-white text-red-500"
                        >
                            <img src={mainLogo} className="hover-bg-green" width={230} alt="Main Logo"></img>
                        </Link>
                    </div>
                    <div className="mt-10">
                        {links.map((item, index) => (
                            <div key={`item-${index}`}>
                                <p className=" text-red-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p>
                                {item.links.map((link, linkIndex) => (
                                    <NavLink
                                        to={`/${link.name}`}
                                        key={`link-${index}-${linkIndex}`} // Concatenate the key with unique values
                                        onClick={handleCloseSideBar}
                                        className={normalLink} // Use normalLink class by default
                                        activeclassname={activeLink} // Use activeLink class when active
                                    >
                                        {link.icon}
                                        <span className="capitalize">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
