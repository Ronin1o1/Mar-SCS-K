package com.marriott.rfp.object.roomdef.displaytext;

import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;

public class RateProductDisplayTextAmenityModel {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private TypeList[] typeList = null;
	private UnitsOfMeasure[] unitsOfMeasure;
	private Brands[] brands;

	public RateProductDisplayTextAmenityModel() {
	}

	public Brands[] getBrands() {
		return brands;
	}

	public TypeList[] getTypeList() {
		return typeList;
	}

	public UnitsOfMeasure[] getUnitsOfMeasure() {
		return unitsOfMeasure;
	}

	public void setBrands(Brands[] brands) {
		this.brands = brands;
	}

	public void setTypeList(TypeList[] typeList) {
		this.typeList = typeList;
	}

	public void setUnitsOfMeasure(UnitsOfMeasure[] unitsOfMeasure) {
		this.unitsOfMeasure = unitsOfMeasure;
	}

}
