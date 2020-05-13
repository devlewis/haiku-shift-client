import React, { Component } from "react";
import "./App.css";
import Context from "../../Context";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import HaikuBox from "../HaikuBox/HaikuBox";
import HaikuForm from "../HaikuForm/HaikuForm";
import HaikuList from "../HaikuList/HaikuList";
import Home from "../Home/Home";
//import haikuStore from "../../HaikuSTORE";
import HaikuApiService from "../../haiku-api-service";
import { Link, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    haiku: [],
    randomIds: [],
    penname: "",
    haikuStore: [],
  };

  componentDidMount() {
    HaikuApiService.getAllHaikus().then((haikus) =>
      this.fillHaikuStore(haikus)
    );
  }

  eraseIds = () => this.setState({ randomIds: [] });

  fillHaikuStore = (haikus) =>
    this.setState({
      haikuStore: haikus.sort((a, b) => (a.id > b.id ? 1 : -1)),
    });

  updateHaiku = (haikuHere, history) => {
    this.setState(
      {
        haiku: haikuHere,
        randomIds: [],
      },
      () => {
        history.push("/haiku");
      }
    );
  };

  saveHaiku = (penname, history) => {
    this.setState({ penname: penname }, () => {
      const [first, second, third] = this.state.haiku;
      HaikuApiService.insertNewHaiku([first, second, third, this.state.penname])
        .then(() => HaikuApiService.getAllHaikus())
        .then((haikus) => this.fillHaikuStore(haikus))
        .then(() => history.push("/list"));
    });
  };

  random3 = () => [0, 2][Math.floor(Math.random() * 2)];

  randomizeHaiku = (history) => {
    const haikuStore = this.state.haikuStore;

    const randomHaikuG = () =>
      haikuStore[Math.floor(Math.random() * haikuStore.length)];

    let randomHaiku = randomHaikuG();

    let phrase1 = [randomHaiku["haiku"][this.random3()], randomHaiku["id"]];

    randomHaiku = randomHaikuG();
    let phrase2 = [randomHaiku["haiku"][1], randomHaiku["id"]];

    randomHaiku = randomHaikuG();
    let phrase3 = [randomHaiku["haiku"][this.random3()], randomHaiku["id"]];

    let haikuHere = [phrase1[0], phrase2[0], phrase3[0]];

    let randomIds = [phrase1[1], phrase2[1], phrase3[1]];

    this.setState(
      {
        haiku: haikuHere,
        randomIds: randomIds,
      },
      () => {
        history.push("/list");
      }
    );
  };

  render() {
    const value = {
      eraseIds: this.eraseIds,
      fillHaikuStore: this.fillHaikuStore,
      saveHaiku: this.saveHaiku,
      updateHaiku: this.updateHaiku,
      haiku: this.state.haiku,
      randomIds: this.state.randomIds,
      haikuStore: this.state.haikuStore,
      randomizeHaiku: this.randomizeHaiku,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <header>
            <Link to="/">Haiku Dada</Link>
          </header>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/form" render={() => <HaikuForm />} />
            <Route path="/haiku" render={() => <HaikuBox />} />
            <Route path="/list" render={() => <HaikuList />} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
