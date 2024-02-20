// Mini Twitter
//CRUD javascript básico

const miniTwitter = {
    users: [
        {
            username: 'lefeki',
        }
    ],
    posts: [
        {
            id: 1,
            owner: 'lefeki',
            content: 'Meu primeiro tweet',
        }
    ],
};
//Create
function criaPost(dados) {
    miniTwitter.posts.push({
        id: miniTwitter.posts.length + 1,
        owner: dados.owner,
        content: dados.content,
    }); 
}
criaPost({owner: 'lefeki', content: 'Segundo tweet'});
criaPost({owner: 'lefeki', content: 'Terceiro tweet'});



// Read
function pegaPost() {
    return miniTwitter.posts;
}

console.log(pegaPost())
//Update
function atualizaContentDoPost(id, novoConteudo){
    const PostQueVaiSerAtualizado = pegaPost().find((post) => {
        return post.id === id;
    });
    PostQueVaiSerAtualizado.content = novoConteudo
    console.log(PostQueVaiSerAtualizado)
    

}
atualizaContentDoPost(1, 'Novo conteudo do post')

//Delete
function apagaPost(id){
    const ListaDePostsAtualizada = pegaPost().filter((postAtual) => {
        return postAtual.id !== id;
    })
    miniTwitter.posts = ListaDePostsAtualizada;
}
apagaPost(2);
console.log(pegaPost())