import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import Context from "../../Context";
import "./HaikuBox.css";

class HaikuBox extends Component {
  constructor(props) {
    super(props);
    this.top = React.createRef();
  }

  static contextType = Context;

  state = { penname: "", pennametouched: false, pennameError: null };

  componentDidMount() {
    window.scrollTo(0, this.top.current);
  }

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
    const letterNumber = /^[0-9a-zA-Z]+$/;

    if (
      !this.state.penname.match(letterNumber) &&
      this.state.penname.length > 0
    ) {
      return "Penname may not contain special characters or spaces";
    }

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
      <div>
        <nav>
          <Link className="navA" to="/">
            Haiku Dada
          </Link>
        </nav>
        <div ref={this.top} className="cont_haikubox">
          <div className="haikubox2">
            <p>{this.context.haiku[0]}</p>
            <p>{this.context.haiku[1]}</p>
            <p>{this.context.haiku[2]}</p>
          </div>
          {this.context.randomIds.length === 0 && (
            <div className="savebox">
              <p>That haiku looks pretty awesome!</p>
              <p>Save it to our collection?</p>
              <div className="optionalbox">
                <label className="penname" htmlFor="penname">
                  Optional: enter a penname
                </label>
                <input
                  onChange={this.handleChangePenname}
                  id="penname"
                  type="text"
                  value={penname}
                />
              </div>
              {this.state.pennametouched &&
                this.state.penname.length > 0 &&
                pennameError && <p>{pennameError}</p>}
              <button
                className="save"
                disabled={pennameError !== undefined}
                onClick={this.onClickSaveHaiku}
              >
                Save
              </button>
            </div>
          )}{" "}
          <button onClick={(e) => this.props.history.push("/form")}>
            Haiku Generator
          </button>
          <button onClick={(e) => this.props.history.push("/list")}>
            Collection
          </button>
          <p className="shiftp">
            Haiku Shift combines random phrases from the existing haiku
            collection.
          </p>
          <button onClick={this.onClickHaikuShift}>Haiku Shift</button>
        </div>
      </div>
    );
  }
}

export default withRouter(HaikuBox);
