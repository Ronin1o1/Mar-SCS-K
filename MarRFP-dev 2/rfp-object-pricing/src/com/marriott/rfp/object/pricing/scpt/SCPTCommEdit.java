package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.Map;

public class SCPTCommEdit implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String, SCPTCommRateseason> comrateseason;
	private Map<String, SCPTCommRateAmenities> comrates;

	public Map<String, SCPTCommRateseason> getComrateseason() {
		return comrateseason;
	}

	public void setComrateseason(Map<String, SCPTCommRateseason> comrateseason) {
		this.comrateseason = comrateseason;
	}

	public Map<String, SCPTCommRateAmenities> getComrates() {
		return comrates;
	}

	public void setComrates(Map<String, SCPTCommRateAmenities> comrates) {
		this.comrates = comrates;
	}

}
