package com.marriott.rfp.dataacess.pricing.period.api;

import java.util.Date;
import java.util.List;



import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;


public interface PeriodManager {
	public List<Period> findAllPeriodsForRole(String role);

	public List<Period> findPeriodsForMaintenance();
	
	public List<Period> findCBCPeriodsForMaintenance();

	public PricingPeriod findDueDate(Long pricingperiodid);
	
	public PricingPeriod findCBCDueDate(Long pricingperiodid);

	public void updateDueDate(PricingPeriod dueDate);
	
	public void updateCBCDueDate(PricingPeriod dueDate);

	public void deleteDueDate(Long pricingperiodid);
	
	public void deleteCBCDueDate(Long pricingperiodid);

	public void updateHotelView(Period period);
	
	public void updateCBCHotelView(Period period);

	public List<PricingPeriod> findDueDates(long period);

	public List<Period> findAllPeriodsExcept(long period);

	public Period findPeriodDetails(long period);

	public Date getSysDate();
	
	public List<Period> findAllWSPeriodsForRole(String role);

	public List<PricingPeriod> findDueDatesWithCurrentDate(long period);
	
	public String getNoPricingFlag(long hotelrfpid);
}
