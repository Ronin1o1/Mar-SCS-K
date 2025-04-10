package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class SolicitSelect implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Long hotelid;
    private String move;
    private String sendemail;
	private String chasemail;

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public void setMove(String move) {
	this.move = move;
    }

    public String getMove() {
	return move;
    }

    public void setSendemail(String sendemail) {
	this.sendemail = sendemail;
    }

    public String getSendemail() {
	return sendemail;
    }
    
    public String getChasemail() {
		return chasemail;
	}

	public void setChasemail(String chasemail) {
		this.chasemail = chasemail;
	}

}
