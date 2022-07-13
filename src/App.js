import { useEffect, useState } from "react";
import "./App.css";
import Api from "./Api";
import Button from "./components/Button";
const api = new Api();

const App = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [btnData, setBtnData] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [questionNumber]);

  const fetchPokemon = async () => {
    const pokemon = await api.getRandomPokemon();
    setPokemonData(pokemon);
    await generateRandomNames(pokemon.name);
  };

  const generateRandomNames = async (name) => {
    if (!name) return [];
    const names = [];
    for (let i = 0; i < 3; i++) {
      const randomName = await api.getRandomPokemonName(name);
      names.push(randomName);
    }
    //console.log(names);
    names.push(name);

    setBtnData(names);
  };

  const onBtnClick = (name) => {
    if (name === pokemonData.name) {
      //alert("Correct!");
      setScore(score + 1);
    } else {
      //alert("Incorrect");
    }

    setQuestionNumber(questionNumber + 1);
  };

  if (pokemonData === null || btnData === null) {
    return <div>Loading...</div>;
  }

  console.log(btnData);
  console.log(score);

  if (questionNumber > 10) {
    return (
      <div>
        <h1 style={{
          fontSize: "5rem",
          textAlign:'center',
          marginTop: '5rem'
        }}>Score: {score}/10</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <img src={pokemonData.img_src} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "minmax(100px, auto)",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          gap: "10px",
        }}
      >
        {btnData
          .sort(() => Math.random() - 0.5)
          .map((pokemon, index) => {
            console.log(pokemon, index);
            let btnIndex = index + 1;
            const btnRow = btnIndex > 2 ? 2 : 1;
            btnIndex = btnIndex > 2 ? btnIndex - 2 : btnIndex;
            return (
              <Button
                onClick={onBtnClick}
                style={{
                  gridColumn: `${btnIndex}/2`,
                  gridRow: btnRow,
                }}
                text={pokemon}
              />
            );
          })}
      </div>

      <p
        style={{
          fontSize: "5rem"
          
        }}
      >
        {questionNumber}/10
      </p>
    </div>
  );
};

export default App;
