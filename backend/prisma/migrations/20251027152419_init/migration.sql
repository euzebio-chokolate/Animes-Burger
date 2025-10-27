-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "valor_total" DOUBLE PRECISION,
    "tipo_pedido" TEXT,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade_estoque" DOUBLE PRECISION NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "estoque_minimo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComposicaoProduto" (
    "produtoId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    "quantidade_necessaria" DOUBLE PRECISION NOT NULL,
    "unidade_medida" TEXT NOT NULL,

    CONSTRAINT "ComposicaoProduto_pkey" PRIMARY KEY ("produtoId","ingredienteId")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComposicaoProduto" ADD CONSTRAINT "ComposicaoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComposicaoProduto" ADD CONSTRAINT "ComposicaoProduto_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "Ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
