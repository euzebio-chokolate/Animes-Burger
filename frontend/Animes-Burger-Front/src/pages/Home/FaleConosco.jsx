import React from 'react';
import {
    MapPinIcon,
    UserCircleIcon,
    PhoneIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

import animeGif from "../../assets/gifs/jojos-bizarre-adventure-anime.gif"


function FaleConoscoSection() {

    const contactInfo = [
        {
            title: 'Telefone',
            text1: '(69) 98412-7721',
            text2: 'WhatsApp disponível',
            icon: PhoneIcon,
            rotation: 'rotate-1'
        },

        {
            title: 'Endereço',
            text1: 'Av. Tancredo Neves, 457',
            text2: 'Centro - Rio Branco, AC',
            icon: MapPinIcon,
            rotation: '-rotate-1'
        },

        {
            title: 'Horário',
            text1: 'Ter a Sab: 17h às 00h',
            text2: 'Dom: 19h às 00h',
            icon: ClockIcon,
            rotation: 'rotate-1'
        },

        {
            title: 'Instagram',
            text1: '@animesburger.ac',
            text2: 'Siga para novidades e promoções',
            icon: UserCircleIcon,
            rotation: '-rotate-1'
        },
    ]

    return (
        <section className="w-full bg-[#F78C26] py-16 px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <h2
                    className="font-Atop font-semibold text-7xl mb-12 text-stroke text-white text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
                    style={{ textShadow: '6px 6px 0px #000' }}
                >
                    FALE CONOSCO
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactInfo.map((item) => (
                            <div
                                key={item.title}
                                className={`bg-white p-4 rounded-lg shadow-xl border-4 border-black transition-transform duration-300 hover:scale-105 ${item.rotation}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#8A3249] p-3 rounded-md">
                                        <item.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-Adlam text-xl font-adlam text-gray-800 text-left">{item.title}</h3>
                                        <p className="text-left">{item.text1}</p>
                                        <p className="text-left">{item.text2}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-lg text-left flex items-center justify-center">
                        <img
                            src={animeGif}
                            alt="Garota de anime dançando"
                            className="w-3/4 h-3/4 object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FaleConoscoSection;