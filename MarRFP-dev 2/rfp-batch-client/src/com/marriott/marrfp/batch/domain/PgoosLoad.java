package com.marriott.marrfp.batch.domain;

import java.math.BigDecimal;
import java.util.Date;

public class PgoosLoad {
	
	public static final String LOAD_TYPE  = "BATCHLoad";
	public static final String REL_LOAD_TYPE  = "BATCHRelinquish";
	public static final  String LOAD_START = "LOAD";
	public static final String LOAD_DONE  = "DONE";
	public static final  String LOAD_FAIL  = "FAIL";
	public static  final String LOAD_CREATE_USER  = "MARRFP_HPP_BATCH";

	private BigDecimal batchId;

	private String status;

	private String loadType;

	private Date loadStart;

	private Date loadEnd;

	private String loadCreateUser;

	private String loadEndUser;

	public PgoosLoad(){}
	
	public PgoosLoad(BigDecimal batchId, String status, String loadType, Date loadStart, Date loadEnd, String loadCreateUser, String loadEndUser) {
		this.batchId = batchId;
		this.status = status;
		this.loadType = loadType;
		this.loadStart = loadStart;
		this.loadEnd = loadEnd;
		this.loadCreateUser = loadCreateUser;
		this.loadEndUser = loadEndUser;
	}

	public BigDecimal getBatchId() {
		return batchId;
	}

	public void setBatchId(BigDecimal batchId) {
		this.batchId = batchId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLoadType() {
		return loadType;
	}

	public void setLoadType(String loadType) {
		this.loadType = loadType;
	}

	public Date getLoadStart() {
		return loadStart;
	}

	public void setLoadStart(Date loadStart) {
		this.loadStart = loadStart;
	}

	public Date getLoadEnd() {
		return loadEnd;
	}

	public void setLoadEnd(Date loadEnd) {
		this.loadEnd = loadEnd;
	}

	public String getLoadCreateUser() {
		return loadCreateUser;
	}

	public void setLoadCreateUser(String loadCreateUser) {
		this.loadCreateUser = loadCreateUser;
	}

	public String getLoadEndUser() {
		return loadEndUser;
	}

	public void setLoadEndUser(String loadEndUser) {
		this.loadEndUser = loadEndUser;
	}
}
