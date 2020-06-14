import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./HaikuForm.css";
import Context from "../../Context";
import animals from "../../WordBanks/Animals";
import verbs_a from "../../WordBanks/VerbsActive";
import places from "../../WordBanks/PlacesSingular";
import adjectives from "../../WordBanks/Adjectives";
import verbs_p from "../../WordBanks/VerbsPassive";
import formLogic from "../../FormLogic/form-logic";

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
    verbActive: {},
    place: {},
    adjective: {},
    verbPassive1: {},
    animal2: {},
    adjective2: {},
    verbPassive2: {},
    p_error: null,
    touched1: false,
    touched2: false,
    touched3: false,
    touched4: false,
    touched5: false,
    touched6: false,
    touched7: false,
    touched8: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      animal1,
      animal2,
      place,
      adjective,
      adjective2,
      verbActive,
      verbPassive1,
      verbPassive2,
      adjectivesArr,
      verbs_pArr,
    } = this.state;

    let verbPassiveOneS = this.state.verbs_pArr.filter(
      (v) => v.present.syllables === 1
    );
    let adjOneS = this.state.adjectivesArr.filter((a) => a.syllables === 1);

    let adjs2 = this.state.adjectivesArr.map((a) => a.word);

    let inputs = [
      animal1,
      animal2,
      place,
      adjective,
      adjective2,
      verbActive,
      verbPassive1,
      verbPassive2,
      verbPassiveOneS,
      adjOneS,
      adjs2,
      adjectivesArr,
      verbs_pArr,
    ];

    let haikuHere = formLogic(...inputs);

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
        this.state.verbActive,
        this.state.verbPassive1,
        this.state.verbPassive2,
      ].find((obj) => Object.keys(obj).length === 0) &&
      this.state.touched8
    ) {
      return "Complete selection to save your new haiku!";
    }
  }

  handleChangeAnimal1 = (e) => {
    if (e.target.value) {
      this.setState({
        touched1: true,
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

  handleChangePlace = (e) => {
    if (e.target.value) {
      this.setState(
        {
          touched2: true,
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

  handleChangeVerbA = (e) => {
    if (e.target.value) {
      this.setState({
        touched3: true,
        verbActive: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_a.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  };

  handleChangeAdjective = (e) => {
    if (e.target.value) {
      this.setState({
        touched4: true,
        adjective: {
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
          touched5: true,
          verbPassive1: {
            word: e.target.value,
            syllables: parseFloat(
              verbs_p.find((v) => v.present.word === e.target.value).present
                .syllables
            ),
          },
        },
        () => {
          if (this.state.verbPassive1.syllables === 3) {
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
        touched6: true,
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
        touched7: true,
        verbPassive2: {
          word: e.target.value,
          syllables: parseFloat(
            verbs_p.find((v) => v.present.word === e.target.value).present
              .syllables
          ),
        },
      });
    }
  };

  handleChangeAdjective2 = (e) => {
    if (e.target.value) {
      this.setState({
        touched8: true,
        adjective2: {
          word: e.target.value,
          syllables: parseFloat(
            adjectives.find((ad) => ad.word === e.target.value).syllables
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
      verbActive,
      place,
      adjective,
      verbPassive1,
      animal2,
      adjective2,
      verbPassive2,
    } = this.state;

    const inputError = this.validateInput();

    return (
      <div>
        <nav>
          <Link className="navA" to="/">
            Haiku Dada
          </Link>
        </nav>
        <form className="HaikuForm_form" onSubmit={this.handleSubmit}>
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
          {this.state.touched1 && (
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
          )}
          {this.state.touched2 && (
            <div className="select_box">
              <label htmlFor="verbActive">Choose a verb</label>
              <select
                onChange={this.handleChangeVerbA}
                name="verbActive"
                id="verbActive"
                required
                value={verbActive.word}
              >
                <option></option>
                {verbs_aArr.map((v, i) => (
                  <option key={i} value={v.present.word}>
                    {v.present.word}
                  </option>
                ))}
              </select>
            </div>
          )}
          {this.state.touched3 && (
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
          )}
          {this.state.touched4 && (
            <div className="select_box">
              <label htmlFor="verbPassive1">Choose another verb</label>
              <select
                onChange={this.handleChangeVerbP1}
                name="verbPassive1"
                id="verbPassive1"
                required
                value={verbPassive1.word}
              >
                <option></option>
                {verbs_pArr.map((v, i) => (
                  <option key={i} value={v.present.word}>
                    {v.present.word}
                  </option>
                ))}
              </select>
            </div>
          )}
          {this.state.touched5 && (
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
            </div>
          )}
          {this.state.touched6 && <p className="med">two more!</p>}
          {this.state.touched6 && (
            <div className="select_box">
              <label htmlFor="verbPassive2">Choose another verb</label>
              <select
                onChange={this.handleChangeVerbP2}
                name="verbPassive2"
                id="verbPassive2"
                required
                value={verbPassive2.word}
              >
                <option></option>
                {verbs_pArr
                  .filter((v) => v.present.word !== verbPassive1.word)
                  .map((v, i) => (
                    <option key={i} value={v.present.word}>
                      {v.present.word}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {this.state.touched7 && (
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
                  .filter(
                    (ad) => ad.syllables === 1 && ad.word !== adjective.word
                  )
                  .map((ad, i) => (
                    <option key={i} value={ad.word}>
                      {ad.word}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="HaikuForm__buttons">
            <p>{inputError}</p>
            {this.state.touched8 && (
              <button disabled={inputError !== undefined} type="submit">
                Save
              </button>
            )}
            <button type="button" onClick={this.handleCancel}>
              Cancel
            </button>{" "}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(HaikuForm);
