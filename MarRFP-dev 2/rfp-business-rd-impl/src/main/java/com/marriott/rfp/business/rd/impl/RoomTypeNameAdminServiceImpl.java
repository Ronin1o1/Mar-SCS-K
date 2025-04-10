package com.marriott.rfp.business.rd.impl;

import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.dataaccess.rd.roomtypename.api.RoomTypeNameManager;
import com.marriott.rfp.object.roomdef.beans.AlternateText;
import com.marriott.rfp.object.roomdef.beans.AlternateTextList;
import com.marriott.rfp.object.roomdef.beans.AlternateTextLists;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinition;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionGroup;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionList;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.DataDictionary;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesElementModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesProductModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesSubGroupModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextAmenityModel;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextModel;
import com.marriott.rfp.utility.StringUtility;

@Service
@Transactional("transactionManagerRfpCommon")
public class RoomTypeNameAdminServiceImpl extends RDServiceBase implements RoomTypeNameAdminService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private RoomTypeNameManager roomtypename_mgr = null;

	public RoomTypeNameAdminServiceImpl() {

	}

	public MI_HotelRoomProductInfoChannelsRS getChannels() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoChannelsRS rp_def = roomtypename_mgr.getChannels();
		return rp_def;

	}

	public MI_HotelRoomProductInfoEntriesRS getEntries() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoEntriesRS rp_def = roomtypename_mgr.getEntries();
		return rp_def;

	}

	public Languages getChannelLanguages(Channel channel) {

		// get a list of all the room pools with a room product definition for
		// the property
		Languages lang = null;
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = roomtypename_mgr.getChannelLanguages(channel);
		if (rp_def.getChannels() != null && rp_def.getChannels().getChannel() != null)
			lang = rp_def.getChannels().getChannel()[0].getLanguages();
		return lang;

	}

	@SuppressWarnings("rawtypes")
	public DisplayRulesViewModel getDisplayRulesData(Channel channel, Entry entry, boolean bCreateNew) throws RDRulesNotFoundException {
		DisplayRulesViewModel drvm = new DisplayRulesViewModel();
		Vector dd = getDataDictionaryForRules();
		drvm.setRulesDataDictionary(dd);
		try {
			drvm.setDisplayRulesData(getDisplayRules(channel, entry, dd));
		} catch (RDRulesNotFoundException e) {
			if (!bCreateNew)
				throw new RDRulesNotFoundException(e.getMessage());
		}
		return drvm;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Vector getDataDictionaryForRules() {
		Vector displayDd = new Vector();

		// get a list of all the room pools with a room product definition
		// for the property
		MI_MasterRoomTypeNameDataDictionaryRS rp_def = roomtypename_mgr.getDataDictionary();
		RoomTypeNameDefinitionLists rtnd = rp_def.getDataDictionary().getRoomTypeNameDefinitionLists();

		RoomTypeNameDefinitionList[] pds = rtnd.getRoomTypeNameDefinitionList();
		DisplayRulesProductModel drp = null;

		for (int i = 0; i < pds.length; i++) {
			drp = new DisplayRulesProductModel();
			drp.setElementTypeCode(StringUtility.trimLeadingZeros(pds[i].getRTND_ListCode()));
			drp.setElementTypeName(pds[i].getRTND_ListName());
			RoomTypeNameDefinitionGroup[] pdg = pds[i].getRoomTypeNameDefinitionGroup();
			for (int iGrp = 0; iGrp < pdg.length; iGrp++) {
				DisplayRulesSubGroupModel drsg = new DisplayRulesSubGroupModel();
				drsg.setElementGroupCode(StringUtility.trimLeadingZeros(pdg[iGrp].getRTND_GroupCode()));
				drsg.setElementGroupName(pdg[iGrp].getRTND_GroupName());
				RoomTypeNameDefinition[] pd = pdg[iGrp].getRoomTypeNameDefinition();
				Vector pdv = drsg.getElements();
				if (pd != null) {
					for (int j = 0; j < pd.length; j++) {
						DisplayRulesElementModel dre = new DisplayRulesElementModel();
						dre.setElementCode(pd[j].getRTND_Code());
						dre.setElementCodeList(pd[j].getRTND_Name());
						dre.setElementCodeName(pd[j].getRTND_CodeName());
						pdv.add(dre);
					}
				}
				drp.getElementGroups().add(drsg);
			}
			displayDd.add(drp);
		}

		return displayDd;
	}

	@SuppressWarnings("rawtypes")
	private DisplayRulesModel getDisplayRules(Channel channel, Entry entry, Vector ddList) throws RDRulesNotFoundException {
		DisplayRulesModel drm;
		String errormessage, errorcode;
		String warningmessage, warningcode;

		MI_HotelRoomProductDisplayRulesRS rp_def = roomtypename_mgr.getDisplayRules(channel, entry);
		errormessage = getErrorMessage(rp_def.getErrors());
		errorcode = getErrorCode(rp_def.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDRulesNotFoundException(errormessage);
		} else if (errormessage != null && !errormessage.equals("")) {
			/*
			 * new rules for this channel/entry
			 */
			DisplayDimensions dd = new DisplayDimensions();
			drm = new DisplayRulesModel();
			drm.setDisplayDimensions(dd);
			return drm;
		}

		warningmessage = getWarningMessage(rp_def.getWarnings());
		warningcode = getWarningCode(rp_def.getWarnings());
		if (warningcode.equals("5000")) {
			/*
			 * new rules, existing display dimensions for this channel/entry
			 */
			drm = new DisplayRulesModel();
			drm.setDisplayDimensions(rp_def.getDisplayDimensions());
			return drm;
		} else if (warningmessage != null && !warningmessage.equals("")) {
			throw new RDRulesNotFoundException(warningmessage);
		}

		return getDisplayRules(rp_def, ddList);
	}

	@SuppressWarnings("rawtypes")
	public void updateDisplayRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions, String loginName) {

		ProductDescription[] rulesArray = new ProductDescription[theRules.size()];
		for (Iterator i = theRules.values().iterator(); i.hasNext();) {
			ProductDescriptionRules pdr = (ProductDescriptionRules) i.next();
			ProductDescription pd = new ProductDescription();
			pd.setElementCode(pdr.getElementCode());
			pd.setElementCodeList(pdr.getElementCodeList());
			pd.setElementCodeName(pdr.getElementCodeName());
			pd.setElementGroupCode(pdr.getElementGroupCode());
			pd.setElementTypeCode(pdr.getElementTypeCode());
			rulesArray[new Long(pdr.getSortOrder()).intValue()] = pd;
		}
		ProductDescriptions pds = new ProductDescriptions();
		pds.setProductDescription(rulesArray);
		MI_HotelRoomProductDisplayRulesRS rulesNew = new MI_HotelRoomProductDisplayRulesRS(channel, entry, displayDimensions, pds);
		updateDisplayRules(rulesNew, loginName);
	}

	public void updateDisplayRules(MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName) {
		// get a list of all the room pools for the property
		@SuppressWarnings("unused")
		MI_HotelRoomProductDisplayRulesNotifRS ratecodes = roomtypename_mgr.updateDisplayRules(roomproductInfo, loginName);
	}

	public void deleteDisplayRules(Channel channel, Entry entry, String loginName) {
		MI_HotelRoomProductDisplayRulesRS dr = new MI_HotelRoomProductDisplayRulesRS(channel, entry, null, null);
		updateDisplayRules(dr, loginName);
	}

	public void copyDisplayRules(Channel channel, Entry entry, Channel copyChannel, Entry copyEntry, String loginName) throws RDRulesNotFoundException {
		String errormessage, errorcode;

		MI_HotelRoomProductDisplayRulesRS origRules = roomtypename_mgr.getDisplayRules(copyChannel, copyEntry);
		errormessage = getErrorMessage(origRules.getErrors());
		errorcode = getErrorCode(origRules.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDRulesNotFoundException(errormessage);
		} else {
			MI_HotelRoomProductDisplayRulesRS rulesNew = new MI_HotelRoomProductDisplayRulesRS(channel, entry, origRules.getDisplayDimensions(), origRules.getProductDescriptions());
			roomtypename_mgr.updateDisplayRules(rulesNew, loginName);
		}

	}

	public void copyDisplayText(Channel channel, Language language, Channel copyChannel, Language copyLanguage, String loginName) throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_MasterRoomTypeNameDisplayTextRS origText = roomtypename_mgr.getMasterRoomTypeNameDisplayText(copyChannel, copyLanguage.getCode());
		errormessage = getErrorMessage(origText.getErrors());
		errorcode = getErrorCode(origText.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDTextNotFoundException(errormessage);
		} else {
			MI_MasterRoomTypeNameDisplayTextRS displayText = new MI_MasterRoomTypeNameDisplayTextRS();
			displayText.setChannel(channel);
			displayText.setPrimaryLangID(language.getCode());
			displayText.setUnitsOfMeasureList(origText.getUnitsOfMeasureList());
			displayText.setTypeLists(origText.getTypeLists());
			displayText.setAlternateTextLists(origText.getAlternateTextLists());
			displayText.setRoomTypeNameDefinitions(origText.getRoomTypeNameDefinitions());

			roomtypename_mgr.updateDisplayText(displayText, loginName);
		}

	}

	public void deleteDisplayText(Channel channel, Language language, String loginName) {
		MI_MasterRoomTypeNameDisplayTextRS displayText = new MI_MasterRoomTypeNameDisplayTextRS();
		// Setting the channel
		displayText.setChannel(channel);

		// Setting the language
		displayText.setPrimaryLangID(language.getCode());
		roomtypename_mgr.updateDisplayText(displayText, loginName);
	}

	public Vector<RoomTypeNameDisplayTextModel> getDisplayTextData(Channel channel, String langId, boolean bCreateNew) throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_MasterRoomTypeNameDisplayTextRS rp_def = roomtypename_mgr.getMasterRoomTypeNameDisplayText(channel, langId);
		errormessage = getErrorMessage(rp_def.getErrors());
		errorcode = getErrorCode(rp_def.getErrors());
		if (errorcode.equals("5000")) {
			if (!bCreateNew)
				throw new RDTextNotFoundException(errormessage);
		}

		MI_MasterRoomTypeNameDataDictionaryRS dataDictionary = roomtypename_mgr.getDataDictionary();
		Vector<RoomTypeNameDisplayTextModel> displayTextData = new Vector<RoomTypeNameDisplayTextModel>();

		RoomTypeNameDefinitionList[] pdsList = dataDictionary.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		RoomTypeNameDefinition[] pdTextList = null;
		if (rp_def != null && rp_def.getRoomTypeNameDefinitions() != null && rp_def.getRoomTypeNameDefinitions().getRoomTypeNameDefinition() != null)
			pdTextList = rp_def.getRoomTypeNameDefinitions().getRoomTypeNameDefinition();
		if (pdsList != null) {
			RoomTypeNameDisplayTextModel dtm = null;
			Vector<RoomTypeNameDisplayTextElementModel> dtemList = null;
			RoomTypeNameDisplayTextElementModel dtem = null;
			for (int i = 0; i < pdsList.length; i++) {
				dtm = new RoomTypeNameDisplayTextModel();
				dtemList = new Vector<RoomTypeNameDisplayTextElementModel>();
				dtm.setRTND_ListCode(pdsList[i].getRTND_ListCode());
				dtm.setRTND_ListName(pdsList[i].getRTND_ListName());
				dtem = new RoomTypeNameDisplayTextElementModel();
				dtem.setRTND_ListCode(pdsList[i].getRTND_ListCode());
				dtem.setRTND_ListName(pdsList[i].getRTND_ListName());
				dtem.setDisplayText(findDisplayText(dtem, pdTextList));
				dtemList.add(dtem);
				RoomTypeNameDefinitionGroup[] rtgdg = pdsList[i].getRoomTypeNameDefinitionGroup();
				if (rtgdg != null) {
					for (int m = 0; m < rtgdg.length; m++) {
						if (!rtgdg[m].getRTND_GroupCode().equals("0000")) {
							dtem = new RoomTypeNameDisplayTextElementModel();
							dtem.setRTND_ListCode(pdsList[i].getRTND_ListCode());
							dtem.setRTND_ListName(pdsList[i].getRTND_ListName());
							dtem.setRTND_GroupCode(rtgdg[m].getRTND_GroupCode());
							dtem.setRTND_GroupName(rtgdg[m].getRTND_GroupName());
							dtem.setDisplayText(findDisplayText(dtem, pdTextList));
							dtemList.add(dtem);
						}
						RoomTypeNameDefinition[] pdList = rtgdg[m].getRoomTypeNameDefinition();
						if (pdList != null) {
							for (int k = 0; k < pdList.length; k++) {
								dtem = new RoomTypeNameDisplayTextElementModel();
								dtem.setRTND_ListCode(pdsList[i].getRTND_ListCode());
								dtem.setRTND_ListName(pdsList[i].getRTND_ListName());
								dtem.setRTND_GroupCode(rtgdg[m].getRTND_GroupCode());
								dtem.setRTND_GroupName(rtgdg[m].getRTND_GroupName());
								dtem.setRTND_Code(pdList[k].getRTND_Code());
								dtem.setRTND_CodeName(pdList[k].getRTND_CodeName());
								dtem.setRTND_Name(pdList[k].getRTND_Name());
								dtem.setDisplayText(findDisplayText(dtem, pdTextList));
								dtemList.add(dtem);

							}
						}
					}
				}
				dtm.setDisplayElement(dtemList);
				displayTextData.add(dtm);
			}

		}

		return displayTextData;
	}

	private String findDisplayText(RoomTypeNameDisplayTextElementModel dtem, RoomTypeNameDefinition[] pdTextList) {
		String displayText = "";
		if (pdTextList != null) {
			for (int y = 0; y < pdTextList.length; y++) {
				if (dtem.isEqual(pdTextList[y].getRTND_ListCode(), pdTextList[y].getRTND_GroupCode(), pdTextList[y].getRTND_Code(), pdTextList[y].getRTND_Name())) {
					if (pdTextList[y].getDescription() != null && pdTextList[y].getDescription().getText() != null)
						displayText = pdTextList[y].getDescription().getText(0).getValue();
					break;
				}
			}
		}
		return displayText;
	}

	public RoomTypeNameDisplayTextAmenityModel getDisplayTextAmenity(Channel channel, String langId) throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_MasterRoomTypeNameDisplayTextRS rp_def = roomtypename_mgr.getMasterRoomTypeNameDisplayText(channel, langId);
		errormessage = getErrorMessage(rp_def.getErrors());
		errorcode = getErrorCode(rp_def.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDTextNotFoundException(errormessage);
		}

		MI_MasterRoomTypeNameDataDictionaryRS dataDictionary = roomtypename_mgr.getDataDictionary();
		RoomTypeNameDisplayTextAmenityModel dtam = new RoomTypeNameDisplayTextAmenityModel();
		dtam.setAlternateTextList(setAlternateTextDisplayText(dataDictionary.getDataDictionary().getAlternateTextLists().getAlternateTextList(), rp_def.getAlternateTextLists().getAlternateTextList()));
		dtam.setTypeList(setTypeDisplayText(dataDictionary.getDataDictionary().getTypeLists().getTypeList(), rp_def.getTypeLists().getTypeList()));
		dtam.setUnitsOfMeasure(seUOMDisplayText(dataDictionary.getDataDictionary().getUnitsOfMeasureList().getUnitsOfMeasure(), rp_def.getUnitsOfMeasureList().getUnitsOfMeasure()));

		return dtam;
	}

	private AlternateTextList[] setAlternateTextDisplayText(AlternateTextList[] alternateTextList, AlternateTextList[] alternateTextListDisplayText) {
		for (int bl = 0; bl < alternateTextList.length; bl++) {
			AlternateText[] alternateText = alternateTextList[bl].getAlternateText();
			for (int b = 0; b < alternateText.length; b++) {
				alternateText[b].setAlternateTextListCode(alternateTextList[bl].getAlternateTextListCode());
				for (int j = 0; j < alternateTextListDisplayText.length; j++) {
					if (alternateText[b].getAlternateTextListCode().equals(alternateTextListDisplayText[j].getAlternateTextListCode())) {
						for (int m = 0; m < alternateTextListDisplayText[j].getAlternateText().length; m++) {
							if (alternateText[b].getAlternateTextCode().equals(alternateTextListDisplayText[j].getAlternateText(m).getAlternateTextCode())
									&& alternateText[b].getAlternateTextListBrandCode().equals(alternateTextListDisplayText[j].getAlternateText(m).getAlternateTextListBrandCode())) {
								alternateText[b].setValue(alternateTextListDisplayText[j].getAlternateText(m).getValue());
								break;
							}
						}
					}
				}
			}
		}
		return alternateTextList;
	}

	private TypeList[] setTypeDisplayText(TypeList[] typeList, TypeList[] typeListDisplayText) {
		for (int bl = 0; bl < typeList.length; bl++) {
			Type[] type = typeList[bl].getType();
			for (int b = 0; b < type.length; b++) {
				type[b].setTypeListCode(typeList[bl].getTypeListCode());
				for (int j = 0; j < typeListDisplayText.length; j++) {
					if (type[b].getTypeListCode().equals(typeListDisplayText[j].getTypeListCode())) {
						for (int m = 0; m < typeListDisplayText[j].getType().length; m++) {
							if (type[b].getTypeCode().equals(typeListDisplayText[j].getType(m).getTypeCode())) {
								type[b].setValue(typeListDisplayText[j].getType(m).getValue());
								break;
							}
						}
					}
				}
			}
		}
		return typeList;
	}

	private UnitsOfMeasure[] seUOMDisplayText(UnitsOfMeasure[] uoms, UnitsOfMeasure[] unitsOfMeasures) {
		for (int bl = 0; bl < uoms.length; bl++) {
			UnitOfMeasure[] uom = uoms[bl].getUnitOfMeasure();
			for (int b = 0; b < uom.length; b++) {
				uom[b].setUOM_List(uoms[bl].getUOM_List());
				for (int j = 0; j < unitsOfMeasures.length; j++) {
					if (uom[b].getUOM_List().equals(unitsOfMeasures[j].getUOM_List())) {
						for (int m = 0; m < unitsOfMeasures[j].getUnitOfMeasure().length; m++) {
							if (uom[b].getUOM_Code().equals(unitsOfMeasures[j].getUnitOfMeasure(m).getUOM_Code())) {
								uom[b].setValue(unitsOfMeasures[j].getUnitOfMeasure(m).getValue());
								break;
							}
						}
					}
				}
			}
		}
		return uoms;
	}

	public void updateDisplayTextAmenity(Channel channel, String langId, Map<String, AlternateText> theAlternateText, Map<String, Type> theType, Map<String, UnitOfMeasure> theUOM, String loginName) {

		MI_MasterRoomTypeNameDisplayTextRS displayText = new MI_MasterRoomTypeNameDisplayTextRS();
		displayText.setChannel(channel);

		// Setting the languageId
		displayText.setPrimaryLangID(langId);

		MI_MasterRoomTypeNameDisplayTextRS rp_def = roomtypename_mgr.getMasterRoomTypeNameDisplayText(channel, langId);
		displayText.setRoomTypeNameDefinitions(rp_def.getRoomTypeNameDefinitions());
		displayText.setTypeLists(setTypeText(theType, rp_def.getTypeLists()));
		displayText.setUnitsOfMeasureList(setUOMText(theUOM, rp_def.getUnitsOfMeasureList()));
		displayText.setAlternateTextLists(setAlternateText(theAlternateText, rp_def.getAlternateTextLists()));
		roomtypename_mgr.updateDisplayText(displayText, loginName);
	}

	private TypeLists setTypeText(Map<String, Type> theType, TypeLists typelists) {
		TypeList[] typelist = null;
		if (typelists != null)
			typelist = typelists.getTypeList();

		if (typelist != null) {
			for (Iterator<Type> it = theType.values().iterator(); it.hasNext();) {
				Type typenewtext = it.next();
				for (int iTypelist = 0; iTypelist < typelist.length; iTypelist++) {
					if (typelist[iTypelist].getTypeListCode().equals(typenewtext.getTypeListCode())) {
						Type[] type = typelist[iTypelist].getType();
						for (int iType = 0; iType < type.length; iType++) {
							if (type[iType].getTypeCode().equals(typenewtext.getTypeCode())) {
								type[iType].setValue(typenewtext.getValue());
								break;
							}
						}
						break;
					}
				}
			}
		}
		return typelists;
	}

	private AlternateTextLists setAlternateText(Map<String, AlternateText> theAlternateText, AlternateTextLists alttxtlists) {
		AlternateTextList[] alttxtlist = null;
		if (alttxtlists != null)
			alttxtlist = alttxtlists.getAlternateTextList();

		if (alttxtlist != null) {
			for (Iterator<AlternateText> it = theAlternateText.values().iterator(); it.hasNext();) {
				AlternateText altnewtext = it.next();
				for (int iAlttxtlist = 0; iAlttxtlist < alttxtlist.length; iAlttxtlist++) {
					if (alttxtlist[iAlttxtlist].getAlternateTextListCode().equals(altnewtext.getAlternateTextListCode())) {
						AlternateText[] alttxt = alttxtlist[iAlttxtlist].getAlternateText();
						for (int iType = 0; iType < alttxt.length; iType++) {
							if (alttxt[iType].getAlternateTextCode().equals(altnewtext.getAlternateTextCode())) {
								alttxt[iType].setValue(altnewtext.getValue());
								break;
							}
						}
						break;
					}
				}
			}
		}
		return alttxtlists;
	}

	private UnitsOfMeasureList setUOMText(Map<String, UnitOfMeasure> theUOM, UnitsOfMeasureList uomlists) {
		UnitsOfMeasure[] uomlist = null;
		if (uomlists != null)
			uomlist = uomlists.getUnitsOfMeasure();
		if (uomlist != null) {
			for (Iterator<UnitOfMeasure> it = theUOM.values().iterator(); it.hasNext();) {
				UnitOfMeasure uomnewtext = it.next();
				for (int iUomlist = 0; iUomlist < uomlist.length; iUomlist++) {
					if (uomlist[iUomlist].getUOM_List().equals(uomnewtext.getUOM_List())) {
						UnitOfMeasure[] uom = uomlist[iUomlist].getUnitOfMeasure();
						for (int iUom = 0; iUom < uom.length; iUom++) {
							if (uom[iUom].getUOM_Code().equals(uomnewtext.getUOM_Code())) {
								uom[iUom].setValue(uomnewtext.getValue());
								break;
							}
						}
						break;
					}
				}
			}
		}

		return uomlists;
	}

	public void updateDisplayTextData(Channel channel, String langId, Map<String, RoomTypeNameDisplayTextElementModel> theText, String loginName) {
		MI_MasterRoomTypeNameDisplayTextRS rp_def = roomtypename_mgr.getMasterRoomTypeNameDisplayText(channel, langId);
		MI_MasterRoomTypeNameDisplayTextRS displayText = getDataDictionaryForDisplayText(rp_def);
		displayText.setChannel(channel);

		// Setting the languageId
		displayText.setPrimaryLangID(langId);

		RoomTypeNameDefinitions rtnds = displayText.getRoomTypeNameDefinitions();
		RoomTypeNameDefinition rtnd = null;

		for (int i = 0; i < theText.size(); i++) {
			RoomTypeNameDisplayTextElementModel dtem = theText.get(String.valueOf(i));
			rtnd = getRoomTypeNameDefinition(rtnds, dtem.getRTND_ListCode(), dtem.getRTND_GroupCode(), dtem.getRTND_Name(), dtem.getRTND_Code());
			Description desc = rtnd.getDescription();
			Text[] txt = desc.getText();
			txt[0].setValue(dtem.getDisplayText());

		}

		roomtypename_mgr.updateDisplayText(displayText, loginName);
	}

	private MI_MasterRoomTypeNameDisplayTextRS getDataDictionaryForDisplayText(MI_MasterRoomTypeNameDisplayTextRS rtndt) {
		MI_MasterRoomTypeNameDisplayTextRS msg = new MI_MasterRoomTypeNameDisplayTextRS();
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		msg.setChannel(rtndt.getChannel());

		Vector<RoomTypeNameDefinition> new_rtnd = new Vector<RoomTypeNameDefinition>();
		DataDictionary ddData = dd.getDataDictionary();
		if (ddData != null) {
			// unitsofmeasurelists
			UnitsOfMeasureList origUOMList = rtndt.getUnitsOfMeasureList();
			UnitsOfMeasureList ddUOMList = ddData.getUnitsOfMeasureList();
			UnitsOfMeasure[] ddUOMs = ddUOMList.getUnitsOfMeasure();
			Vector<UnitsOfMeasure> new_UOMS = new Vector<UnitsOfMeasure>();
			for (int iUOMs = 0; iUOMs < ddUOMs.length; iUOMs++) {
				UnitsOfMeasure new_uoms = new UnitsOfMeasure();
				new_uoms.setUOM_List(ddUOMs[iUOMs].getUOM_List());
				UnitOfMeasure[] ddUOM = ddUOMs[iUOMs].getUnitOfMeasure();
				if (ddUOM != null) {
					Vector<UnitOfMeasure> new_uom = new Vector<UnitOfMeasure>();
					for (int iUOM = 0; iUOM < ddUOM.length; iUOM++) {
						UnitOfMeasure uomd = new UnitOfMeasure();
						uomd.setUOM_Code(ddUOM[iUOM].getUOM_Code());
						if (origUOMList != null) {
							UnitsOfMeasure[] oUOMs = origUOMList.getUnitsOfMeasure();
							if (oUOMs != null) {
								for (int jUOMs = 0; jUOMs < oUOMs.length; jUOMs++) {
									if (oUOMs[jUOMs].getUOM_List().equals(ddUOMs[iUOMs].getUOM_List())) {
										UnitOfMeasure[] oUOM = oUOMs[jUOMs].getUnitOfMeasure();
										if (oUOM != null) {
											for (int jUOM = 0; jUOM < oUOM.length; jUOM++) {
												if (oUOM[jUOM].getUOM_Code().equals(ddUOM[iUOM].getUOM_Code())) {
													if (oUOM[jUOM].getValue() != null)
														uomd.setValue(oUOM[jUOM].getValue());
													break;
												}
											}
										}
										break;
									}
								}
							}
						}
						new_uom.add(uomd);
					}

					UnitOfMeasure[] new_uomarray = new UnitOfMeasure[new_uom.size()];
					new_uom.toArray(new_uomarray);
					new_uoms.setUnitOfMeasure(new_uomarray);
				}
				new_UOMS.add(new_uoms);
			}
			UnitsOfMeasure[] new_UOMSarray = new UnitsOfMeasure[new_UOMS.size()];
			new_UOMS.toArray(new_UOMSarray);
			UnitsOfMeasureList new_uomlist = new UnitsOfMeasureList();
			new_uomlist.setUnitsOfMeasure(new_UOMSarray);
			msg.setUnitsOfMeasureList(new_uomlist);

			// TypeLists
			TypeLists origTypeLists = rtndt.getTypeLists();
			TypeLists ddTypeLists = ddData.getTypeLists();
			TypeList[] ddTypeList = ddTypeLists.getTypeList();
			Vector<TypeList> new_TypeList = new Vector<TypeList>();
			for (int iTypeList = 0; iTypeList < ddTypeList.length; iTypeList++) {
				TypeList new_typelist = new TypeList();
				new_typelist.setTypeListCode(ddTypeList[iTypeList].getTypeListCode());
				Type[] ddType = ddTypeList[iTypeList].getType();
				if (ddType != null) {
					Vector<Type> new_type = new Vector<Type>();
					for (int iType = 0; iType < ddType.length; iType++) {
						Type new_typed = new Type();
						new_typed.setTypeCode(ddType[iType].getTypeCode());
						if (origUOMList != null) {
							TypeList[] oTypeList = origTypeLists.getTypeList();
							if (oTypeList != null) {
								for (int jTypeList = 0; jTypeList < oTypeList.length; jTypeList++) {
									if (oTypeList[jTypeList].getTypeListCode().equals(ddTypeList[iTypeList].getTypeListCode())) {
										Type[] oType = oTypeList[jTypeList].getType();
										if (oType != null) {
											for (int jType = 0; jType < oType.length; jType++) {
												if (oType[jType].getTypeCode().equals(ddType[iType].getTypeCode())) {
													if (oType[jType].getValue() != null)
														new_typed.setValue(oType[jType].getValue());
													break;
												}
											}
										}
										break;
									}
								}
							}
						}
						new_type.add(new_typed);
					}
					Type[] new_typearray = new Type[new_type.size()];
					new_type.toArray(new_typearray);
					new_typelist.setType(new_typearray);
				}
				new_TypeList.add(new_typelist);
			}
			TypeList[] new_typelistarray = new TypeList[new_TypeList.size()];
			new_TypeList.toArray(new_typelistarray);
			TypeLists new_typelists = new TypeLists();
			new_typelists.setTypeList(new_typelistarray);
			msg.setTypeLists(new_typelists);

			// AlternateText
			AlternateTextLists origAltTxtLists = rtndt.getAlternateTextLists();
			AlternateTextLists ddAltTextLists = ddData.getAlternateTextLists();
			AlternateTextList[] ddAltTextList = ddAltTextLists.getAlternateTextList();
			Vector<AlternateTextList> new_AltTextList = new Vector<AlternateTextList>();
			for (int iAltTextList = 0; iAltTextList < ddAltTextList.length; iAltTextList++) {
				AlternateTextList new_altTextlist = new AlternateTextList();
				new_altTextlist.setAlternateTextListCode(ddAltTextList[iAltTextList].getAlternateTextListCode());
				AlternateText[] ddAltText = ddAltTextList[iAltTextList].getAlternateText();
				if (ddAltText != null) {
					Vector<AlternateText> new_alttext = new Vector<AlternateText>();
					for (int iAltText = 0; iAltText < ddAltText.length; iAltText++) {
						AlternateText new_alttextd = new AlternateText();
						new_alttextd.setAlternateTextCode(ddAltText[iAltText].getAlternateTextCode());
						new_alttextd.setAlternateTextListBrandCode(ddAltText[iAltText].getAlternateTextListBrandCode());
						new_alttextd.setDefaultInd(ddAltText[iAltText].getDefaultInd());
						if (origUOMList != null) {
							AlternateTextList[] oAltTextList = origAltTxtLists.getAlternateTextList();
							if (oAltTextList != null) {
								for (int jAltTextList = 0; jAltTextList < oAltTextList.length; jAltTextList++) {
									if (oAltTextList[jAltTextList].getAlternateTextListCode().equals(ddAltTextList[iAltTextList].getAlternateTextListCode())) {
										AlternateText[] oAltText = oAltTextList[jAltTextList].getAlternateText();
										if (oAltText != null) {
											for (int jAltText = 0; jAltText < oAltText.length; jAltText++) {
												if (oAltText[jAltText].getAlternateTextCode().equals(ddAltText[iAltText].getAlternateTextCode())) {
													if (oAltText[jAltText].getValue() != null)
														new_alttextd.setValue(oAltText[jAltText].getValue());
													break;
												}
											}
										}
										break;
									}
								}
							}
						}
						new_alttext.add(new_alttextd);
					}
					AlternateText[] new_alttextearray = new AlternateText[new_alttext.size()];
					new_alttext.toArray(new_alttextearray);
					new_altTextlist.setAlternateText(new_alttextearray);
				}
				new_AltTextList.add(new_altTextlist);
			}
			AlternateTextList[] new_alttextlistarray = new AlternateTextList[new_AltTextList.size()];
			new_AltTextList.toArray(new_alttextlistarray);
			AlternateTextLists new_alttextlists = new AlternateTextLists();
			new_alttextlists.setAlternateTextList(new_alttextlistarray);
			msg.setAlternateTextLists(new_alttextlists);

			// roomtypenamedefinitions
			RoomTypeNameDefinitions orig_rtnd = rtndt.getRoomTypeNameDefinitions();
			RoomTypeNameDefinitionLists dd_rtndlists = ddData.getRoomTypeNameDefinitionLists();
			if (dd_rtndlists != null) {
				RoomTypeNameDefinitionList[] dd_rtndlist = dd_rtndlists.getRoomTypeNameDefinitionList();
				if (dd_rtndlist != null) {
					for (int iList = 0; iList < dd_rtndlist.length; iList++) {
						String listCode = "";
						String groupCode = "0000";
						String itemCode = "    ";
						String itemName = "    ";
						listCode = dd_rtndlist[iList].getRTND_ListCode();
						RoomTypeNameDefinition rn = getRoomTypeNameDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName, itemCode);
						new_rtnd.add(rn);
						RoomTypeNameDefinitionGroup[] dd_rtndgrp = dd_rtndlist[iList].getRoomTypeNameDefinitionGroup();
						if (dd_rtndgrp != null) {
							for (int iGrp = 0; iGrp < dd_rtndgrp.length; iGrp++) {
								groupCode = "0000";
								itemCode = "    ";
								itemName = "    ";
								groupCode = dd_rtndgrp[iGrp].getRTND_GroupCode();
								if (!groupCode.equals("0000")) {
									RoomTypeNameDefinition rng = getRoomTypeNameDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName, itemCode);
									new_rtnd.add(rng);
								}
								RoomTypeNameDefinition[] dd_rtnd = dd_rtndgrp[iGrp].getRoomTypeNameDefinition();
								if (dd_rtnd != null) {
									for (int iRn = 0; iRn < dd_rtnd.length; iRn++) {
										itemCode = "    ";
										itemName = "    ";
										itemCode = dd_rtnd[iRn].getRTND_Code();
										itemName = dd_rtnd[iRn].getRTND_Name();
										RoomTypeNameDefinition rnd = getRoomTypeNameDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName, itemCode);
										new_rtnd.add(rnd);

									}// end loop roomtypenamedefinition
								}

							} // end loop roomtypenamedefinitiongroup
						}

					} // end loog roomtypenamedefinitionlist
				}
			}
		}

		RoomTypeNameDefinition[] new_rtndarray = new RoomTypeNameDefinition[new_rtnd.size()];
		new_rtnd.toArray(new_rtndarray);
		RoomTypeNameDefinitions new_rtnds = new RoomTypeNameDefinitions();
		new_rtnds.setRoomTypeNameDefinition(new_rtndarray);
		msg.setRoomTypeNameDefinitions(new_rtnds);
		return msg;
	}

	private RoomTypeNameDefinition getRoomTypeNameDefinitionforDisplayText(RoomTypeNameDefinitions orig_rtnd, String listCode, String groupCode, String itemName, String itemCode) {
		RoomTypeNameDefinition rn = new RoomTypeNameDefinition();
		rn.setRTND_ListCode(listCode);
		rn.setRTND_GroupCode(groupCode);
		rn.setRTND_Code(itemCode);
		rn.setRTND_Name(itemName);
		String displayText = "";
		if (orig_rtnd != null)
			displayText = orig_rtnd.findText(listCode, groupCode, itemCode, itemName);
		Description desc = new Description();
		Text[] txtArray = new Text[1];
		Text txt = new Text();
		txt.setValue(displayText);
		txtArray[0] = txt;
		desc.setText(txtArray);
		rn.setDescription(desc);
		return rn;

	}

	private RoomTypeNameDefinition getRoomTypeNameDefinition(RoomTypeNameDefinitions orig_rtnd, String listCode, String groupCode, String itemName, String itemCode) {
		RoomTypeNameDefinition the_rtnd = null;
		RoomTypeNameDefinition[] rtnd = orig_rtnd.getRoomTypeNameDefinition();
		if (rtnd != null) {
			for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
				if (rtnd[iRtnd].getRTND_ListCode().trim().equals(listCode.trim()) && rtnd[iRtnd].getRTND_GroupCode().trim().equals(groupCode.trim())
						&& rtnd[iRtnd].getRTND_Name().trim().equals(itemName.trim()) && rtnd[iRtnd].getRTND_Code().trim().equals(itemCode.trim())) {
					the_rtnd = rtnd[iRtnd];
					break;
				}
			}
		}
		return the_rtnd;
	}

}
