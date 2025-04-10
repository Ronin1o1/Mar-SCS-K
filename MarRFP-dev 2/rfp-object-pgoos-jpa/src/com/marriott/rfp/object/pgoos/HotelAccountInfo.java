package com.marriott.rfp.object.pgoos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class HotelAccountInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private Long hotelid;
	private Long accountid;
	private String aerAccount;
	private String excludeAer;
	private String islos;
	private String rpgms;
	private String eid;
	private Long period;
	private Long processid;
	private Long batchid;
	private String marshacode;
	private Date contractend;
	private Date startdate;
	private String accProductid;
	private String discfirsttieronly;
	private String altcancelpolicytime;	
	private Long altcancelpolicyoptionid;	
	private Long hotel_accountinfoid;
	private Long hotelrfpid;
	private String selected;
	private String delete_old_rateprogs;
	private Long ratetype_selected;
	private Long marketCode;
	private Double percentdiscount;
	private Double distance;
	private String distanceunit;
	private String currencyCode;
	private String accountName;
	private String com;
	private String breakfast;
	private String productid1;
	private String productid2;
	private String productid3;
	private String isGPP;
	private String twoyear;
	private String lrathreeweeks;
	private Long affiliationid;
	private List<RoomPool> rmPools;
	private String status = "HOLD";
	private String extendcancelpolicy;	
	private Long altcxlpolicytimeid;
	private String altcxlpolicytime;
	private Double enhancedDiscount;
	private List<RoomPool> prefRatePrograms = new ArrayList<RoomPool>();
	private List<RoomPool> gppRatePrograms = new ArrayList<RoomPool>();

	public String getAerAccount() {
		return aerAccount;
	}

	public void setAerAccount(String aerAccount) {
		this.aerAccount = aerAccount;
	}

	public void setExcludeAer(String excludeAer) {
		this.excludeAer = excludeAer;
	}

	public String getExcludeAer() {
		return excludeAer;
	}

	public boolean isGPPAccount() {
		return (aerAccount.equals("Y") && excludeAer.equals("N"));
	}

	public void setRpgms(String rpgms) {
		this.rpgms = rpgms;
	}

	public String getRpgms() {
		return rpgms;
	}

	public String getQuotedRpgms() {
		String strrpgms = "";
		String[] therpgm = rpgms.split(",");
		for (int i = 0; i < therpgm.length; i++) {
			if (strrpgms.length() > 0)
				strrpgms += ", ";
			strrpgms += "'" + therpgm[i].trim() + "'";
		}
		return strrpgms;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public String getEid() {
		return eid;
	}

	public void setIslos(String islos) {
		this.islos = islos;
	}

	public String getIslos() {
		return islos;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}

	public void setProcessid(Long processid) {
		this.processid = processid;
	}

	public Long getProcessid() {
		return processid;
	}

	public void setBatchid(Long batchid) {
		this.batchid = batchid;
	}

	public Long getBatchid() {
		return batchid;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public String getMarshacode() {
		return marshacode;
	}

	public void setAccProductid(String accProductid) {
		this.accProductid = accProductid;
	}

	public String getAccProductid() {
		return accProductid;
	}

	public String getDiscfirsttieronly() {
		return discfirsttieronly;
	}

	public void setDiscfirsttieronly(String discfirsttieronly) {
		this.discfirsttieronly = discfirsttieronly;
	}

	public void setContractend(Date contractend) {
		this.contractend = contractend;
	}

	public Date getContractend() {
		return contractend;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	public Long getAccountid() {
		return accountid;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setAltcancelpolicytime(String altcancelpolicytime) {
		this.altcancelpolicytime = altcancelpolicytime;
	}

	public String getAltcancelpolicytime() {
		return altcancelpolicytime;
	}

	public Long getAltcancelpolicyoptionid() {
		return altcancelpolicyoptionid;
	}

	public void setAltcancelpolicyoptionid(Long altcancelpolicyoptionid) {
		this.altcancelpolicyoptionid = altcancelpolicyoptionid;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public String getSelected() {
		return selected;
	}

	public void setSelected(String selected) {
		this.selected = selected;
	}

	public String getDelete_old_rateprogs() {
		return delete_old_rateprogs;
	}

	public void setDelete_old_rateprogs(String delete_old_rateprogs) {
		this.delete_old_rateprogs = delete_old_rateprogs;
	}

	public Long getRatetype_selected() {
		return ratetype_selected;
	}

	public void setRatetype_selected(Long ratetype_selected) {
		this.ratetype_selected = ratetype_selected;
	}

	public Long getMarketCode() {
		return marketCode;
	}

	public void setMarketCode(Long marketCode) {
		this.marketCode = marketCode;
	}

	public Double getPercentdiscount() {
		return percentdiscount;
	}

	public void setPercentdiscount(Double percentdiscount) {
		this.percentdiscount = percentdiscount;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public String getDistanceunit() {
		return distanceunit;
	}

	public void setDistanceunit(String distanceunit) {
		this.distanceunit = distanceunit;
	}

	public String getCurrencyCode() {
		return currencyCode;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getCom() {
		return com;
	}

	public void setCom(String com) {
		this.com = com;
	}

	public String getBreakfast() {
		return breakfast;
	}

	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}

	public String getProductid(Long roompool) {
		if (roompool == 1) {
			return productid1;
		} else if (roompool == 2) {
			return productid2;
		} else if (roompool == 3) {
			return productid3;
		}
		return null;
	}

	public String getProductid1() {
		return productid1;
	}

	public void setProductid1(String productid1) {
		this.productid1 = productid1;
	}

	public String getProductid2() {
		return productid2;
	}

	public void setProductid2(String productid2) {
		this.productid2 = productid2;
	}

	public String getProductid3() {
		return productid3;
	}

	public void setProductid3(String productid3) {
		this.productid3 = productid3;
	}

	public void setIsGPP(String isGPP) {
		this.isGPP = isGPP;
	}

	public String getIsGPP() {
		return isGPP;
	}

	public void setTwoyear(String twoyear) {
		this.twoyear = twoyear;
	}

	public void setLrathreeweeks(String lrathreeweeks) {
		this.lrathreeweeks = lrathreeweeks;
	}
	
	public String getLrathreeweeks() {
		return lrathreeweeks;
	}
	
	public String getTwoyear() {
		return twoyear;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public void setRmPools(List<RoomPool> rmPools) {
		this.rmPools = rmPools;
	}

	public List<RoomPool> getRmPools() {
		return rmPools;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public String getYearMinusY() {
		String value = "N";
		if (twoyear.equals("N")) {
			value = "Y";
		}
		return value;
	}

	public boolean getIsFloatingRate() {
		boolean isFloat = false;
		if (ratetype_selected == 18 || ratetype_selected == 20) {
			isFloat = true;
		}
		return isFloat;
	}

	public void setExtendcancelpolicy(String extendcancelpolicy) {
		this.extendcancelpolicy = extendcancelpolicy;
	}

	public String getExtendcancelpolicy() {
		return extendcancelpolicy;
	}

	public Long getAltcxlpolicytimeid() {
		return altcxlpolicytimeid;
	}

	public void setAltcxlpolicytimeid(Long altcxlpolicytimeid) {
		this.altcxlpolicytimeid = altcxlpolicytimeid;
	}

	public String getAltcxlpolicytime() {
		return altcxlpolicytime;
	}

	public void setAltcxlpolicytime(String altcxlpolicytime) {
		this.altcxlpolicytime = altcxlpolicytime;
	}

	public List<RoomPool> getPrefRatePrograms() {
		return prefRatePrograms;
	}

	public void setPrefRatePrograms(List<RoomPool> prefRatePrograms) {
		this.prefRatePrograms = prefRatePrograms;
	}

	public List<RoomPool> getGppRatePrograms() {
		return gppRatePrograms;
	}

	public void setGppRatePrograms(List<RoomPool> gppRatePrograms) {
		this.gppRatePrograms = gppRatePrograms;
	}

	public Double getEnhancedDiscount() {
		return enhancedDiscount;
	}

	public void setEnhancedDiscount(Double enhancedDiscount) {
		this.enhancedDiscount = enhancedDiscount;
	}

}
