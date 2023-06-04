const pokeapi = {};

// Função para converter os detalhes de um pokemon obtido da API

function converterpokeAPI(pokedetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokedetail.order;
  pokemon.name = pokedetail.name;

  const types = pokedetail.types.map((tiposlot) => tiposlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.image = pokedetail.sprites.front_default;

  return pokemon;
}

// Função para obter os detalhes de um pokemon da API

pokeapi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(converterpokeAPI);
};

// Função para obter a lista de pokemons da API

pokeapi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonbody) => jsonbody.results)
    .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
    .then((detailrequest) => Promise.all(detailrequest))
    .then((pokemondetails) => pokemondetails);
};
