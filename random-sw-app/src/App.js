import React from 'react';
import './App.css';

class AffiliationRow extends React.Component {
  render() {
    return (
      <li>
        {this.props.aff}
      </li>
    )
  }
}

class StarWarsCharacter extends React.Component {
  constructor() {
    super()
    this.state = {
      loadedCharacter: false,
      name: null,
      image: null,
      height: null,
      gender: null,
      homeworld: null,
      species: null,
      wiki: null,
      affiliations: []
    }
  }

  getNewCharacter() {
    const randomNumber = Math.ceil(Math.random()*88);
    const url = `https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`;
    console.log(url);
    fetch(url).then(response => response.json()).then((data) =>
      this.setState({
        loadedCharacter: true,
        name: data.name,
        image: data.image,
        height: data.height,
        gender: data.gender,
        homeworld: data.homeworld,
        species: data.species,
        wiki: data.wiki,
        affiliations: data.affiliations,
      })
    );
  }

  render() {
    const affi = this.state.affiliations.map((aff, index) => {
      return <AffiliationRow aff={aff} key={index} />;
    })

    return (
      <div>
        {this.state.loadedCharacter && (
          <div>
            <h1>{this.state.name}</h1>
            <img alt={this.state.name} src={this.state.image} />
            <p>Height: {this.state.height} cm</p>
            <p>Gender: {this.state.gender}</p>
            <p>Homeworld: {this.state.homeworld}</p>
            <p>Species: {this.state.species}</p>
            <p>
              <a href={this.state.wiki} target="_blank" rel="noopener noreferrer">
                {this.state.name}'s wiki page
              </a>
            </p>
            <ul>Affiliations: {affi}</ul>
          </div>
        )}
        <button type="button" className='btn' onClick={() => this.getNewCharacter()}>Randomize Character!</button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWarsCharacter />
      </header>
    </div>
  );
}

export default App;
