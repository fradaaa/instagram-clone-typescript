import { Component } from "react";
import { Button } from "../Buttons/style";
import DisplayError from "./DisplayError";

type Props = {};

type State = {
  error: Error | null;
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state = { error: null, hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  refresh = () => {
    this.setState({ error: null, hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <DisplayError>
          <Button onClick={this.refresh}>Try again</Button>
        </DisplayError>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
