package com.marriott.rfp.object.wholesaler.menu;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.wholesaler.menu.WholesalerMenu;
import com.marriott.rfp.object.wholesaler.period.Period;

public class WholesalerMenuData implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private List<WholesalerMenu> wholesalermenuList;
	private List<Period> reportPeriods;
	private String nextScreen;
	private String previousScreen;
	long roomPoolCount;
	
	public List<WholesalerMenu> getWholesalermenuList() {
		return wholesalermenuList;
	}
	
	public void setWholesalermenuList(List<WholesalerMenu> wholesalermenuList) {
		this.wholesalermenuList = wholesalermenuList;
	}
	
	public List<Period> getReportPeriods() {
		return reportPeriods;
	}
	
	public void setReportPeriods(List<Period> reportPeriods) {
		this.reportPeriods = reportPeriods;
	}
	
	public String getNextScreen() {
		return nextScreen;
	}
	
	public void setNextScreen(String nextScreen) {
		this.nextScreen = nextScreen;
	}
	
	public String getPreviousScreen() {
		return previousScreen;
	}
	
	public void setPreviousScreen(String previousScreen) {
		this.previousScreen = previousScreen;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public long getRoomPoolCount() {
		return roomPoolCount;
	}
	
	public void setRoomPoolCount(long roomPoolCount) {
		this.roomPoolCount = roomPoolCount;
	}

}