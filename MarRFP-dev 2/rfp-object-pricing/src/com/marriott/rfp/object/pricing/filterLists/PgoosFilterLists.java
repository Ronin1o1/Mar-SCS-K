package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;


public class PgoosFilterLists  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    private Long hotelid;
    private Long accountrecid;
    private String errorType;

    private boolean statusErr = true;
    private boolean statusInc = true;
    private boolean statusPub = false;
    private String errorcode;
    private String codeerror;
    private Long batchid;

    
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
	public String getErrorType() {
		return errorType;
	}
	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}

	public String getErrorcode() {
		return errorcode;
	}
	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}
	public String getCodeerror() {
		return codeerror;
	}
	public void setCodeerror(String codeerror) {
		this.codeerror = codeerror;
	}
	public Long getBatchid() {
		return batchid;
	}
	public void setBatchid(Long batchid) {
		this.batchid = batchid;
	}
	
	public String getStatusErr(){
		String stStatusErr = "N";
		if (isStatusErr()){
			return "E";
		}
		return stStatusErr;
		
	}
	
	public boolean isStatusErr() {
		return statusErr;
	}
	public void setStatusErr(boolean statusErr) {
		this.statusErr = statusErr;
	}
	
	public String getStatusInc(){
		String stStatusInc = "N";
		if (isStatusInc()){
			return "I";
		}
		return stStatusInc;
		
	}
	
	public boolean isStatusInc() {
		return statusInc;
	}
	public void setStatusInc(boolean statusInc) {
		this.statusInc = statusInc;
	}
	
	public String getStatusPub(){
		String stStatusPub = "N";
		if (isStatusPub()){
			return "C";
		}
		return stStatusPub;
	}
	
	public boolean isStatusPub() {
		return statusPub;
	}
	public void setStatusPub(boolean statusPub) {
		this.statusPub = statusPub;
	}
	


}
