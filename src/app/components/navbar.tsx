export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200  border-b-slate-200 border-b">
            <div className="h-20 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/nawy.svg" className="h-8" alt="Nawy Logo" />
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                </div>
                <div>
                </div>
            </div>
        </nav>
    );
}