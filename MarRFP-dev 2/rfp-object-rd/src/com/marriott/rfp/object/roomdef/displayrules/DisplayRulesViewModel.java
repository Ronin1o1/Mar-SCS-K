package com.marriott.rfp.object.roomdef.displayrules;

import java.util.Vector;

public class DisplayRulesViewModel {
	private DisplayRulesModel displayRulesData;
	private Vector rulesDataDictionary;
	
	public DisplayRulesModel getDisplayRulesData() {
		return displayRulesData;
	}
	public void setDisplayRulesData(DisplayRulesModel displayRulesData) {
		this.displayRulesData = displayRulesData;
	}
	public Vector getRulesDataDictionary() {
		return rulesDataDictionary;
	}
	public void setRulesDataDictionary(Vector rulesDataDictionary) {
		this.rulesDataDictionary = rulesDataDictionary;
	}

}
