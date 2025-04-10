package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;

import java.util.List;

public class PortfolioRebidList {
    List<PortfolioRebid> portfolioRebidList;
    List<String> emailNotSent;

    public List<PortfolioRebid> getPortfolioRebidList() {
        return portfolioRebidList;
    }

    public void setPortfolioRebidList(List<PortfolioRebid> portfolioRebidList) {
        this.portfolioRebidList = portfolioRebidList;
    }

    public List<String> getEmailNotSent() {
        return emailNotSent;
    }

    public void setEmailNotSent(List<String> emailNotSent) {
        this.emailNotSent = emailNotSent;
    }
}
