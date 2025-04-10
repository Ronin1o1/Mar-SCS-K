package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.object.user.User;


public interface PortfolioSelectionManager {

    public List<Portfolio> findPortfolioAvail(PricingFilterSelections filterValues, User user);

    public List<Portfolio> findPortfolioSelected(PricingFilterSelections filterValues, User user);

    public String updatePortfolioSelection(long accountrecid, String subset, List<Long> orgSelect, User user);

    public void deletePortfolioSelection(long accountrecid, String accountpricingtype, List<Long> orgSelect, User user);
}
