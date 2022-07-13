class Api {
    baseUrl = "https://pokeapi.co/api/v2/pokemon/"
    getRandomNumber = () => {
        return Math.floor(Math.random() * (905 - 1) + 1);
    }

    getRandomPokemon = async () => {
        const id = this.getRandomNumber();
        const url = this.baseUrl + id;
        const response = await fetch(url);
        const data = await response.json();
        
        const result = {name:data.name, img_src:data.sprites.other['official-artwork'].front_default};
        //console.log(result);
        return result;
    }

    getRandomPokemonName = async (nameCheck) => {
        const id = this.getRandomNumber();
        const url = this.baseUrl + id;
        const response = await fetch(url);
        const data = await response.json();

        const name = data.name;
        
        if(name === nameCheck){
            return this.getRandomPokemonName(nameCheck);
        }

        return name;

    }

}



export default Api;