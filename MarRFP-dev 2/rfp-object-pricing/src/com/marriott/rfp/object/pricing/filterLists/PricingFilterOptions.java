package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class PricingFilterOptions implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private PricingFilterRequired requiredOptions;
    private PricingFilterShow showOptions;

    public PricingFilterOptions() {
        super();
        requiredOptions = new PricingFilterRequired();
        showOptions = new PricingFilterShow();
    }

    public void setRequiredOptions(PricingFilterRequired requiredOptions) {
        this.requiredOptions = requiredOptions;
    }

    public PricingFilterRequired getRequiredOptions() {
        return requiredOptions;
    }

    public void setShowOptions(PricingFilterShow showOptions) {
        this.showOptions = showOptions;
    }

    public PricingFilterShow getShowOptions() {
        return showOptions;
    }


}
