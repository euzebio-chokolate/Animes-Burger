import React from 'react';
import { 
    MapPinIcon,
    UserCircleIcon,
    PhoneIcon,
    ClockIcon,
    HeartIcon 
} from '@heroicons/react/24/outline';

function FaleConoscoSection() {

    const contactInfo = [
        { title: 'Telefone', text1: '(69) 98412-7721', text2: 'WhatsApp disponível', icon: PhoneIcon, rotation: 'rotate-1' },
        { title: 'Endereço', text1: 'Av. Tancredo Neves, 457', text2: 'Centro - Rio Branco, AC', icon: MapPinIcon, rotation: '-rotate-1' },
        { title: 'Horário', text1: 'Ter a Sab: 17h às 00h', text2: 'Dom: 19h às 00h', icon: ClockIcon, rotation: 'rotate-1' },
        { title: 'Instagram', text1: '@animesburger.ac', text2: 'Siga para novidades', icon: UserCircleIcon, rotation: '-rotate-1' }, 
    ];

    return (
        <section className="w-full bg-[#F78C26] py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <h2 
                    className="font-Atop font-semibold text-5xl md:text-7xl mb-12 text-center text-stroke text-white"
                    style={{ textShadow: '4px 4px 0px #000' }}
                >
                    FALE CONOSCO
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
                    
                    {/* Coluna da Esquerda: Cards de Contato */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactInfo.map((item) => (
                            <div 
                                key={item.title}
                                className={`bg-white p-5 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] ${item.rotation}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#8A3249] p-3 rounded-lg border-2 border-black shadow-sm">
                                        <item.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-Adlam text-xl text-gray-900 text-left mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-700 text-left font-medium">{item.text1}</p>
                                        <p className="text-xs text-gray-500 text-left">{item.text2}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coluna da Direita: Sobre Nós */}
                    <div className="bg-[#F9E8B0] p-6 md:p-10 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex flex-col justify-center relative mt-8 lg:mt-0">
                        
                        <div className="hidden md:block absolute -top-8 -right-8 bg-[#8A3249] p-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                            <HeartIcon className="h-10 w-10 text-white" />
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold font-Adlam text-gray-900 mb-6 text-center lg:text-left">
                            De Fã para Fã!
                        </h3>
                        
                        <div className="space-y-4 text-base md:text-lg font-Adlam text-gray-800 leading-relaxed text-justify">
                            <p>
                                O <span className="text-[#8A3249] font-bold border-b-2 border-[#8A3249]">Animes Burger</span> nasceu da paixão por duas coisas: cultura geek e comida de verdade. 
                            </p>
                            <p>
                                Nosso espaço foi criado para você se sentir dentro dos seus animes favoritos enquanto devora um hambúrguer artesanal suculento. Seja para jogar, fazer cosplay ou apenas curtir com a galera, aqui é o seu lugar!
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t-2 border-black/10 text-center lg:text-right">
                            <p className="font-Atop text-2xl text-stroke-sm text-[#F78C26]" style={{ textShadow: '2px 2px 0 #000' }}>
                                #VemProAnimesBurger
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FaleConoscoSection;