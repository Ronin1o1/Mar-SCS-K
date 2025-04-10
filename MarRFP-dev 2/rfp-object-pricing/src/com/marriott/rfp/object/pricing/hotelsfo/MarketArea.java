package com.marriott.rfp.object.pricing.hotelsfo;

import java.io.Serializable;

public class MarketArea implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private long marketid;
    private String marketname;

    public void setMarketid(long marketid) {
	this.marketid = marketid;
    }

    public long getMarketid() {
	return marketid;
    }

    public void setMarketname(String marketname) {
	this.marketname = marketname;
    }

    public String getMarketname() {
	return marketname;
    }
}
