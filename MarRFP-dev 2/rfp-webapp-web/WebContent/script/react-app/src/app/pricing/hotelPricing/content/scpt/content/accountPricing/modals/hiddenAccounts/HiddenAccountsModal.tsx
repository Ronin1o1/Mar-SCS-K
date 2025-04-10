import React from "react";
import pricingStyles from "../../AccountPricing.module.css";
import Table_HiddenAccounts from "./Table_HiddenAccounts";
import ModalContext from "../../../../context/ModalContext";
import API from "../../../../service/API";
import Settings from "../../../../data/Settings";
import Utils from "../../../../utils/Utils";

interface Iprops {
  handleClose?: () => void;
  hotelId: any;
}
interface Istate {}

export default class HiddenAccountsModal extends React.Component<
  Iprops,
  Istate
> {
  static contextType = ModalContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    API.getHiddenAccountsData(
      Utils.getAPIEndpointDetails(Settings.api.hiddenAccountsLoad, {
        hotelid: this.props.hotelId
      })
    ).then(data => {
      this.context.setHiddenAccountsData(data, this.props.hotelId);
    });
  }

  render() {
    return (
      <div>
        <div className={pricingStyles.modalSubTitle}>
          {Settings.text.label.accountPricing.hiddenAccountModal.subTitle}
        </div>
        <div>
          <Table_HiddenAccounts />
        </div>
      </div>
    );
  }
}
