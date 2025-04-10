/*
 * Created on Sep 18, 2006
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.marriott.rfp.business.rd.impl;

import java.util.Vector;

import com.marriott.rfp.object.roomdef.beans.Error;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.Warning;
import com.marriott.rfp.object.roomdef.beans.Warnings;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesElementModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesProductModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesSubGroupModel;

public abstract class RDServiceBase implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	public RDServiceBase() {
	}

	public static String getErrorMessage(Errors errors) {
		Error[] error;
		String errormessage = "";
		if (errors != null) {
			error = errors.getError();
			if (error != null) {
				errormessage = error[0].getShortText();
			}
		}
		return errormessage;
	}

	public static String getErrorCode(Errors errors) {
		Error[] error;
		String errorCode = "";
		if (errors != null) {
			error = errors.getError();
			if (error != null) {
				errorCode = error[0].getCode();
			}
		}
		return errorCode;
	}

	public static String getWarningMessage(Warnings warnings) {
		Warning warning;
		String errormessage = "";
		if (warnings != null) {
			warning = warnings.getWarning();
			if (warning != null) {
				errormessage = warning.getShortText();
			}
		}
		return errormessage;
	}

	public static String getWarningCode(Warnings warnings) {
		Warning warning;
		String errorCode = "";
		if (warnings != null) {
			warning = warnings.getWarning();
			if (warning != null) {
				errorCode = warning.getCode();
			}
		}
		return errorCode;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public DisplayRulesModel getDisplayRules(MI_HotelRoomProductDisplayRulesRS rp_def, Vector ddList) {
		DisplayRulesModel drm = new DisplayRulesModel();

		/*
		 * existing rules for this channel/entry
		 */
		drm.setDisplayDimensions(rp_def.getDisplayDimensions());
		ProductDescriptions pds = rp_def.getProductDescriptions();
		ProductDescription[] pd = pds.getProductDescription();
		String currentType = "";
		String currentGroup = "";
		boolean bNew = false;

		DisplayRulesSubGroupModel drsg = null;
		DisplayRulesProductModel drp = null;
		for (int i = 0; i < pd.length; i++) {
			if (!pd[i].getElementTypeName().equals(currentType)) {
				drp = new DisplayRulesProductModel();
				drp.setElementTypeCode(pd[i].getElementTypeName());
				drp.setElementTypeName(getElementTypeName(pd[i].getElementTypeName(), ddList));
				drsg = null;
				currentGroup = "";
				currentType = pd[i].getElementTypeName();
				bNew = true;
			}
			if (!pd[i].getElementGroupCode().equals(currentGroup)) {
				drsg = new DisplayRulesSubGroupModel();
				drsg.setElementGroupCode(pd[i].getElementGroupCode());
				drsg.setElementGroupName(getElementGroupName(pd[i].getElementTypeName(), pd[i].getElementGroupCode(), ddList));
				currentGroup = pd[i].getElementGroupCode();
				drp.getElementGroups().add(drsg);
			}
			DisplayRulesElementModel dre = new DisplayRulesElementModel();
			dre.setElementCode(pd[i].getElementCode());
			dre.setElementCodeList(pd[i].getElementCodeList());
			dre.setElementCodeName(getElementCodeName(pd[i].getElementTypeName(), pd[i].getElementGroupCode(), pd[i].getElementCode(), pd[i]
					.getElementCodeList(), ddList));
			drsg.getElements().add(dre);

			if (bNew) {
				drm.getDisplayproducts().add(drp);
				bNew = false;
			}
		}

		return drm;
	}

	@SuppressWarnings("rawtypes")
	private String getElementTypeName(String elementTypeCode, Vector ddList) {
		String elementTypeName = null;

		for (int i = 0; i < ddList.size(); i++) {
			DisplayRulesProductModel drp = (DisplayRulesProductModel) ddList.elementAt(i);
			if (drp.getElementTypeCode().equals(elementTypeCode)) {
				elementTypeName = drp.getElementTypeName();
				break;
			}
		}
		return elementTypeName;
	}

	@SuppressWarnings("rawtypes")
	private String getElementGroupName(String elementTypeCode, String elementGroupCode, Vector ddList) {
		String elementGroupName = null;

		for (int i = 0; i < ddList.size(); i++) {
			DisplayRulesProductModel drp = (DisplayRulesProductModel) ddList.elementAt(i);
			if (drp.getElementTypeCode().equals(elementTypeCode)) {
				Vector sg = drp.getElementGroups();
				for (int j = 0; j < sg.size(); j++) {
					if (elementGroupCode.equals(((DisplayRulesSubGroupModel) sg.elementAt(j)).getElementGroupCode())) {
						elementGroupName = ((DisplayRulesSubGroupModel) sg.elementAt(j)).getElementGroupName();
						break;
					}
				}
				break;
			}
		}
		return elementGroupName;
	}

	@SuppressWarnings("rawtypes")
	private String getElementCodeName(String elementTypeCode, String elementGroupCode, String elementCode, String elementCodeList, Vector ddList) {
		String elementCodeName = null;

		for (int i = 0; i < ddList.size(); i++) {
			DisplayRulesProductModel drp = (DisplayRulesProductModel) ddList.elementAt(i);
			if (drp.getElementTypeCode().equals(elementTypeCode)) {
				Vector sg = drp.getElementGroups();
				for (int j = 0; j < sg.size(); j++) {
					if (elementGroupCode.equals(((DisplayRulesSubGroupModel) sg.elementAt(j)).getElementGroupCode())) {
						Vector elements = ((DisplayRulesSubGroupModel) sg.elementAt(j)).getElements();
						for (int k = 0; k < elements.size(); k++) {
							if (elementCode.equals(((DisplayRulesElementModel) elements.elementAt(k)).getElementCode())
									&& elementCodeList.equals(((DisplayRulesElementModel) elements.elementAt(k)).getElementCodeList())) {
								elementCodeName = ((DisplayRulesElementModel) elements.elementAt(k)).getElementCodeName();
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
		return elementCodeName;
	}


}
