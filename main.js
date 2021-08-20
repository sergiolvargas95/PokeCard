document.addEventListener('DOMContentLoaded', () => {
    getRandomInt(1, 151)
})

const getRandomInt = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min)) + min;
    console.log(randomNumber)
    fetchData(randomNumber);
}

const fetchData = async (pokeId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        const pokemon = {
            image: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            attack: data.stats[1]. base_stat,
            special: data.stats[3]. base_stat,
            defending: data.stats[2]. base_stat,
        }
        paintCard(pokemon);
    } catch (error) {
        console.log(error)
    }
}

const paintCard = (pokemon) => {
    console.log(pokemon);
    const container = document.querySelector('.Container');
    const template = document.getElementById('template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.Card__Body-img').setAttribute('src', pokemon.image);
    clone.querySelector('.Card__Body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.Card__Body-text').textContent = pokemon.exp + ' Exp';
    clone.querySelectorAll('.Card__Footer-social h3')[0].textContent = pokemon.attack + 'K';
    clone.querySelectorAll('.Card__Footer-social h3')[1].textContent = pokemon.special + 'K';
    clone.querySelectorAll('.Card__Footer-social h3')[2].textContent = pokemon.defending + 'K';
    fragment.appendChild(clone)
    container.appendChild(fragment)
}

