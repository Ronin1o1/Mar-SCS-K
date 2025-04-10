package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelRFPStandards implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String distanceunit;
	private Long commissionrate;
	private String aggregate_tax_inc;
	private String service_fee_type_included;
	private String netoutrates;
	private String currencycode;
	private String delete_old_rateprogs;
	private String standardrmdesc;
	private String currencyname;
	private String iscomplete;
	private String canhavefirstroompool;
	private String canhavesecondroompool;
	private String canhavethirdroompool;
	private List<HotelRFPStandardRmPools> hotelRFPStandardRmPools;
	private String exempt_gpp;

	public String getDistanceunit() {
		return distanceunit;
	}

	public void setDistanceunit(String distanceunit) {
		this.distanceunit = distanceunit;
	}

	public Long getCommissionrate() {
		return commissionrate;
	}

	public void setCommissionrate(Long commissionrate) {
		this.commissionrate = commissionrate;
	}

	public String getAggregate_tax_inc() {
		return aggregate_tax_inc;
	}

	public void setAggregate_tax_inc(String aggregate_tax_inc) {
		this.aggregate_tax_inc = aggregate_tax_inc;
	}

	public String getService_fee_type_included() {
		return service_fee_type_included;
	}

	public void setService_fee_type_included(String service_fee_type_included) {
		this.service_fee_type_included = service_fee_type_included;
	}

	public String getNetoutrates() {
		return netoutrates;
	}

	public void setNetoutrates(String netoutrates) {
		this.netoutrates = netoutrates;
	}

	public String getCurrencycode() {
		return currencycode;
	}

	public void setCurrencycode(String currencycode) {
		this.currencycode = currencycode;
	}

	public String getDelete_old_rateprogs() {
		return delete_old_rateprogs;
	}

	public void setDelete_old_rateprogs(String delete_old_rateprogs) {
		this.delete_old_rateprogs = delete_old_rateprogs;
	}

	public String getStandardrmdesc() {
		return standardrmdesc;
	}

	public void setStandardrmdesc(String standardrmdesc) {
		this.standardrmdesc = standardrmdesc;
	}

	public String getCurrencyname() {
		return currencyname;
	}

	public void setCurrencyname(String currencyname) {
		this.currencyname = currencyname;
	}

	public String getIscomplete() {
		return iscomplete;
	}

	public void setIscomplete(String iscomplete) {
		this.iscomplete = iscomplete;
	}

	public String getCanhavesecondroompool() {
		return canhavesecondroompool;
	}

	public void setCanhavesecondroompool(String canhavesecondroompool) {
		this.canhavesecondroompool = canhavesecondroompool;
	}

	public void setHotelRFPStandardRmPools(List<HotelRFPStandardRmPools> hotelRFPStandardRmPools) {
		this.hotelRFPStandardRmPools = hotelRFPStandardRmPools;
	}

	public List<HotelRFPStandardRmPools> getHotelRFPStandardRmPools() {
		return hotelRFPStandardRmPools;
	}

	public String getCanhavefirstroompool() {
		return canhavefirstroompool;
	}

	public void setCanhavefirstroompool(String canhavefirstroompool) {
		this.canhavefirstroompool = canhavefirstroompool;
	}

	public String getCanhavethirdroompool() {
		return canhavethirdroompool;
	}

	public void setCanhavethirdroompool(String canhavethirdroompool) {
		this.canhavethirdroompool = canhavethirdroompool;
	}
	

	/**
	 * @return the exempt_gpp
	 */
	public String getExempt_gpp() {
		return exempt_gpp;
	}

	/**
	 * @param exempt_gpp the exempt_gpp to set
	 */
	public void setExempt_gpp(String exempt_gpp) {
		this.exempt_gpp = exempt_gpp;
	}


}
