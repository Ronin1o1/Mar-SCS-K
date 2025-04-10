package com.marriott.rfp.business.rd.impl;


import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.rd.rateproduct.api.RateProductManager;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentDataView;
import com.marriott.rfp.object.rateproduct.RateProductAssignmentView;
import com.marriott.rfp.object.rateproduct.RateProductDataView;
import com.marriott.rfp.object.rateproduct.RateProductDefinitionUpdateView;
import com.marriott.rfp.object.rateproduct.RateProductDefinitionView;
import com.marriott.rfp.object.rateproduct.RateProductGroupView;
import com.marriott.rfp.object.rateproduct.RateProductListView;
import com.marriott.rfp.object.rateproduct.RateProductMenuModel;
import com.marriott.rfp.object.rateproduct.RateProductSearch;
import com.marriott.rfp.object.rateproduct.RateProductSearchAttributes;
import com.marriott.rfp.object.rateproduct.RateProductView;
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.BrandsList;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.HotelBrand;
import com.marriott.rfp.object.roomdef.beans.HotelBrands;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignment;
import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionGroup;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionList;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRS;


@Transactional("transactionManagerRfpCommon")
@Service
public class RateProductServiceImpl extends RDServiceBase implements RateProductService {

	/**
	 * 
	 */

	private static final Logger log = LoggerFactory.getLogger(RateProductServiceImpl.class);
	private static final long serialVersionUID = 1L;
	@Autowired
	private RateProductManager rateprod_mgr = null;
	@Autowired
	private RFPConstantsManager rfpConstantsMgr = null;

	public RateProductServiceImpl() {

	}

	public RateProductDefinitionLists getDataDictionaryForSearch() {

		return getDataDictionaryWOBlank(null, true);
	}

	/*
	 * get the data dictionary except those list/groups w/o
	 * rateproductdefinitions and without rateproductdefinitions that have no
	 * enterable fields (i.e. without supplementarydata, brands, types and uoms)
	 */
	private RateProductDefinitionLists getDataDictionaryWOBlank(MI_RateProductDataDictionaryRS dd, boolean mustHaveAvailInd) {
		if (dd == null)
			dd = rateprod_mgr.getDataDictionary();

		RateProductDefinitionLists ddLists = new RateProductDefinitionLists();
		ddLists.copyInto(dd.getRateProductDataDictionary().getRateProductDefinitionLists());
		RateProductDefinitionList[] ddList = ddLists.getRateProductDefinitionList();
		boolean bOK = true;

		if (ddList != null) {
			Vector<RateProductDefinitionList> rpdefl = new Vector<RateProductDefinitionList>();
			for (int iList = 0; iList < ddList.length; iList++) {
				if (!ddList[iList].getRP_ListCode().equals("0201")) {
					RateProductDefinitionGroup[] rtndGroup = ddList[iList].getRateProductDefinitionGroup();
					Vector<RateProductDefinitionGroup> rpdefg = new Vector<RateProductDefinitionGroup>();
					if (rtndGroup != null) {
						for (int iGrp = 0; iGrp < rtndGroup.length; iGrp++) {
							RateProductDefinition[] rtnd = rtndGroup[iGrp].getRateProductDefinition();
							Vector<RateProductDefinition> rpdef = new Vector<RateProductDefinition>();
							if (rtnd != null) {
								for (int iDef = 0; iDef < rtnd.length; iDef++) {
									if (rtnd[iDef].getSupplementaryData() != null || rtnd[iDef].getBrand() != null || rtnd[iDef].getType() != null || rtnd[iDef].getUnitOfMeasure() != null) {
										bOK = true;
										if (mustHaveAvailInd) {
											bOK = false;
											if (rtnd[iDef].getSupplementaryData() != null) {
												SupplementaryData[] ssd = rtnd[iDef].getSupplementaryData();
												if (ssd != null) {
													for (int iSup = 0; iSup < ssd.length; iSup++) {
														if (ssd[iSup].getPath().equals("../@AvailabilityInd")) {
															bOK = true;
															break;
														}
													}
												}
											}
										}
										if (bOK)
											rpdef.addElement(rtnd[iDef]);
									}
								}
							}
							if (rpdef.size() > 0) {
								rtndGroup[iGrp].setRateProductDefinition((RateProductDefinition[]) rpdef.toArray(new RateProductDefinition[rpdef.size()]));
								rpdefg.add(rtndGroup[iGrp]);
							}
						}
					}
					if (rpdefg.size() > 0) {
						ddList[iList].setRateProductDefinitionGroup((RateProductDefinitionGroup[]) rpdefg.toArray(new RateProductDefinitionGroup[rpdefg.size()]));
						rpdefl.add(ddList[iList]);
					}
				}
			}
			if (rpdefl.size() > 0) {
				ddLists.setRateProductDefinitionList((RateProductDefinitionList[]) rpdefl.toArray(new RateProductDefinitionList[rpdefl.size()]));
			}

		}
		return ddLists;
	}

	public RateProductDefinitions getFullDataForBlank(MI_RateProductDataDictionaryRS dd, RateProductDefinitions rtnds) {
		RateProductDefinitions rtndList = null;
		RateProductDefinitionList[] ddList = dd.getRateProductDataDictionary().getRateProductDefinitionLists().getRateProductDefinitionList();
		RateProductDefinition[] currRtnd = null;
		if (rtnds != null)
			currRtnd = rtnds.getRateProductDefinition();

		Vector<RateProductDefinition> ddrtnds = new Vector<RateProductDefinition>();
		String listName = "";
		String listCode = "";
		String groupName = "";
		String groupCode = "";
		for (int iList = 0; iList < ddList.length; iList++) {
			listName = ddList[iList].getRP_ListName();
			listCode = ddList[iList].getRP_ListCode();
			RateProductDefinitionGroup[] ddGroup = ddList[iList].getRateProductDefinitionGroup();
			for (int iGrp = 0; iGrp < ddGroup.length; iGrp++) {
				groupName = ddGroup[iGrp].getRP_GroupName();
				groupCode = ddGroup[iGrp].getRP_GroupCode();
				RateProductDefinition[] ddRtnd = ddGroup[iGrp].getRateProductDefinition();
				if (ddRtnd != null) {
					for (int iRtnd = 0; iRtnd < ddRtnd.length; iRtnd++) {
						RateProductDefinition newrtnd = new RateProductDefinition(ddRtnd[iRtnd]);
						newrtnd.setRP_ListName(listName);
						newrtnd.setRP_ListCode(listCode);
						newrtnd.setRP_GroupName(groupName);
						newrtnd.setRP_GroupCode(groupCode);
						if (currRtnd != null) {
							for (int iCurr = 0; iCurr < currRtnd.length; iCurr++) {
								if ((newrtnd.getRP_ListCode().equals(currRtnd[iCurr].getRP_ListCode())) && (newrtnd.getRP_GroupCode().equals(currRtnd[iCurr].getRP_GroupCode()))
										&& (newrtnd.getRP_Code().equals(currRtnd[iCurr].getRP_Code())) && (newrtnd.getRP_Name().equals(currRtnd[iCurr].getRP_Name()))) {
									newrtnd.copyDataInto(currRtnd[iCurr]);
									break;
								}
							}
						}
						ddrtnds.add(newrtnd);
					}
				}
			}

		}
		RateProductDefinition[] newrtnds = new RateProductDefinition[ddrtnds.size()];
		for (int i = 0; i < ddrtnds.size(); i++) {
			newrtnds[i] = (RateProductDefinition) ddrtnds.elementAt(i);
		}
		rtndList = new RateProductDefinitions();
		rtndList.setRateProductDefinition(newrtnds);
		return rtndList;
	}

	public UnitsOfMeasureList getUnitsOfMeasureList(MI_RateProductDataDictionaryRS dd) {
		if (dd != null && dd.getRateProductDataDictionary() != null && dd.getRateProductDataDictionary().getUnitsOfMeasureList() != null)
			return dd.getRateProductDataDictionary().getUnitsOfMeasureList();

		return null;
	}

	public TypeLists getTypeLists(MI_RateProductDataDictionaryRS dd) {
		if (dd != null && dd.getRateProductDataDictionary() != null && dd.getRateProductDataDictionary().getTypeLists() != null)
			return dd.getRateProductDataDictionary().getTypeLists();

		return null;
	}

	public BrandsList getBrandsList(MI_RateProductDataDictionaryRS dd) {
		if (dd != null && dd.getRateProductDataDictionary() != null && dd.getRateProductDataDictionary().getBrandsList() != null)
			return dd.getRateProductDataDictionary().getBrandsList();

		return null;
	}

	public RateProductView getDataForView(String marshacode, String brandcode, String productCode, String level) {
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
		MI_RateProductDefinitionsRS mrtnd = null;
		if (!productCode.equals("")) {
			mrtnd = rateprod_mgr.getRateProductDefinitions(marshacode, brandcode, productCode, level);
		} else
			return null;

		RateProductDefinitions rtnds = null;
		if (mrtnd != null) {
			rtnds = mrtnd.getRateProductDefinitions();
		} else
			return null;
		RateProductView rpview = new RateProductView();
		Vector<RateProductListView> rpList = new Vector<RateProductListView>();
		rpview.setProductCode(productCode);
		rpview.setProductName(rtnds == null ? null : rtnds.getProductName());
		RateProductDefinitionList[] ddList = dd.getRateProductDataDictionary().getRateProductDefinitionLists().getRateProductDefinitionList();
		Boolean bHasSelectedData = false;
		for (int i = 0; i < ddList.length; i++) {
			// skip the account information
			if (!ddList[i].getRP_ListCode().equals("0201")) {
				RateProductListView rpListView = new RateProductListView();
				Vector<RateProductGroupView> rpGroup = new Vector<RateProductGroupView>();
				rpListView.setRP_ListCode(ddList[i].getRP_ListCode());
				rpListView.setRP_ListName(ddList[i].getRP_ListName());
				RateProductDefinitionGroup[] rpdg = ddList[i].getRateProductDefinitionGroup();
				for (int j = 0; j < rpdg.length; j++) {
					RateProductGroupView rpgroupView = new RateProductGroupView();
					Vector<RateProductDefinitionView> rpDef = new Vector<RateProductDefinitionView>();
					rpgroupView.setRP_GroupCode(rpdg[j].getRP_GroupCode());
					rpgroupView.setRP_GroupName(rpdg[j].getRP_GroupName());
					RateProductDefinition[] rpd = rpdg[j].getRateProductDefinition();
					if (rpd != null) {
						for (int k = 0; k < rpd.length; k++) {
							if (rpd[k].getSupplementaryData() != null) {
								RateProductDefinitionView rpdView = new RateProductDefinitionView();
								rpdView.setRP_Code(rpd[k].getRP_Code());
								rpdView.setRP_CodeName(rpd[k].getRP_CodeName());
								rpdView.setRP_Name(rpd[k].getRP_Name());
								RateProductDefinition rpdData = getDataValues(ddList[i].getRP_ListCode(), rpdg[j].getRP_GroupCode(), rpd[k].getRP_Name(), rpd[k].getRP_Code(), rtnds);
								if (rpdData != null && !rpdData.getAvailabilityInd().equals(" ") && (!bHasSelectedData || (bHasSelectedData && rpdData.getAvailabilityInd().equals("Y")))) {
									if (!bHasSelectedData && rpdData.getAvailabilityInd().equals("Y")) {
										rpDef = new Vector<RateProductDefinitionView>();
										rpGroup = new Vector<RateProductGroupView>();
										rpList = new Vector<RateProductListView>();
										bHasSelectedData = true;
									}
									rpdView.setAvailabilityInd(rpdData.getAvailabilityInd());
									rpdView.setQuantity(rpdData.getQuantity());
									getUOMData(rpdView, rpdData, dd);
									getTypeData(rpdView, rpdData, dd);
									getBrandData(rpdView, rpdData, dd);
									rpdView.setText(getTextData(rpdData));
									for (int l = 0; l < rpd[k].getSupplementaryData().length; l++) {
										if (rpd[k].getSupplementaryData(l).getPath().equals("../@Quantity"))
											rpdView.setBShowQuantity(true);
									}
									rpDef.add(rpdView);
								}
							}
						}
					}
					if (rpDef.size() > 0) {
						rpgroupView.setRateProductView(rpDef);
						rpGroup.add(rpgroupView);
					}
				}
				if (rpGroup.size() > 0) {
					rpListView.setRateProductGroupView(rpGroup);
					rpList.add(rpListView);
				}
			}
		}
		if (rpList.size() > 0)
			rpview.setRateProductListView(rpList);

		return rpview;
	}

	private RateProductDefinition getDataValues(String RP_ListCode, String RP_GroupCode, String RP_Name, String RP_Code, RateProductDefinitions rpdsData) {
		RateProductDefinition rpd = null;
		if(rpdsData != null) {
			RateProductDefinition[] rpdData = rpdsData.getRateProductDefinition();
			for (int i = 0; i < rpdData.length; i++) {
				if (RP_ListCode.equals(rpdData[i].getRP_ListCode()) && RP_GroupCode.equals(rpdData[i].getRP_GroupCode()) && RP_Name.equals(rpdData[i].getRP_Name())
						&& RP_Code.equals(rpdData[i].getRP_Code())) {
					rpd = rpdData[i];
					break;
				}
			}
		}
		return rpd;
	}

	private void getUOMData(RateProductDefinitionView rpdView, RateProductDefinition rpdData, MI_RateProductDataDictionaryRS dd) {
		UnitOfMeasure uom = rpdData.getUnitOfMeasure();
		if (uom == null)
			return;
		if (uom.getUOM_Code() == null || uom.getUOM_Code().trim().equals(""))
			return;
		UnitsOfMeasure[] uoms = dd.getRateProductDataDictionary().getUnitsOfMeasureList().getUnitsOfMeasure();
		boolean bListFound = false;
		for (int i = 0; i < uoms.length; i++) {
			if (uom.getUOM_List().equals(uoms[i].getUOM_List())) {
				UnitOfMeasure[] uomList = uoms[i].getUnitOfMeasure();
				for (int j = 0; j < uomList.length; j++) {
					if (uom.getUOM_Code().equals(uomList[j].getUOM_Code())) {
						rpdView.setUOM_Type(uoms[i].getUOM_Type());
						rpdView.setUOM_Name(uomList[j].getUOM_Name());
						break;
					}
				}
			}
			if (bListFound)
				break;
		}
	}

	private void getTypeData(RateProductDefinitionView rpdView, RateProductDefinition rpdData, MI_RateProductDataDictionaryRS dd) {
		Type type = rpdData.getType();
		if (type == null)
			return;
		if (type.getTypeCode() == null || type.getTypeCode().trim().equals(""))
			return;
		TypeList[] typeList = dd.getRateProductDataDictionary().getTypeLists().getTypeList();
		boolean bListFound = false;
		for (int i = 0; i < typeList.length; i++) {
			if (type.getTypeListCode().equals(typeList[i].getTypeListCode())) {
				Type[] types = typeList[i].getType();
				for (int j = 0; j < types.length; j++) {
					if (type.getTypeCode().equals(types[j].getTypeCode())) {
						rpdView.setTypeListName(typeList[i].getTypeListName());
						rpdView.setTypeName(types[j].getTypeName());
						break;
					}
				}
			}
			if (bListFound)
				break;
		}
	}

	private String getTextData(RateProductDefinition rpdData) {
		String text = "";
		if (rpdData.getDescription() != null && rpdData.getDescription().getText() != null) {
			Text[] textData = rpdData.getDescription().getText();
			for (int i = 0; i < textData.length; i++) {
				if (textData[i].getLanguage().equals("en")) {
					text = textData[i].getValue();
					break;
				}
			}
		}
		return text;
	}

	private void getBrandData(RateProductDefinitionView rpdView, RateProductDefinition rpdData, MI_RateProductDataDictionaryRS dd) {
		Brand brand = rpdData.getBrand();
		if (brand == null)
			return;
		if (brand.getBrandCode() == null && brand.getBrandCode().trim().equals(""))
			return;
		Brands[] brands = dd.getRateProductDataDictionary().getBrandsList().getBrands();
		boolean bListFound = false;
		for (int i = 0; i < brands.length; i++) {
			if (brand.getBrandList().equals(brands[i].getBrandList())) {
				Brand[] brandList = brands[i].getBrand();
				for (int j = 0; j < brandList.length; j++) {
					if (brand.getBrandCode().equals(brandList[j].getBrandCode())) {
						rpdView.setBrandType(brands[i].getBrandType());
						rpdView.setBrandName(brandList[j].getBrandName());
						break;
					}
				}
			}
			if (bListFound)
				break;
		}
	}

	public RateProductDefinitions[] getRateProductDefinitionsList(String marshacode, String brandcode, RateProductSearch rateProductSearch) {
		// get a list of all the room pools with a room product definition
		// for the property
		long count = rfpConstantsMgr.getMaxFRProducts();
		RateProductDefinition[] rtnd = null;
		if (rateProductSearch.getSearchAttr() != null && !rateProductSearch.getSearchAttr().isEmpty()) {
			rtnd = new RateProductDefinition[rateProductSearch.getSearchAttr().size()];
			Collection<RateProductSearchAttributes> searchAttrs = rateProductSearch.getSearchAttr().values();
			int i = 0;
			for (Iterator<RateProductSearchAttributes> it = searchAttrs.iterator(); it.hasNext();) {
				RateProductSearchAttributes rpsa = it.next();
				rtnd[i] = new RateProductDefinition();
				rtnd[i].setRP_ListCode(rpsa.getRP_ListCode());
				rtnd[i].setRP_GroupCode(rpsa.getRP_GroupCode());
				rtnd[i].setRP_Name(rpsa.getRP_Name());
				rtnd[i].setRP_Code(rpsa.getRP_Code());
				i++;
			}
		}
		MI_RateProductDefinitionsListRS rp_def = rateprod_mgr.getRateProductDefinitionsList(marshacode, brandcode, rateProductSearch.getProductCode(), rateProductSearch.getProductName(), count,
				rateProductSearch.getSearchStartProduct(), rateProductSearch.getNendProduct(), rtnd);
		if (rp_def != null && rp_def.getRateProductDefinitionsList() != null && rp_def.getRateProductDefinitionsList().getRateProductDefinitions() != null)
			return rp_def.getRateProductDefinitionsList().getRateProductDefinitions();
		return null;
	}

	public RateProductDataView getDataForDefinition(String marshaCode, String brandCode, String productCode, String level, String rtnd_ListCode) {
		RateProductDataView rateProductDataView = new RateProductDataView();
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
		if (rtnd_ListCode == null || rtnd_ListCode.equals(""))
			rtnd_ListCode = "0000";
		rateProductDataView.setRateProductDefinitionList(getDataForScreen(marshaCode, brandCode, productCode, level, rtnd_ListCode, dd));
		rateProductDataView.setRateProductMenu(getMenuOptions(dd));
		rateProductDataView.setNextMenuOption(getNextMenuOption(rtnd_ListCode, dd));
		rateProductDataView.setPreviousMenuOption(getPrevMenuOption(rtnd_ListCode, dd));
		rateProductDataView.setUomLists(getUnitsOfMeasureMap(dd));
		rateProductDataView.setTypeLists(getTypeListMap(dd));
		rateProductDataView.setBrandLists(getBrandMap(dd));
		return rateProductDataView;
	}

	private Map<String, UnitsOfMeasure> getUnitsOfMeasureMap(MI_RateProductDataDictionaryRS dd) {
		Map<String, UnitsOfMeasure> uomListMap = null;
		UnitsOfMeasureList unitsOfMeasureList = dd.getRateProductDataDictionary().getUnitsOfMeasureList();
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

	private Map<String, TypeList> getTypeListMap(MI_RateProductDataDictionaryRS dd) {
		Map<String, TypeList> typeListMap = null;
		TypeLists typeLists = dd.getRateProductDataDictionary().getTypeLists();
		if (typeLists != null) {
			TypeList[] typeList = typeLists.getTypeList();
			if (typeList != null) {
				typeListMap = new HashMap<String, TypeList>();
				for (int i = 0; i < typeList.length; i++) {
					typeListMap.put(typeList[i].getTypeListCode(), typeList[i]);
				}
			}
		}
		return typeListMap;
	}

	private Map<String, Brands> getBrandMap(MI_RateProductDataDictionaryRS dd) {
		Map<String, Brands> brandsMap = null;
		BrandsList brandsList = dd.getRateProductDataDictionary().getBrandsList();
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

	private RateProductDefinitionList getDataForScreen(String marshacode, String brandcode, String productCode, String level, String rtnd_ListCode, MI_RateProductDataDictionaryRS dd) {
		MI_RateProductDefinitionsRS mrtnd = null;
		RateProductDefinitions rtnds = null;
		if (!productCode.equals("")) {
			mrtnd = rateprod_mgr.getRateProductDefinitions(marshacode, brandcode, productCode, level);
			if (mrtnd != null)
				rtnds = mrtnd.getRateProductDefinitions();
		}

		RateProductDefinitionList rtndList = null;
		RateProductDefinitionLists ddLists = getDataDictionaryWOBlank(dd, false);
		RateProductDefinitionList[] ddList = ddLists.getRateProductDefinitionList();

		/*
		 * Find the RateProductDefinitionList for the List Code and copy the
		 * structure
		 */
		if (ddList != null) {
			for (int i = 0; i < ddList.length; i++) {
				if (ddList[i].getRP_ListCode().equals(rtnd_ListCode)) {
					rtndList = new RateProductDefinitionList();
					rtndList.copyInto(ddList[i]);
					break;
				}
			}
		}

		/*
		 * copy the values into the data structure
		 */
		if (rtnds != null && rtndList != null) {
			RateProductDefinition[] dataDef = rtnds.getRateProductDefinition();
			if (dataDef != null) {
				RateProductDefinitionGroup[] rtndGroup = rtndList.getRateProductDefinitionGroup();
				for (int iGrp = 0; iGrp < rtndGroup.length; iGrp++) {
					RateProductDefinition[] rtnd = rtndGroup[iGrp].getRateProductDefinition();
					if (rtnd != null) {
						for (int iDef = 0; iDef < rtnd.length; iDef++) {
							for (int iDefData = 0; iDefData < dataDef.length; iDefData++) {
								if ((rtndList.getRP_ListCode().equals(dataDef[iDefData].getRP_ListCode())) && (rtndGroup[iGrp].getRP_GroupCode().equals(dataDef[iDefData].getRP_GroupCode()))
										&& (rtnd[iDef].getRP_Code().equals(dataDef[iDefData].getRP_Code())) && (rtnd[iDef].getRP_Name().equals(dataDef[iDefData].getRP_Name()))) {
									SupplementaryData[] ssd = rtnd[iDef].getSupplementaryData();
									if (ssd != null) {
										for (int iSup = 0; iSup < ssd.length; iSup++) {
											if (ssd[iSup].getPath().equals("../@AvailabilityInd")) {
												rtnd[iDef].copyDataInto(dataDef[iDefData]);
												break;
											}
										}
									}
									break;
								}
							}
						}
					}
				}
			}
		}
		return rtndList;
	}

	private Vector<RateProductMenuModel> getMenuOptions(MI_RateProductDataDictionaryRS dd) {
		Vector<RateProductMenuModel> menuList = new Vector<RateProductMenuModel>();
		menuList.addElement(new RateProductMenuModel("Product Name", "0000"));
		RateProductDefinitionList[] rtndl = dd.getRateProductDataDictionary().getRateProductDefinitionLists().getRateProductDefinitionList();
		if (rtndl != null) {
			for (int i = 0; i < rtndl.length; i++) {
				if (validMenuItem(rtndl[i]))
					menuList.addElement(new RateProductMenuModel(rtndl[i].getRP_ListName(), rtndl[i].getRP_ListCode()));
			}
		}
		return menuList;
	}

	private boolean validMenuItem(RateProductDefinitionList rtndl) {
		boolean bOK = false;
		if (!rtndl.getRP_ListCode().equals("0201")) {
			RateProductDefinitionGroup[] rtndg = rtndl.getRateProductDefinitionGroup();
			if (rtndg != null) {
				for (int rg = 0; rg < rtndg.length; rg++) {
					RateProductDefinition[] rtnd = rtndg[rg].getRateProductDefinition();
					if (rtnd != null) {
						for (int rd = 0; rd < rtnd.length; rd++) {
							if (rtnd[rd].getSupplementaryData() != null || rtnd[rd].getBrand() != null || rtnd[rd].getType() != null || rtnd[rd].getUnitOfMeasure() != null) {
								bOK = true;
								break;
							}

						}
					}
					if (bOK)
						break;
				}
			}
		}
		return bOK;
	}

	private String getNextMenuOption(String currOption, MI_RateProductDataDictionaryRS dd) {
		String nextItem = null;
		RateProductDefinitionList[] rtndl = dd.getRateProductDataDictionary().getRateProductDefinitionLists().getRateProductDefinitionList();
		if (rtndl != null) {
			if (currOption.equals("0000")) {
				for (int j = 0; j < rtndl.length; j++) {
					if (validMenuItem(rtndl[j])) {
						nextItem = rtndl[j].getRP_ListCode();
						break;
					}
				}
			} else {
				for (int i = 0; i < rtndl.length; i++) {
					if (rtndl[i].getRP_ListCode().equals(currOption) && i < rtndl.length - 1) {
						for (int j = i + 1; j < rtndl.length; j++) {
							if (validMenuItem(rtndl[j])) {
								nextItem = rtndl[j].getRP_ListCode();
								break;
							}
						}
					}
				}
			}
		}
		return nextItem;
	}

	private String getPrevMenuOption(String currOption, MI_RateProductDataDictionaryRS dd) {
		String prevItem = null;
		RateProductDefinitionList[] rtndl = dd.getRateProductDataDictionary().getRateProductDefinitionLists().getRateProductDefinitionList();
		if (rtndl != null) {
			for (int i = 0; i < rtndl.length; i++) {
				if (rtndl[i].getRP_ListCode().equals(currOption)) {
					if (i > 1) {
						for (int j = i - 1; j > -1; j--) {
							if (validMenuItem(rtndl[j])) {
								prevItem = rtndl[j].getRP_ListCode();
								break;
							}
						}
					} else if (i == 1) { // take the user back to the
						// product name input
						prevItem = "0000";
					}
				}
			}
		}
		return prevItem;
	}

	public String updateRateProductDefinition(String marshaCode, String brandCode, String productCode, String productName, String managed, String level,
			Map<String, RateProductDefinitionUpdateView> rateProductDefinition, String loginName) {
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
		MI_RateProductDefinitionsRS mrtnd = rateprod_mgr.getRateProductDefinitions(marshaCode, brandCode, productCode, level);
		RateProductDefinitions rtnds = null;
		if (mrtnd != null)
			rtnds = mrtnd.getRateProductDefinitions();
		rtnds = getFullDataForBlank(dd, rtnds);
		RateProductDefinition rtnd = null;
		if (rateProductDefinition != null) {
			for (Iterator<Entry<String, RateProductDefinitionUpdateView>> it = rateProductDefinition.entrySet().iterator(); it.hasNext();) {
				Map.Entry<String, RateProductDefinitionUpdateView> entry = (Map.Entry<String, RateProductDefinitionUpdateView>) it.next();
				String key = entry.getKey();
				RateProductDefinitionUpdateView rateProductData = entry.getValue();
				String splitField[] = key.split("_");
				String RP_Name = splitField[0];
				String RP_Code = splitField[1];
				rtnd = getRateProductDefinition(rtnds, RP_Name, RP_Code);
				rtnd.setAvailabilityInd(rateProductData.getAvailabilityInd());
				rtnd.setQuantity(rateProductData.getQuantity());
				UnitOfMeasure uom = rtnd.getUnitOfMeasure();
				if (uom != null) {
					uom.setUOM_Code(rateProductData.getUOM_Code());
					uom.setUOM_Name(getUOM_Name(dd, uom.getUOM_List(), rateProductData.getUOM_Code()));
				}
				Type type = rtnd.getType();
				if (type != null) {
					type.setTypeCode(rateProductData.getTypeCode());
					type.setTypeName(getType_Name(dd, type.getTypeListCode(), rateProductData.getTypeCode()));
				}
				Brand brand = rtnd.getBrand();
				if (brand != null) {
					brand.setBrandCode(rateProductData.getBrandCode());
					brand.setBrandName(getBrand_Name(dd, brand.getBrandList(), rateProductData.getBrandCode()));
				}
				Description desc = rtnd.getDescription();
				if (desc == null)
					desc = new Description();
				Text[] txt = desc.getText();
				Text[] t = new Text[1];
				t[0] = new Text();
				if (txt != null)
					t[0].setMaxLength(txt[0].getMaxLength());
				t[0].setLanguage("en");
				t[0].setValue(rateProductData.getText());
				desc.setText(t);
				rtnd.setDescription(desc);
				if(rateProductData.getBrandModifiable() != null) {
					rtnd.setBrandModifiable(rateProductData.getBrandModifiable());
				}
				if(rateProductData.getHotelModifiable() != null) {
					rtnd.setHotelModifiable(rateProductData.getHotelModifiable());
				}
			}
		}
		rtnds.setProductCode(productCode);
		rtnds.setProductName(productName);
		rtnds.setManaged(managed);
		MI_RateProductDefinitionsNotifRS rp_def = rateprod_mgr.setRateProductDefinitions(marshaCode, brandCode, rtnds, loginName);
		RateProductDefinitions rd = null;
		if (rp_def.getErrors() == null && rp_def.getRateProductDefinitions() != null) {
			rd = rp_def.getRateProductDefinitions();
			productCode = rd.getProductCode();
		}
		return productCode;

	}

	private RateProductDefinition getRateProductDefinition(RateProductDefinitions rtnds, String RP_Name, String RP_Code) {
		RateProductDefinition the_rtnd = null;
		RateProductDefinition[] rtnd = rtnds.getRateProductDefinition();
		if (rtnd != null) {
			for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
				if (rtnd[iRtnd].getRP_Code().equals(RP_Code) && rtnd[iRtnd].getRP_Name().equals(RP_Name)) {
					the_rtnd = rtnd[iRtnd];
					break;
				}
			}
		}
		return the_rtnd;
	}

	private String getUOM_Name(MI_RateProductDataDictionaryRS dd, String uom_list, String uom_code) {
		String uom_name = "";
		UnitsOfMeasureList uomlist = null;
		try {
			uomlist = dd.getRateProductDataDictionary().getUnitsOfMeasureList();
		} catch (Exception e) {
		}
		if (uomlist != null) {
			UnitsOfMeasure[] uoms = uomlist.getUnitsOfMeasure();
			for (int iUom = 0; iUom < uoms.length; iUom++) {
				if (uoms[iUom].getUOM_List().equals(uom_list)) {
					UnitOfMeasure[] uom = uoms[iUom].getUnitOfMeasure();
					for (int iU = 0; iU < uom.length; iU++) {
						if (uom[iU].getUOM_Code().equals(uom_code)) {
							uom_name = uom[iU].getUOM_Name();
							break;
						}
					}
				}
			}
		}
		return uom_name;
	}

	private String getType_Name(MI_RateProductDataDictionaryRS dd, String type_list, String type_code) {
		String type_name = "";
		TypeLists typelist = null;
		try {
			typelist = dd.getRateProductDataDictionary().getTypeLists();
		} catch (Exception e) {
		}
		if (typelist != null) {
			TypeList[] types = typelist.getTypeList();
			for (int itype = 0; itype < types.length; itype++) {
				if (types[itype].getTypeListCode().equals(type_list)) {
					Type[] type = types[itype].getType();
					for (int iU = 0; iU < type.length; iU++) {
						if (type[iU].getTypeCode().equals(type_code)) {
							type_name = type[iU].getTypeName();
							break;
						}
					}
				}
			}
		}
		return type_name;
	}

	private String getBrand_Name(MI_RateProductDataDictionaryRS dd, String brand_list, String brand_code) {
		String brand_name = "";
		BrandsList brandsList = null;
		try {
			brandsList = dd.getRateProductDataDictionary().getBrandsList();
		} catch (Exception e) {
		}
		if (brandsList != null) {
			Brands[] brands = brandsList.getBrands();
			for (int ibrands = 0; ibrands < brands.length; ibrands++) {
				if (brands[ibrands].getBrandList().equals(brand_list)) {
					Brand[] brand = brands[ibrands].getBrand();
					for (int iU = 0; iU < brand.length; iU++) {
						if (brand[iU].getBrandCode().equals(brand_code)) {
							brand_name = brand[iU].getBrandName();
							break;
						}
					}
				}
			}
		}
		return brand_name;
	}

	@SuppressWarnings("null")
	public RateProductAssignmentView getRatePlanAssignmentList(String marshaCode, String brandCode, String entryLevel, String ratePlanCode, String ratePlanName, String startRatePlanCode,
			String endRatePlanCode, String startKey, String endKey) {
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
		RateProductAssignmentView rateProductAssignmentView = new RateProductAssignmentView();
		rateProductAssignmentView.setRateProductMenu(getMenuOptions(dd));

		// get a list of all the room pools with a room product definition
		// for the property
		long count = rfpConstantsMgr.getMaxFRProducts();
		MI_RatePlanAssignmentListRS rp_def = rateprod_mgr.getRatePlanAssignmentList(marshaCode, brandCode, ratePlanCode, ratePlanName, count, startRatePlanCode, endRatePlanCode, startKey, endKey);
		rateProductAssignmentView.setRatePlanAssignmentsSearch(rp_def.getRatePlanAssignmentsSearch());
		Vector<RateProductAssignmentDataView> ratePlanAssignmentData = new Vector<RateProductAssignmentDataView>();
		if (rp_def.getRatePlanAssignmentList() != null) {

			RatePlanAssignment[] rpa = rp_def.getRatePlanAssignmentList().getRatePlanAssignment();
			for (int i = 0; i < rpa.length; i++) {
				RateProductAssignmentDataView rpadv = new RateProductAssignmentDataView();
				rpadv.setRatePlanCode(rpa[i].getRatePlanCode());
				rpadv.setRatePlanName(rpa[i].getRatePlanName());
				rpadv.setRatePlanManaged(rpa[i].getManaged());
				rpadv.setLockedLevel(rpa[i].getLockedLevel());
				// this assumes that there is only one product definition per
				// assignment. This may change when they add seasonality to the
				// assignment
				if (rpa[i].getRateProductDefinitions() != null) {
					rpadv.setProductCode(rpa[i].getRateProductDefinitions(0).getProductCode());
					rpadv.setProductName(rpa[i].getRateProductDefinitions(0).getProductName());
					rpadv.setProductManaged(rpa[i].getRateProductDefinitions(0).getManaged());
				}
				if (entryLevel.equals("Master") && rpadv.getRatePlanManaged().equals("false") && (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false")))
					rpadv.setIsAllowAssign(true);
				else if (entryLevel.equals("Brand") && (rpadv.getLockedLevel() == null || rpadv.getLockedLevel().equals("Brand")) && rpadv.getRatePlanManaged().equals("false")
						&& (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false")))
					rpadv.setIsAllowAssign(true);
				else if (entryLevel.equals("Hotel") && (rpadv.getLockedLevel() == null || (!rpadv.getLockedLevel().equals("Master") && !rpadv.getLockedLevel().equals("Brand")))
						&& (rpadv.getRatePlanManaged().equals("false") || (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false"))))
					rpadv.setIsAllowAssign(true);
				else
					rpadv.setIsAllowAssign(false);

				if (entryLevel.equals("Master") && rpadv.getLockedLevel() != null && rpadv.getLockedLevel().equals("Master"))
					rpadv.setIsLocked(true);
				else if (entryLevel.equals("Brand") && rpadv.getLockedLevel() != null && rpadv.getLockedLevel().equals("Brand"))
					rpadv.setIsLocked(true);
				else
					rpadv.setIsLocked(false);
				ratePlanAssignmentData.add(rpadv);
			}
			rateProductAssignmentView.setRatePlanAssignmentDataList(ratePlanAssignmentData);

		}
		return rateProductAssignmentView;
	}

	public HotelBrand[] getHotelBrands() {
		MI_HotelBrandsRS brands = rateprod_mgr.getHotelBrands();
		return brands.getHotelBrands().getHotelBrand();
	}

	public Channel[] getChannels() {

		MI_HotelRoomProductInfoChannelsRS rp_def = rateprod_mgr.getChannels();
		return rp_def.getChannels().getChannel();

	}

	public com.marriott.rfp.object.roomdef.beans.Entry[] getEntries() {
		MI_HotelRoomProductInfoEntriesRS rp_def = rateprod_mgr.getEntries();
		return rp_def.getEntries().getEntry();

	}

	public Language[] getDefaultLanguages() {
		MI_HotelRoomProductInfoChannelLanguagesRS rp_def = rateprod_mgr.getDefaultLanguages();
		return rp_def.getChannels().getChannel()[0].getLanguages().getLanguage();

	}

	public Text[] getRateDescription(String marshacode, Channel channel, String langId, com.marriott.rfp.object.roomdef.beans.Entry entry, String rateProgram) {
		Text[] t = null;
		MI_DisplayRatePlanDescriptionRS rp_def = rateprod_mgr.getDisplayRatePlanDescription(marshacode, false, channel, langId, entry, rateProgram);
		if (rp_def != null && rp_def.getRatePlan() != null && rp_def.getRatePlan().getDescription() != null && rp_def.getRatePlan().getDescription().getText() != null)
			t = rp_def.getRatePlan().getDescription().getText();
		return t;
	}

	public Text[] getOldRateDescription(String marshacode, Channel channel, String langId, com.marriott.rfp.object.roomdef.beans.Entry entry, String rateProgram) {
		Text[] t = null;
		if (rfpConstantsMgr.getRateDescriptionMode().equals("BOTH")) {
			MI_DisplayRatePlanDescriptionRS rp_def = rateprod_mgr.getDisplayRatePlanDescription(marshacode, true, channel, langId, entry, rateProgram);
			if (rp_def != null && rp_def.getRatePlan() != null && rp_def.getRatePlan().getDescription() != null && rp_def.getRatePlan().getDescription().getText() != null)
				t = rp_def.getRatePlan().getDescription().getText();
		}
		return t;
	}

	public String getHotelBrands(String marshaCode) {

		MI_HotelBrandsRS rp_def = rateprod_mgr.getHotelBrands(marshaCode);

		HotelBrands brands = rp_def.getHotelBrands();
		if (brands != null) {
			HotelBrand[] brand = brands.getHotelBrand();
			if (brand != null && brand.length > 0)
				return brand[0].getBrandCode();
		}
		return null;

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void updateRatePlanAssignment(String marshaCode, String brandCode, String productCode, String level, Map<String, RateProductAssignmentDataView> rpaData, String loginName) {
		if (rpaData == null)
			return;
		RatePlanAssignmentList ratePlanAssignmentList = new RatePlanAssignmentList();
		RateProductDefinitions[] rateProductDefinitions = new RateProductDefinitions[1];

		rateProductDefinitions[0] = new RateProductDefinitions();
		RateProductSearch rateProductSearch = new RateProductSearch();
		rateProductSearch.setProductCode(productCode);
		/* need to get if the product is managed, so get it from the list */
		RateProductDefinitions[] rd = getRateProductDefinitionsList(marshaCode, brandCode, rateProductSearch);
		rateProductDefinitions[0] = rd[0];
		rateProductDefinitions[0].setLevel(null);

		Vector rpaList = new Vector();
		for (Iterator i = rpaData.values().iterator(); i.hasNext();) {
			RateProductAssignmentDataView rpa = (RateProductAssignmentDataView) i.next();
			if (rpa.getAssign() != null) {
				RatePlanAssignment ratePlanAssignment = new RatePlanAssignment();
				ratePlanAssignment.setRatePlanCode(rpa.getRatePlanCode());
				ratePlanAssignment.setRatePlanName(rpa.getRatePlanName());
				ratePlanAssignment.setManaged(rpa.getRatePlanManaged());
				if (rpa.getLock() != null)
					ratePlanAssignment.setLockedLevel(level);
				ratePlanAssignment.setRateProductDefinitions(rateProductDefinitions);
				rpaList.add(ratePlanAssignment);
			}
		}
		if (rpaList.size() > 0) {
			ratePlanAssignmentList.setRatePlanAssignment((RatePlanAssignment[]) rpaList.toArray(new RatePlanAssignment[rpaList.size()]));
			rateprod_mgr.setRatePlanAssignmentList(marshaCode, brandCode, ratePlanAssignmentList, loginName);
		}
	
	}
	//Method to retreive the Rate plan assignment information from the MARSHA webservice for Cognos Reports.
	@SuppressWarnings("null")
	public RateProductAssignmentView getRatePlanAssignmentListforReport(String marshaCode, String brandCode, String entryLevel, String ratePlanCode, String ratePlanName, String startRatePlanCode,
			String endRatePlanCode, String startKey, String endKey) {
		MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
		RateProductAssignmentView rateProductAssignmentView = new RateProductAssignmentView();
		rateProductAssignmentView.setRateProductMenu(getMenuOptions(dd));

		//Assign Count as 300 for Cognos Reports.
		long count = rfpConstantsMgr.getMaxFRProducts();
		if(entryLevel != null && entryLevel.equals("HotelReport"))
		{
			count = 300;
			entryLevel = "Hotel";
		}
		
		//Method to call MARSHA Webservice
		try{
		MI_RatePlanAssignmentListRS rp_def = rateprod_mgr.getRatePlanAssignmentList(marshaCode, brandCode, ratePlanCode, ratePlanName, count, startRatePlanCode, endRatePlanCode, startKey, endKey);
		rateProductAssignmentView.setRatePlanAssignmentsSearch(rp_def.getRatePlanAssignmentsSearch());
		Vector<RateProductAssignmentDataView> ratePlanAssignmentData = new Vector<RateProductAssignmentDataView>();
		//Retrieve the list and assign to the Java object.
		if (rp_def.getRatePlanAssignmentList() != null) {

			RatePlanAssignment[] rpa = rp_def.getRatePlanAssignmentList().getRatePlanAssignment();
			for (int i = 0; i < rpa.length; i++) {
				RateProductAssignmentDataView rpadv = new RateProductAssignmentDataView();
				rpadv.setRatePlanCode(rpa[i].getRatePlanCode());
				rpadv.setRatePlanName(rpa[i].getRatePlanName());
				rpadv.setRatePlanManaged(rpa[i].getManaged());
				rpadv.setLockedLevel(rpa[i].getLockedLevel());

				if (rpa[i].getRateProductDefinitions() != null) {
					rpadv.setProductCode(rpa[i].getRateProductDefinitions(0).getProductCode());
					rpadv.setProductName(rpa[i].getRateProductDefinitions(0).getProductName());
					rpadv.setProductManaged(rpa[i].getRateProductDefinitions(0).getManaged());
				}
				if (entryLevel.equals("Master") && rpadv.getRatePlanManaged().equals("false") && (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false")))
					rpadv.setIsAllowAssign(true);
				else if (entryLevel.equals("Brand") && (rpadv.getLockedLevel() == null || rpadv.getLockedLevel().equals("Brand")) && rpadv.getRatePlanManaged().equals("false")
						&& (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false")))
					rpadv.setIsAllowAssign(true);
				else if (entryLevel.equals("Hotel") && (rpadv.getLockedLevel() == null || (!rpadv.getLockedLevel().equals("Master") && !rpadv.getLockedLevel().equals("Brand")))
						&& (rpadv.getRatePlanManaged().equals("false") || (rpadv.getProductManaged() == null || rpadv.getProductManaged().equals("false"))))
					rpadv.setIsAllowAssign(true);
				else
					rpadv.setIsAllowAssign(false);

				if (entryLevel.equals("Master") && rpadv.getLockedLevel() != null && rpadv.getLockedLevel().equals("Master"))
					rpadv.setIsLocked(true);
				else if (entryLevel.equals("Brand") && rpadv.getLockedLevel() != null && rpadv.getLockedLevel().equals("Brand"))
					rpadv.setIsLocked(true);
				else
					rpadv.setIsLocked(false);
				ratePlanAssignmentData.add(rpadv);
				}
			//Assign the list to the object.
			rateProductAssignmentView.setRatePlanAssignmentDataList(ratePlanAssignmentData);
			}
		}
		catch (Exception e)
		{
			log.error(e.getMessage(),e);
			return null;
		}
		return rateProductAssignmentView;
	}
	
	//Method to insert the Rate plan assignment list to the oracle table.
	public long insertPlanAssignmentList(RateProductAssignmentView rateProductAssignmentView, String marshaCode, String brandCode)
	{
		Long ReportID = null;
		try{
			ReportID = rateprod_mgr.insertRatePlanAssignmentList(rateProductAssignmentView, marshaCode, brandCode);
		}
		catch(Exception e)
		{
			log.error(e.getMessage(),e);
		}
		return ReportID;
	}
}
