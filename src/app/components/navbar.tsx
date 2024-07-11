import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Search from "./search";

export default function Navbar() {
    return (
        <nav className="grid grid-cols-3 p-4 h-20 bg-white border-gray-200 border-b-slate-200 border-b">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/nawy.svg" className="h-8" alt="Nawy Logo" />
            </a>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <Search placeholder="Area, Compound, Real Estate Developer"></Search>
            </div>
            <div>
            </div>
        </nav>
    );
}