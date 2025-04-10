package com.marriott.rfp.object.roomdef.displaytext;

import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.Formats;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;


public class DisplayTextAmenityModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private Brands[] brands=null;
	private UnitsOfMeasure[] unitsOfMeasure;
	private Formats[] formats;
	
	public DisplayTextAmenityModel() {
    }


	public Brands[] getBrands() {
		return brands;
	}


	public Formats[] getFormats() {
		return formats;
	}


	public UnitsOfMeasure[] getUnitsOfMeasure() {
		return unitsOfMeasure;
	}


	public void setBrands(Brands[] brands) {
		this.brands = brands;
	}


	public void setFormats(Formats[] formats) {
		this.formats = formats;
	}
    
    public void setUnitsOfMeasure(UnitsOfMeasure[] unitsOfMeasure) {
		this.unitsOfMeasure = unitsOfMeasure;
	}


}


