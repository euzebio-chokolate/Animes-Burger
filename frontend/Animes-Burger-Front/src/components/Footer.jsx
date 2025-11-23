import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 border-t-4 border-[#F78C26]">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">

                    <div>
                        <h2 className="font-Atop text-4xl text-[#F78C26] mb-2 text-stroke-sm">
                            Animes Burger
                        </h2>
                        <p className="font-Adlam text-xl leading-relaxed">
                            O melhor hambúrguer da cidade<br />
                            com um toque de anime!
                        </p>
                    </div>

                    <div>
                        <h2 className="font-Atop text-4xl text-[#F78C26] mb-2 text-stroke-sm">
                            Contato
                        </h2>
                        <p className="font-Adlam text-xl leading-relaxed">
                            (69) 98412-7721<br />
                            Av. Tancredo Neves, 457
                            Centro - Rio Branco, AC
                        </p>
                    </div>

                </div>

                <div className="mt-10 pt-6 border-t border-gray-800 text-center">
                    <p className="font-Adlam text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Animes Burger. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;