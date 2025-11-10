import React from 'react';
import { 
    MapPinIcon,
    UserCircleIcon,
    PhoneIcon,
    ClockIcon
} from '@heroicons/react/24/outline';


function FaleConoscoSection() {

    // Dados para os cards de informação
    const contactInfo = [
        { title: 'Telefone', text1: '(69) 99900-0009', text2: 'Rua xxxxx, 123 - Rio Branco', icon: PhoneIcon, rotation: 'rotate-1' },
        { title: 'Endereço', text1: '(69) 99900-0009', text2: 'Rua xxxxx, 123 - Rio Branco', icon: MapPinIcon, rotation: '-rotate-1' },
        { title: 'Horário', text1: '(69) 99900-0009', text2: 'Rua xxxxx, 123 - Rio Branco', icon: ClockIcon, rotation: 'rotate-1' },
        { title: 'Instagram', text1: '(69) 99900-0009', text2: 'Rua xxxxx, 123 - Rio Branco', icon: UserCircleIcon, rotation: '-rotate-1' }, 
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
                    
                    {/* Coluna da Esquerda: Informações */}
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
                                        <p className="text-sm text-gray-600 text-left">{item.text1}</p>
                                        <p className="text-sm text-gray-600 text-left">{item.text2}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coluna da Direita: Formulário */}
                    <div className="bg-[#F9E8B0] p-6 rounded-lg shadow-xl border-4 border-black text-left">
                        <h3 className="text-3xl font-bold font-adlam text-gray-800 mb-4">Como Podemos Melhorar?</h3>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="nome" className="block text-lg font-semibold text-gray-800 mb-1">Seu nome:</label>
                                <input 
                                    type="text" 
                                    id="nome" 
                                    className="w-full p-2 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#8A3249]" 
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comentario" className="block text-lg font-semibold text-gray-800 mb-1">Seu Comentário:</label>
                                <textarea 
                                    id="comentario" 
                                    rows="5" 
                                    className="w-full p-2 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#8A3249]"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full font-atop uppercase bg-yellow-500 hover:bg-yellow-600 text-black text-stroke text-lg py-3 px-8 rounded-full shadow-lg border-2 border-black transition duration-300"
                            >
                                Enviar!
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FaleConoscoSection;