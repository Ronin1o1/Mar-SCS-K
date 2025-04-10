package com.marriott.rfp.object.wholesaler.menu;

import java.io.Serializable;

public class WholesalerMenuChecks  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private boolean bHasCurrency = false;
	
	public boolean isbHasCurrency() {
		return bHasCurrency;
	}
	public void setbHasCurrency(boolean bHasCurrency) {
		this.bHasCurrency = bHasCurrency;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}