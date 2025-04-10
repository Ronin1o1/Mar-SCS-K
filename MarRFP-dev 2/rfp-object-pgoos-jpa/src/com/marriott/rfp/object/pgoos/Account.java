package com.marriott.rfp.object.pgoos;

import java.util.Date;

public class Account {

	private static final String NO = "N";

	private static final String YES = "Y";

	private Long accountId;
	private Long hotelId;
	private Long accountRecId;
	private String aerAccount;
	private String excludeAer;
	private Long accountDirId;
	private String marshaCode;
	private String aerRateProgram;
	private Long period;
	private Date contractStartDate;
	private Date contractEndDate;
	private String rpgms;
	private Long processid;
	private String eid;

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountid) {
		this.accountId = accountid;
	}

	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public Long getAccountRecId() {
		return accountRecId;
	}

	public void setAccountRecId(Long accountRecId) {
		this.accountRecId = accountRecId;
	}

	public String getAerAccount() {
		return aerAccount;
	}

	public void setAerAccount(String aerAccount) {
		this.aerAccount = aerAccount;
	}

	public String getExcludeAer() {
		return excludeAer;
	}

	public void setExcludeAer(String excludeAer) {
		this.excludeAer = excludeAer;
	}
	
	public boolean isGPPAccount() {
		return (YES.equals(getAerAccount()) && NO.equals(getExcludeAer()));
	}

	public Long getAccountDirId() {
		return accountDirId;
	}

	public void setAccountDirId(Long accountDirId) {
		this.accountDirId = accountDirId;
	}

	public String getMarshaCode() {
		return marshaCode;
	}

	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}

	public String getAerRateProgram() {
		return aerRateProgram;
	}

	public void setAerRateProgram(String aerRateProgram) {
		this.aerRateProgram = aerRateProgram;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Date getContractStartDate() {
		return contractStartDate;
	}

	public void setContractStartDate(Date contractStartDate) {
		this.contractStartDate = contractStartDate;
	}

	public Date getContractEndDate() {
		return contractEndDate;
	}

	public void setContractEndDate(Date contractEndDate) {
		this.contractEndDate = contractEndDate;
	}

	public void setRpgms(String rpgms) {
		this.rpgms = rpgms;
	}

	public String getRpgms() {
		return rpgms;
	}

	public String getQuotedRpgms() {
		String strrpgms="";
		String[] therpgm = rpgms.split(",");
		for (int i = 0; i < therpgm.length; i++) {
			if (strrpgms.length()>0)
				strrpgms+=", ";
			strrpgms+= "'" + therpgm[i].trim() + "'";
		}
		return strrpgms;
	}

	public void setProcessid(Long processid) {
		this.processid = processid;
	}

	public Long getProcessid() {
		return processid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public String getEid() {
		return eid;
	}
}
