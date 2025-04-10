package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.sapp.BTOverview;

import java.util.List;

public class AcctBTOverview {
    private String lLastupdatedate;
    private boolean checkFields;
    private String previousScreen;
    private String nextScreen;
    private String currentScreen;
    private long revStreamId;
    private BTOverview acctOverviewBTReqs;
    private List<PricingPeriod> pricingPeriodList;

    public String getlLastupdatedate() {
        return lLastupdatedate;
    }

    public void setlLastupdatedate(String lLastupdatedate) {
        this.lLastupdatedate = lLastupdatedate;
    }

    public boolean isCheckFields() {
        return checkFields;
    }

    public void setCheckFields(boolean checkFields) {
        this.checkFields = checkFields;
    }

    public String getPreviousScreen() {
        return previousScreen;
    }

    public void setPreviousScreen(String previousScreen) {
        this.previousScreen = previousScreen;
    }

    public String getNextScreen() {
        return nextScreen;
    }

    public void setNextScreen(String nextScreen) {
        this.nextScreen = nextScreen;
    }

    public String getCurrentScreen() {
        return currentScreen;
    }

    public void setCurrentScreen(String currentScreen) {
        this.currentScreen = currentScreen;
    }

    public long getRevStreamId() {
        return revStreamId;
    }

    public void setRevStreamId(long revStreamId) {
        this.revStreamId = revStreamId;
    }

    public BTOverview getAcctOverviewBTReqs() {
        return acctOverviewBTReqs;
    }

    public void setAcctOverviewBTReqs(BTOverview acctOverviewBTReqs) {
        this.acctOverviewBTReqs = acctOverviewBTReqs;
    }

    public List<PricingPeriod> getPricingPeriodList() {
        return pricingPeriodList;
    }

    public void setPricingPeriodList(List<PricingPeriod> pricingPeriodList) {
        this.pricingPeriodList = pricingPeriodList;
    }
}
