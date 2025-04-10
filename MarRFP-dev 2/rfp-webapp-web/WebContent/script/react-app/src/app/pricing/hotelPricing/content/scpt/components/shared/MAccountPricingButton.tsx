import React from "react";
import BaseAccountPricingButton from "../base/BaseAccountPricingButton";

interface IProps {
  id: string;
  label: string;
  onClick: (event) => void;
}

interface IState {}

export default class MAccountPricingButton extends React.Component<
  IProps,
  IState
> {
  render() {
    return (
      <BaseAccountPricingButton id={this.props.id} onClick={this.props.onClick}>
        {this.props.label}
      </BaseAccountPricingButton>
    );
  }
}
