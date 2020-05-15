import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import Context from "../../Context";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends PureComponent {
  static contextType = Context;

  onClickGenerator = () => {
    this.props.history.push("/form");
  };

  onClickHaikuShift = () => {
    this.context.randomizeHaiku(this.props.history);
  };

  render() {
    return (
      <div className="cont_home">
        <div className="nav_shape">
          <h1 className="home_header">
            <Link to="/">Haiku Dada</Link>
          </h1>
          <div className="btn_box">
            <button className="slant" onClick={this.onClickHaikuShift}>
              Haiku Shift
            </button>
            <button
              className="slant"
              onClick={(e) => this.props.history.push("/list")}
            >
              Collection
            </button>
            <button className="hgbutton" onClick={this.onClickGenerator}>
              Haiku Generator
            </button>
          </div>
        </div>
        {/* <img src={img} alt="splat" className="splat" /> */}
        <div className="homep">
          <p>
            Haiku Dada is a platform where users can auto-generate new haikus by
            using a madlibs-style form.{" "}
          </p>{" "}
          <p>
            Since haikus generally consist of 5-syllable, 7-syllable, 5-syllable
            lines, generator logic controls the syllables and grammar rules for
            each line.{" "}
          </p>{" "}
          <p>
            {" "}
            Users can also view the collection of previously created haikus.{" "}
          </p>{" "}
          <p>
            Finally, users can view a randomly generated haiku - based on the
            inputs of previous users.
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
