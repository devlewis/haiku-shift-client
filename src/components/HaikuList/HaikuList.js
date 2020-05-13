import React, { PureComponent } from "react";
import Context from "../../Context";
import { withRouter } from "react-router";
import "./HaikuList.css";

class HaikuList extends PureComponent {
  static contextType = Context;

  onClickHaikuShift = () => {
    this.context.randomizeHaiku(this.props.history);
  };

  componentWillUnmount() {
    this.context.eraseIds();
  }

  render() {
    return (
      <div>
        {this.context.randomIds.length > 0 && (
          <div className="haikubox">
            <h1>Haiku Shift</h1>
            <p>
              {this.context.haiku[0]}
              <br />
              {this.context.haiku[1]}
              <br />
              {this.context.haiku[2]}
            </p>
            <p>
              Lines originally found in haikus #{this.context.randomIds[0]}, #
              {this.context.randomIds[1]}, and #{this.context.randomIds[2]}
            </p>
          </div>
        )}
        <div className="cont_haikulist">
          {this.context.haikuStore.map((h, i) => (
            <div key={i} className="haikulist_box">
              <p>Haiku # {h.id}</p>
              <p>Created {h.date_created}</p>
              <p>
                {h.haiku[0]}
                <br />
                {h.haiku[1]}
                <br />
                {h.haiku[2]}
              </p>
              {h.penname.length > 0 ? (
                <p>Genreated By: {h.penname}</p>
              ) : (
                <p>anonymous</p>
              )}
            </div>
          ))}
        </div>
        <button onClick={(e) => this.props.history.push("/form")}>
          Haiku Generator
        </button>
        <p>
          A study in haiku dada: click the Haiku Shift button to combine random
          phrases from the existing haikus. You may discover a beautiful new
          poem...
        </p>
        <button onClick={this.onClickHaikuShift}>Haiku Shift</button>
      </div>
    );
  }
}

export default withRouter(HaikuList);
