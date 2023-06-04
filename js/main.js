let offset = 0;
const limit = 5;
const PokemonList = document.getElementById("listapokemon");
const botaocarregamento = document.getElementById("botaocarregamento");

// Função para carregar os pokemons na lista, e depois cria o HTML dos pokemons carregados, e finaliza adicionando o HTML dos pokemons na lista.

function loadPokemonItens(offset, limit) {
  pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
    const NewHtml = pokemons
      .map(
        (pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.image}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
      )
      .join(" ");
    PokemonList.innerHTML += NewHtml;
  });
}

loadPokemonItens(offset, limit);

botaocarregamento.addEventListener("click", () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});
