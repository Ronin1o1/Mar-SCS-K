package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.util.List;

public class RfpSettingsDropDownLists implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<RfpSettingsList> gbtaList; 
	private List<RfpSettingsList> maxseasonList;
	private List<RfpSettingsList> maxrtList;
	private List<RfpSettingsList> rtallowedList;
	private List<RfpSettingsList> ratevisibleList;
	private List<RfpSettingsList> edierfpList;
	private List<RfpSettingsList> accLeadList;
	private List<RfpSettingsList> sharedaccLeadList;
	private List<RfpSettingsList> btamList;
	
	public List<RfpSettingsList> getGbtaList() {
		return gbtaList;
	}
	public void setGbtaList(List<RfpSettingsList> gbtaList) {
		this.gbtaList = gbtaList;
	}
	public List<RfpSettingsList> getMaxseasonList() {
		return maxseasonList;
	}
	public void setMaxseasonList(List<RfpSettingsList> maxseasonList) {
		this.maxseasonList = maxseasonList;
	}
	public List<RfpSettingsList> getMaxrtList() {
		return maxrtList;
	}
	public void setMaxrtList(List<RfpSettingsList> maxrtList) {
		this.maxrtList = maxrtList;
	}
	public List<RfpSettingsList> getRtallowedList() {
		return rtallowedList;
	}
	public void setRtallowedList(List<RfpSettingsList> rtallowedList) {
		this.rtallowedList = rtallowedList;
	}
	public List<RfpSettingsList> getRatevisibleList() {
		return ratevisibleList;
	}
	public void setRatevisibleList(List<RfpSettingsList> ratevisibleList) {
		this.ratevisibleList = ratevisibleList;
	}
	public List<RfpSettingsList> getEdierfpList() {
		return edierfpList;
	}
	public void setEdierfpList(List<RfpSettingsList> edierfpList) {
		this.edierfpList = edierfpList;
	}
	public List<RfpSettingsList> getAccLeadList() {
		return accLeadList;
	}
	public void setAccLeadList(List<RfpSettingsList> accLeadList) {
		this.accLeadList = accLeadList;
	}
	public List<RfpSettingsList> getSharedaccLeadList() {
		return sharedaccLeadList;
	}
	public void setSharedaccLeadList(List<RfpSettingsList> sharedaccLeadList) {
		this.sharedaccLeadList = sharedaccLeadList;
	}
	public List<RfpSettingsList> getBtamList() {
		return btamList;
	}
	public void setBtamList(List<RfpSettingsList> btamList) {
		this.btamList = btamList;
	}

}
