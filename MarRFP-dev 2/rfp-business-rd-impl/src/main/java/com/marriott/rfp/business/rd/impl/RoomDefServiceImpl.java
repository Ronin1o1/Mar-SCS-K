package com.marriott.rfp.business.rd.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.dataaccess.rd.roomdef.api.RoomDefManager;
import com.marriott.rfp.object.rd.common.RateProgram;
import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.object.roomdef.ProductDescriptionView;
import com.marriott.rfp.object.roomdef.ProductDescriptionsView;
import com.marriott.rfp.object.roomdef.ProductView;
import com.marriott.rfp.object.roomdef.RoomDefDataView;
import com.marriott.rfp.object.roomdef.RoomDefDefinitionUpdateView;
import com.marriott.rfp.object.roomdef.RoomDefMenuModel;
import com.marriott.rfp.object.roomdef.RoomDefSyncAlerts;
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.BrandsList;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Format;
import com.marriott.rfp.object.roomdef.beans.Formats;
import com.marriott.rfp.object.roomdef.beans.FormatsList;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RatePlan;
import com.marriott.rfp.object.roomdef.beans.RatePlans;
import com.marriott.rfp.object.roomdef.beans.RoomProduct;
import com.marriott.rfp.object.roomdef.beans.RoomProducts;
import com.marriott.rfp.object.roomdef.beans.RoomType;
import com.marriott.rfp.object.roomdef.beans.RoomTypes;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.SynchAlert;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Transactional("transactionManagerRfpCommon")
@Service
public class RoomDefServiceImpl extends RDServiceBase implements RoomDefService {

    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
	private static final Logger log = LoggerFactory.getLogger(RoomDefServiceImpl.class);
    @Autowired
    private RoomDefManager roomdef_mgr = null;

    public RoomDefServiceImpl() {

    }

    public Vector<RoomPool> getHotelRoomPoolList(String marshacode) {
	MI_HotelRoomPoolListRS roompools = roomdef_mgr.getRoomPoolList(marshacode);

	// get a list of all the room pools with a room product definition for
	// the property
	MI_HotelRoomProductInfoRS rp_def = roomdef_mgr.getRoomProductList(marshacode, null);

	// get a list of the sync alerts for the property
	MI_HotelRoomProductSynchAlertsRS rp_syncdef = roomdef_mgr.getRoomProductSyncAlerts(marshacode, null);

	RoomProducts rps;
	RoomProduct rp[] = null;
	if (rp_def != null) {
	    rps = rp_def.getRoomProducts();
	    if (rps != null) {
		rp = rps.getRoomProduct();
	    }
	}

	SynchAlerts[] sas;
	SynchAlert sa[] = null;
	if (rp_syncdef != null) {
	    sas = rp_syncdef.getSynchAlerts();
	    if (sas != null) {
		sa = sas[0].getSynchAlert();
	    }
	}

	Vector<RoomPool> roompoollist = new Vector<RoomPool>();
	RoomTypes rts = roompools.getRoomTypes();
	String roompool;
	boolean hasRoomDef = false;
	boolean hasSyncAlert = false;
	if (rts != null) {
	    RoomType rt[] = rts.getRoomType();
	    for (int i = 0; i < rt.length; i++) {
		RoomPool rpm = new RoomPool();
		roompool = rt[i].getRoomTypeCode();
		hasRoomDef = getHasRoomDef(roompool, rp);
		hasSyncAlert = getHasSyncAlert(roompool, sa);
		rpm.setRoomPool(roompool);
		rpm.setHasRoomDefinition(hasRoomDef);
		rpm.setHasSyncAlert(hasSyncAlert);
		roompoollist.add(rpm);
	    }
	}
	return roompoollist;
    }

    private Language[] getDefaultChannelLanguages() {
	Channel channel = new Channel();
	channel.setCode("ZZ");
	channel.setName("DEFAULT");
	channel.setNumber("0");
	// get a list of all the room pools with a room product definition for
	// the property
	Language[] lang = null;
	MI_HotelRoomProductInfoChannelLanguagesRS rp_def = roomdef_mgr.getChannelLanguages(channel);
	if (rp_def.getChannels() != null && rp_def.getChannels().getChannel() != null)
	    lang = rp_def.getChannels().getChannel()[0].getLanguages().getLanguage();
	return lang;

    }

    /*
     * determine if the room pool already has a product definition.
     */
    private static boolean getHasRoomDef(String roompool, RoomProduct[] rp) {
	boolean hasRoomDef = false;
	if (rp != null) {
	    for (int i = 0; i < rp.length; i++) {
		if (roompool.equals(rp[i].getRoomTypeCode())) {
		    hasRoomDef = true;
		    break;
		}
	    }
	}
	return hasRoomDef;
    }

    /*
     * determine if the room pool has a sync alert.
     */
    private static boolean getHasSyncAlert(String roompool, SynchAlert[] sa) {
	boolean hasRoomDef = false;
	if (sa != null) {
	    for (int i = 0; i < sa.length; i++) {
		RoomProduct[] rp = sa[i].getRoomProduct();
		if (rp != null) {
		    for (int x = 0; x < rp.length; x++) {
			if (rp[x] != null && roompool.equals(rp[x].getRoomTypeCode())) {
			    hasRoomDef = true;
			    break;
			}
		    }
		    if (hasRoomDef)
			break;
		}
	    }
	}
	return hasRoomDef;
    }

    public Vector<RateProgram> getHotelRateProgramList(String marshacode, String roomPool) {
	MI_HotelRateCodeListRS ratePrograms = roomdef_mgr.getRateProgramList(marshacode, roomPool);

	// get a list of all the room pools with a room product definition for
	// the property
	MI_HotelRoomProductInfoRS rp_def = roomdef_mgr.getRoomProductList(marshacode, roomPool);

	// get a list of the sync alerts for the property
	MI_HotelRoomProductSynchAlertsRS rp_syncdef = roomdef_mgr.getRoomProductSyncAlerts(marshacode, roomPool);

	RoomProducts rps;
	RoomProduct rp[] = null;
	if (rp_def != null) {
	    rps = rp_def.getRoomProducts();
	    if (rps != null) {
		rp = rps.getRoomProduct();
	    }
	}

	SynchAlerts[] sas;
	SynchAlert sa[] = null;
	if (rp_syncdef != null) {
	    sas = rp_syncdef.getSynchAlerts();
	    if (sas != null) {
		sa = sas[0].getSynchAlert();
	    }
	}

	Vector<RateProgram> rateProgramList = new Vector<RateProgram>();
	RatePlans rts = ratePrograms.getRatePlans();
	String rateProgram;
	boolean hasRoomDef = false;
	boolean hasSyncAlert = false;
	if (rts != null) {
	    RatePlan rt[] = rts.getRatePlan();
	    if (rt != null) {
		for (int i = 0; i < rt.length; i++) {
		    RateProgram rpm = new RateProgram();
		    rateProgram = rt[i].getRatePlanCode();
		    hasRoomDef = getRateProgramHasRoomDef(rateProgram, rp);
		    hasSyncAlert = getRateProgramHasSyncAlert(rateProgram, sa);
		    rpm.setRateProgram(rateProgram);
		    rpm.setHasRoomDefinition(hasRoomDef);
		    rpm.setHasSyncAlert(hasSyncAlert);
		    rateProgramList.add(rpm);
		}
	    }
	}
	return rateProgramList;
    }

    /*
     * determine if the rateProgram already has a product definition.
     */
    private static boolean getRateProgramHasRoomDef(String rateProgram, RoomProduct[] rp) {
	boolean hasRoomDef = false;
	if (rp != null) {
	    for (int i = 0; i < rp.length; i++) {
		if (rateProgram.equals(rp[i].getRatePlanCode())) {
		    hasRoomDef = true;
		    break;
		}
	    }
	}
	return hasRoomDef;
    }

    /*
     * determine if the rateProgram has a sync alert.
     */
    private static boolean getRateProgramHasSyncAlert(String rateProgram, SynchAlert[] sa) {
	boolean hasRoomDef = false;
	if (sa != null) {
	    for (int i = 0; i < sa.length; i++) {
		RoomProduct[] rp = sa[i].getRoomProduct();
		if (rp != null) {
		    for (int x = 0; x < rp.length; x++) {
			if (rp[x] != null && rateProgram.equals(rp[x].getRatePlanCode())) {
			    hasRoomDef = true;
			    break;
			}
		    }
		}
		if (hasRoomDef)
		    break;
	    }
	}
	return hasRoomDef;
    }

    public RoomDefDataView getHotelMenuForDefinition(String marshaCode, String roomPool) {
	RoomDefDataView roomDefDataView = new RoomDefDataView();
	MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    roomDefDataView.setRoomDefMenu(getMenuOptions(roomPool,null, dd, mrtnd));
	}
	return roomDefDataView;
    }

    public Vector<RoomDefSyncAlerts> getHotelSyncAlerts(String marshaCode, String roomPool) {
	Vector<RoomDefSyncAlerts> roomDefSyncAlerts = new Vector<RoomDefSyncAlerts>();
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    SynchAlerts[] sas = mrtnd.getSynchAlerts();
	    for (int i = 0; i < sas.length; i++) {
		SynchAlert[] sa = sas[i].getSynchAlert();
		if (sa != null) {
		    for (int j = 0; j < sa.length; j++) {
			RoomProduct[] rp = sa[j].getRoomProduct();
			for (int k = 0; k < rp.length; k++) {
			    RoomDefSyncAlerts rdsa = null;
			    Vector<String> syncAlertSection = null;
			    for (int l = 0; l < roomDefSyncAlerts.size(); l++) {
				if (roomDefSyncAlerts.elementAt(l).getRoomPool().equals(rp[k].getRoomTypeCode())
					&& roomDefSyncAlerts.elementAt(l).getRateProgram().equals(rp[k].getRatePlanCode())) {
				    rdsa = roomDefSyncAlerts.elementAt(l);
				    syncAlertSection = rdsa.getSyncAlerts();
				    break;
				}
			    }
			    if (rdsa == null) {
				rdsa = new RoomDefSyncAlerts(rp[k].getRoomTypeCode(), rp[k].getRatePlanCode());
				roomDefSyncAlerts.add(rdsa);
				syncAlertSection = new Vector<String>();
				rdsa.setSyncAlerts(syncAlertSection);
			    }
			    ProductDescriptions[] pds = rp[k].getProductDescriptions();
			    for (int m = 0; m < pds.length; m++) {
				boolean bFound = false;
				for (int n = 0; n < syncAlertSection.size(); n++) {
				    if (pds[m].getElementTypeName().equals(syncAlertSection.elementAt(n))) {
					bFound = true;
					break;
				    }
				}
				if (!bFound)
				    syncAlertSection.add(pds[m].getElementTypeName());
			    }
			}
		    }
		}
	    }
	}
	if (roomDefSyncAlerts.size() == 0)
	    roomDefSyncAlerts = null;
	return roomDefSyncAlerts;
    }

    public RoomDefDataView getHotelDataForDefinition(String marshaCode, String roomPool, Boolean newInd, String elementTypeCode) {
	RoomDefDataView roomDefDataView = new RoomDefDataView();
	MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    if (!newInd)
		mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    roomDefDataView.setRoomDefMenu(getMenuOptions(roomPool,null, dd, mrtnd));
	    if (elementTypeCode == null || elementTypeCode.equals(""))
		elementTypeCode = ((RoomDefMenuModel) roomDefDataView.getRoomDefMenu().elementAt(0)).getScreenid();
	    roomDefDataView.setNextMenuOption(getNextMenuOption(elementTypeCode, roomDefDataView.getRoomDefMenu()));
	    roomDefDataView.setPreviousMenuOption(getPrevMenuOption(elementTypeCode, roomDefDataView.getRoomDefMenu()));
	    MI_HotelAmenityListsInfoRS amenityList = roomdef_mgr.getAmenityLists();
	    roomDefDataView.setUomLists(getUnitsOfMeasureMap(amenityList));
	    roomDefDataView.setBrandLists(getBrandMap(amenityList));
	    roomDefDataView.setFormatLists(getFormatsMap(amenityList));
	    roomDefDataView.setProductView(getDataForScreen(roomPool, newInd, elementTypeCode, dd, mrtnd));
	    roomDefDataView.setLanguage(getDefaultChannelLanguages());
	}
	return roomDefDataView;
    }

    public RoomDefDataView getHotelDataForDefinition(String marshaCode, String roomPool, String rateProgram, String elementTypeCode) {
	RoomDefDataView roomDefDataView = new RoomDefDataView();
	MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    roomDefDataView.setRoomDefMenu(getMenuOptions(roomPool, null, dd, mrtnd));
	    roomDefDataView.setRoomDefRateProgMenu(getMenuOptions(roomPool, rateProgram, dd, mrtnd));
	    if (elementTypeCode == null || elementTypeCode.equals(""))
		elementTypeCode = ((RoomDefMenuModel) roomDefDataView.getRoomDefMenu().elementAt(0)).getScreenid();
	    roomDefDataView.setNextMenuOption(getNextMenuOption(elementTypeCode, roomDefDataView.getRoomDefRateProgMenu()));
	    roomDefDataView.setPreviousMenuOption(getPrevMenuOption(elementTypeCode, roomDefDataView.getRoomDefRateProgMenu()));
	    MI_HotelAmenityListsInfoRS amenityList = roomdef_mgr.getAmenityLists();
	    roomDefDataView.setUomLists(getUnitsOfMeasureMap(amenityList));
	    roomDefDataView.setBrandLists(getBrandMap(amenityList));
	    roomDefDataView.setFormatLists(getFormatsMap(amenityList));
	    roomDefDataView.setProductView(getDataForScreen(roomPool, rateProgram, elementTypeCode, dd, mrtnd));
	    roomDefDataView.setLanguage(getDefaultChannelLanguages());
	}
	return roomDefDataView;
    }

    private Vector<RoomDefMenuModel> getMenuOptions(String roomPool, String rateProgram, MI_HotelRoomProductOptionsRS dd, MI_HotelRoomProductInfoRS hpi) {
	Vector<RoomDefMenuModel> menuList = new Vector<RoomDefMenuModel>();
	String curElementTypeCode = "";
	String curElementTypeName = "";
	boolean hasSyncAlert = false;
	SynchAlert[] saa = null;
	SynchAlerts[] sasa = null;
	if (hpi != null)
	    sasa = hpi.getSynchAlerts();
	if (sasa != null) {
	    saa = sasa[0].getSynchAlert();
	}
	ProductDescriptions[] rtndl = dd.getProductDescriptions();
	if (rtndl != null) {
	    for (int i = 0; i < rtndl.length; i++) {
		if (!curElementTypeCode.equals(rtndl[i].getElementTypeCode()) && !curElementTypeName.equals(rtndl[i].getElementTypeName())
			&& validMenuItem(rtndl[i])) {
		    curElementTypeCode = rtndl[i].getElementTypeCode();
		    curElementTypeName = rtndl[i].getElementTypeName();
		    hasSyncAlert = hasSyncAlertForMenu(roomPool, rateProgram, curElementTypeCode, saa);
		    menuList.addElement(new RoomDefMenuModel(curElementTypeName, curElementTypeCode, hasSyncAlert));
		}
	    }
	}
	return menuList;
    }

    private boolean hasSyncAlertForMenu(String roomPool, String rateProgram, String elementTypeCode, SynchAlert[] saa) {
	boolean hasSyncAlert = false;
	if (saa != null) {
	    for (int i = 0; i < saa.length; i++) {
		RoomProduct[] rpa = saa[i].getRoomProduct();
		for (int j = 0; j < rpa.length; j++) {
		    if (roomPool.equals(rpa[j].getRoomTypeCode())
			    && ((rateProgram == null && rpa[j].getRatePlanCode().equals("    ")) || (rateProgram != null && rateProgram.equals(rpa[j]
				    .getRatePlanCode())))) {
			ProductDescriptions[] pdsa = rpa[j].getProductDescriptions();
			for (int k = 0; k < pdsa.length; k++) {
			    if (pdsa[k].getElementTypeCode().equals(elementTypeCode)) {
				hasSyncAlert = true;
				break;
			    }
			}
		    }
		    if (hasSyncAlert)
			break;
		}
		if (hasSyncAlert)
		    break;
	    }

	}
	return hasSyncAlert;

    }

    private String getNextMenuOption(String currOption, Vector<RoomDefMenuModel> roomDefMenu) {
	String nextItem = null;
	for (int i = 0; i < roomDefMenu.size(); i++) {
	    if (currOption.equals(roomDefMenu.elementAt(i).getScreenid())) {
		if (roomDefMenu.size() > (i + 1))
		    nextItem = roomDefMenu.elementAt(i + 1).getScreenid();
		break;
	    }
	}
	return nextItem;
    }

    private String getPrevMenuOption(String currOption, Vector<RoomDefMenuModel> roomDefMenu) {
	String prevItem = null;
	for (int i = 0; i < roomDefMenu.size(); i++) {
	    if (currOption.equals(roomDefMenu.elementAt(i).getScreenid())) {
		if (i > 0)
		    prevItem = roomDefMenu.elementAt(i - 1).getScreenid();
		break;
	    }
	}
	return prevItem;
    }

    private boolean validMenuItem(ProductDescriptions rtndl) {
	boolean bOK = false;
	ProductDescription[] rtnd = rtndl.getProductDescription();
	if (rtnd != null) {
	    for (int rd = 0; rd < rtnd.length; rd++) {
		if (rtnd[rd].getSupplementaryData() != null || rtnd[rd].getFormat() != null || rtnd[rd].getBrand() != null
			|| rtnd[rd].getUnitOfMeasure() != null) {
		    bOK = true;
		    break;
		}

	    }
	}
	return bOK;
    }

    private Map<String, UnitsOfMeasure> getUnitsOfMeasureMap(MI_HotelAmenityListsInfoRS dd) {
	Map<String, UnitsOfMeasure> uomListMap = null;
	UnitsOfMeasureList unitsOfMeasureList = dd.getUnitsOfMeasureList();
	if (unitsOfMeasureList != null) {
	    UnitsOfMeasure[] uom = unitsOfMeasureList.getUnitsOfMeasure();
	    if (uom != null) {
		uomListMap = new HashMap<String, UnitsOfMeasure>();
		for (int i = 0; i < uom.length; i++) {
		    uomListMap.put(uom[i].getUOM_List(), uom[i]);
		}
	    }
	}
	return uomListMap;
    }

    private Map<String, Formats> getFormatsMap(MI_HotelAmenityListsInfoRS dd) {
	Map<String, Formats> formatsMap = null;
	FormatsList formatsList = dd.getFormatsList();
	if (formatsList != null) {
	    Formats[] formats = formatsList.getFormats();
	    if (formats != null) {
		formatsMap = new HashMap<String, Formats>();
		for (int i = 0; i < formats.length; i++) {
		    formatsMap.put(formats[i].getFormatList(), formats[i]);
		}
	    }
	}
	return formatsMap;
    }

    private Map<String, Brands> getBrandMap(MI_HotelAmenityListsInfoRS dd) {
	Map<String, Brands> brandsMap = null;
	BrandsList brandsList = dd.getBrandsList();
	if (brandsList != null) {
	    Brands[] brands = brandsList.getBrands();
	    if (brands != null) {
		brandsMap = new HashMap<String, Brands>();
		for (int i = 0; i < brands.length; i++) {
		    brandsMap.put(brands[i].getBrandList(), brands[i]);
		}
	    }
	}
	return brandsMap;
    }

    private ProductView getDataForScreen(String roomPool, Boolean newInd, String elementTypeCode, MI_HotelRoomProductOptionsRS dd,
	    MI_HotelRoomProductInfoRS hrpi) {
	ProductView productView = new ProductView();
	Vector<ProductDescriptionsView> pdsv = getOptionsWOBlankForScreen(dd, elementTypeCode, true);
	productView.setProductOptions(pdsv);
	Vector<ProductDescriptionsView> pdsDefinitionView = getDefinitionsWOBlankForScreen(roomPool, null, hrpi, elementTypeCode);
	if (elementTypeCode.equals("3"))
	    pdsDefinitionView = getBedsDefinitionCombinedWithOptions(pdsv, pdsDefinitionView);
	else
	    pdsDefinitionView = getDefinitionCombinedWithOptions(pdsv, pdsDefinitionView, true);
	setSyncAlerts(roomPool, null, elementTypeCode, pdsDefinitionView, hrpi);
	productView.setProductDefinition(pdsDefinitionView);
	return productView;
    }

    private ProductView getDataForScreen(String roomPool, String rateProgram, String elementTypeCode, MI_HotelRoomProductOptionsRS dd,
	    MI_HotelRoomProductInfoRS hrpi) {
	ProductView productView = new ProductView();
	Vector<ProductDescriptionsView> pdsv = getOptionsWOBlankForScreen(dd, elementTypeCode, false);
	Vector<ProductDescriptionsView> pdsDefinitionView = getDefinitionsWOBlankForScreen(roomPool, null, hrpi, elementTypeCode);
	if (elementTypeCode.equals("3"))
	    pdsDefinitionView = getBedsDefinitionCombinedWithOptions(pdsv, pdsDefinitionView);
	else
	    pdsDefinitionView = getDefinitionCombinedWithOptions(pdsv, pdsDefinitionView, false);
	removeBlanksForRateProgramView(pdsDefinitionView);
	productView.setProductOptions(pdsDefinitionView);
	Vector<ProductDescriptionsView> rpDefinitionView = getDefinitionsWOBlankForScreen(roomPool, rateProgram, hrpi, elementTypeCode);
	rpDefinitionView = getDefinitionCombinedWithOptions(pdsDefinitionView, rpDefinitionView, false);
	setSyncAlerts(roomPool, rateProgram, elementTypeCode, rpDefinitionView, hrpi);
	productView.setProductDefinition(rpDefinitionView);
	return productView;
    }

    private void removeBlanksForRateProgramView(Vector<ProductDescriptionsView> pdsDefinitionView) {
	for (int i = 0; i < pdsDefinitionView.size(); i++) {
	    Vector<ProductDescriptionView> pdView = pdsDefinitionView.elementAt(i).getProductDescription();
	    for (int j = pdView.size() - 1; j >= 0; j--) {
		if (pdView.elementAt(j).getShowAvailability() && pdView.elementAt(j).getAvailabilityInd().equals(" ")) {
		    pdView.remove(j);
		}
	    }
	}
    }

    private Vector<ProductDescriptionsView> getBedsDefinitionCombinedWithOptions(Vector<ProductDescriptionsView> productOptions,
	    Vector<ProductDescriptionsView> productDefinition) {
	Vector<ProductDescriptionsView> pdsvv = new Vector<ProductDescriptionsView>();
	Vector<ProductDescriptionView> firstv = new Vector<ProductDescriptionView>();
	Vector<ProductDescriptionView> bedv = new Vector<ProductDescriptionView>();
	Vector<ProductDescriptionView> otherv = new Vector<ProductDescriptionView>();
	Vector<ProductDescriptionView> togetherv = new Vector<ProductDescriptionView>();
	boolean bFoundBedrooms = false;
	long numBedrooms = 1;
	int i, j;
	// Separate options into sections
	for (i = 0; i < productOptions.size(); i++) {
	    ProductDescriptionsView pov = productOptions.elementAt(i);
	    for (j = 0; j < pov.getProductDescription().size(); j++) {
		if (pov.getProductDescription().elementAt(j).getShowRoomNumber()) {
		    bedv.add(pov.getProductDescription().elementAt(j));
		    bFoundBedrooms = true;
		} else {
		    if (!bFoundBedrooms)
			firstv.add(pov.getProductDescription().elementAt(j));
		    else
			otherv.add(pov.getProductDescription().elementAt(j));
		}
	    }
	}
	// get number of rooms
	if (productDefinition != null && productDefinition.size() > 0) {
	    for (i = 0; i < productDefinition.size(); i++) {
		Vector<ProductDescriptionView> pdv = productDefinition.elementAt(i).getProductDescription();
		for (j = 0; j < pdv.size(); j++) {
		    if (pdv.elementAt(j).getElementCodeList().equals("MRBE") && pdv.elementAt(j).getElementCode().equals("0003")) {
			Format numBedroomsFmt = pdv.elementAt(j).getFormat();
			if (numBedroomsFmt != null) {
			    String sNumBedrooms = numBedroomsFmt.getFormatName();
			    try {
				numBedrooms = Long.valueOf(sNumBedrooms).longValue();
			    } catch (NumberFormatException ex) {
				numBedrooms = 1;
			    }
			    if (numBedrooms < 1)
				numBedrooms = 1;
			}
			break;
		    }
		}
	    }
	}

	togetherv.addAll(firstv);
	for (i = 0; i < numBedrooms; i++) {
	    long roomnum = i + 1;
	    for (j = 0; j < bedv.size(); j++) {
		ProductDescriptionView pdb = new ProductDescriptionView(bedv.elementAt(j));
		pdb.setRoomNumber(BigDecimal.valueOf(roomnum));
		pdb.setShowRoomNumber(true);
		togetherv.add(pdb);
	    }
	}
	togetherv.addAll(otherv);
	ProductDescriptionsView newpdsv = new ProductDescriptionsView();
	newpdsv.copyAttributesInto(productOptions.elementAt(0));
	pdsvv.add(newpdsv);
	pdsvv.elementAt(0).setProductDescription(togetherv);
	pdsvv = getDefinitionCombinedWithOptions(pdsvv, productDefinition, true);
	return pdsvv;
    }

    private Vector<ProductDescriptionsView> getDefinitionCombinedWithOptions(Vector<ProductDescriptionsView> productOptions,
	    Vector<ProductDescriptionsView> productDefinition, boolean roomPoolLevel) {
	Vector<ProductDescriptionsView> pdsvv = new Vector<ProductDescriptionsView>();
	if (productDefinition == null || productDefinition.size() == 0) {
	    if (productDefinition == null)
		productDefinition = new Vector<ProductDescriptionsView>();
	    for (int j = 0; j < productOptions.size(); j++) {
		ProductDescriptionsView pdsv = new ProductDescriptionsView();
		pdsv.copyInto(productOptions.elementAt(j));
		productDefinition.add(pdsv);
	    }
	}
	for (int i = 0; i < productOptions.size(); i++) {
	    ProductDescriptionsView productDefinitionPDSV = null;
	    if (productDefinition != null && productDefinition.size() > 0) {
		for (int x = 0; x < productDefinition.size(); x++) {
		    if (productDefinition.elementAt(x).getElementTypeCode().equals(productOptions.elementAt(i).getElementTypeCode())
			    && productDefinition.elementAt(x).getElementGroupCode().equals(productOptions.elementAt(i).getElementGroupCode())) {
			productDefinitionPDSV = productDefinition.elementAt(x);
			productDefinitionPDSV.setProductDescription(getProductDescriptionsForDisplay(productOptions.elementAt(i)
				.getProductDescription(), productDefinitionPDSV.getProductDescription(), roomPoolLevel));
			break;
		    }
		}
		pdsvv.add(productDefinitionPDSV);
	    }

	}
	return pdsvv;
    }

    private void setSyncAlerts(String roomPool, String rateProgram, String elementTypeCode, Vector<ProductDescriptionsView> productDefinition,
	    MI_HotelRoomProductInfoRS hrpi) {
	if (hrpi!=null && hrpi.getSynchAlerts() != null && hrpi.getSynchAlerts(0).getSynchAlert() != null) {
	    SynchAlert[] ssa = hrpi.getSynchAlerts(0).getSynchAlert();
	    for (int i = 0; i < ssa.length; i++) {
		RoomProduct[] rpa = ssa[i].getRoomProduct();
		for (int j = 0; j < rpa.length; j++) {
		    if (rpa[j].getRoomTypeCode().equals(roomPool)
			    && ((rateProgram == null && rpa[j].getRatePlanCode().equals("    ")) || (rateProgram != null && rpa[j].getRatePlanCode()
				    .equals(rateProgram)))) {
			ProductDescriptions[] pds = rpa[j].getProductDescriptions();
			for (int k = 0; k < pds.length; k++) {
			    if (pds[k].getElementTypeCode().equals(elementTypeCode)) {
				ProductDescription[] pd = pds[k].getProductDescription();
				for (int l = 0; l < pd.length; l++) {
				    for (int m = 0; m < productDefinition.size(); m++) {
					ProductDescriptionsView pdsv = productDefinition.elementAt(m);
					if (pdsv.getProductDescription() != null) {
					    for (int n = 0; n < pdsv.getProductDescription().size(); n++) {
						ProductDescriptionView pdv = pdsv.getProductDescription().elementAt(n);
						if (pd[l].getElementCodeList().equals(pdv.getElementCodeList())
							&& pd[l].getElementCode().equals(pdv.getElementCode()))
						    pdv.setSyncAlert(true);
					    }
					}
				    }
				}
			    }
			}
		    }
		}
	    }
	}
    }

    private Vector<ProductDescriptionView> getProductDescriptionsForDisplay(Vector<ProductDescriptionView> optionsView,
	    Vector<ProductDescriptionView> definitionView, boolean roomPoolLevel) {
	Vector<ProductDescriptionView> newPdvv = new Vector<ProductDescriptionView>();
	for (int i = 0; i < optionsView.size(); i++) {
	    ProductDescriptionView pdv = findProductDescription(optionsView.elementAt(i), definitionView, roomPoolLevel);
	    if (pdv == null)
		pdv = setProductDescription(optionsView.elementAt(i), new ProductDescriptionView(optionsView.elementAt(i)), roomPoolLevel);
	    newPdvv.add(pdv);
	}
	return newPdvv;
    }

    private ProductDescriptionView setProductDescription(ProductDescriptionView optionView, ProductDescriptionView definitionView,
	    boolean roomPoolLevel) {
	definitionView.setShowAvailability(optionView.getShowAvailability());
	if (defaultAvailability(optionView))
	    definitionView.setAvailabilityInd(optionView.getAvailabilityInd());
	definitionView.setDropDownType(getDropdownIndicator(optionView, roomPoolLevel));
	if (definitionView.getAvailabilityInd().equals("N") && definitionView.getDropDownType().equals("")) {
	    if (definitionView.getCalloutInd() != null && definitionView.getCalloutInd().equals("N"))
		definitionView.setShow(true);
	    else
		definitionView.setShow(false);
	} else
	    definitionView.setShow(true);
	setHasRoomNumber(definitionView);
	definitionView.setShowQuantity(optionView.getShowQuantity());
	if (definitionView.getShowQuantity()) {
	    if (optionView.getQuantity().longValue() > 0) {
		definitionView.setEditQuantity(false);
		definitionView.setQuantity(optionView.getQuantity());
	    } else
		definitionView.setEditQuantity(true);
	}
	definitionView.setShowText(optionView.getShowText());
	if (definitionView.getShowText()) {
	    definitionView.setEditText(true);
	    if (optionView.getDescription() != null && optionView.getDescription().getText() != null) {
		for (int j = 0; j < optionView.getDescription().getText().length; j++) {
		    if (optionView.getDescription().getText(j).getLanguage().equals("en")
			    && !optionView.getDescription().getText(j).getValue().trim().equals("")) {
			definitionView.setEditText(false);
			definitionView.setDescription(optionView.getDescription());
		    }
		}
	    }
	}
	definitionView.setShowBrand(optionView.getShowBrand());
	if (definitionView.getShowBrand()) {
	    if (optionView.getBrand().getBrandName() != null && !optionView.getBrand().getBrandName().trim().equals("")) {
		definitionView.setEditBrand(false);
		definitionView.setBrand(optionView.getBrand());
	    } else
		definitionView.setEditBrand(true);
	}
	definitionView.setShowFormat(optionView.getShowFormat());
	if (definitionView.getShowFormat()) {
	    if (optionView.getFormat().getFormatName() != null && !optionView.getFormat().getFormatName().trim().equals("")) {
		definitionView.setEditFormat(false);
		definitionView.setFormat(optionView.getFormat());
	    } else
		definitionView.setEditFormat(true);
	}
	definitionView.setShowUOM(optionView.getShowUOM());
	if (definitionView.getShowUOM()) {
	    if (optionView.getUnitOfMeasure().getUOM_Name() != null && !optionView.getUnitOfMeasure().getUOM_Name().trim().equals("")) {
		definitionView.setEditUOM(false);
		definitionView.setUnitOfMeasure(optionView.getUnitOfMeasure());
	    } else
		definitionView.setEditUOM(true);
	}
	return definitionView;
    }

    private ProductDescriptionView findProductDescription(ProductDescriptionView optionView, Vector<ProductDescriptionView> definitionView,
	    boolean roomPoolLevel) {
	ProductDescriptionView newPDV = null;
	if (definitionView != null) {
	    for (int i = 0; i < definitionView.size(); i++) {
		if (definitionView.elementAt(i).getElementCode().equals(optionView.getElementCode())
			&& definitionView.elementAt(i).getElementCodeList().equals(optionView.getElementCodeList())
			&& (definitionView.elementAt(i).getRoomNumber() == null || definitionView.elementAt(i).getRoomNumber()
				.equals(optionView.getRoomNumber()))) {
		    newPDV = setProductDescription(optionView, new ProductDescriptionView(definitionView.elementAt(i)), roomPoolLevel);
		    break;
		}
	    }
	}
	if (newPDV == null) {
	    newPDV = setProductDescription(optionView, new ProductDescriptionView(optionView), roomPoolLevel);
	}
	return newPDV;
    }

    private String getDropdownIndicator(ProductDescriptionView option, boolean roomPoolLevel) {
	String dropdownIndicator = ProductDescriptionView.NO_DD;
	if (option.getSupplementaryData() != null) {
	    SupplementaryData[] sd = option.getSupplementaryData();
	    for (int i = 0; i < sd.length; i++) {
		if (sd[i].getPath().startsWith("../@AvailabilityInd")) {
		    String availability = option.getAvailabilityInd();
		    String calloutInd = option.getCalloutInd();
		    if (availability.equals("S") && (calloutInd == null || calloutInd.equals("N")))
			dropdownIndicator = ProductDescriptionView.DD_YESNO;
		    else if (availability.equals("S") && calloutInd != null && (calloutInd.equals("S") || calloutInd.equals("NS")))
			dropdownIndicator = ProductDescriptionView.DD_YESNOSOME;
		    else if (option.getElementCodeList().equals("GRI ") && option.getShowRoomNumber() && (roomPoolLevel || availability.equals("S")))
			dropdownIndicator = ProductDescriptionView.DD_YESNOSOME;
		    else if (!availability.equals("N") && option.getMarshaOriginatedInd().equals("true") && roomPoolLevel)
			dropdownIndicator = ProductDescriptionView.DD_YESNO;
		    break;
		}
	    }
	}
	return dropdownIndicator;
    }

    private void setHasRoomNumber(ProductDescriptionView def) {
	if (def.elementCodeMatch("GRI", "0011") || def.elementCodeMatch("GRI", "0014") || def.elementCodeMatch("GRI", "0010")
		|| def.elementCodeMatch("GRI", "0019") || def.elementCodeMatch("RMA", "0067") || def.elementCodeMatch("MRBE", "0005")) {
	    def.setShowRoomNumber(true);
	} else {
	    def.setShowRoomNumber(false);
	    def.setRoomNumber(null);
	}
    }

    private boolean getHasRoomNumber(ProductDescription def) {
	if (def.elementCodeMatch("GRI", "0011") || def.elementCodeMatch("GRI", "0014") || def.elementCodeMatch("GRI", "0010")
		|| def.elementCodeMatch("GRI", "0019") || def.elementCodeMatch("RMA", "0067") || def.elementCodeMatch("MRBE", "0005")) {
	    return true;
	}
	return false;
    }

    /*
     * if a quantity > 0 is entered at the property level, then do not allow the
     * user to change it at the room pool level
     */
    private boolean getShowQty(ProductDescriptionView pdesc) {
	boolean editQty = false;
	if (pdesc != null) {
	    SupplementaryData[] sup = pdesc.getSupplementaryData();
	    if (sup != null) {
		if (sup.length > 0) {
		    for (int d = 0; d < sup.length; ++d) {
			String suppath = sup[d].getPath();
			if (suppath.startsWith("../@Quantity")) {
			    editQty = true;
			}
		    } // end of for(ind d=
		}
	    } // end of if(sup != null )
	}
	return editQty;
    }

    private boolean getShowAvailability(ProductDescriptionView pdesc) {
	boolean editAvail = false;
	if (pdesc != null) {
	    SupplementaryData[] sup = pdesc.getSupplementaryData();
	    if (sup != null) {
		if (sup.length > 0) {
		    for (int d = 0; d < sup.length; ++d) {
			String suppath = sup[d].getPath();
			if (suppath.startsWith("../@Availability")) {
			    editAvail = true;
			}
		    } // end of for(ind d=
		}
	    } // end of if(sup != null )
	}
	return editAvail;
    }

    private boolean getShowText(ProductDescriptionView pdesc) {
	boolean editText = false;
	if (pdesc != null) {
	    SupplementaryData[] sup = pdesc.getSupplementaryData();
	    if (sup != null) {
		if (sup.length > 0) {
		    for (int d = 0; d < sup.length; ++d) {
			String suppath = sup[d].getPath();
			if (suppath.startsWith("../Text/text()")) {
			    editText = true;
			}
		    } // end of for(ind d=
		}
	    } // end of if(sup != null )
	}
	return editText;
    }

    private boolean getShowText(ProductDescription pdesc) {
	boolean editText = false;
	if (pdesc != null) {
	    SupplementaryData[] sup = pdesc.getSupplementaryData();
	    if (sup != null) {
		if (sup.length > 0) {
		    for (int d = 0; d < sup.length; ++d) {
			String suppath = sup[d].getPath();
			if (suppath.startsWith("../Text/text()")) {
			    editText = true;
			}
		    } // end of for(ind d=
		}
	    } // end of if(sup != null )
	}
	return editText;
    }

    /*
     * if the brand is selected at the property level, then do not allow the
     * user to change it at the room pool level
     */
    private boolean getBrandDD(ProductDescriptionView pdesc) {
	boolean showBrandDD = false;
	Brand brand = pdesc.getBrand();
	if (brand != null)
	    showBrandDD = true;

	return showBrandDD;
    }

    /*
     * if the format is selected at the property level, then do not allow the
     * user to change it at the room pool level
     */
    private boolean getFormatDD(ProductDescriptionView pdesc) {
	boolean showFormatDD = false;
	Format format = pdesc.getFormat();
	if (format != null)
	    showFormatDD = true;

	return showFormatDD;
    }

    /*
     * if the UnitOfMeasure is selected at the property level, then do not allow
     * the user to change it at the room pool level
     */
    private boolean getUOMDD(ProductDescriptionView pdesc) {
	boolean showUOMDD = false;
	UnitOfMeasure uom = pdesc.getUnitOfMeasure();
	if (uom != null)
	    showUOMDD = true;

	return showUOMDD;
    }

    private boolean defaultAvailability(ProductDescriptionView option) {
	/*
	 * If the option data has availability of Y or N then set the
	 * availability
	 */
	boolean setDefault = false;
	if (option.getSupplementaryData() != null) {
	    SupplementaryData[] sd = option.getSupplementaryData();
	    for (int i = 0; i < sd.length; i++) {
		if (sd[i].getPath().startsWith("../@AvailabilityInd")) {
		    if (option.getAvailabilityInd().equals("Y") || option.getAvailabilityInd().equals("N"))
			setDefault = true;
		    break;
		}
	    }
	}
	return setDefault;
    }

    private boolean defaultAvailabilityBasedOnEpic(ProductDescriptionView option) {
	/*
	 * If the data is from epic and the availablityInd is blank for elements
	 * with an availabilityInd, then default the AvailablityInd to No
	 */
	boolean setEpic = false;
	if (option.getMarshaOriginatedInd().equals("false") && !option.getElementCodeList().equals("GRI ")) {
	    if (option.getSupplementaryData() != null) {
		SupplementaryData[] sd = option.getSupplementaryData();
		for (int i = 0; i < sd.length; i++) {
		    if (sd[i].getPath().startsWith("../@AvailabilityInd")) {
			if (option.getAvailabilityInd().equals(" "))
			    setEpic = true;
			break;
		    }
		}
	    }
	}
	return setEpic;
    }

    private boolean defaultAvailabilityBasedOnEpic(ProductDescription option) {
	/*
	 * If the data is from epic and the availablityInd is blank for elements
	 * with an availabilityInd, then default the AvailablityInd to No
	 */
	boolean setEpic = false;
	if (option.getMarshaOriginatedInd().equals("false") && !option.getElementCodeList().equals("GRI ")) {
	    if (option.getSupplementaryData() != null) {
		SupplementaryData[] sd = option.getSupplementaryData();
		for (int i = 0; i < sd.length; i++) {
		    if (sd[i].getPath().startsWith("../@AvailabilityInd")) {
			if (option.getAvailabilityInd().equals(" "))
			    setEpic = true;
			break;
		    }
		}
	    }
	}
	return setEpic;
    }

    private Vector<ProductDescriptionsView> getOptionsWOBlankForScreen(MI_HotelRoomProductOptionsRS dd, String elementTypeCode, boolean roomPoolLevel) {
	Vector<ProductDescriptionsView> pdsv = new Vector<ProductDescriptionsView>();
	ProductDescriptions[] pdsa = dd.getProductDescriptions();
	for (int i = 0; i < pdsa.length; i++) {
	    if (pdsa[i].getElementTypeCode().equals(elementTypeCode)) {
		Vector<ProductDescriptionView> pdvv = new Vector<ProductDescriptionView>();
		ProductDescription[] pda = pdsa[i].getProductDescription();
		for (int j = 0; j < pda.length; j++) {
		    if (pda[j].getSupplementaryData() != null || pda[j].getUnitOfMeasure() != null || pda[j].getFormat() != null
			    || pda[j].getBrand() != null) {
			boolean keepElement = true;
			ProductDescriptionView pdv = new ProductDescriptionView(pda[j]);
			pdv.setShowAvailability(getShowAvailability(pdv));
			if (defaultAvailabilityBasedOnEpic(pdv))
			    pdv.setAvailabilityInd("N");
			if (roomPoolLevel)
			    keepElement = true;
			else {
			    if (pdv.getAvailabilityInd().equals("N") && pdv.getMarshaOriginatedInd().equals("false")
				    && !pdv.getElementCodeList().equals("GRI")
				    && (pdv.getCalloutInd() == null || (pdv.getCalloutInd() != null && !pdv.getCalloutInd().equals("N"))))
				keepElement = false;
			    else
				keepElement = true;
			}
			setHasRoomNumber(pdv);
			pdv.setDropDownType(getDropdownIndicator(pdv, roomPoolLevel));
			pdv.setShowQuantity(getShowQty(pdv));
			pdv.setShowText(getShowText(pdv));
			pdv.setShowBrand(getBrandDD(pdv));
			pdv.setShowFormat(getFormatDD(pdv));
			pdv.setShowUOM(getUOMDD(pdv));
			if (keepElement)
			    pdvv.add(pdv);
		    }
		}
		if (pdvv.size() > 0) {
		    ProductDescriptionsView pdsview = new ProductDescriptionsView();
		    pdsview.copyAttributesInto(pdsa[i]);
		    pdsview.setProductDescription(pdvv);
		    pdsv.add(pdsview);
		}
	    }
	}
	return pdsv;
    }

    private Vector<ProductDescriptionsView> getDefinitionsWOBlankForScreen(String roomPool, String rateProgram, MI_HotelRoomProductInfoRS dd,
	    String elementTypeCode) {
	Vector<ProductDescriptionsView> pdsv = new Vector<ProductDescriptionsView>();

	RoomProduct[] roomProductArray = null;
	if (dd != null && dd.getErrors()==null && dd.getRoomProducts()!=null)
	    roomProductArray = dd.getRoomProducts().getRoomProduct();
	RoomProduct roomProduct = null;
	if (roomProductArray != null) {
	    for (int l = 0; l < roomProductArray.length; l++) {
		if (roomProductArray[l].getRoomTypeCode().equals(roomPool)
			&& ((rateProgram == null && roomProductArray[l].getRatePlanCode() == null) || (rateProgram != null
				&& roomProductArray[l].getRatePlanCode() != null && roomProductArray[l].getRatePlanCode().equals(rateProgram)))) {
		    roomProduct = roomProductArray[l];
		    break;
		}
	    }
	}
	if (roomProduct != null) {
	    ProductDescriptions[] pdsa = roomProduct.getProductDescriptions();
	    for (int i = 0; i < pdsa.length; i++) {
		if (pdsa[i].getElementTypeCode().equals(elementTypeCode)) {
		    Vector<ProductDescriptionView> pdv = new Vector<ProductDescriptionView>();
		    ProductDescription[] pda = pdsa[i].getProductDescription();
		    for (int j = 0; j < pda.length; j++) {
			if (pda[j].getSupplementaryData() != null || pda[j].getUnitOfMeasure() != null || pda[j].getFormat() != null
				|| pda[j].getBrand() != null) {
			    pdv.add(new ProductDescriptionView(pda[j]));
			}
		    }
		    if (pdv.size() > 0) {
			ProductDescriptionsView pdsview = new ProductDescriptionsView();
			pdsview.copyAttributesInto(pdsa[i]);
			pdsview.setProductDescription(pdv);
			pdsv.add(pdsview);
		    }
		}
	    }
	}
	return pdsv;

    }

    public void updateRoomPoolDefinition(String marshaCode, String roomPool, Map<String, RoomDefDefinitionUpdateView> roomDefDefinition,
	    boolean updateSyncsOnly, String loginName) {
	MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    Vector<ProductDescriptions> pds = getRoomDescriptions(roomPool, dd, mrtnd);
	    if (roomDefDefinition != null)
		addRoomPoolUpdates(pds, roomDefDefinition);
	    ProductDescriptions[] pdsUpd = new ProductDescriptions[pds.size()];
	    pds.toArray(pdsUpd);

	    RoomProducts rps = new RoomProducts();
	    Vector<RoomProduct> rpSend = new Vector<RoomProduct>();

	    // add the room pool
	    RoomProduct rp = new RoomProduct();
	    rp.setProductDescriptions(pdsUpd);
	    rp.setRoomTypeCode(roomPool);
	    rpSend.add(rp);

	    // see if there are room pools to update
	    int sizeRmProducts = 1;
	    if (mrtnd != null && mrtnd.getRoomProducts() != null && mrtnd.getRoomProducts().getRoomProduct() != null)
		sizeRmProducts = mrtnd.getRoomProducts().getRoomProduct().length;
	    if (sizeRmProducts > 1) {
		// update the room pools
		RoomProduct[] raterp = mrtnd.getRoomProducts().getRoomProduct();
		for (int x = 1; x < raterp.length; x++) {
		    if (raterp[x].getRatePlanCode() != null && !raterp[x].getRatePlanCode().equals("")) {
			Vector<ProductDescriptions> roompdsvect = new Vector<ProductDescriptions>();
			ProductDescriptions[] ratepds = raterp[x].getProductDescriptions();
			if (ratepds != null) {
			    boolean bFound = false;
			    for (int w = 0; w < ratepds.length; w++) {
				bFound = false;
				for (int y = 0; y < pds.size(); y++) {
				    ProductDescriptions roompds = pds.elementAt(y);
				    if (roompds.getElementTypeCode().equals(ratepds[w].getElementTypeCode())
					    && roompds.getElementGroupCode().equals(ratepds[w].getElementGroupCode())) {
					bFound = true;
					ProductDescriptions newroompds = compareProductDescription(roompds, ratepds[w]);
					if (newroompds != null)
					    roompdsvect.add(newroompds);
				    } // end compare
				} // end room product descriptions
				if (!bFound)
				    roompdsvect.add(ratepds[w]);
			    } // end rate product descriptions
			    ProductDescriptions[] newratepds = null;
			    if (roompdsvect.size() > 0) {
				newratepds = new ProductDescriptions[roompdsvect.size()];
				for (int z = 0; z < roompdsvect.size(); z++)
				    newratepds[z] = roompdsvect.elementAt(z);
			    }

			    rp = new RoomProduct();
			    rp.setRoomTypeCode(raterp[x].getRoomTypeCode());
			    rp.setRatePlanCode(raterp[x].getRatePlanCode());
			    rp.setProductDescriptions(newratepds);
			    rpSend.add(rp);
			}
		    }
		}
	    }
	    RoomProduct[] finalrp = new RoomProduct[rpSend.size()];
	    rpSend.toArray(finalrp);
	    rps.setRoomProduct(finalrp);
	    MI_HotelRoomProductInfoRS sendInfo = new MI_HotelRoomProductInfoRS();
	    sendInfo.setRoomProducts(rps);
	    SynchAlerts[] sendSyncAlerts = null;
	    sendSyncAlerts = processSynchAlerts(mrtnd, roomDefDefinition, roomPool, null, marshaCode, loginName);
	    if (sendSyncAlerts != null) {
		sendInfo.setSynchAlerts(sendSyncAlerts);
	    }
	    if (!updateSyncsOnly)
		roomdef_mgr.updateRoomProduct(marshaCode, roomPool, null, sendInfo, loginName);
	}

    }

    public void updateRateProgramDefinition(String marshaCode, String roomPool, String rateProgram,
	    Map<String, RoomDefDefinitionUpdateView> roomDefDefinition, boolean updateSyncsOnly, String loginName) {
	MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
	if (!roomPool.equals("")) {
	    MI_HotelRoomProductInfoRS mrtnd = null;
	    mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
	    Vector<ProductDescriptions> pds = getRoomDescriptions(roomPool, dd, mrtnd);
	    ProductDescriptions[] pdsUpd = new ProductDescriptions[pds.size()];
	    pds.toArray(pdsUpd);

	    RoomProducts rps = new RoomProducts();
	    Vector<RoomProduct> rpSend = new Vector<RoomProduct>();

	    // add the room pool
	    RoomProduct rp = new RoomProduct();
	    rp.setProductDescriptions(pdsUpd);
	    rp.setRoomTypeCode(roomPool);

	    // see if there are room pools to update
	    int sizeRmProducts = 1;
	    if (mrtnd != null && mrtnd.getRoomProducts() != null && mrtnd.getRoomProducts().getRoomProduct() != null)
		sizeRmProducts = mrtnd.getRoomProducts().getRoomProduct().length;
	    if (sizeRmProducts > 1) {
		// update the room pools
		RoomProduct[] raterp = mrtnd.getRoomProducts().getRoomProduct();
		for (int x = 1; x < raterp.length; x++) {
		    if (raterp[x].getRatePlanCode() != null && !raterp[x].getRatePlanCode().trim().equals("")
			    && rateProgram.equals(raterp[x].getRatePlanCode())) {
			Vector<ProductDescriptions> roompdsvect = new Vector<ProductDescriptions>();
			ProductDescriptions[] ratepds = raterp[x].getProductDescriptions();
			if (ratepds != null) {
			    boolean bFound = false;
			    for (int w = 0; w < ratepds.length; w++) {
				bFound = false;
				for (int y = 0; y < pds.size(); y++) {
				    ProductDescriptions roompds = pds.elementAt(y);
				    if (roompds.getElementTypeCode().equals(ratepds[w].getElementTypeCode())
					    && roompds.getElementGroupCode().equals(ratepds[w].getElementGroupCode())) {
					bFound = true;
					ProductDescriptions newroompds = compareProductDescription(roompds, ratepds[w]);
					if (newroompds != null)
					    roompdsvect.add(newroompds);
				    } // end compare
				} // end room product descriptions
				if (!bFound)
				    roompdsvect.add(ratepds[w]);
			    } // end rate product descriptions
			    if (roomDefDefinition != null)
				addRoomPoolUpdates(roompdsvect, roomDefDefinition);
			    ProductDescriptions[] newratepds = null;
			    if (roompdsvect.size() > 0) {
				newratepds = new ProductDescriptions[roompdsvect.size()];
				for (int z = 0; z < roompdsvect.size(); z++)
				    newratepds[z] = roompdsvect.elementAt(z);
			    }

			    rp = new RoomProduct();
			    rp.setRoomTypeCode(raterp[x].getRoomTypeCode());
			    rp.setRatePlanCode(raterp[x].getRatePlanCode());
			    rp.setProductDescriptions(newratepds);
			    rpSend.add(rp);
			}

		    }
		}
	    }
	    RoomProduct[] finalrp = new RoomProduct[rpSend.size()];
	    rpSend.toArray(finalrp);
	    rps.setRoomProduct(finalrp);
	    MI_HotelRoomProductInfoRS sendInfo = new MI_HotelRoomProductInfoRS();
	    sendInfo.setRoomProducts(rps);
	    SynchAlerts[] sendSyncAlerts = null;
	    sendSyncAlerts = processSynchAlerts(mrtnd, roomDefDefinition, roomPool, rateProgram, marshaCode, loginName);
	    if (sendSyncAlerts != null) {
		sendInfo.setSynchAlerts(sendSyncAlerts);
	    }
	    if (!updateSyncsOnly)
		roomdef_mgr.updateRoomProduct(marshaCode, roomPool, rateProgram, sendInfo, loginName);
	}

    }

    private ProductDescriptions compareProductDescription(ProductDescriptions roompds, ProductDescriptions ratepds) {
	ProductDescriptions pds = null;
	ProductDescription[] roompd = roompds.getProductDescription();
	ProductDescription[] ratepd = ratepds.getProductDescription();
	Vector<ProductDescription> newpd = new Vector<ProductDescription>();
	boolean bAdd = true;
	if (ratepd != null) {
	    for (int i = 0; i < ratepd.length; i++) {
		if (roompd != null) {
		    bAdd = true;
		    for (int j = 0; j < roompd.length; j++) {
			if (ratepd[i].elementCodeandRoomEquals(roompd[j])) {
			    if (roompd[j].getSupplementaryData() != null) {
				SupplementaryData[] sa = roompd[j].getSupplementaryData();
				for (int k = 0; k < sa.length; k++) {
				    if (sa[k].getPath().startsWith("../@AvailabilityInd")) {
					if (roompd[j].getAvailabilityInd().equals("N"))
					    bAdd = false;
					else if (!roompd[j].getAvailabilityInd().equals("S") && !roompd[j].getAvailabilityInd().trim().equals(""))
					    ratepd[i].setAvailabilityInd(roompd[j].getAvailabilityInd());
				    } else if (sa[k].getPath().startsWith("../@Quantity")) {
					if (!(roompd[j].getQuantity().longValue() == 0 && roompd[j].getQuantity().longValue() != ratepd[i]
						.getQuantity().longValue()))
					    ratepd[i].setQuantity(roompd[j].getQuantity());
				    } else if (sa[k].getPath().startsWith("../Text/text()")) {
					if (roompd[j].getDescription() != null)
					    ratepd[i].setDescription(roompd[j].getDescription());
				    }
				}
			    } // end check supplementary
			    if (!((roompd[j].getFormat() == null || roompd[j].getFormat().getFormatCode() == null || roompd[j].getFormat()
				    .getFormatCode().equals("")) && (ratepd[i].getFormat() != null && ratepd[i].getFormat().getFormatCode() != null && !ratepd[i]
				    .getFormat().getFormatCode().equals(""))))
				ratepd[i].setFormat(roompd[j].getFormat());

			    if (!((roompd[j].getBrand() == null || roompd[j].getBrand().getBrandCode() == null || roompd[j].getBrand().getBrandCode()
				    .equals("")) && (ratepd[i].getBrand() != null && ratepd[i].getBrand().getBrandCode() != null && !ratepd[i]
				    .getBrand().getBrandCode().equals(""))))
				ratepd[i].setBrand(roompd[j].getBrand());

			    if (!((roompd[j].getUnitOfMeasure() == null || roompd[j].getUnitOfMeasure().getUOM_Code() == null || roompd[j]
				    .getUnitOfMeasure().getUOM_Code().equals("")) && (ratepd[i].getUnitOfMeasure() != null
				    && ratepd[i].getUnitOfMeasure().getUOM_Code() != null && !ratepd[i].getUnitOfMeasure().getUOM_Code().equals(""))))
				ratepd[i].setUnitOfMeasure(roompd[j].getUnitOfMeasure());

			}
		    }
		}

		if (bAdd)
		    newpd.add(ratepd[i]);
	    }
	}
	pds = new ProductDescriptions();
	pds.copyIntoAttributes(ratepds);
	if (newpd.size() > 0) {
	    ProductDescription[] finalpd = new ProductDescription[newpd.size()];
	    newpd.toArray(finalpd);
	    pds.setProductDescription(finalpd);
	}
	return pds;
    }

    private void addRoomPoolUpdates(Vector<ProductDescriptions> pds, Map<String, RoomDefDefinitionUpdateView> roomDefDefinition) {
	RoomDefDefinitionUpdateView rdu = null;
	for (int i = 0; i < pds.size(); i++) {
	    ProductDescription[] pda = pds.elementAt(i).getProductDescription();
	    if (pda != null) {
		for (int j = 0; j < pda.length; j++) {
		    ProductDescription pd = pda[j];
		    if (pd.getRoomNumber() != null && pd.getRoomNumber().longValue() > 0)
			rdu = roomDefDefinition.get(pd.getElementCodeList() + "_" + pd.getElementCode() + "_" + pd.getRoomNumber().toPlainString());
		    else
			rdu = roomDefDefinition.get(pd.getElementCodeList() + "_" + pd.getElementCode());
		    if (rdu != null) {
			if (rdu.getAvailabilityInd() != null)
			    pd.setAvailabilityInd(rdu.getAvailabilityInd());
			if (rdu.getQuantity() != null)
			    pd.setQuantity(new BigDecimal(rdu.getQuantity()));

			if (rdu.getText() != null && getShowText(pd)) {
			    Description desc = new Description();
			    Text[] t = new Text[1];
			    t[0] = new Text();
			    t[0].setLanguage("en");
			    t[0].setValue(rdu.getText());
			    desc.setText(t);
			    pd.setDescription(desc);
			}

			if (pd.getBrand() != null) {
			    String brandCode = null;
			    String brandName = null;
			    if (rdu.getBrandCode() != null && !rdu.getBrandCode().trim().equals("")) {
				String[] brandInfo = rdu.getBrandCode().split("\\*\\*\\*");
				brandCode = brandInfo[0];
				brandName = brandInfo[1];
			    }
			    pd.getBrand().setBrandCode(brandCode);
			    pd.getBrand().setBrandName(brandName);
			}

			if (pd.getFormat() != null) {
			    String formatCode = null;
			    String formatName = null;
			    if (rdu.getFormatCode() != null && !rdu.getFormatCode().trim().equals("")) {
				String[] formatInfo = rdu.getFormatCode().split("\\*\\*\\*");
				formatCode = formatInfo[0];
				formatName = formatInfo[1];
			    }
			    pd.getFormat().setFormatCode(formatCode);
			    pd.getFormat().setFormatName(formatName);
			}

			if (pd.getUnitOfMeasure() != null) {
			    String UOM_Code = null;
			    String UOM_Name = null;
			    if (rdu.getUOM_Code() != null && !rdu.getUOM_Code().trim().equals("")) {
				String[] uomInfo = rdu.getUOM_Code().split("\\*\\*\\*");
				UOM_Code = uomInfo[0];
				UOM_Name = uomInfo[1];
			    }
			    pd.getUnitOfMeasure().setUOM_Code(UOM_Code);
			    pd.getUnitOfMeasure().setUOM_Name(UOM_Name);
			}

		    }
		}
	    }
	}

    }

    private Vector<ProductDescriptions> getRoomDescriptions(String roomPool, MI_HotelRoomProductOptionsRS dd, MI_HotelRoomProductInfoRS mrtnd) {
	ProductDescriptions[] optionDescriptions = dd.getProductDescriptions();
	ProductDescriptions[] definitionDescriptions = null;
	Vector<ProductDescriptions> productDescriptions = new Vector<ProductDescriptions>();
	int a, x;
	if (mrtnd != null && mrtnd.getRoomProducts() != null && mrtnd.getRoomProducts().getRoomProduct() != null) {
	    for (int k = 0; k < mrtnd.getRoomProducts().getRoomProduct().length; k++) {
		if (mrtnd.getRoomProducts().getRoomProduct(k).getRoomTypeCode().equals(roomPool)
			&& mrtnd.getRoomProducts().getRoomProduct(k).getRatePlanCode() == null) {
		    if (mrtnd.getRoomProducts().getRoomProduct(k).getProductDescriptions() != null)
			definitionDescriptions = mrtnd.getRoomProducts().getRoomProduct(k).getProductDescriptions();
		    break;
		}
	    }
	}

	boolean isBed = false;
	long numBedrooms = 1;
	for (int i = 0; i < optionDescriptions.length; i++) {
	    ProductDescriptions pds = new ProductDescriptions();
	    Vector<ProductDescription> pdv = new Vector<ProductDescription>();
	    pds.copyIntoAttributes(optionDescriptions[i]);
	    isBed = pds.getElementTypeCode().equals("3");
	    if (isBed) {
		if (definitionDescriptions != null) {
		    for (a = 0; a < definitionDescriptions.length; a++) {
			if (definitionDescriptions[a].getElementTypeCode().equals("3")) {
			    if (definitionDescriptions[a].getProductDescription() != null) {
				for (int b = 0; b < definitionDescriptions[a].getProductDescription().length; b++) {
				    if (definitionDescriptions[a].getProductDescription(b).getElementCodeList().equals("MRBE")
					    && definitionDescriptions[a].getProductDescription(b).getElementCode().equals("0003")) {
					if (definitionDescriptions[a].getProductDescription(b).getFormat() != null
						&& definitionDescriptions[a].getProductDescription(b).getFormat().getFormatName() != null)
					    numBedrooms = new Long(definitionDescriptions[a].getProductDescription(b).getFormat().getFormatName())
						    .longValue();

					break;
				    }

				}
			    }
			    break;
			}
		    }
		}
		Vector<ProductDescription> firstpdv = new Vector<ProductDescription>();
		Vector<ProductDescription> bedpdv = new Vector<ProductDescription>();
		Vector<ProductDescription> lastpdv = new Vector<ProductDescription>();
		boolean bFoundBedrooms = false;
		for (x = 0; x < optionDescriptions[i].getProductDescription().length; x++) {
		    if (getHasRoomNumber(optionDescriptions[i].getProductDescription(x))) {
			bedpdv.add(optionDescriptions[i].getProductDescription(x));
			bFoundBedrooms = true;
		    } else {
			if (!bFoundBedrooms)
			    firstpdv.add(new ProductDescription(optionDescriptions[i].getProductDescription(x)));
			else
			    lastpdv.add(new ProductDescription(optionDescriptions[i].getProductDescription(x)));
		    }

		}
		pdv.addAll(firstpdv);
		for (int c = 0; c < numBedrooms; c++) {
		    long roomnum = c + 1;
		    for (int j = 0; j < bedpdv.size(); j++) {
			ProductDescription pdb = new ProductDescription(bedpdv.elementAt(j));
			pdb.setRoomNumber(BigDecimal.valueOf(roomnum));
			pdv.add(pdb);
		    }
		}
		pdv.addAll(lastpdv);
		for (x = 0; x < pdv.size(); x++) {
		    ProductDescription pd = pdv.elementAt(x);
		    updateProductDescription(pd, definitionDescriptions, optionDescriptions[i]);
		}

	    } else {
		for (x = 0; x < optionDescriptions[i].getProductDescription().length; x++) {
		    ProductDescription pd = new ProductDescription(optionDescriptions[i].getProductDescription(x));
		    updateProductDescription(pd, definitionDescriptions, optionDescriptions[i]);
		    pdv.add(pd);
		}
	    }
	    ProductDescription[] arr = new ProductDescription[pdv.size()];
	    pdv.toArray(arr);
	    pds.setProductDescription(arr);
	    productDescriptions.add(pds);

	}
	return productDescriptions;
    }

    private void updateProductDescription(ProductDescription pd, ProductDescriptions[] definitionDescriptions, ProductDescriptions optionDescriptions) {
	int z, a;
	if (defaultAvailabilityBasedOnEpic(pd))
	    pd.setAvailabilityInd("N");
	if (pd.getDescription() != null && pd.getDescription().getText() != null) {
	    Text[] t = new Text[1];
	    for (int y = 0; y < pd.getDescription().getText().length; y++) {
		if (pd.getDescription().getText(y).getLanguage().equals("en")) {
		    t[0] = pd.getDescription().getText(y);
		    pd.getDescription().setText(t);
		    break;
		}
	    }
	}
	if (definitionDescriptions != null) {
	    for (z = 0; z < definitionDescriptions.length; z++) {
		if (definitionDescriptions[z].getElementTypeCode().equals(optionDescriptions.getElementTypeCode())
			&& definitionDescriptions[z].getElementGroupCode().equals(optionDescriptions.getElementGroupCode())) {
		    ProductDescription[] pdd = definitionDescriptions[z].getProductDescription();
		    for (a = 0; a < pdd.length; a++) {
			if (pdd[a].getElementCodeList().equals(pd.getElementCodeList())
				&& pdd[a].getElementCode().equals(pd.getElementCode())
				&& ((getHasRoomNumber(pdd[a]) && pdd[a].getRoomNumber().longValue() == pd.getRoomNumber().longValue()) || !getHasRoomNumber(pdd[a]))) {
			    if (!pd.getAvailabilityInd().equals("Y") && !pd.getAvailabilityInd().equals("N"))
				pd.setAvailabilityInd(pdd[a].getAvailabilityInd());
			    if (pd.getQuantity().longValue() < 1)
				pd.setQuantity(pdd[a].getQuantity());
			    if (getShowText(pd)) {
				if (pdd[a].getDescription() != null && pdd[a].getDescription().getText() != null
					&& (pd.getDescription() == null || pd.getDescription().getText() == null)) {
				    Text[] t = new Text[1];
				    for (int y = 0; y < pdd[a].getDescription().getText().length; y++) {
					if (pdd[a].getDescription().getText(y).getLanguage().equals("en")) {
					    t[0] = pdd[a].getDescription().getText(y);
					    pdd[a].getDescription().setText(t);
					    break;
					}
				    }
				    pd.setDescription(pdd[a].getDescription());
				}
			    }
			    if (pd.getFormat() != null && pd.getFormat().getFormatCode() == null) {
				if (pdd[a].getFormat() != null && pdd[a].getFormat().getFormatCode() != null)
				    pd.setFormat(pdd[a].getFormat());
			    }
			    if (pd.getBrand() != null && pd.getBrand().getBrandCode() == null) {
				if (pdd[a].getBrand() != null && pdd[a].getBrand().getBrandCode() != null)
				    pd.setBrand(pdd[a].getBrand());
			    }
			    if (pd.getUnitOfMeasure() != null && pd.getUnitOfMeasure().getUOM_Code() == null) {
				if (pdd[a].getUnitOfMeasure() != null && pdd[a].getUnitOfMeasure().getUOM_Code() != null)
				    pd.setUnitOfMeasure(pdd[a].getUnitOfMeasure());
			    }

			    break;
			}
		    }
		}
	    } // definitions loop
	} // definition=null

    }

    private SynchAlerts[] processSynchAlerts(MI_HotelRoomProductInfoRS rmdetail, Map<String, RoomDefDefinitionUpdateView> roomDefDefinition,
	    String roomPool, String rateProgram, String marshaCode, String loginName) {

	SynchAlerts[] sendSyncAlerts = null;

	if (rmdetail != null && (rmdetail.getSynchAlerts() != null)) {
	    SynchAlerts[] ss = rmdetail.getSynchAlerts();
	    String elementTypeCode = "";
	    boolean bFound = false;
	    int i, j, k, m, n;
	    if (roomDefDefinition != null) {
		for (Iterator<Entry<String, RoomDefDefinitionUpdateView>> it = roomDefDefinition.entrySet().iterator(); it.hasNext();) {
		    Map.Entry<String, RoomDefDefinitionUpdateView> entry = (Map.Entry<String, RoomDefDefinitionUpdateView>) it.next();
		    String key = entry.getKey();
		    String splitField[] = key.split("_");
		    String elementCodeList = splitField[0];
		    String elementCode = splitField[1];
		    for (i = 0; i < ss.length; i++) {
			SynchAlert[] sa = ss[i].getSynchAlert();
			if (sa != null) {
			    for (j = 0; j < sa.length; j++) {
				RoomProduct[] rp = sa[j].getRoomProduct();
				if (rp != null) {
				    for (k = 0; k < rp.length; k++) {
					if (rp[k].getRoomTypeCode().equals(roomPool)
						&& ((rateProgram == null && (rp[k].getRatePlanCode() == null || rp[k].getRatePlanCode().trim()
							.equals(""))) || (rateProgram != null && rp[k].getRatePlanCode() != null && rp[k]
							.getRatePlanCode().equals(rateProgram)))) {
					    ProductDescriptions[] pds = rp[k].getProductDescriptions();
					    if (pds != null) {
						for (m = 0; m < pds.length; m++) {
						    ProductDescription[] pd = pds[m].getProductDescription();
						    if (pd != null) {
							for (n = 0; n < pd.length; n++) {
							    if (pd[n].getElementCode().equals(elementCode)
								    && pd[n].getElementCodeList().equals(elementCodeList)) {
								elementTypeCode = pds[m].getElementTypeCode();
								bFound = true;
							    }
							    if (bFound)
								break;
							}
						    }
						    if (bFound)
							break;
						}
					    }
					}
					if (bFound)
					    break;
				    }
				}
				if (bFound)
				    break;
			    }
			}
			if (bFound)
			    break;
		    }
		    if (bFound)
			break;
		}
	    }
	    Vector<SynchAlert> sendSync = new Vector<SynchAlert>();
	    Vector<SynchAlert> delSync = new Vector<SynchAlert>();
	    for (i = 0; i < ss.length; i++) {
		SynchAlert[] sa = ss[i].getSynchAlert();
		if (sa != null) {
		    for (j = 0; j < sa.length; j++) {
			RoomProduct[] rp = sa[j].getRoomProduct();
			if (rp != null) {
			    for (k = 0; k < rp.length; k++) {
				if (rp[k].getRoomTypeCode().equals(roomPool)
					&& (rp[k].getRatePlanCode() == null || rp[k].getRatePlanCode().trim().equals(""))
					|| rp[k].getRatePlanCode().equals(rateProgram)) {
				    ProductDescriptions[] pds = rp[k].getProductDescriptions();
				    if (pds != null) {
					for (m = 0; m < pds.length; m++) {
					    if (pds[m].getElementTypeCode().equals(elementTypeCode))
						delSync.add(sa[j]);
					    else
						sendSync.add(sa[j]);
					}
				    }
				}
			    }
			}
		    }
		}
	    }

	    if (sendSync.isEmpty() == false) {
		sendSyncAlerts = new SynchAlerts[1];
		SynchAlert[] sendsyncArr = new SynchAlert[sendSync.size()];
		sendSync.toArray(sendsyncArr);
		sendSyncAlerts[0] = new SynchAlerts();
		sendSyncAlerts[0].setSynchAlert(sendsyncArr);
	    }

	    if (delSync.isEmpty() == false) {
		SynchAlerts[] delArray = new SynchAlerts[1];
		SynchAlert[] delsyncArr = new SynchAlert[delSync.size()];
		delSync.toArray(delsyncArr);
		delArray[0] = new SynchAlerts();
		delArray[0].setSynchAlert(delsyncArr);
		roomdef_mgr.deleteSynchAlerts(marshaCode, loginName, roomPool, delArray);
	    } // end of if (delSync.isEmpty() == false)
	}
	return sendSyncAlerts;
    }

    public void removeRateLevel(String marshaCode, String roomPool, String rateProgram, String loginName) {
	roomdef_mgr.removeRateProgramRoomDef(marshaCode, roomPool, rateProgram, loginName);
    }
    
    //Method to pull the Product Info and Product Options WebService Call insert into the table.
    public Long getHotelDataForDefinitionReport(String marshaCode, String roomPool, String roompoolonly) {
    	Long reportId = null;
    	try{	
    			//WebService Call to pull KORPROPERTYINFO
    			MI_HotelRoomProductOptionsRS dd = roomdef_mgr.getRoomProductDef(marshaCode);
    			if (!roomPool.equals("")) {
    			//Webservice Call to pull KORROOMPRODUCT
    			MI_HotelRoomProductInfoRS mrtnd = roomdef_mgr.getRoomProductInfo(marshaCode, roomPool);
    			//insert KORPROPERTYINFO details to the oracle Table and retrieve the Report Id
    			reportId = roomdef_mgr.insertProductOptionsRecords(dd, marshaCode, roompoolonly);
    			//insert KORROOMPRODUCT details to the oracle Table and retrieve the Report Id
    			if(reportId != null){
    			reportId = roomdef_mgr.insertProductInfoRecords(mrtnd, marshaCode, roomPool, roompoolonly, reportId);}
    	}
    	}
    	catch (Exception e)
    	{
			log.error(e.getMessage(),e);
    			return null;
    	}
    	return reportId;
        }
    
   }
