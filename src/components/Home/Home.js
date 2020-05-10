import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import Context from "../../Context";

class Home extends PureComponent {
  state = {};

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
        <h1>Haiku Dada</h1>
        <div className="btn_box">
          <button onClick={this.onClickGenerator}>Haiku Generator</button>
          <button onClick={(e) => this.props.history.push("/list")}>
            View All
          </button>
          <button onClick={this.onClickHaikuShift}>Haiku Shift</button>
        </div>
        <p>
          Haiku Dada is a platform where users can auto-generate new haikus by
          using a madlibs-style form. Users can also view all previously created
          haikus. Finally, users can view a randomly generated haiku - based on
          the inputs of previous users.
        </p>
      </div>
    );
  }
}

export default withRouter(Home);
