import { HiHome, HiSearch, HiOutlineMenuAlt1, HiOutlinePlus } from "react-icons/hi";

export default function Sidebar() {
  return (
    <div>
      <div>
        <button className="flex items-center space-x-2">
          <HiHome className="h-6 w-6" />
          <p>Accueil</p>
        </button>
        <button className="flex items-center space-x-2">
          <HiSearch className="h-6 w-6" />
          <p>Rechercher</p>
        </button>
        <button className="flex items-center space-x-2">
          <HiOutlineMenuAlt1 className="h-6 w-6" />
          <p>Bibliothèque</p>
        </button>
        <button className="flex items-center space-x-2">
          <HiOutlinePlus className="h-6 w-6" />
          <p>Créer une playlist</p>
        </button>
      </div>
    </div>
  );
}
