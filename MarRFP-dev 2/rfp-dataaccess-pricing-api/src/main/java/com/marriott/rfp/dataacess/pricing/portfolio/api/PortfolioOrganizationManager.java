package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.object.user.User;


public interface PortfolioOrganizationManager {

    public List<Portfolio> findPortfolioOrganization(PricingFilterSelections filterValues, int subsetnum, User user);

    public void  updatePortfolioOrganization(long accountrecid,String subset, List<Long> orgSelect, User user);

}
