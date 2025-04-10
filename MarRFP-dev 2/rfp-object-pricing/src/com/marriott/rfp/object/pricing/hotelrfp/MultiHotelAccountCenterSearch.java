package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.filterLists.RegionFilterValue;

public class MultiHotelAccountCenterSearch implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private Long period;
	private List<HotelAffiliation> brandlist;
	private String brandAll;
	private RegionFilterValue regionfiltervalue;
	private String newAccountsOnly;
	private String accounttype;
	private String subset;
	private Long dueDate;
	private String accountstatus = "ALL";
	private String strAccountrecid;

	public MultiHotelAccountCenterSearch() {
		super();
		regionfiltervalue = new RegionFilterValue();
		regionfiltervalue.setAreaOrRegion("C");
		newAccountsOnly = "N";
	}

	public String getBrandAll() {
		return brandAll;
	}

	public void setBrandAll(String brandAll) {
		this.brandAll = brandAll;
	}

	public RegionFilterValue getRegionfiltervalue() {
		return regionfiltervalue;
	}

	public void setRegionfiltervalue(RegionFilterValue regionfiltervalue) {
		this.regionfiltervalue = regionfiltervalue;
	}

	public void setBrandlist(List<HotelAffiliation> brandlist) {
		this.brandlist = brandlist;
	}

	public List<HotelAffiliation> getBrandlist() {
		return brandlist;
	}

	public String getStringBrandList() {
		String brandliststring = null;
		if (brandlist != null) {
			brandliststring = "";
			for (int i = 0; i < brandlist.size(); i++) {
				if (brandlist.get(i) != null) {
					if (brandliststring.length() > 0)
						brandliststring += ", ";
					brandliststring += brandlist.get(i).getAffiliationid();
				}
			}
		}
		return brandliststring;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public String getNewAccountsOnly() {
		return newAccountsOnly;
	}

	public void setNewAccountsOnly(String newAccountsOnly) {
		this.newAccountsOnly = newAccountsOnly;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public Long getDueDate() {
		return dueDate;
	}

	public void setDueDate(Long dueDate) {
		this.dueDate = dueDate;
	}

	public void setStrAccountrecid(String strAccountrecid) {
		this.strAccountrecid = strAccountrecid;
		if (strAccountrecid != null && !strAccountrecid.equals(""))
			this.accountrecid = Long.valueOf(strAccountrecid);
	}

	public String getStrAccountrecid() {
		return strAccountrecid;
	}

	public void setAccountstatus(String accountstatus) {
		if (accountstatus == null)
			this.accountstatus = "ALL";
		else
			this.accountstatus = accountstatus;
	}

	public String getAccountstatus() {
		return accountstatus;
	}

	public void setSubset(String subset) {
		this.subset = subset;
	}

	public String getSubset() {
		return subset;
	}

}
