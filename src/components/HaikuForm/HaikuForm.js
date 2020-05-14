import React, { Component } from "react";
import { withRouter } from "react-router";
import "./HaikuForm.css";
import Context from "../../Context";
import animals from "../../WordBanks/Animals";
import verbs_a from "../../WordBanks/VerbsActive";
import places from "../../WordBanks/PlacesSingular";
import adjectives from "../../WordBanks/Adjectives";
import verbs_p from "../../WordBanks/VerbsPassive";
import formLogic from "../../form-logic";

class HaikuForm extends Component {
  static contextType = Context;

  state = {
    animalsArr: animals,
    verbs_aArr: verbs_a,
    placesArr: places,
    adjectivesArr: adjectives,
    adjectivesArr2: adjectives,
    verbs_pArr: verbs_p,
    verbs_pArr2: verbs_p,
    animal1: {},
    verb_a: {},
    place: {},
    adjective: {},
    verb_p1: {},
    animal2: {},
    adjective2: {},
    verb_p2: {},
    p_error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      animal1,
      animal2,
      place,
      adjective,
      adjective2,
      verb_a,
      verb_p1,
      verb_p2,
      adjectivesArr,
      verbs_pArr,
    } = this.state;

    let verb_pOneS = this.state.verbs_pArr.filter(
      (v) => v.present.syllables === 1
    );
    let adjOneS = this.state.adjectivesArr.filter((a) => a.syllables === 1);

    let adjs2 = this.state.adjectivesArr.map((a) => a.word);

    //////////testing elements/////////////////
    // const animal1 = { word: "cat", syllables: 1 };
    // const animal2 = { word: "ant", syllables: 1 };
    // const place = { word: "rainforest", syllables: 3 };
    // const adjective = { word: "cantankerous", syllables: 4 };
    // const adjective2 = { word: "red", syllables: 1 };
    // const verb_a = { word: "play", syllables: 1 };
    // const verb_p1 = { word: "faint", syllables: 1 };
    // const verb_p2 = { word: "pray", syllables: 1 };

    let haikuHere = formLogic(
      animal1,
      animal2,
      place,
      adjective,
      adjective2,
      verb_a,
      verb_p1,
      verb_p2,
      verb_pOneS,
      adjOneS,
      adjs2,
      adjectivesArr,
      verbs_pArr
    );

    this.context.updateHaiku(haikuHere, this.props.history);
  };

  handleCancel = (e) => {
    this.props.history.push("/");
  };

  validateInput() {
    if (
      [
        this.state.animal1,
        this.state.animal2,
        this.state.place,
        this.state.adjective,
        this.state.adjective2,
        this.state.verb_a,
        this.state.verb_p1,
        this.state.verb_p2,
      ].find((obj) => Object.keys(obj).length === 0)
    ) {
      return "Complete all selections to save your new haiku!";
    }
  }

  handleChangeAnimal1 = (e) => {
    if (e.target.value) {
      this.setState({
        animal1: {
          word: e.target.value,
          syllables: parseFloat(
            this.state.animalsArr.find((a) => a.word === e.target.value)
              .syllables
          ),
        },
      });
    }
  };

  handleChangeVerbA = (e) => {
    if (e.target.value) {
      this.setState({
        verb_a: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_a.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  };

  handleChangePlace = (e) => {
    if (e.target.value) {
      this.setState(
        {
          place: {
            word: e.target.value,
            syllables: parseFloat(
              places.find((p) => p.word === e.target.value).syllables
            ),
          },
        },
        () => {
          if (
            this.state.animal1.syllables === 4 &&
            this.state.place.syllables === 3
          ) {
            this.setState({
              verbs_aArr: verbs_a.filter((v) => v.present.syllables < 4),
            });
          }
        }
      );
    }
  };

  handleChangeAdjective = (e) => {
    if (e.target.value) {
      this.setState({
        adjective: {
          word: e.target.value,
          syllables: parseFloat(
            adjectives.find((ad) => ad.word === e.target.value).syllables
          ),
        },
      });
    }
  };

  handleChangeAdjective2 = (e) => {
    if (e.target.value) {
      this.setState({
        adjective2: {
          word: e.target.value,
          syllables: parseFloat(
            adjectives.find((ad) => ad.word === e.target.value).syllables
          ),
        },
      });
    }
  };

  handleChangeVerbP1 = (e) => {
    if (e.target.value) {
      this.setState(
        {
          verb_p1: {
            word: e.target.value,
            syllables: parseFloat(
              verbs_p.find((v) => v.present.word === e.target.value).present
                .syllables
            ),
          },
        },
        () => {
          if (this.state.verb_p1.syllables === 3) {
            this.setState({
              adjectivesArr2: adjectives.filter((ad) => ad.syllables === 1),
            });
          }
        }
      );
    }
  };

  handleChangeAnimal2 = (e) => {
    if (e.target.value) {
      this.setState({
        animal2: {
          word: e.target.value,
          syllables: parseFloat(
            this.state.animalsArr.find((a) => a.word === e.target.value)
              .syllables
          ),
        },
      });
    }
  };

  handleChangeVerbP2 = (e) => {
    if (e.target.value) {
      this.setState({
        verb_p2: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_p.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  };

  render() {
    const {
      animalsArr,
      verbs_aArr,
      placesArr,
      adjectivesArr,
      adjectivesArr2,
      verbs_pArr,
      animal1,
      verb_a,
      place,
      adjective,
      verb_p1,
      animal2,
      adjective2,
      verb_p2,
    } = this.state;

    const inputError = this.validateInput();

    return (
      <form className="HaikuForm_form" onSubmit={this.handleSubmit}>
        <p className="tiny">
          Pro-tip: click on the drop-down menu, then start typing to quickly
          find a selection.
        </p>
        <div className="select_box">
          <label htmlFor="animal1">Choose an animal</label>
          <select
            onChange={this.handleChangeAnimal1}
            name="animal1"
            id="animal1"
            required
            value={animal1.word}
          >
            <option></option>
            {animalsArr.map((a, i) => (
              <option key={i} value={a.word}>
                {a.word}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="place">Choose a place</label>
          <select
            onChange={this.handleChangePlace}
            name="place"
            id="place"
            required
            value={place.word}
          >
            <option></option>
            {placesArr.map((p, i) => (
              <option key={i} value={p.word}>
                {p.word}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="verb_a">Choose a verb</label>
          <select
            onChange={this.handleChangeVerbA}
            name="verb_a"
            id="verb_a"
            required
            value={verb_a.word}
          >
            <option></option>
            {verbs_aArr.map((v, i) => (
              <option key={i} value={v.present.word}>
                {v.present.word}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="adjective">Choose an adjective</label>
          <select
            onChange={this.handleChangeAdjective}
            name="adjective"
            id="adjective"
            required
            value={adjective.word}
          >
            <option></option>
            {adjectivesArr.map((ad, i) => (
              <option key={i} value={ad.word}>
                {ad.word}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="verb_p1">Choose another verb</label>
          <select
            onChange={this.handleChangeVerbP1}
            name="verb_p1"
            id="verb_p1"
            required
            value={verb_p1.word}
          >
            <option></option>
            {verbs_pArr.map((v, i) => (
              <option key={i} value={v.present.word}>
                {v.present.word}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="animal2">Choose another animal</label>
          <select
            onChange={this.handleChangeAnimal2}
            name="animal2"
            id="animal2"
            required
            value={animal2.word}
          >
            <option></option>
            {animalsArr
              .filter((a) => a.word !== animal1.word && a.syllables < 3)
              .map((a, i) => (
                <option key={i} value={a.word}>
                  {a.word}
                </option>
              ))}
          </select>
        </div>{" "}
        <div className="select_box">
          <label htmlFor="verb_p2">Choose another verb</label>
          <select
            onChange={this.handleChangeVerbP2}
            name="verb_p2"
            id="verb_p2"
            required
            value={verb_p2.word}
          >
            <option></option>
            {verbs_pArr
              .filter((v) => v.present.word !== verb_p1.word)
              .map((v, i) => (
                <option key={i} value={v.present.word}>
                  {v.present.word}
                </option>
              ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="adjective2">Choose another adjective</label>
          <select
            onChange={this.handleChangeAdjective2}
            name="adjective2"
            id="adjective2"
            required
            value={adjective2.word}
          >
            <option></option>
            {adjectivesArr2
              .filter((ad) => ad.syllables === 1 && ad.word !== adjective.word)
              .map((ad, i) => (
                <option key={i} value={ad.word}>
                  {ad.word}
                </option>
              ))}
            }
          </select>
        </div>
        <div className="HaikuForm__buttons">
          <p>{inputError}</p>
          <button type="button" onClick={this.handleCancel}>
            Cancel
          </button>{" "}
          <button disabled={inputError !== undefined} type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(HaikuForm);
