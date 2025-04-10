package com.marriott.rfp.object.pricing.menu;

import java.io.Serializable;

public class PricingMenuChecks implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean bEnteredCurrency = false;
	private boolean bHasCurrency = false;
	private boolean bHasDOS = false;
	private boolean bHasFixed = false;
	private boolean bHasGovLOS = false;
	private boolean bHasGovSeasons = false;
	private boolean bHasGovRates = false;
	private boolean bHasGovTerms = false;
	private boolean bHasGroupMeeting = false;
	private boolean bHasLOS = false;
	private boolean bHasNoDOSScreen = false;
	private boolean bHasSeasons = false;
	private boolean bHasStandards = false;
	
	public boolean getBEnteredCurrency() {
		return bEnteredCurrency;
	}
	public void setBEnteredCurrency(boolean enteredCurrency) {
		bEnteredCurrency = enteredCurrency;
	}
	public boolean getBHasCurrency() {
		return bHasCurrency;
	}
	public void setBHasCurrency(boolean hasCurrency) {
		bHasCurrency = hasCurrency;
	}
	public boolean getBHasDOS() {
		return bHasDOS;
	}
	public void setBHasDOS(boolean hasDOS) {
		bHasDOS = hasDOS;
	}
	public boolean getBHasFixed() {
		return bHasFixed;
	}
	public void setBHasFixed(boolean hasFixed) {
		bHasFixed = hasFixed;
	}
	public boolean getBHasGovLOS() {
		return bHasGovLOS;
	}
	public void setBHasGovLOS(boolean hasGovLOS) {
		bHasGovLOS = hasGovLOS;
	}
	public boolean getBHasGovSeasons() {
		return bHasGovSeasons;
	}
	public void setBHasGovSeasons(boolean hasGovSeasons) {
		bHasGovSeasons = hasGovSeasons;
	}
	public boolean getBHasGovRates() {
		return bHasGovRates;
	}
	public void setBHasGovRates(boolean hasGovRates) {
		bHasGovRates = hasGovRates;
	}
	public boolean getBHasGovTerms() {
		return bHasGovTerms;
	}
	public void setBHasGovTerms(boolean hasGovTerms) {
		bHasGovTerms = hasGovTerms;
	}
	public boolean getBHasGroupMeeting() {
		return bHasGroupMeeting;
	}
	public void setBHasGroupMeeting(boolean hasGroupMeeting) {
		bHasGroupMeeting = hasGroupMeeting;
	}
	public boolean getBHasLOS() {
		return bHasLOS;
	}
	public void setBHasLOS(boolean hasLOS) {
		bHasLOS = hasLOS;
	}
	public boolean getBHasNoDOSScreen() {
		return bHasNoDOSScreen;
	}
	public void setBHasNoDOSScreen(boolean hasNoDOSScreen) {
		bHasNoDOSScreen = hasNoDOSScreen;
	}
	public boolean getBHasSeasons() {
		return bHasSeasons;
	}
	public void setBHasSeasons(boolean hasSeasons) {
		bHasSeasons = hasSeasons;
	}
	public boolean getBHasStandards() {
		return bHasStandards;
	}
	public void setBHasStandards(boolean bHasStandards) {
		this.bHasStandards = bHasStandards;
	}

	
}
