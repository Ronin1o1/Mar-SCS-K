package com.marriott.rfp.object.roomdef.displaytext;

import com.marriott.rfp.object.roomdef.beans.AlternateTextList;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;


public class RoomTypeNameDisplayTextAmenityModel  {
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;
	private TypeList[] typeList=null;
	private UnitsOfMeasure[] unitsOfMeasure;
	private AlternateTextList[] alternateTextList;
	
	public RoomTypeNameDisplayTextAmenityModel() {
    }




	public AlternateTextList[] getAlternateTextList() {
		return alternateTextList;
	}


    
    public TypeList[] getTypeList() {
		return typeList;
	}




	public UnitsOfMeasure[] getUnitsOfMeasure() {
		return unitsOfMeasure;
	}




	public void setAlternateTextList(AlternateTextList[] alternateTextList) {
		this.alternateTextList = alternateTextList;
	}




	public void setTypeList(TypeList[] typeList) {
		this.typeList = typeList;
	}




	public void setUnitsOfMeasure(UnitsOfMeasure[] unitsOfMeasure) {
		this.unitsOfMeasure = unitsOfMeasure;
	}


}


