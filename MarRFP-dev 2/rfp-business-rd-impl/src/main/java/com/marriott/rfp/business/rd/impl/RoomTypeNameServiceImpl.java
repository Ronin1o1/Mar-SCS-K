package com.marriott.rfp.business.rd.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.dataaccess.rd.roomtypename.api.RoomTypeNameManager;
import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.object.roomdef.beans.AlternateText;
import com.marriott.rfp.object.roomdef.beans.AlternateTextList;
import com.marriott.rfp.object.roomdef.beans.AlternateTextLists;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;
import com.marriott.rfp.object.roomdef.beans.RoomType;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinition;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionGroup;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionList;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitionLists;
import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.RoomTypes;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.Type;
import com.marriott.rfp.object.roomdef.beans.TypeList;
import com.marriott.rfp.object.roomdef.beans.TypeLists;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasureList;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRS;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDataView;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDefinitionUpdateView;
import com.marriott.rfp.object.roomtypename.RoomTypeNameMenuModel;

@Service
@Transactional("transactionManagerRfpCommon")
public class RoomTypeNameServiceImpl extends RDServiceBase implements RoomTypeNameService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private RoomTypeNameManager roomtypename_mgr = null;

	public RoomTypeNameServiceImpl() {

	}

	public Vector<RoomPool> getMasterRoomPoolList() {
		// get a list of all the room pools for the property
		MI_MasterRoomTypeListRS roompools = roomtypename_mgr.getMasterRoomTypeList();

		// get a list of all the room pools with a room product definition for the property
		MI_MasterRoomTypeNameDefinitionListRS rp_def = roomtypename_mgr.getMasterRoomTypeNameDefinitionList();

		RoomTypes rps;
		RoomType rp[] = null;
		if (rp_def != null) {
			rps = rp_def.getRoomTypes();
			if (rps != null) {
				rp = rps.getRoomType();
			}
		}

		Vector<RoomPool> roompoollist = new Vector<RoomPool>();
		RoomTypes rts = roompools.getRoomTypes();
		String roompool;
		boolean hasRoomDefinition = false;
		if (rts != null) {
			RoomType rt[] = rts.getRoomType();
			for (int i = 0; i < rt.length; i++) {
				RoomPool rpm = new RoomPool();
				roompool = rt[i].getRoomTypeCode();
				hasRoomDefinition = getHasRoomDefinition(roompool, rp);
				rpm.setRoomPool(roompool);
				rpm.setHasRoomDefinition(hasRoomDefinition);
				roompoollist.add(rpm);
			}
		}
		return roompoollist;
	}

	public Vector<RoomPool> getHotelRoomPoolList(String marshaCode) {
		MI_HotelRoomPoolListRS roompools = roomtypename_mgr.getRoomTypeList(marshaCode);

		// get a list of all the room pools with a room product definition for the property
		// MI_HotelRoomTypeNameDefinitionListRS rp_def =null;
		MI_HotelRoomTypeNameDefinitionListRS rp_def = roomtypename_mgr.getHotelRoomTypeNameDefinitionList(marshaCode);

		RoomTypes rps;
		RoomType rp[] = null;
		if (rp_def != null) {
			rps = rp_def.getRoomTypes();
			if (rps != null) {
				rp = rps.getRoomType();
			}
		}

		Vector<RoomPool> roompoollist = new Vector<RoomPool>();
		RoomTypes rts = roompools.getRoomTypes();
		String roompool;
		boolean hasRoomDefinition = false;
		if (rts != null) {
			RoomType rt[] = rts.getRoomType();
			for (int i = 0; i < rt.length; i++) {
				RoomPool rpm = new RoomPool();
				roompool = rt[i].getRoomTypeCode();
				hasRoomDefinition = getHasRoomDefinition(roompool, rp);
				rpm.setRoomPool(roompool);
				rpm.setHasRoomDefinition(hasRoomDefinition);
				roompoollist.add(rpm);
			}
		}
		return roompoollist;
	}

	private static boolean getHasRoomDefinition(String roompool, RoomType[] rp) {
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

	public RoomTypeNameDataView getDataForMenuOnly(String roomPool) {
		RoomTypeNameDataView roomTypeNameDataView = new RoomTypeNameDataView();
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		roomTypeNameDataView.setRoomTypeNameMenu(getMenuOptions(dd));
		return roomTypeNameDataView;
	}

	public RoomTypeNameDataView getMasterDataForDefinition(String roomPool, String rtnd_ListCode) {
		RoomTypeNameDataView roomTypeNameDataView = new RoomTypeNameDataView();
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		if (rtnd_ListCode == null || rtnd_ListCode.equals(""))
			rtnd_ListCode = getFirstMenuOption(dd);
		roomTypeNameDataView.setRoomTypeNameDefinitionList(getMasterDataForScreen(roomPool, rtnd_ListCode, dd));
		roomTypeNameDataView.setRoomTypeNameMenu(getMenuOptions(dd));
		roomTypeNameDataView.setNextMenuOption(getNextMenuOption(rtnd_ListCode, dd));
		roomTypeNameDataView.setPreviousMenuOption(getPrevMenuOption(rtnd_ListCode, dd));
		roomTypeNameDataView.setUomLists(getUnitsOfMeasureMap(dd));
		roomTypeNameDataView.setTypeLists(getTypeListMap(dd));
		// roomTypeNameDataView.setAlternateTextLists(getAlternateTextListMap(dd));
		return roomTypeNameDataView;
	}

	private RoomTypeNameDefinitionList getMasterDataForScreen(String roomPool, String rtnd_ListCode, MI_MasterRoomTypeNameDataDictionaryRS dd) {
		MI_MasterRoomTypeNameDefinitionsRS mrtnd = null;
		RoomTypeNameDefinitions rtnds = null;
		if (!roomPool.equals("")) {
			mrtnd = roomtypename_mgr.getMasterRoomTypeNameDefinition(roomPool);
			if (mrtnd != null)
				rtnds = mrtnd.getRoomTypeNameDefinitions();
		}
		return getDataForScreen(roomPool, rtnd_ListCode, dd, rtnds);
	}

	public RoomTypeNameDataView getHotelDataForDefinition(String marshaCode, String roomPool, String rtnd_ListCode) {
		RoomTypeNameDataView roomTypeNameDataView = new RoomTypeNameDataView();
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		if (rtnd_ListCode == null || rtnd_ListCode.equals(""))
			rtnd_ListCode = getFirstMenuOption(dd);
		MI_HotelRoomTypeNameDefinitionsRS mrtnd = null;
		RoomTypeNameDefinitions rtnds = null;
		if (!roomPool.equals("")) {
			mrtnd = roomtypename_mgr.getHotelRoomTypeNameDefinition(marshaCode, roomPool);
			if (mrtnd != null)
				rtnds = mrtnd.getRoomTypeNameDefinitions();
			roomTypeNameDataView.setBrandCode(mrtnd.getBasicPropertyInfo().getBrandCode());
			roomTypeNameDataView.setRoomTypeNameDefinitionList(getDataForScreen(roomPool, rtnd_ListCode, dd, rtnds));
			roomTypeNameDataView.setRoomTypeNameMenu(getMenuOptions(dd));
			roomTypeNameDataView.setNextMenuOption(getNextMenuOption(rtnd_ListCode, dd));
			roomTypeNameDataView.setPreviousMenuOption(getPrevMenuOption(rtnd_ListCode, dd));
			roomTypeNameDataView.setUomLists(getUnitsOfMeasureMap(dd));
			roomTypeNameDataView.setTypeLists(getTypeListMap(dd));
			roomTypeNameDataView.setAlternateTextLists(getAlternateTextListMap(dd, roomTypeNameDataView.getBrandCode()));
		}
		return roomTypeNameDataView;
	}

	private RoomTypeNameDefinitionList getDataForScreen(String roomPool, String rtnd_ListCode, MI_MasterRoomTypeNameDataDictionaryRS dd,
			RoomTypeNameDefinitions rtnds) {
		RoomTypeNameDefinitionList rtndList = null;
		RoomTypeNameDefinitionLists ddLists = getDataDictionaryWOBlank(dd, false);
		RoomTypeNameDefinitionList[] ddList = ddLists.getRoomTypeNameDefinitionList();

		/*
		 * Find the RateProductDefinitionList for the List Code and copy the structure
		 */
		if (ddList != null) {
			for (int i = 0; i < ddList.length; i++) {
				if (ddList[i].getRTND_ListCode().equals(rtnd_ListCode)) {
					rtndList = new RoomTypeNameDefinitionList();
					rtndList.copyInto(ddList[i]);
					break;
				}
			}
		}

		/*
		 * copy the values into the data structure
		 */
		if (rtnds != null && rtndList != null) {
			RoomTypeNameDefinition[] dataDef = rtnds.getRoomTypeNameDefinition();
			if (dataDef != null) {
				RoomTypeNameDefinitionGroup[] rtndGroup = rtndList.getRoomTypeNameDefinitionGroup();
				for (int iGrp = 0; iGrp < rtndGroup.length; iGrp++) {
					RoomTypeNameDefinition[] rtnd = rtndGroup[iGrp].getRoomTypeNameDefinition();
					if (rtnd != null) {
						for (int iDef = 0; iDef < rtnd.length; iDef++) {
							for (int iDefData = 0; iDefData < dataDef.length; iDefData++) {
								if ((rtndList.getRTND_ListCode().equals(dataDef[iDefData].getRTND_ListCode()))
										&& (rtndGroup[iGrp].getRTND_GroupCode().equals(dataDef[iDefData].getRTND_GroupCode()))
										&& (rtnd[iDef].getRTND_Code().equals(dataDef[iDefData].getRTND_Code()))
										&& (rtnd[iDef].getRTND_Name().equals(dataDef[iDefData].getRTND_Name()))) {
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

	private RoomTypeNameDefinitionLists getDataDictionaryWOBlank(MI_MasterRoomTypeNameDataDictionaryRS dd, boolean mustHaveAvailInd) {
		if (dd == null)
			dd = roomtypename_mgr.getDataDictionary();

		RoomTypeNameDefinitionLists ddLists = new RoomTypeNameDefinitionLists();
		ddLists.copyInto(dd.getDataDictionary().getRoomTypeNameDefinitionLists());
		RoomTypeNameDefinitionList[] ddList = ddLists.getRoomTypeNameDefinitionList();
		boolean bOK = true;

		if (ddList != null) {
			Vector<RoomTypeNameDefinitionList> rpdefl = new Vector<RoomTypeNameDefinitionList>();
			for (int iList = 0; iList < ddList.length; iList++) {

				RoomTypeNameDefinitionGroup[] rtndGroup = ddList[iList].getRoomTypeNameDefinitionGroup();
				Vector<RoomTypeNameDefinitionGroup> rpdefg = new Vector<RoomTypeNameDefinitionGroup>();
				if (rtndGroup != null) {
					for (int iGrp = 0; iGrp < rtndGroup.length; iGrp++) {
						RoomTypeNameDefinition[] rtnd = rtndGroup[iGrp].getRoomTypeNameDefinition();
						Vector<RoomTypeNameDefinition> rpdef = new Vector<RoomTypeNameDefinition>();
						if (rtnd != null) {
							for (int iDef = 0; iDef < rtnd.length; iDef++) {
								if (rtnd[iDef].getSupplementaryData() != null || rtnd[iDef].getAlternateText() != null
										|| rtnd[iDef].getType() != null || rtnd[iDef].getUnitOfMeasure() != null) {
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
							rtndGroup[iGrp].setRoomTypeNameDefinition((RoomTypeNameDefinition[]) rpdef.toArray(new RoomTypeNameDefinition[rpdef
									.size()]));
							rpdefg.add(rtndGroup[iGrp]);
						}
					}
				}
				if (rpdefg.size() > 0) {
					ddList[iList].setRoomTypeNameDefinitionGroup((RoomTypeNameDefinitionGroup[]) rpdefg
							.toArray(new RoomTypeNameDefinitionGroup[rpdefg.size()]));
					rpdefl.add(ddList[iList]);
				}

			}
			if (rpdefl.size() > 0) {
				ddLists.setRoomTypeNameDefinitionList((RoomTypeNameDefinitionList[]) rpdefl.toArray(new RoomTypeNameDefinitionList[rpdefl.size()]));
			}

		}
		return ddLists;
	}

	private String getFirstMenuOption(MI_MasterRoomTypeNameDataDictionaryRS dd) {
		String nextItem = null;
		RoomTypeNameDefinitionList[] rtndl = dd.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		if (rtndl != null) {
			for (int j = 0; j < rtndl.length; j++) {
				if (validMenuItem(rtndl[j])) {
					nextItem = rtndl[j].getRTND_ListCode();
					break;
				}
			}
		}
		return nextItem;
	}

	private Vector<RoomTypeNameMenuModel> getMenuOptions(MI_MasterRoomTypeNameDataDictionaryRS dd) {
		Vector<RoomTypeNameMenuModel> menuList = new Vector<RoomTypeNameMenuModel>();
		RoomTypeNameDefinitionList[] rtndl = dd.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		if (rtndl != null) {
			for (int i = 0; i < rtndl.length; i++) {
				if (validMenuItem(rtndl[i]))
					menuList.addElement(new RoomTypeNameMenuModel(rtndl[i].getRTND_ListName(), rtndl[i].getRTND_ListCode()));
			}
		}
		return menuList;
	}

	private String getNextMenuOption(String currOption, MI_MasterRoomTypeNameDataDictionaryRS dd) {
		String nextItem = null;
		RoomTypeNameDefinitionList[] rtndl = dd.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		if (rtndl != null) {
			if (currOption.equals("")) {
				for (int j = 0; j < rtndl.length; j++) {
					if (validMenuItem(rtndl[j])) {
						nextItem = rtndl[j].getRTND_ListCode();
						break;
					}
				}
			} else {
				for (int i = 0; i < rtndl.length; i++) {
					if (rtndl[i].getRTND_ListCode().equals(currOption) && i < rtndl.length - 1) {
						for (int j = i + 1; j < rtndl.length; j++) {
							if (validMenuItem(rtndl[j])) {
								nextItem = rtndl[j].getRTND_ListCode();
								break;
							}
						}
					}
				}
			}
		}
		return nextItem;
	}

	private String getPrevMenuOption(String currOption, MI_MasterRoomTypeNameDataDictionaryRS dd) {
		String prevItem = null;
		RoomTypeNameDefinitionList[] rtndl = dd.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		if (rtndl != null) {
			for (int i = 0; i < rtndl.length; i++) {
				if (rtndl[i].getRTND_ListCode().equals(currOption)) {
					if (i > 0) {
						for (int j = i - 1; j > -1; j--) {
							if (validMenuItem(rtndl[j])) {
								prevItem = rtndl[j].getRTND_ListCode();
								break;
							}
						}
					}
				}
			}
		}
		return prevItem;
	}

	private boolean validMenuItem(RoomTypeNameDefinitionList rtndl) {
		boolean bOK = false;
		RoomTypeNameDefinitionGroup[] rtndg = rtndl.getRoomTypeNameDefinitionGroup();
		if (rtndg != null) {
			for (int rg = 0; rg < rtndg.length; rg++) {
				RoomTypeNameDefinition[] rtnd = rtndg[rg].getRoomTypeNameDefinition();
				if (rtnd != null) {
					for (int rd = 0; rd < rtnd.length; rd++) {
						if (rtnd[rd].getSupplementaryData() != null || rtnd[rd].getAlternateText() != null || rtnd[rd].getType() != null
								|| rtnd[rd].getUnitOfMeasure() != null) {
							bOK = true;
							break;
						}

					}
				}
				if (bOK)
					break;
			}
		}
		return bOK;
	}

	private Map<String, UnitsOfMeasure> getUnitsOfMeasureMap(MI_MasterRoomTypeNameDataDictionaryRS dd) {
		Map<String, UnitsOfMeasure> uomListMap = null;
		UnitsOfMeasureList unitsOfMeasureList = dd.getDataDictionary().getUnitsOfMeasureList();
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

	private Map<String, TypeList> getTypeListMap(MI_MasterRoomTypeNameDataDictionaryRS dd) {
		Map<String, TypeList> typeListMap = null;
		TypeLists typeLists = dd.getDataDictionary().getTypeLists();
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

	private Map<String, AlternateTextList> getAlternateTextListMap(MI_MasterRoomTypeNameDataDictionaryRS dd, String brandCode) {
		Map<String, AlternateTextList> alternateTextListMap = null;
		AlternateTextLists alternateTextLists = dd.getDataDictionary().getAlternateTextLists();
		if (alternateTextLists != null) {
			AlternateTextList[] alternateTextList = alternateTextLists.getAlternateTextList();
			if (alternateTextList != null) {
				alternateTextListMap = new HashMap<String, AlternateTextList>();
				for (int i = 0; i < alternateTextList.length; i++) {
					for (int j = 0; j < alternateTextList[i].getAlternateText().length; j++) {
						if (alternateTextList[i].getAlternateText(j).getAlternateTextListBrandCode().equals(brandCode)) {
							alternateTextListMap.put(alternateTextList[i].getAlternateTextListCode(), alternateTextList[i]);
							break;
						}
					}
				}
			}
		}
		return alternateTextListMap;
	}

	public void updateMasterRoomTypeNameDefinition(String roomPool, Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition,
			String loginName) {
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		MI_MasterRoomTypeNameDefinitionsRS mrtnd = roomtypename_mgr.getMasterRoomTypeNameDefinition( roomPool);
		RoomTypeNameDefinitions rtnds = null;
		if (mrtnd != null)
			rtnds = mrtnd.getRoomTypeNameDefinitions();
		rtnds = getDataWithValues(roomPool, dd, rtnds, roomTypeNameDefinition);
		roomtypename_mgr.setMasterRoomTypeNameDefinition(rtnds, loginName);
	}

	public void updateHotelRoomTypeNameDefinition(String marshaCode, String roomPool,
			Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition, String loginName) {
		MI_MasterRoomTypeNameDataDictionaryRS dd = roomtypename_mgr.getDataDictionary();
		MI_HotelRoomTypeNameDefinitionsRS mrtnd = roomtypename_mgr.getHotelRoomTypeNameDefinition(marshaCode, roomPool);
		RoomTypeNameDefinitions rtnds = null;
		if (mrtnd != null)
			rtnds = mrtnd.getRoomTypeNameDefinitions();
		rtnds = getDataWithValues(roomPool, dd, rtnds, roomTypeNameDefinition);
		roomtypename_mgr.setHotelRoomTypeNameDefinition(marshaCode, rtnds, loginName);
	}

	private RoomTypeNameDefinitions getDataWithValues(String roomPool, MI_MasterRoomTypeNameDataDictionaryRS dd, RoomTypeNameDefinitions rtnds,
			Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition) {
		rtnds = getFullDataForBlank(dd, rtnds);
		
		
		RoomTypeNameDefinition rtnd = null;
		for (Iterator<Entry<String, RoomTypeNameDefinitionUpdateView>> it = roomTypeNameDefinition.entrySet().iterator(); it.hasNext();) {
			Map.Entry<String, RoomTypeNameDefinitionUpdateView> entry = (Map.Entry<String, RoomTypeNameDefinitionUpdateView>) it.next();
			String key = entry.getKey();
			RoomTypeNameDefinitionUpdateView roomTypeNameData = entry.getValue();
			String splitField[] = key.split("_");
			String RTND_Name = splitField[0];
			String RTND_Code = splitField[1];
			rtnd = getRoomTypeNameDefinition(rtnds, RTND_Name, RTND_Code);
			rtnd.setAvailabilityInd(roomTypeNameData.getAvailabilityInd());
			rtnd.setQuantity(roomTypeNameData.getQuantity());
			UnitOfMeasure uom = rtnd.getUnitOfMeasure();
			if (uom != null) {
				uom.setUOM_Code(roomTypeNameData.getUOM_Code());
				uom.setUOM_Name(getUOM_Name(dd, uom.getUOM_List(), roomTypeNameData.getUOM_Code()));
			}
			Type type = rtnd.getType();
			if (type != null) {
				type.setTypeCode(roomTypeNameData.getTypeCode());
				type.setTypeName(getType_Name(dd, type.getTypeListCode(), roomTypeNameData.getTypeCode()));
			}
			AlternateText alternateText = rtnd.getAlternateText();
			if (alternateText != null) {
				alternateText.setAlternateTextCode(roomTypeNameData.getAlternateTextListCode());
				alternateText.setAlternateTextName(getAlternateText_Name(dd, alternateText.getAlternateTextListCode(), roomTypeNameData
						.getAlternateTextListCode()));
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
			t[0].setValue(roomTypeNameData.getText());
			desc.setText(t);
			rtnd.setDescription(desc);
		}
		rtnds.setRoomTypeCode(roomPool);
		return rtnds;
	}

	private RoomTypeNameDefinitions getFullDataForBlank(MI_MasterRoomTypeNameDataDictionaryRS dd, RoomTypeNameDefinitions rtnds) {
		RoomTypeNameDefinitions rtndList = null;
		RoomTypeNameDefinitionList[] ddList = dd.getDataDictionary().getRoomTypeNameDefinitionLists().getRoomTypeNameDefinitionList();
		RoomTypeNameDefinition[] currRtnd = null;
		if (rtnds != null)
			currRtnd = rtnds.getRoomTypeNameDefinition();

		Vector<RoomTypeNameDefinition> ddrtnds = new Vector<RoomTypeNameDefinition>();
		String listName = "";
		String listCode = "";
		String groupName = "";
		String groupCode = "";
		for (int iList = 0; iList < ddList.length; iList++) {
			listName = ddList[iList].getRTND_ListName();
			listCode = ddList[iList].getRTND_ListCode();
			RoomTypeNameDefinitionGroup[] ddGroup = ddList[iList].getRoomTypeNameDefinitionGroup();
			for (int iGrp = 0; iGrp < ddGroup.length; iGrp++) {
				groupName = ddGroup[iGrp].getRTND_GroupName();
				groupCode = ddGroup[iGrp].getRTND_GroupCode();
				RoomTypeNameDefinition[] ddRtnd = ddGroup[iGrp].getRoomTypeNameDefinition();
				if (ddRtnd != null) {
					for (int iRtnd = 0; iRtnd < ddRtnd.length; iRtnd++) {
						RoomTypeNameDefinition newrtnd = new RoomTypeNameDefinition(ddRtnd[iRtnd]);
						newrtnd.setRTND_ListName(listName);
						newrtnd.setRTND_ListCode(listCode);
						newrtnd.setRTND_GroupName(groupName);
						newrtnd.setRTND_GroupCode(groupCode);
						if (currRtnd != null) {
							for (int iCurr = 0; iCurr < currRtnd.length; iCurr++) {
								if ((newrtnd.getRTND_ListCode().equals(currRtnd[iCurr].getRTND_ListCode()))
										&& (newrtnd.getRTND_GroupCode().equals(currRtnd[iCurr].getRTND_GroupCode()))
										&& (newrtnd.getRTND_Code().equals(currRtnd[iCurr].getRTND_Code()))
										&& (newrtnd.getRTND_Name().equals(currRtnd[iCurr].getRTND_Name()))) {
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
		RoomTypeNameDefinition[] newrtnds = new RoomTypeNameDefinition[ddrtnds.size()];
		for (int i = 0; i < ddrtnds.size(); i++) {
			newrtnds[i] = (RoomTypeNameDefinition) ddrtnds.elementAt(i);
		}
		rtndList = new RoomTypeNameDefinitions();
		rtndList.setRoomTypeNameDefinition(newrtnds);
		return rtndList;
	}

	private RoomTypeNameDefinition getRoomTypeNameDefinition(RoomTypeNameDefinitions rtnds, String RTND_Name, String RTND_Code) {
		RoomTypeNameDefinition the_rtnd = null;
		RoomTypeNameDefinition[] rtnd = rtnds.getRoomTypeNameDefinition();
		if (rtnd != null) {
			for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
				if (rtnd[iRtnd].getRTND_Code().equals(RTND_Code) && rtnd[iRtnd].getRTND_Name().equals(RTND_Name)) {
					the_rtnd = rtnd[iRtnd];
					break;
				}
			}
		}
		return the_rtnd;
	}

	private String getUOM_Name(MI_MasterRoomTypeNameDataDictionaryRS dd, String uom_list, String uom_code) {
		String uom_name = "";
		UnitsOfMeasureList uomlist = null;
		try {
			uomlist = dd.getDataDictionary().getUnitsOfMeasureList();
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

	private String getType_Name(MI_MasterRoomTypeNameDataDictionaryRS dd, String type_list, String type_code) {
		String type_name = "";
		TypeLists typelist = null;
		try {
			typelist = dd.getDataDictionary().getTypeLists();
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

	private String getAlternateText_Name(MI_MasterRoomTypeNameDataDictionaryRS dd, String alternatetext_list, String alternatetext_code) {
		String alternatetext_name = "";
		AlternateTextLists alternatetextLists = null;
		try {
			alternatetextLists = dd.getDataDictionary().getAlternateTextLists();
		} catch (Exception e) {
		}
		if (alternatetextLists != null) {
			AlternateTextList[] alternatetextList = alternatetextLists.getAlternateTextList();
			for (int iAT = 0; iAT < alternatetextList.length; iAT++) {
				if (alternatetextList[iAT].getAlternateText().equals(alternatetext_list)) {
					AlternateText[] alternatetext = alternatetextList[iAT].getAlternateText();
					for (int iU = 0; iU < alternatetext.length; iU++) {
						if (alternatetext[iU].getAlternateTextCode().equals(alternatetext_code)) {
							alternatetext_name = alternatetext[iU].getAlternateTextName();
							break;
						}
					}
				}
			}
		}
		return alternatetext_name;
	}

}