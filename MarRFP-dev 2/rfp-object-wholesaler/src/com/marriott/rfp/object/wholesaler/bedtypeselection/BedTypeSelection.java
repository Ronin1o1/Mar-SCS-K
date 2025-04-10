package com.marriott.rfp.object.wholesaler.bedtypeselection;

import java.io.Serializable;

public class BedTypeSelection implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private long bedtype_id;
	private long combo_id;
	private String bedtype;
	private String bedtype_ref_id;
	private boolean hasRates;
	public String bTOrigIndex;
	public String bTOrig;
	
	public long getBedtype_id() {
		return bedtype_id;
	}
	
	public void setBedtype_id(long bedtype_id) {
		this.bedtype_id = bedtype_id;
	}
	
	public long getCombo_id() {
		return combo_id;
	}
	
	public void setCombo_id(long combo_id) {
		this.combo_id = combo_id;
	}
	
	public String getBedtype() {
		return bedtype;
	}
	
	public void setBedtype(String bedtype) {
		this.bedtype = bedtype;
	}
	
	public String getBedtype_ref_id() {
		return bedtype_ref_id;
	}
	
	public void setBedtype_ref_id(String bedtype_ref_id) {
		this.bedtype_ref_id = bedtype_ref_id;
	}
	
	public boolean isHasRates() {
		return hasRates;
	}
	
	public void setHasRates(boolean hasRates) {
		this.hasRates = hasRates;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public String getbTOrigIndex() {
		return bTOrigIndex;
	}
	
	public void setbTOrigIndex(String bTOrigIndex) {
		this.bTOrigIndex = bTOrigIndex;
	}
	
	public String getbTOrig() {
		return bTOrig;
	}
	
	public void setbTOrig(String bTOrig) {
		this.bTOrig = bTOrig;
	}
	
}
