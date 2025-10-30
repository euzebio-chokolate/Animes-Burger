function Home() {
    return (
        <div>
            <nav className="bg-[#F78C26] p-4 shadow-xl">

                <div className="container mx-auto flex justify-between items-center">

                    <div className="flex items-center space-x-3">
                        <img src="" alt="Anime Burguer Logo" className="w-16 h-16 object-cover"/>
                        <div className="text-gray-800 text-left leading-none">
                            <p className="font-extrabold text-2xl">ANIMES</p>
                            <p className="font-bold text-xl">BURGUER</p>
                        </div>
                    </div>
                    <ul className="flex space-x-6 items-center text-lg font-semibold text-gray-800">
                        <li>
                            <a href="#" className="hover:text-white">Monte o seu</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">Monte o seu</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">Monte o seu</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">Monte o seu</a>
                        </li>
                        <li>
                            <button className="bg-[#8A3249] hover:bg-[#A0405A] text-white py-2 px-6 rounded-lg font-bold shadow-lg border border-black transition duration-300">
                                Carrinho
                            </button>
                        </li>
                    </ul>

                </div>

            </nav>
            <div className="left-0 right-0 bottom-0 h-1 bg-black"></div>
        </div>
    );
}

export default Home;