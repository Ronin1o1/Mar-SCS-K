package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatus;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatusDO;
import com.marriott.rfp.object.user.User;


public interface PortfolioStatusManager {

    public List<PortfolioStatusDO> findPortfolioStatus(PricingFilterSelections filterValues, User user);

    public void updatePortfolioStatusList(List<PortfolioStatus> pslist, Long accountrecid, User user);

    public void updateAcceptancePortfolioStatusList(String acceptReject, List<PortfolioStatus> pslist, Long accountrecid, User user, int rejectionReasonID);
}
