package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class McbStatusDetails implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String marshacmd;
	private Long cmpl;
	private Long fail;
	private Long unpb;
	private Long publ;
	
	public String getMarshacmd() {
	    return marshacmd;
	}
	public void setMarshacmd(String marshacmd) {
	    this.marshacmd = marshacmd;
	}
	public Long getCmpl() {
	    return cmpl;
	}
	public void setCmpl(Long cmpl) {
	    this.cmpl = cmpl;
	}
	public Long getFail() {
	    return fail;
	}
	public void setFail(Long fail) {
	    this.fail = fail;
	}
	public Long getUnpb() {
	    return unpb;
	}
	public void setUnpb(Long unpb) {
	    this.unpb = unpb;
	}
	public Long getPubl() {
	    return publ;
	}
	public void setPubl(Long publ) {
	    this.publ = publ;
	}
	

}
