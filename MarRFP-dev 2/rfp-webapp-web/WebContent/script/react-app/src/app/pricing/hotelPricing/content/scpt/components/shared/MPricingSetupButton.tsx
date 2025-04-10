import React from "react";
import BasePricingSetupButton from "../base/BasePricingSetupButton";

interface IProps {
  id: string;
  label: string;
  onClick: (event) => void;
}

interface IState {}

export default class MPricingSetupButton extends React.Component<
  IProps,
  IState
> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BasePricingSetupButton id={this.props.id} onClick={this.props.onClick}>
        {this.props.label}
      </BasePricingSetupButton>
    );
  }
}
