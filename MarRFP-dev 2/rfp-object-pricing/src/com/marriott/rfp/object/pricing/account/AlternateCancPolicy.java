package com.marriott.rfp.object.pricing.account;

/**
 * @author Kperl585
 */
import java.io.Serializable;

public class AlternateCancPolicy implements Serializable {

	private static final long serialVersionUID = 1L;
	private long altcancelpolicyid;
	private String altcancelpolicy;
	private long altcancelpolicytimeid;
	private String altcancelpolicytime;
	private String altcancelpolicynotes;
	private long altcancelpolicyoptionid;
	private String altcancelpolicyoption;
	private long cxlorder;
	
	public long getAltcancelpolicytimeid() {
		return altcancelpolicytimeid;
	}

	public void setAltcancelpolicytimeid(long altcancelpolicytimeid) {
		this.altcancelpolicytimeid = altcancelpolicytimeid;
	}

	public String getAltcancelpolicytime() {
		return altcancelpolicytime;
	}

	public void setAltcancelpolicytime(String altcancelpolicytime) {
		this.altcancelpolicytime = altcancelpolicytime;
	}

	public String getAltcancelpolicynotes() {
		return altcancelpolicynotes;
	}

	public void setAltcancelpolicynotes(String altcancelpolicynotes) {
		this.altcancelpolicynotes = altcancelpolicynotes;
	}

	public long getAltcancelpolicyid() {
		return altcancelpolicyid;
	}

	public void setAltcancelpolicyid(long altcancelpolicyid) {
		this.altcancelpolicyid = altcancelpolicyid;
	}

	public String getAltcancelpolicy() {
		return altcancelpolicy;
	}

	public void setAltcancelpolicy(String altcancelpolicy) {
		this.altcancelpolicy = altcancelpolicy;
	}

	public long getAltcancelpolicyoptionid() {
		return altcancelpolicyoptionid;
	}

	public void setAltcancelpolicyoptionid(long altcancelpolicyoptionid) {
		this.altcancelpolicyoptionid = altcancelpolicyoptionid;
	}

	public String getAltcancelpolicyoption() {
		return altcancelpolicyoption;
	}

	public void setAltcancelpolicyoption(String altcancelpolicyoption) {
		this.altcancelpolicyoption = altcancelpolicyoption;
	}

	public long getCxlorder() {
		return cxlorder;
	}

	public void setCxlorder(long cxlorder) {
		this.cxlorder = cxlorder;
	}

}
