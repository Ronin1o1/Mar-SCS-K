package com.marriott.rfp.business.rd.impl;

import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.dataaccess.rd.rateproduct.api.RateProductManager;
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.BrandsList;
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
import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionGroup;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionList;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.RateProductDataDictionary;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesElementModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesProductModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesSubGroupModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextAmenityModel;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextModel;
import com.marriott.rfp.utility.StringUtility;
@Transactional("transactionManagerRfpCommon")
@Service
public class RateProductAdminServiceImpl extends RDServiceBase implements RateProductAdminService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private RateProductManager rateprod_mgr = null;

	public RateProductAdminServiceImpl() {

	}

	public MI_HotelRoomProductInfoChannelsRS getChannels() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoChannelsRS rp_def = rateprod_mgr.getChannels();
		return rp_def;

	}

	public MI_HotelRoomProductInfoEntriesRS getEntries() {

		// get a list of all the room pools with a room product definition for
		// the property
		MI_HotelRoomProductInfoEntriesRS rp_def = rateprod_mgr.getEntries();
		return rp_def;

	}

	public Languages getChannelLanguages(Channel channel) {

		// get a list of all the room pools with a room product definition for
		// the property
		Languages lang = null;
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = rateprod_mgr.getChannelLanguages(channel);
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
		MI_RateProductDataDictionaryRS rp_def = rateprod_mgr.getDataDictionary();
		RateProductDefinitionLists rtnd = rp_def.getRateProductDataDictionary().getRateProductDefinitionLists();

		RateProductDefinitionList[] pds = rtnd.getRateProductDefinitionList();
		DisplayRulesProductModel drp = null;

		for (int i = 0; i < pds.length; i++) {
			drp = new DisplayRulesProductModel();
			drp.setElementTypeCode(StringUtility.trimLeadingZeros(pds[i].getRP_ListCode()));
			drp.setElementTypeName(pds[i].getRP_ListName());
			RateProductDefinitionGroup[] pdg = pds[i].getRateProductDefinitionGroup();
			for (int iGrp = 0; iGrp < pdg.length; iGrp++) {
				DisplayRulesSubGroupModel drsg = new DisplayRulesSubGroupModel();
				drsg.setElementGroupCode(StringUtility.trimLeadingZeros(pdg[iGrp].getRP_GroupCode()));
				drsg.setElementGroupName(pdg[iGrp].getRP_GroupName());
				RateProductDefinition[] pd = pdg[iGrp].getRateProductDefinition();
				Vector pdv = drsg.getElements();
				if (pd != null) {
					for (int j = 0; j < pd.length; j++) {
						DisplayRulesElementModel dre = new DisplayRulesElementModel();
						dre.setElementCode(pd[j].getRP_Code());
						dre.setElementCodeList(pd[j].getRP_Name());
						dre.setElementCodeName(pd[j].getRP_CodeName());
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

		MI_HotelRoomProductDisplayRulesRS rp_def = rateprod_mgr.getDisplayRules(channel, entry);
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
	public void updateDisplayRules(Channel channel, Entry entry, Map<String, ProductDescriptionRules> theRules, DisplayDimensions displayDimensions,
			String loginName) {

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
		MI_HotelRoomProductDisplayRulesNotifRS ratecodes = rateprod_mgr.updateDisplayRules(roomproductInfo, loginName);
	}

	public void deleteDisplayRules(Channel channel, Entry entry, String loginName) {
		MI_HotelRoomProductDisplayRulesRS dr = new MI_HotelRoomProductDisplayRulesRS(channel, entry, null, null);
		updateDisplayRules(dr, loginName);
	}

	public void copyDisplayRules(Channel channel, Entry entry, Channel copyChannel, Entry copyEntry, String loginName)
			throws RDRulesNotFoundException {
		String errormessage, errorcode;

		MI_HotelRoomProductDisplayRulesRS origRules = rateprod_mgr.getDisplayRules(copyChannel, copyEntry);
		errormessage = getErrorMessage(origRules.getErrors());
		errorcode = getErrorCode(origRules.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDRulesNotFoundException(errormessage);
		} else {
			MI_HotelRoomProductDisplayRulesRS rulesNew = new MI_HotelRoomProductDisplayRulesRS(channel, entry, origRules.getDisplayDimensions(),
					origRules.getProductDescriptions());
			rateprod_mgr.updateDisplayRules(rulesNew, loginName);
		}

	}

	public void copyDisplayText(Channel channel, Language language, Channel copyChannel, Language copyLanguage, String loginName)
			throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_RateProductDisplayTextRS origText = rateprod_mgr.getRateProductDisplayText(copyChannel, copyLanguage.getCode());
		errormessage = getErrorMessage(origText.getErrors());
		errorcode = getErrorCode(origText.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDTextNotFoundException(errormessage);
		} else {
			MI_RateProductDisplayTextRS displayText = new MI_RateProductDisplayTextRS();
			displayText.setChannel(channel);
			displayText.setPrimaryLangID(language.getCode());
			displayText.setUnitsOfMeasureList(origText.getUnitsOfMeasureList());
			displayText.setTypeLists(origText.getTypeLists());
			displayText.setBrandsList(origText.getBrandsList());
			displayText.setRateProductDefinitions(origText.getRateProductDefinitions());

			rateprod_mgr.updateDisplayText(displayText, loginName);
		}

	}

	public void deleteDisplayText(Channel channel, Language language, String loginName) {
		MI_RateProductDisplayTextRS displayText = new MI_RateProductDisplayTextRS();
		// Setting the channel
		displayText.setChannel(channel);

		// Setting the language
		displayText.setPrimaryLangID(language.getCode());
		rateprod_mgr.updateDisplayText(displayText, loginName);
	}

	public Vector<RateProductDisplayTextModel> getDisplayTextData(Channel channel, String langId, boolean bCreateNew) throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_RateProductDisplayTextRS rp_def = rateprod_mgr.getRateProductDisplayText(channel, langId);
		errormessage = getErrorMessage(rp_def.getErrors());
		errorcode = getErrorCode(rp_def.getErrors());
		if (errorcode.equals("5000")) {
			if (!bCreateNew)
				throw new RDTextNotFoundException(errormessage);
		}

		MI_RateProductDataDictionaryRS dataDictionary = rateprod_mgr.getDataDictionary();
		Vector<RateProductDisplayTextModel> displayTextData = new Vector<RateProductDisplayTextModel>();

		RateProductDefinitionList[] pdsList = dataDictionary.getRateProductDataDictionary().getRateProductDefinitionLists()
				.getRateProductDefinitionList();
		RateProductDefinition[] pdTextList = null;
		if (rp_def != null && rp_def.getRateProductDefinitions() != null && rp_def.getRateProductDefinitions().getRateProductDefinition() != null)
			pdTextList = rp_def.getRateProductDefinitions().getRateProductDefinition();
		if (pdsList != null) {
			RateProductDisplayTextModel dtm = null;
			Vector<RateProductDisplayTextElementModel> dtemList = null;
			RateProductDisplayTextElementModel dtem = null;
			for (int i = 0; i < pdsList.length; i++) {
				dtm = new RateProductDisplayTextModel();
				dtemList = new Vector<RateProductDisplayTextElementModel>();
				dtm.setRP_ListCode(pdsList[i].getRP_ListCode());
				dtm.setRP_ListName(pdsList[i].getRP_ListName());
				dtem = new RateProductDisplayTextElementModel();
				dtem.setRP_ListCode(pdsList[i].getRP_ListCode());
				dtem.setRP_ListName(pdsList[i].getRP_ListName());
				dtem.setDisplayText(findDisplayText(dtem, pdTextList));
				dtemList.add(dtem);
				RateProductDefinitionGroup[] rtgdg = pdsList[i].getRateProductDefinitionGroup();
				if (rtgdg != null) {
					for (int m = 0; m < rtgdg.length; m++) {
						if (!rtgdg[m].getRP_GroupCode().equals("0000")) {
							dtem = new RateProductDisplayTextElementModel();
							dtem.setRP_ListCode(pdsList[i].getRP_ListCode());
							dtem.setRP_ListName(pdsList[i].getRP_ListName());
							dtem.setRP_GroupCode(rtgdg[m].getRP_GroupCode());
							dtem.setRP_GroupName(rtgdg[m].getRP_GroupName());
							dtem.setDisplayText(findDisplayText(dtem, pdTextList));
							dtemList.add(dtem);
						}
						RateProductDefinition[] pdList = rtgdg[m].getRateProductDefinition();
						if (pdList != null) {
							for (int k = 0; k < pdList.length; k++) {
								dtem = new RateProductDisplayTextElementModel();
								dtem.setRP_ListCode(pdsList[i].getRP_ListCode());
								dtem.setRP_ListName(pdsList[i].getRP_ListName());
								dtem.setRP_GroupCode(rtgdg[m].getRP_GroupCode());
								dtem.setRP_GroupName(rtgdg[m].getRP_GroupName());
								dtem.setRP_Code(pdList[k].getRP_Code());
								dtem.setRP_CodeName(pdList[k].getRP_CodeName());
								dtem.setRP_Name(pdList[k].getRP_Name());
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

	private String findDisplayText(RateProductDisplayTextElementModel dtem, RateProductDefinition[] pdTextList) {
		String displayText = "";
		if (pdTextList != null) {
			for (int y = 0; y < pdTextList.length; y++) {
				if (dtem.isEqual(pdTextList[y].getRP_ListCode(), pdTextList[y].getRP_GroupCode(), pdTextList[y].getRP_Code(), pdTextList[y]
						.getRP_Name())) {
					if (pdTextList[y].getDescription() != null && pdTextList[y].getDescription().getText() != null)
						displayText = pdTextList[y].getDescription().getText(0).getValue();
					break;
				}
			}
		}
		return displayText;
	}

	public RateProductDisplayTextAmenityModel getDisplayTextAmenity(Channel channel, String langId) throws RDTextNotFoundException {
		String errormessage, errorcode;

		MI_RateProductDisplayTextRS rp_def = rateprod_mgr.getRateProductDisplayText(channel, langId);
		errormessage = getErrorMessage(rp_def.getErrors());
		errorcode = getErrorCode(rp_def.getErrors());
		if (errorcode.equals("5000")) {
			throw new RDTextNotFoundException(errormessage);
		}

		MI_RateProductDataDictionaryRS dataDictionary = rateprod_mgr.getDataDictionary();
		RateProductDisplayTextAmenityModel dtam = new RateProductDisplayTextAmenityModel();
		dtam.setBrands(setBrandDisplayText(dataDictionary.getRateProductDataDictionary().getBrandsList().getBrands(), rp_def.getBrandsList()
				.getBrands()));
		dtam.setTypeList(setTypeDisplayText(dataDictionary.getRateProductDataDictionary().getTypeLists().getTypeList(), rp_def.getTypeLists()
				.getTypeList()));
		dtam.setUnitsOfMeasure(seUOMDisplayText(dataDictionary.getRateProductDataDictionary().getUnitsOfMeasureList().getUnitsOfMeasure(), rp_def
				.getUnitsOfMeasureList().getUnitsOfMeasure()));

		return dtam;
	}

	private Brands[] setBrandDisplayText(Brands[] brands, Brands[] rateProductListDisplayText) {
		for (int bl = 0; bl < brands.length; bl++) {
			Brand[] brand = brands[bl].getBrand();
			for (int b = 0; b < brand.length; b++) {
				brand[b].setBrandList(brands[bl].getBrandList());
				for (int j = 0; j < rateProductListDisplayText.length; j++) {
					if (brand[b].getBrandList().equals(rateProductListDisplayText[j].getBrandList())) {
						for (int m = 0; m < rateProductListDisplayText[j].getBrand().length; m++) {
							if (brand[b].getBrandCode().equals(rateProductListDisplayText[j].getBrand(m).getBrandCode())) {
								brand[b].setValue(rateProductListDisplayText[j].getBrand(m).getValue());
								break;
							}
						}
					}
				}
			}
		}
		return brands;
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

	public void updateDisplayTextAmenity(Channel channel, String langId, Map<String, Brand> theBrand, Map<String, Type> theType,
			Map<String, UnitOfMeasure> theUOM, String loginName) {

		MI_RateProductDisplayTextRS displayText = new MI_RateProductDisplayTextRS();
		displayText.setChannel(channel);

		// Setting the languageId
		displayText.setPrimaryLangID(langId);

		MI_RateProductDisplayTextRS rp_def = rateprod_mgr.getRateProductDisplayText(channel, langId);
		displayText.setRateProductDefinitions(rp_def.getRateProductDefinitions());
		displayText.setBrandsList(setBrandText(theBrand, rp_def.getBrandsList()));
		displayText.setUnitsOfMeasureList(setUOMText(theUOM, rp_def.getUnitsOfMeasureList()));
		displayText.setTypeLists(setTypeText(theType, rp_def.getTypeLists()));
		 rateprod_mgr.updateDisplayText(displayText, loginName);
	}

	private BrandsList setBrandText(Map<String, Brand> theBrand, BrandsList brandsList) {
		Brands[] brands = null;
		if (brandsList != null)
			brands = brandsList.getBrands();
		if (brands != null) {
			for (Iterator<Brand> it = theBrand.values().iterator(); it.hasNext();) {
				Brand brandnewtext = it.next();
				for (int iBrands = 0; iBrands < brands.length; iBrands++) {
					if (brands[iBrands].getBrandList().equals(brandnewtext.getBrandList())) {
						Brand[] brand = brands[iBrands].getBrand();
						for (int iBrand = 0; iBrand < brand.length; iBrand++) {
							if (brand[iBrand].getBrandCode().equals(brandnewtext.getBrandCode())) {
								brand[iBrand].setValue(brandnewtext.getValue());
								break;
							}
						}
						break;
					}
				}
			}
		}
		return brandsList;
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

	public void updateDisplayTextData(Channel channel, String langId, Map<String, RateProductDisplayTextElementModel> theText, String loginName) {
		MI_RateProductDisplayTextRS rp_def = rateprod_mgr.getRateProductDisplayText(channel, langId);
		MI_RateProductDisplayTextRS displayText = getRateProductDataDictionaryForDisplayText(rp_def);
		displayText.setChannel(channel);

		// Setting the languageId
		displayText.setPrimaryLangID(langId);
		
        RateProductDefinitions rtnds = displayText.getRateProductDefinitions();
        RateProductDefinition rtnd = null;
		
		for (int i = 0; i < theText.size(); i++) {
			RateProductDisplayTextElementModel dtem = theText.get(String.valueOf(i));
            rtnd = getRateProductDefinition(rtnds, dtem.getRP_ListCode(), dtem.getRP_GroupCode(), dtem.getRP_Name(), dtem.getRP_Code());
            Description desc = rtnd.getDescription();
            Text[] txt = desc.getText();
            txt[0].setValue(dtem.getDisplayText());

		}

		rateprod_mgr.updateDisplayText(displayText, loginName);
	}

	private MI_RateProductDisplayTextRS getRateProductDataDictionaryForDisplayText(MI_RateProductDisplayTextRS rtndt) {
		MI_RateProductDisplayTextRS msg = new MI_RateProductDisplayTextRS();
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();

		msg.setChannel(rtndt.getChannel());

		Vector<RateProductDefinition> new_rtnd = new Vector<RateProductDefinition>();
		RateProductDataDictionary ddData = dd.getRateProductDataDictionary();
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
						if (origTypeLists != null) {
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

			// BrandsList
			BrandsList origBrandsList = rtndt.getBrandsList();
			BrandsList ddBrandsList = ddData.getBrandsList();
			Brands[] ddBrands = ddBrandsList.getBrands();
			Vector<Brands> new_Brands = new Vector<Brands>();
			for (int iBrands = 0; iBrands < ddBrands.length; iBrands++) {
				Brands new_brands = new Brands();
				new_brands.setBrandList(ddBrands[iBrands].getBrandList());
				Brand[] ddBrand = ddBrands[iBrands].getBrand();
				if (ddBrand != null) {
					Vector<Brand> new_brand = new Vector<Brand>();
					for (int iBrand = 0; iBrand < ddBrand.length; iBrand++) {
						Brand new_brandd = new Brand();
						new_brandd.setBrandCode(ddBrand[iBrand].getBrandCode());
						new_brandd.setBrandName(ddBrand[iBrand].getBrandName());
						if (origBrandsList != null) {
							Brands[] oBrands = origBrandsList.getBrands();
							if (oBrands != null) {
								for (int jBrands = 0; jBrands < oBrands.length; jBrands++) {
									if (oBrands[jBrands].getBrandList().equals(ddBrands[iBrands].getBrandList())) {
										Brand[] oBrand = oBrands[jBrands].getBrand();
										if (oBrand != null) {
											for (int jBrand = 0; jBrand < oBrand.length; jBrand++) {
												if (oBrand[jBrand].getBrandCode().equals(ddBrand[iBrand].getBrandCode())) {
													if (oBrand[jBrand].getValue() != null)
														new_brandd.setValue(oBrand[jBrand].getValue());
													break;
												}
											}
										}
										break;
									}
								}
							}
						}
						new_brand.add(new_brandd);
					}
					Brand[] new_brandarray = new Brand[new_brand.size()];
					new_brand.toArray(new_brandarray);
					new_brands.setBrand(new_brandarray);
				}
				new_Brands.add(new_brands);
			}
			Brands[] new_brandsarray = new Brands[new_Brands.size()];
			new_Brands.toArray(new_brandsarray);
			BrandsList new_brandslist = new BrandsList();
			new_brandslist.setBrands(new_brandsarray);
			msg.setBrandsList(new_brandslist);

			// roomtypenamedefinitions
			RateProductDefinitions orig_rtnd = rtndt.getRateProductDefinitions();
			RateProductDefinitionLists dd_rtndlists = ddData.getRateProductDefinitionLists();
			if (dd_rtndlists != null) {
				RateProductDefinitionList[] dd_rtndlist = dd_rtndlists.getRateProductDefinitionList();
				if (dd_rtndlist != null) {
					for (int iList = 0; iList < dd_rtndlist.length; iList++) {
						String listCode = "";
						String groupCode = "0000";
						String itemCode = "    ";
						String itemName = "    ";
						listCode = dd_rtndlist[iList].getRP_ListCode();
						RateProductDefinition rn = getRateProductDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName, itemCode);
						new_rtnd.add(rn);
						RateProductDefinitionGroup[] dd_rtndgrp = dd_rtndlist[iList].getRateProductDefinitionGroup();
						if (dd_rtndgrp != null) {
							for (int iGrp = 0; iGrp < dd_rtndgrp.length; iGrp++) {
								groupCode = "0000";
								itemCode = "    ";
								itemName = "    ";
								groupCode = dd_rtndgrp[iGrp].getRP_GroupCode();
								if (!groupCode.equals("0000")) {
									RateProductDefinition rng = getRateProductDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName,
											itemCode);
									new_rtnd.add(rng);
								}
								RateProductDefinition[] dd_rtnd = dd_rtndgrp[iGrp].getRateProductDefinition();
								if (dd_rtnd != null) {
									for (int iRn = 0; iRn < dd_rtnd.length; iRn++) {
										itemCode = "    ";
										itemName = "    ";
										itemCode = dd_rtnd[iRn].getRP_Code();
										itemName = dd_rtnd[iRn].getRP_Name();
										RateProductDefinition rnd = getRateProductDefinitionforDisplayText(orig_rtnd, listCode, groupCode, itemName,
												itemCode);
										new_rtnd.add(rnd);

									}// end loop roomtypenamedefinition
								}

							} // end loop roomtypenamedefinitiongroup
						}

					} // end loog roomtypenamedefinitionlist
				}
			}
		}

		RateProductDefinition[] new_rtndarray = new RateProductDefinition[new_rtnd.size()];
		new_rtnd.toArray(new_rtndarray);
		RateProductDefinitions new_rtnds = new RateProductDefinitions();
		new_rtnds.setRateProductDefinition(new_rtndarray);
		msg.setRateProductDefinitions(new_rtnds);
		return msg;
	}

	private RateProductDefinition getRateProductDefinitionforDisplayText(RateProductDefinitions orig_rtnd, String listCode, String groupCode,
			String itemName, String itemCode) {
		RateProductDefinition rn = new RateProductDefinition();
		rn.setRP_ListCode(listCode);
		rn.setRP_GroupCode(groupCode);
		rn.setRP_Code(itemCode);
		rn.setRP_Name(itemName);
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
	
    private RateProductDefinition getRateProductDefinition(RateProductDefinitions rtnds, String RP_ListCode, String RP_GroupCode, String RP_Name,
            String RP_Code) {
        RateProductDefinition the_rtnd = null;
        RateProductDefinition[] rtnd = rtnds.getRateProductDefinition();
        if (rtnd != null) {
            for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
                if (rtnd[iRtnd].getRP_ListCode().trim().equals(RP_ListCode.trim())
                        && rtnd[iRtnd].getRP_GroupCode().trim().equals(RP_GroupCode.trim()) && rtnd[iRtnd].getRP_Code().trim().equals(RP_Code.trim())
                        && rtnd[iRtnd].getRP_Name().trim().equals(RP_Name.trim())) {
                    the_rtnd = rtnd[iRtnd];
                    break;
                }
            }
        }
        return the_rtnd;
    }

}