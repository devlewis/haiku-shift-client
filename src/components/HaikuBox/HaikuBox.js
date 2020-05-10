import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Context from "../../Context";

class HaikuBox extends Component {
  static contextType = Context;

  state = { penname: "", pennametouched: false, pennameError: null };

  onClickSaveHaiku = () => {
    this.context.saveHaiku(this.state.penname, this.props.history);
  };

  onClickHaikuShift = () => this.context.randomizeHaiku(this.props.history);

  handleChangePenname = (e) => {
    this.setState({
      penname: e.target.value,
      pennametouched: true,
    });
  };

  validatePenname() {
    if (this.state.penname.length > 0 && this.state.penname.length > 20) {
      return "Penname must be shorter than 20 characters";
    }

    if (this.state.penname.length > 0 && this.state.penname.length < 5) {
      return "Penname must be longer than 5 characters";
    }
  }

  render() {
    const { penname } = this.state;

    const pennameError = this.validatePenname();

    return this.context.haiku.length === 0 ? (
      <Redirect to="/" />
    ) : (
      <div className="cont_haikubox">
        <div className="haikubox">
          <p>
            {this.context.haiku[0]}
            <br />
            {this.context.haiku[1]}
            <br />
            {this.context.haiku[2]}
          </p>
        </div>
        {this.context.randomIds.length === 0 && (
          <div className="saveBox">
            <p>
              That haiku looks pretty awesome! Would you like to save it to our
              bank? If so, optionally enter a penname and click save.
            </p>
            <p>Optional:</p>
            <label htmlFor="penname">Choose a penname for your new haiku</label>
            <input
              onChange={this.handleChangePenname}
              id="penname"
              type="text"
              value={penname}
            />
            {this.state.pennametouched &&
              this.state.penname.length > 0 &&
              pennameError && <p>{pennameError}</p>}
            <button
              disabled={pennameError !== undefined}
              onClick={this.onClickSaveHaiku}
            >
              Save
            </button>
          </div>
        )}
        {this.context.randomIds.length > 0 && (
          <p>
            Lines originally found in haikus #{this.context.randomIds[0]},{" "}
            {this.context.randomIds[1]}, {this.context.randomIds[2]}
          </p>
        )}
        <button onClick={(e) => this.props.history.push("/list")}>
          All haikus
        </button>
        <button onClick={(e) => this.props.history.push("/form")}>
          Haiku Generator
        </button>
        <p>
          A study in haiku anarchy: click the Haiku Shift button to combine
          random phrases from the existing haikus. You may discover a beautiful
          new poem...
        </p>
        <button onClick={this.onClickHaikuShift}>Haiku Shift</button>
      </div>
    );
  }
}

export default withRouter(HaikuBox);
