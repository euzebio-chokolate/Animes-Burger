import { useCart } from "../carrinho";

const ProdutoCard = ({ produto }) => {
    const { addToCart, loading } = useCart();

    const handlePedirClick = () => {
        addToCart(produto.id, 1);
    };

    // Pega os ingredientes (que estão como string) e os transforma em tags
    const tags = produto.ingredientes ? produto.ingredientes.split(',').slice(0, 3) : [];

    return (
        <div className="bg-white rounded-2xl shadow-md border-4 border-black w-full overflow-hidden flex flex-col">
            <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col text-left">
                {/* Nome do Produto */}
                <h3 className="text-3xl text-gray-900 mb-2 font-Adlam">
                    {produto.nome}
                </h3>

                {/* Descrição */}
                <p className="text-lg text-black mb-4 flex-1 font-Afacad">
                    {produto.descricao}
                </p>

                {/* Tags de Ingredientes */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-[#F9E8B0] text-sm font-Adlam px-2 py-1 rounded-full border-2 border-black"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                    {tags.length > 0 && (
                        <span className="bg-[#F9E8B0] text-xs font-Adlam px-2 py-1 rounded-full border-2 border-black">
                            +
                        </span>
                    )}
                </div>

                {/* Preço e Botão */}
                <div className="flex justify-between items-center mt-2">
                    <p className="text-3xl text-black font-Adlam">
                        R$ {Number(produto.preco || 0).toFixed(2)}
                    </p>
                    <button
                        type="button"
                        onClick={handlePedirClick}
                        disabled={loading}
                        className="bg-[#F78C26] text-white text-stroke font-Adlam py-1 px-5 rounded-2xl border-2 border-black shadow-md hover:bg-yellow-600 transition-colors text-3xl font-Adlam"
                    >
                        Pedir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCard;