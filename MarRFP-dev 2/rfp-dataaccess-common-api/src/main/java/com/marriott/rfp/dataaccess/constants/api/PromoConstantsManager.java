package com.marriott.rfp.dataaccess.constants.api;



import com.marriott.rfp.object.constants.Constants;


public interface PromoConstantsManager {

	public long getMaxSeasons();

	public long getMaxSubs();

	public long getMaxRateFactsLines();

	public String getMaxRateCat();

	public long getStdRpgmNumFields();

	public long getPrmRpgmNumFields();

	public long getFltRpgmNumFields();

	public int getPromoMarshaMaxDaysOut();

	public String getPromoContactEmail();

	public String getPromoContactName();

	public String getPromoProfileUpdateDays();
	
	public Constants getPromoContactEmailConst();
}
