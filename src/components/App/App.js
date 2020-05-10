import React, { Component } from "react";
import "./App.css";
import Context from "../../Context";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import HaikuBox from "../HaikuBox/HaikuBox";
import HaikuForm from "../HaikuForm/HaikuForm";
import HaikuList from "../HaikuList/HaikuList";
import Home from "../Home/Home";
import haikuStore from "../../HaikuSTORE";
import { Link, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    haiku: [],
    randomIds: [],
    id: 4,
    penname: "",
  };

  updateHaiku = (haikuHere, history) => {
    console.log(haikuHere);
    let prevState = this.state.id + 1;
    this.setState(
      {
        id: prevState,
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
      haikuStore.push({
        id: this.state.id,
        date_created: new Date().toDateString(),
        haiku: this.state.haiku,
        penname: this.state.penname,
      });
      history.push("/list");
    });
  };

  random3 = () => [0, 2][Math.floor(Math.random() * 2)];

  randomizeHaiku = (history) => {
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
        history.push("/haiku");
      }
    );
  };

  render() {
    const value = {
      saveHaiku: this.saveHaiku,
      updateHaiku: this.updateHaiku,
      haiku: this.state.haiku,
      randomIds: this.state.randomIds,
      haikuStore: haikuStore,
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
