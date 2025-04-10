package com.marriott.rfp.business.rd.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.dataaccess.rd.roomdef.api.RoomDefManager;
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.BrandsList;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.DataDictionary;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.DisplayDimensions;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Format;
import com.marriott.rfp.object.roomdef.beans.Formats;
import com.marriott.rfp.object.roomdef.beans.FormatsList;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.Languages;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesElementModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesProductModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesSubGroupModel;
import com.marriott.rfp.object.roomdef.displayrules.DisplayRulesViewModel;
import com.marriott.rfp.object.roomdef.displayrules.ProductDescriptionRules;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextAmenityModel;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextModel;
@Transactional("transactionManagerRfpCommon")
@Service
public class RoomDefAdminServiceImpl extends RDServiceBase implements RoomDefAdminService {

    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    @Autowired
    private RoomDefManager roomdef_mgr = null;

    public RoomDefAdminServiceImpl() {

    }

    public MI_HotelRoomProductInfoChannelsRS getChannels() {

	// get a list of all the room pools with a room product definition for
	// the property
	MI_HotelRoomProductInfoChannelsRS rp_def = roomdef_mgr.getChannels();
	return rp_def;

    }

    public MI_HotelRoomProductInfoEntriesRS getEntries() {

	// get a list of all the room pools with a room product definition for
	// the property
	MI_HotelRoomProductInfoEntriesRS rp_def = roomdef_mgr.getEntries();
	return rp_def;

    }

    public Languages getChannelLanguages(Channel channel) {

	// get a list of all the room pools with a room product definition for
	// the property
	Languages lang = null;
	MI_HotelRoomProductInfoChannelLanguagesRS rp_def = roomdef_mgr.getChannelLanguages(channel);
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

	// get a list of all the room pools with a room product definition for
	// the property
	MI_HotelRoomProductDataDictionaryRS rp_def = roomdef_mgr.getDataDictionary();
	ProductDescriptions[] pds = rp_def.getDataDictionary().getProductDescriptions();
	String currentGroup = "";
	boolean bNew = false;
	DisplayRulesProductModel drp = null;
	for (int i = 0; i < pds.length; i++) {
	    if (!currentGroup.equals(pds[i].getElementTypeCode())) {
		drp = new DisplayRulesProductModel();
		drp.setElementTypeCode(pds[i].getElementTypeCode());
		drp.setElementTypeName(pds[i].getElementTypeName());
		currentGroup = pds[i].getElementTypeCode();
		bNew = true;
	    }
	    DisplayRulesSubGroupModel drsg = new DisplayRulesSubGroupModel();
	    drsg.setElementGroupCode(pds[i].getElementGroupCode());
	    drsg.setElementGroupName(pds[i].getElementGroupName());
	    ProductDescription[] pd = pds[i].getProductDescription();
	    Vector pdv = drsg.getElements();
	    if (pd != null) {
		for (int j = 0; j < pd.length; j++) {
		    DisplayRulesElementModel dre = new DisplayRulesElementModel();
		    dre.setElementCode(pd[j].getElementCode());
		    dre.setElementCodeList(pd[j].getElementCodeList());
		    dre.setElementCodeName(pd[j].getElementCodeName());
		    pdv.add(dre);
		}
	    }
	    drp.getElementGroups().add(drsg);

	    if (bNew) {
		displayDd.add(drp);
		bNew = false;
	    }
	}
	return displayDd;
    }

    @SuppressWarnings("rawtypes")
    private DisplayRulesModel getDisplayRules(Channel channel, Entry entry, Vector ddList) throws RDRulesNotFoundException {
	DisplayRulesModel drm;
	String errormessage, errorcode;
	String warningmessage, warningcode;

	MI_HotelRoomProductDisplayRulesRS rp_def = roomdef_mgr.getDisplayRules(channel, entry);
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
	    throw new RDRulesNotFoundException(warningmessage);
	} else if (warningmessage != null && !warningmessage.equals("")) {
	    /*
	     * new rules, existing display dimensions for this channel/entry
	     */
	    drm = new DisplayRulesModel();
	    drm.setDisplayDimensions(rp_def.getDisplayDimensions());
	    return drm;
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
	MI_HotelRoomProductDisplayRulesNotifRS ratecodes = roomdef_mgr.updateDisplayRules(roomproductInfo, loginName);
    }

    public void deleteDisplayRules(Channel channel, Entry entry, String loginName) {
	MI_HotelRoomProductDisplayRulesRS dr = new MI_HotelRoomProductDisplayRulesRS(channel, entry, null, null);
	updateDisplayRules(dr, loginName);
    }

    public void copyDisplayRules(Channel channel, Entry entry, Channel copyChannel, Entry copyEntry, String loginName)
	    throws RDRulesNotFoundException {
	String errormessage, errorcode;

	MI_HotelRoomProductDisplayRulesRS origRules = roomdef_mgr.getDisplayRules(copyChannel, copyEntry);
	errormessage = getErrorMessage(origRules.getErrors());
	errorcode = getErrorCode(origRules.getErrors());
	if (errorcode.equals("5000")) {
	    throw new RDRulesNotFoundException(errormessage);
	} else {
	    MI_HotelRoomProductDisplayRulesRS rulesNew = new MI_HotelRoomProductDisplayRulesRS(channel, entry, origRules.getDisplayDimensions(),
		    origRules.getProductDescriptions());
	    roomdef_mgr.updateDisplayRules(rulesNew, loginName);
	}

    }

    public void copyDisplayText(Channel channel, Language language, Channel copyChannel, Language copyLanguage, String loginName)
	    throws RDTextNotFoundException {
	String errormessage, errorcode;

	MI_HotelRoomProductDisplayTextRS origText = roomdef_mgr.getDisplayText(copyChannel, copyLanguage.getCode());
	errormessage = getErrorMessage(origText.getErrors());
	errorcode = getErrorCode(origText.getErrors());
	if (errorcode.equals("5000")) {
	    throw new RDTextNotFoundException(errormessage);
	} else {
	    MI_HotelRoomProductDisplayTextRS displayText = new MI_HotelRoomProductDisplayTextRS();
	    displayText.setChannel(channel);
	    displayText.setPrimaryLangID(language.getCode());
	    displayText.setBrands(origText.getBrands());
	    displayText.setFormats(origText.getFormats());
	    displayText.setUnitsOfMeasure(origText.getUnitsOfMeasure());
	    displayText.setProductDescriptions(origText.getProductDescriptions());

	    roomdef_mgr.updateDisplayText(displayText, loginName);
	}

    }

    public void deleteDisplayText(Channel channel, Language language, String loginName) {
	MI_HotelRoomProductDisplayTextRS displayText = new MI_HotelRoomProductDisplayTextRS();
	// Setting the channel
	displayText.setChannel(channel);

	// Setting the language
	displayText.setPrimaryLangID(language.getCode());
	roomdef_mgr.updateDisplayText(displayText, loginName);
    }

    public void copyChannel(Channel channel, Language language, Channel copyChannel, Language copyLanguage, String loginName)
	    throws RDTextNotFoundException {
	String errormessage, errorcode;
	// Copy from an existing channel
	MI_HotelRoomProductDisplayTextRS displayText = new MI_HotelRoomProductDisplayTextRS();
	// Setting the channel to be copied from

	// Fetching the displaytext of the channel to be copied from
	MI_HotelRoomProductDisplayTextRS copydisplayText = null;
	copydisplayText = roomdef_mgr.getDisplayText(copyChannel, copyLanguage.getCode());
	// If channel to be copied from is new i.e. has no display text,
	// throw an error and send user back to the copy page
	errormessage = getErrorMessage(copydisplayText.getErrors());
	errorcode = getErrorCode(copydisplayText.getErrors());
	if (errorcode.equals("5000")) {
	    throw new RDTextNotFoundException(errormessage);
	} else {

	    // Setting the channel for the displaytext to be copied to
	    displayText.setChannel(channel);
	    // Setting the language
	    displayText.setPrimaryLangID(language.getCode());

	    displayText.setBrands(copydisplayText.getBrands());
	    displayText.setFormats(copydisplayText.getFormats());
	    displayText.setUnitsOfMeasure(copydisplayText.getUnitsOfMeasure());
	    displayText.setProductDescriptions(copydisplayText.getProductDescriptions());

	    // Updating the current channel/language combination with the
	    // display text
	    // obtained above of the channel to be copied from
	    roomdef_mgr.updateDisplayText(displayText, loginName);
	}
    }

    public Vector<DisplayTextModel> getDisplayTextData(Channel channel, String langId, boolean bCreateNew) throws RDTextNotFoundException {
	String errormessage, errorcode;

	MI_HotelRoomProductDisplayTextRS rp_def = roomdef_mgr.getDisplayText(channel, langId);
	errormessage = getErrorMessage(rp_def.getErrors());
	errorcode = getErrorCode(rp_def.getErrors());
	if (errorcode.equals("5000")) {
	    if (!bCreateNew)
		throw new RDTextNotFoundException(errormessage);
	}

	MI_HotelRoomProductDataDictionaryRS dataDictionary = roomdef_mgr.getDataDictionary();
	Vector<DisplayTextModel> displayTextData = new Vector<DisplayTextModel>();

	ProductDescriptions[] pdsList = dataDictionary.getDataDictionary().getProductDescriptions();
	ProductDescription[] pdTextList = null;
	if (rp_def != null && rp_def.getProductDescriptions() != null && rp_def.getProductDescriptions().getProductDescription() != null)
	    pdTextList = rp_def.getProductDescriptions().getProductDescription();
	if (pdsList != null) {
	    DisplayTextModel dtm = null;
	    Vector<DisplayTextElementModel> dtemList = null;
	    DisplayTextElementModel dtem = null;
	    for (int i = 0; i < pdsList.length; i++) {
		if (pdsList[i].getElementGroupName().trim().equals("")) {
		    if (dtm != null) {
			dtm.setDisplayElement(dtemList);
			displayTextData.add(dtm);
		    }
		    dtm = new DisplayTextModel();
		    dtemList = new Vector<DisplayTextElementModel>();
		    dtm.setElementTypeCode(pdsList[i].getElementTypeCode());
		    dtm.setElementTypeName(pdsList[i].getElementTypeName());
		}
		dtem = new DisplayTextElementModel();
		dtem.setElementTypeCode(pdsList[i].getElementTypeCode());
		dtem.setElementTypeName(pdsList[i].getElementTypeName());
		dtem.setElementGroupCode(pdsList[i].getElementGroupCode());
		dtem.setElementGroupName(pdsList[i].getElementGroupName());
		dtem.setDisplayText(findDisplayText(dtem, pdTextList));
		dtemList.add(dtem);
		if (pdsList[i].getCalloutInd() != null) {
		    dtem = new DisplayTextElementModel();
		    dtem.setElementTypeCode(pdsList[i].getElementTypeCode());
		    dtem.setElementTypeName(pdsList[i].getElementTypeName());
		    dtem.setElementGroupCode(pdsList[i].getElementGroupCode());
		    dtem.setElementGroupName(pdsList[i].getElementGroupName());
		    dtem.setCalloutInd(pdsList[i].getCalloutInd());
		    dtem.setDisplayText(findDisplayText(dtem, pdTextList));
		    dtemList.add(dtem);

		}
		ProductDescription[] pdList = pdsList[i].getProductDescription();
		if (pdList != null) {
		    for (int k = 0; k < pdList.length; k++) {
			dtem = new DisplayTextElementModel();
			dtem.setElementTypeCode(pdsList[i].getElementTypeCode());
			dtem.setElementTypeName(pdsList[i].getElementTypeName());
			dtem.setElementGroupCode(pdsList[i].getElementGroupCode());
			dtem.setElementGroupName(pdsList[i].getElementGroupName());
			dtem.setElementCode(pdList[k].getElementCode());
			dtem.setElementCodeList(pdList[k].getElementCodeList());
			dtem.setElementCodeName(pdList[k].getElementCodeName());
			dtem.setDisplayText(findDisplayText(dtem, pdTextList));
			dtemList.add(dtem);
			if (pdList[k].getCalloutInd() != null) {
			    char[] calloutList = pdList[k].getCalloutInd().toCharArray();
			    if (calloutList != null) {
				for (int x = 0; x < calloutList.length; x++) {
				    dtem = new DisplayTextElementModel();
				    dtem.setElementTypeCode(pdsList[i].getElementTypeCode());
				    dtem.setElementTypeName(pdsList[i].getElementTypeName());
				    dtem.setElementGroupCode(pdsList[i].getElementGroupCode());
				    dtem.setElementGroupName(pdsList[i].getElementGroupName());
				    dtem.setElementCode(pdList[k].getElementCode());
				    dtem.setElementCodeList(pdList[k].getElementCodeList());
				    dtem.setElementCodeName(pdList[k].getElementCodeName());
				    dtem.setCalloutInd(String.valueOf(calloutList[x]));
				    dtem.setDisplayText(findDisplayText(dtem, pdTextList));
				    dtemList.add(dtem);
				}
			    }
			}

		    }
		}
	    }
	    if (dtm != null) {
		dtm.setDisplayElement(dtemList);
		displayTextData.add(dtm);
	    }

	}

	return displayTextData;
    }

    private String findDisplayText(DisplayTextElementModel dtem, ProductDescription[] pdTextList) {
	String displayText = "";
	if (pdTextList != null) {
	    for (int y = 0; y < pdTextList.length; y++) {
		if (dtem.isEqual(pdTextList[y].getElementTypeCode(), pdTextList[y].getElementGroupCode(), pdTextList[y].getElementCodeList(),
			pdTextList[y].getElementCode(), pdTextList[y].getCalloutInd())) {
		    if (pdTextList[y].getDescription() != null && pdTextList[y].getDescription().getText() != null)
			displayText = pdTextList[y].getDescription().getText(0).getValue();
		    break;
		}
	    }
	}
	return displayText;
    }

    public DisplayTextAmenityModel getDisplayTextAmenity(Channel channel, String langId) throws RDTextNotFoundException {
	String errormessage, errorcode;

	MI_HotelRoomProductDisplayTextRS rp_def = roomdef_mgr.getDisplayText(channel, langId);
	errormessage = getErrorMessage(rp_def.getErrors());
	errorcode = getErrorCode(rp_def.getErrors());
	if (errorcode.equals("5000")) {
	    throw new RDTextNotFoundException(errormessage);
	}

	MI_HotelAmenityListsInfoRS amenityList = roomdef_mgr.getAmenityLists();
	DisplayTextAmenityModel dtam = new DisplayTextAmenityModel();
	dtam.setBrands(setBrandDisplayText(amenityList.getBrandsList().getBrands(), rp_def.getBrands().getBrand()));
	dtam.setFormats(setFormatDisplayText(amenityList.getFormatsList().getFormats(), rp_def.getFormats().getFormat()));
	dtam.setUnitsOfMeasure(seUOMDisplayText(amenityList.getUnitsOfMeasureList().getUnitsOfMeasure(), rp_def.getUnitsOfMeasure()
		.getUnitOfMeasure()));

	return dtam;
    }

    private Brands[] setBrandDisplayText(Brands[] brands, Brand[] brandDisplayText) {
	for (int bl = 0; bl < brands.length; bl++) {
	    Brand[] brand = brands[bl].getBrand();
	    for (int b = 0; b < brand.length; b++) {
		brand[b].setBrandList(brands[bl].getBrandList());
		for (int j = 0; j < brandDisplayText.length; j++) {
		    if (brand[b].getBrandList().equals(brandDisplayText[j].getBrandList())
			    && brand[b].getBrandCode().equals(brandDisplayText[j].getBrandCode())) {
			brand[b].setValue(brandDisplayText[j].getValue());
			break;
		    }
		}
	    }
	}
	return brands;
    }

    private Formats[] setFormatDisplayText(Formats[] formats, Format[] formatDisplayText) {
	for (int bl = 0; bl < formats.length; bl++) {
	    Format[] format = formats[bl].getFormat();
	    for (int b = 0; b < format.length; b++) {
		format[b].setFormatList(formats[bl].getFormatList());
		for (int j = 0; j < formatDisplayText.length; j++) {
		    if (format[b].getFormatList().equals(formatDisplayText[j].getFormatList())
			    && format[b].getFormatCode().equals(formatDisplayText[j].getFormatCode())) {
			format[b].setValue(formatDisplayText[j].getValue());
			break;
		    }
		}
	    }
	}
	return formats;
    }

    private UnitsOfMeasure[] seUOMDisplayText(UnitsOfMeasure[] uoms, UnitOfMeasure[] uomDisplayText) {
	for (int bl = 0; bl < uoms.length; bl++) {
	    UnitOfMeasure[] uom = uoms[bl].getUnitOfMeasure();
	    for (int b = 0; b < uom.length; b++) {
		uom[b].setUOM_List(uoms[bl].getUOM_List());
		for (int j = 0; j < uomDisplayText.length; j++) {
		    if (uom[b].getUOM_List().equals(uomDisplayText[j].getUOM_List()) && uom[b].getUOM_Code().equals(uomDisplayText[j].getUOM_Code())) {
			uom[b].setValue(uomDisplayText[j].getValue());
			break;
		    }
		}
	    }
	}
	return uoms;
    }

    public DataDictionary getDataDictionary() {
	MI_HotelRoomProductDataDictionaryRS rp_def = roomdef_mgr.getDataDictionary();
	return rp_def.getDataDictionary();
    }

    public void updateDisplayTextData(Channel channel, String langId, Map<String, DisplayTextElementModel> theText, String loginName) {
	String errorcode;

	MI_HotelRoomProductDisplayTextRS displayText = new MI_HotelRoomProductDisplayTextRS();
	displayText.setChannel(channel);

	// Setting the languageId
	displayText.setPrimaryLangID(langId);
	ProductDescription[] pdtxtList = new ProductDescription[theText.size()];
	for (int i = 0; i < theText.size(); i++) {
	    DisplayTextElementModel dtem = theText.get(String.valueOf(i));
	    ProductDescription pd = new ProductDescription();
	    pd.setElementTypeCode(dtem.getElementTypeCode());
	    pd.setElementGroupCode(dtem.getElementGroupCode());
	    pd.setElementCodeList(dtem.getElementCodeList());
	    pd.setElementCode(dtem.getElementCode());
	    if (!dtem.getCalloutInd().equals(""))
		pd.setCalloutInd(dtem.getCalloutInd());
	    Description d = new Description();
	    Text t[] = new Text[1];
	    t[0] = new Text(dtem.getDisplayText().trim());
	    d.setText(t);
	    pd.setDescription(d);
	    pdtxtList[i] = pd;
	}
	ProductDescriptions pdstext = new ProductDescriptions();
	pdstext.setProductDescription(pdtxtList);
	displayText.setProductDescriptions(pdstext);

	MI_HotelRoomProductDisplayTextRS rp_def = roomdef_mgr.getDisplayText(channel, langId);
	errorcode = getErrorCode(rp_def.getErrors());
	if (errorcode.equals("5000")) {
	    MI_HotelAmenityListsInfoRS amenityList = roomdef_mgr.getAmenityLists();
	    displayText.setBrands(setBrandText(amenityList));

	    // Setting the Units of Measurement
	    displayText.setUnitsOfMeasure(setUOMText(amenityList));

	    // Setting the Formats
	    displayText.setFormats(setFormatText(amenityList));
	} else {
	    displayText.setBrands(rp_def.getBrands());
	    displayText.setUnitsOfMeasure(rp_def.getUnitsOfMeasure());
	    displayText.setFormats(rp_def.getFormats());
	}
	roomdef_mgr.updateDisplayText(displayText, loginName);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    private Brands setBrandText(MI_HotelAmenityListsInfoRS amenityList) {

	Brands brandstxt = new Brands();
	// Fetching Brands from the Amenity List
	BrandsList brdList = amenityList.getBrandsList();
	Brands[] bd = brdList.getBrands();

	ArrayList brandList = new ArrayList();
	for (int i = 0; i < bd.length; i++) {
	    Brands brds = bd[i];
	    Brand[] brdarray = brds.getBrand();
	    for (int k = 0; k < brdarray.length; ++k) {
		Brand brdtxt = new Brand();
		brdtxt.setBrandList(brds.getBrandList());
		brdtxt.setBrandCode(brdarray[k].getBrandCode());
		// Default txt is empty
		brdtxt.setValue("");
		brandList.add(brdtxt);
	    }
	}

	Brand[] brdtextarr = new Brand[brandList.size()];
	for (int m = 0; m < brandList.size(); ++m) {
	    Brand bdt = (Brand) brandList.get(m);
	    brdtextarr[m] = new Brand(bdt);
	}

	brandstxt.setBrand(brdtextarr);

	return brandstxt;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    private UnitsOfMeasure setUOMText(MI_HotelAmenityListsInfoRS amenityList) {

	UnitsOfMeasure uomtxt = new UnitsOfMeasure();
	// Fetching UOM's from the Amenity List
	UnitsOfMeasureList uomList = amenityList.getUnitsOfMeasureList();
	UnitsOfMeasure[] uom = uomList.getUnitsOfMeasure();

	ArrayList umList = new ArrayList();
	for (int i = 0; i < uom.length; i++) {
	    UnitsOfMeasure ums = uom[i];
	    UnitOfMeasure[] uomarray = ums.getUnitOfMeasure();
	    for (int k = 0; k < uomarray.length; ++k) {
		UnitOfMeasure umtxt = new UnitOfMeasure();
		umtxt.setUOM_List(ums.getUOM_List());
		umtxt.setUOM_Code(uomarray[k].getUOM_Code());
		// Default txt is empty
		umtxt.setValue("");
		umList.add(umtxt);
	    }
	}

	UnitOfMeasure[] uomtextarr = new UnitOfMeasure[umList.size()];
	for (int m = 0; m < umList.size(); ++m) {
	    UnitOfMeasure umt = (UnitOfMeasure) umList.get(m);
	    uomtextarr[m] = new UnitOfMeasure(umt);
	}

	uomtxt.setUnitOfMeasure(uomtextarr);
	return uomtxt;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    private Formats setFormatText(MI_HotelAmenityListsInfoRS amenityList) {

	Formats formattxt = new Formats();
	// Fetching Formats from the Amenity List
	FormatsList formatList = amenityList.getFormatsList();
	Formats[] fmts = formatList.getFormats();

	ArrayList fmtList = new ArrayList();
	for (int i = 0; i < fmts.length; i++) {
	    Formats formats = fmts[i];
	    Format[] fmtarray = formats.getFormat();
	    for (int k = 0; k < fmtarray.length; ++k) {
		Format fmtxt = new Format();
		fmtxt.setFormatList(formats.getFormatList());
		fmtxt.setFormatCode(fmtarray[k].getFormatCode());
		// Default txt is empty
		fmtxt.setValue("");
		fmtList.add(fmtxt);
	    }
	}

	Format[] fmttextarr = new Format[fmtList.size()];
	for (int m = 0; m < fmtList.size(); ++m) {
	    Format fmt = (Format) fmtList.get(m);
	    fmttextarr[m] = new Format(fmt);
	}

	formattxt.setFormat(fmttextarr);
	return formattxt;
    }

    public void updateDisplayTextAmenity(Channel channel, String langId, Map<String, Brand> theBrand, Map<String, Format> theFormat,
	    Map<String, UnitOfMeasure> theUOM, String loginName) {

	MI_HotelRoomProductDisplayTextRS displayText = new MI_HotelRoomProductDisplayTextRS();
	displayText.setChannel(channel);

	// Setting the languageId
	displayText.setPrimaryLangID(langId);

	MI_HotelRoomProductDisplayTextRS rp_def = roomdef_mgr.getDisplayText(channel, langId);
	displayText.setProductDescriptions(rp_def.getProductDescriptions());
	displayText.setBrands(setBrandText(theBrand));
	displayText.setUnitsOfMeasure(setUOMText(theUOM));
	displayText.setFormats(setFormatText(theFormat));
	roomdef_mgr.updateDisplayText(displayText, loginName);
    }

    private Brands setBrandText(Map<String, Brand> theBrand) {
	Brands brands = new Brands();
	Brand[] brandArray = new Brand[theBrand.size()];
	for (int i = 0; i < theBrand.size(); i++) {
	    Brand b = theBrand.get(String.valueOf(i));
	    b.setBrandName(null);
	    brandArray[i] = b;
	}
	brands.setBrand(brandArray);
	return brands;
    }

    private Formats setFormatText(Map<String, Format> theFormat) {
	Formats formats = new Formats();
	Format[] formatArray = new Format[theFormat.size()];
	for (int i = 0; i < theFormat.size(); i++) {
	    Format f = theFormat.get(String.valueOf(i));
	    f.setFormatName(null);
	    formatArray[i] = f;
	}
	formats.setFormat(formatArray);
	return formats;
    }

    private UnitsOfMeasure setUOMText(Map<String, UnitOfMeasure> theUOM) {
	UnitsOfMeasure uoms = new UnitsOfMeasure();
	UnitOfMeasure[] uomArray = new UnitOfMeasure[theUOM.size()];
	for (int i = 0; i < theUOM.size(); i++) {
	    UnitOfMeasure u = theUOM.get(String.valueOf(i));
	    u.setUOM_Name(null);
	    uomArray[i] = u;
	}
	uoms.setUnitOfMeasure(uomArray);
	return uoms;
    }
}