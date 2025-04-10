package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;
import com.marriott.rfp.object.user.User;


public interface PortfolioRebidManager {

    public List<PortfolioRebid> findPortfolioRebid(PricingFilterSelections filterValues, User user);

    public void updatePortfolioRebidList(List<PortfolioRebid> pslist, Long accountrecid, User user);

}
