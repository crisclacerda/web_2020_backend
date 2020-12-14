const Produto = require('../models/produto.model');


const produtoService = {
    //esse text deve ser substituido por outros parametros. nao funfa com essa linha:
    create: async(name, id_produto, preco_produto, unidades_estoque, unidades_vendidas, cor, tam_produto, categoria_produto, foto, descricao_produto, descricao_foto) => {

        
        const createdProduto = await Produto.create({ 
        
            name,
            id_produto,
            preco_produto,
            unidades_estoque,
            unidades_vendidas, 
            cor,
            tam_produto,
            categoria_produto,
            foto,
            descricao_produto,
            descricao_foto
            
            });

        return createdProduto;
    },

    findById: async(id) => {
  
        const produto = await Produto.findOne({_id: id }).exec();
        return produto;
    },

    find: async() => {
  
        const produtos = await Produto.find({});
        // find all documents
      
        return produtos;
    },

    findNovidades: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Novidades' }).exec();


        return produtos;

    },

    
    findPromocoes: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Promoções' }).exec();


        return produtos;

    },


    findExclusivos: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Exclusivos' }).exec();


        return produtos;

    },

    findMoletons: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Moletons' }).exec();


        return produtos;

    },
    

    findCamisetas: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Camisetas' }).exec();

        return produtos;

    },
    
    findShorts: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ categoria_produto: 'Shorts' }).exec();


        return produtos;

    },
    

    findAzul: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ cor: 'Azul' }).exec();


        return produtos;

    },

    findAmarelo: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ cor: 'Amarelo' }).exec();


        return produtos;

    },

    findPreto: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ cor: 'Preto' }).exec();


        return produtos;

    },

    findP: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ tam_produto: "P" }).exec();


        return produtos;

    },

    findM: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ tam_produto: "M" }).exec();


        return produtos;

    },

    findG: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ tam_produto: "G" }).exec();


        return produtos;

    },

    findGG: async() => {

        //const produtos = await Produto.find({ cor: cor }).exec();
        const produtos = await Produto.find({ tam_produto: "GG" }).exec();


        return produtos;

    },


    updateById: async(id, name, id_produto, preco_produto, unidades_estoque, unidades_vendidas, cor, tam_produto, categoria_produto, foto, descricao_produto, descricao_foto) => {
          
        const produto = await Produto.findOneAndUpdate({ _id: id}, {name, id_produto, preco_produto,unidades_estoque, unidades_vendidas, cor,tam_produto, categoria_produto, foto, descricao_produto, descricao_foto}, {new: true}); // returns Query; new : true retorna o novo objeto
          
        return produto;
    },

    updateStockById: async(id, quantity) => {
        
        const produto = await Produto.findOne({ _id: id });
        console.log(produto)
        console.log(quantity)
        stock = {
            unidades_estoque: produto.unidades_estoque,
            unidades_vendidas: produto.unidades_vendidas
        }
        stock.unidades_estoque -= quantity
        stock.unidades_vendidas += quantity
        const NewProduto = await Produto.findOneAndUpdate({ _id: id }, { unidades_estoque: stock.unidades_estoque, unidades_vendidas: stock.unidades_vendidas}, { new: true });
        console.log(NewProduto)
        return produto;
    },

    deleteById: async(id) => {
          
        const produto = await Produto.findOneAndDelete({ _id: id}); 
          
        return produto;
    }

    
}

module.exports = produtoService;