package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class TransDetailList implements Serializable {
	
	private Long transactionstatusid;
	private Long transactionid;
	private Long hotelid;
    private Long accountrecid;
	private String marshacode;
	private String accountname;
	private String rpgm;
	private String rateoffername;
	private String systemtype;
	private String status;
	private String loaddate;
	private String publishdate;
	private String errordesc;
	private String cmdtext;
	private String name;
	
	public TransDetailList(){
		super();
	}
	

	private static final long serialVersionUID = 1L;

	public String getMarshacode() {
		return marshacode;
	}

	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getRpgm() {
		return rpgm;
	}

	public void setRpgm(String rpgm) {
		this.rpgm = rpgm;
	}

	public String getSystemtype() {
		return systemtype;
	}

	public void setSystemtype(String systemtype) {
		this.systemtype = systemtype;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLoaddate() {
		return loaddate;
	}

	public void setLoaddate(String loaddate) {
		this.loaddate = loaddate;
	}

	public String getPublishdate() {
		return publishdate;
	}

	public void setPublishdate(String publishdate) {
		this.publishdate = publishdate;
	}

	public String getErrordesc() {
		return errordesc;
	}

	public void setErrordesc(String errordesc) {
		this.errordesc = errordesc;
	}

	public String getCmdtext() {
		return cmdtext;
	}

	public void setCmdtext(String cmdtext) {
		this.cmdtext = cmdtext;
	}

	public Long getTransactionstatusid() {
		return transactionstatusid;
	}

	public void setTransactionstatusid(Long transactionstatusid) {
		this.transactionstatusid = transactionstatusid;
	}

	public Long getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(Long transactionid) {
		this.transactionid = transactionid;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRateoffername() {
		return rateoffername;
	}

	public void setRateoffername(String rateoffername) {
		this.rateoffername = rateoffername;
	}

	
		
	

}
