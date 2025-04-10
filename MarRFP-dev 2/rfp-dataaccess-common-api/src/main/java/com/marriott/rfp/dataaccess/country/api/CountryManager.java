package com.marriott.rfp.dataaccess.country.api;

import java.util.List;



import com.marriott.rfp.object.country.Country;


public interface CountryManager {
	public List<Country> getCountries();

	public List<Country> getCountriesforHotels();

}
