package com.marriott.rfp.object.pricing.menu;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.pricing.period.Period;

public class PricingMenuData implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private List<PricingMenu> pricingmenuList;
    private List<Period> reportPeriods;
    private String nextScreen;
    private String previousScreen;
    private boolean blockPricingScreens = false;
    private String noPricing;

    public List<PricingMenu> getPricingmenuList() {
	return pricingmenuList;
    }

    public void setPricingmenuList(List<PricingMenu> pricingmenuList) {
	this.pricingmenuList = pricingmenuList;
    }

    public List<Period> getReportPeriods() {
	return reportPeriods;
    }

    public void setReportPeriods(List<Period> reportPeriods) {
	this.reportPeriods = reportPeriods;
    }

    public String getNextScreen() {
	return nextScreen;
    }

    public void setNextScreen(String nextScreen) {
	this.nextScreen = nextScreen;
    }

    public String getPreviousScreen() {
	return previousScreen;
    }

    public void setPreviousScreen(String previousScreen) {
	this.previousScreen = previousScreen;
    }

    public String getMainMenuMessage() {
	String msg = "";
	if (pricingmenuList != null) {
	    for (int i = 0; i < pricingmenuList.size(); i++) {
		PricingMenu pricingMenuItem = pricingmenuList.get(i);
		if (pricingMenuItem.getMessage() !=null && !pricingMenuItem.getMessage().equals("")) {
		    msg = pricingMenuItem.getMessage();
		    break;
		}
	    }
	}
	return msg;
    }

	public boolean isBlockPricingScreens() {
		return blockPricingScreens;
	}

	public void setBlockPricingScreens(boolean blockPricingScreens) {
		this.blockPricingScreens = blockPricingScreens;
	}

	public String getNoPricing() {
		return noPricing;
	}

	public void setNoPricing(String noPricing) {
		this.noPricing = noPricing;
	}
}
