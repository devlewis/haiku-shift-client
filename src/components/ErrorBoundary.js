import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({
      hasError: true,
    });
  }

  render() {
    console.log(this.state, this.props.error);
    if (this.state.hasError || this.props.error) {
      return (
        <h2>
          Could not display! Please refresh your server or try again later.
        </h2>
      );
    }
    return this.props.children;
  }
}
