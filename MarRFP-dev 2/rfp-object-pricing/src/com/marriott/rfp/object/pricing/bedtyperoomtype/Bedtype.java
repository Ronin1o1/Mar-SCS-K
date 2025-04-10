package com.marriott.rfp.object.pricing.bedtyperoomtype;

import java.io.Serializable;

public class Bedtype implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long bedtypeid;
	private String bedtype;
	private long seqid;
	private String bedtype_view;
	private String used;

	public long getBedtypeid() {
		return bedtypeid;
	}

	public void setBedtypeid(long bedtypeid) {
		this.bedtypeid = bedtypeid;
	}

	public String getBedtype() {
		return bedtype;
	}

	public void setBedtype(String bedtype) {
		this.bedtype = bedtype;
	}

	public long getSeqid() {
		return seqid;
	}

	public void setSeqid(long seqid) {
		this.seqid = seqid;
	}

	public String getBedtype_view() {
		return bedtype_view;
	}

	public void setBedtype_view(String bedtype_view) {
		this.bedtype_view = bedtype_view;
	}

	public String getUsed() {
		return used;
	}

	public void setUsed(String used) {
		this.used = used;
	}

}
