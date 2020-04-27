import React from "react";
import "./TextField.css";

type TextFieldProps = {
  focused?: boolean;
  className: string;
  placeholder: string;
  onChange: any;
  value?: any;
};

class TextField extends React.Component<TextFieldProps> {
  state = {
    searchBarIsFocused: false,
    searchBarInput: "",
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  render() {
    return (
      <input
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        type="text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={`custom-text-input ${
          this.state.searchBarIsFocused ? "active" : null
        } ${this.props.className}`}
        value={this.props.value}
      />
    );
  }
}

export default TextField;
