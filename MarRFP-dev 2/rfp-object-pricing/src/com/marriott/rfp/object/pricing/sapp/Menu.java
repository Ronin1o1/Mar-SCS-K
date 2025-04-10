package com.marriott.rfp.object.pricing.sapp;

import java.io.Serializable;

public class Menu implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String nextScreen;
	private String previousScreen;
	private String currentScreen;

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
	public String getCurrentScreen() {
		return currentScreen;
	}
	public void setCurrentScreen(String currentScreen) {
		this.currentScreen = currentScreen;
	}
	

}