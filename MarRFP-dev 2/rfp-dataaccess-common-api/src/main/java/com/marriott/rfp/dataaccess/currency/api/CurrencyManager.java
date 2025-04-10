package com.marriott.rfp.dataaccess.currency.api;

import java.util.List;



import com.marriott.rfp.object.currency.CurrencyData;


public interface CurrencyManager {
	public List<CurrencyData> findCurrencyList(String currencyCode);

	public CurrencyData findAccountTrackingCurrency(long hotelrfpid);

	public void updateAccountTrackingCurrency(long hotelrfpid, CurrencyData accountTrackingCurrency);
}
