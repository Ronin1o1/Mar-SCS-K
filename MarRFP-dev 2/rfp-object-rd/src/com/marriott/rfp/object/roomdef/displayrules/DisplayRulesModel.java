package com.marriott.rfp.object.roomdef.displayrules;


import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;


public class DisplayRulesModel  {
	private DisplayDimensions displayDimensions;
	private Vector displayproducts=new Vector();
	
	
	public DisplayRulesModel()
	{
		super();
	}


	public DisplayDimensions getDisplayDimensions() {
		return displayDimensions;
	}

	public Vector getDisplayproducts() {
		return displayproducts;
	}

	public void setDisplayDimensions(DisplayDimensions dimensions) {
		displayDimensions = dimensions;
	}

	public void setDisplayproducts(Vector vector) {
		displayproducts = vector;
	}

}


