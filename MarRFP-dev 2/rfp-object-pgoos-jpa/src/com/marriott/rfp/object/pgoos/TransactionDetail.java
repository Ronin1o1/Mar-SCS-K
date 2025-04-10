package com.marriott.rfp.object.pgoos;

import java.text.MessageFormat;
import java.util.List;

import org.apache.commons.lang.ObjectUtils;

import com.marriott.rfp.utility.DateUtility;

public class TransactionDetail {

	private static final String SEASON_DATE_FORMAT = "yyyy-MM-dd";
	private static final String EMPTY_SPACER = "";
	
	
	private String cmdText;
	private String priceCmdText;
	


	public String getCmdText(HotelAccountInfo ha, RoomPool rai, String byPeriod) {
		StringBuilder builder = new StringBuilder();
		
	
		if (ha != null){
			
			if (rai != null){
				
				switch (rai.getCmdType()){
				case VRPE:
					String VRPE_PATTERN = "VRPE/Marsha-{0}/CURR-{1}/EID-{2}/CONTRACT-{3}*{4}/"
										+"RATEOFFER-{5}/RPGM-{6}/RMPL-{7}/PROD-{8}/ACCTNAME-{9}/"
										+"LRA-{10}/MKTC-{11}/COMM-{12}/DISTUNIT-{13}/DISTOFC-{14}/";
					builder.append(MessageFormat.format(VRPE_PATTERN, 
							ObjectUtils.toString(ha.getMarshacode()), 
							ObjectUtils.toString(ha.getCurrencyCode()),
							ObjectUtils.toString(ha.getEid()),
							DateUtility.formatDate(SEASON_DATE_FORMAT,  ha.getStartdate()),
							DateUtility.formatDate(SEASON_DATE_FORMAT, ha.getContractend()),
							ObjectUtils.toString(rai.getRateofferid()),
							ObjectUtils.toString(rai.getRateprog()),
							ObjectUtils.toString(rai.getRoompool()),
							ObjectUtils.toString(ha.getAccProductid()),
							ObjectUtils.toString(ha.getAccountName()),
							ObjectUtils.toString(rai.getLra()),
							ObjectUtils.toString(ha.getMarketCode()),
							ObjectUtils.toString(ha.getCom()),
							ObjectUtils.toString(ha.getDistanceunit()),
							ObjectUtils.toString(ha.getDistance())
							));
					break;
				case VRPX:
					
					String VRPX_PATTERN = "VRPX/MARSHA-{0}/EID-{1}/RATEOFFER-{2}/RPGM-{3}/RATEENTITY-{4}/";
					builder.append(MessageFormat.format(VRPX_PATTERN, 
							ObjectUtils.toString(ha.getMarshacode()), 
							ObjectUtils.toString(ha.getEid()),
							ObjectUtils.toString(rai.getRateofferid()),
							ObjectUtils.toString(rai.getRateprog()),
							ObjectUtils.toString(null)
							));
					
					// Add period if VRPX is by Period
				
					if (ha != null) {
						if (byPeriod !=null && byPeriod.equals("Y") && (ha.getStartdate() != null) && ( ha.getContractend() != null)) {
							String VRPX_PERIOD_PATTERN = "PERIOD-{0}*{1}/";
							builder.append(MessageFormat.format(VRPX_PERIOD_PATTERN, 
									DateUtility.formatDate(SEASON_DATE_FORMAT,  ha.getStartdate()),
									DateUtility.formatDate(SEASON_DATE_FORMAT,  ha.getContractend())));
						}
					}
					break;
				case VRPK:
					String VRPK_PATTERN = "VRPK/MARSHA-{0}/EID-{1}/RATEOFFER-{2}/RPGM-{3}/RATEENTITY-{4}/";
					builder.append(MessageFormat.format(VRPK_PATTERN, 
							ObjectUtils.toString(ha.getMarshacode()), 
							ObjectUtils.toString(ha.getEid()),
							ObjectUtils.toString(rai.getRateofferid()),
							ObjectUtils.toString(rai.getRateprog()),
							ObjectUtils.toString(null)
							));

					break;
				}
			}
		}
		
		cmdText = builder.toString();
		return cmdText;
	}

	


	public String getPriceCmdText(HotelAccountInfo ha,RoomPool rai) {
		if (priceCmdText == null) {
			priceCmdText = generatePriceCommandText( ha, rai);
			if (priceCmdText!=null && priceCmdText.length()>4000)
				priceCmdText= priceCmdText.substring(0, 3999);
		}
		return priceCmdText;
	}


	public String getRestrictionCmdText(RoomPool rai, MarshaCommandType cmd) {
		String msg=generateRestrictionCmdText( rai,  cmd);
		if (msg!=null && msg.length()>4000)
			return msg.substring(0, 3999);
		else
			return msg;
	}

	public String generateRestrictionCmdText(RoomPool rai, MarshaCommandType cmd) {
		
		final String AVAILABILITY_PATTERN = "AVAIL-{0}*{1}/MIRRATEOFFER-{2}/PRIORITYTAG-{3}/PRICINGTYPE-{4}/RATEENTITY-{5}/";
		final String RESTRICTIONS_PATTERN = "CAPSANDREST/MIRRATEOFFER-{0}/PRIORITYTAG-{1}/PRICINGTYPE-{2}/RATEENTITY-{3}/";
		
		StringBuilder builder = new StringBuilder();
		
		if (rai != null  && cmd.equals(MarshaCommandType.VRPE)) {
			
			if (rai.getAvail_mirrorrateofferid() != null){
				
				List<PricingRule> pricingRules = rai.getPricingRules();
				if (pricingRules != null) {
					for (PricingRule pricingRule: pricingRules){
					    	if ((pricingRule.getTierNumber()==null || pricingRule.getTierNumber()==1) && (pricingRule.getOccupancy()==null || pricingRule.getOccupancy().equals(OccupancyType.SINGLE))) {
					    	    	builder.append(MessageFormat.format(AVAILABILITY_PATTERN, 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getStartDate()), 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getEndDate()),
								ObjectUtils.toString(rai.getAvail_mirrorrateofferid()),
								ObjectUtils.toString(rai.getAvail_priority_tag()),
								ObjectUtils.toString(rai.getAvail_pricing_type()),
								ObjectUtils.toString(rai.getAvail_rateentityid())
								));
					    	}
					}
				}
				builder.append(MessageFormat.format(RESTRICTIONS_PATTERN, 
						ObjectUtils.toString(rai.getAvail_mirrorrateofferid()),
						ObjectUtils.toString(rai.getAvail_priority_tag()),
						ObjectUtils.toString(rai.getAvail_pricing_type()),
						ObjectUtils.toString(rai.getAvail_rateentityid())
						));
				
			}
		}
		return builder.toString();
	}

	private String generatePriceCommandText(HotelAccountInfo ha,RoomPool rai) {
		
		final String PRICE_FOR_NON_EXTND_PATTERN = "SEASON-{0}*{1}/OCC-{2}/PRICE/RULE-{3}/AMT-{4}/" 
		  										   + "CEIL/ADJRULE-{5}/AMT-{6}/MIRRATEOFFER-{7}/PRIORITYTAG-{8}/PRICINGTYPE-{9}/RATEENTITY-{10}/";
		
		final String PRICE_FOR_EXTND_PATTERN =   "SEASON-{0}*{1}/TIER-{2}/PRICE/RULE-{3}/AMT-{4}/" 
											   + "CEIL/ADJRULE-{5}/AMT-{6}/MIRRATEOFFER-{7}/PRIORITYTAG-{8}/PRICINGTYPE-{9}/RATEENTITY-{10}/";
											  

		StringBuilder builder = new StringBuilder();
		if (rai != null) {
			
			List<PricingRule> pricingRules = rai.getPricingRules();
			if (pricingRules != null){
				
				for (PricingRule pricingRule : pricingRules) {
					
					if (pricingRule.getOccupancy() != null) {
						builder.append(MessageFormat.format(PRICE_FOR_NON_EXTND_PATTERN, 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getStartDate()), 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getEndDate()),
								((pricingRule.getOccupancy() != null) ? pricingRule.getOccupancy().value() : EMPTY_SPACER),
								((rai.getPricingrule() != null) ? rai.getPricingrule() : EMPTY_SPACER),
								ObjectUtils.toString(pricingRule.getPricingAmount()),
								((rai.getCeilingrule() != null) ? rai.getCeilingrule()  : EMPTY_SPACER),
								ObjectUtils.toString(pricingRule.getCeilingAmount()),
								ObjectUtils.toString(rai.getPrice_mirrorrateofferid()),
								ObjectUtils.toString(rai.getPrice_priority_tag()),
								ObjectUtils.toString(rai.getPrice_pricing_type()),
								ObjectUtils.toString(rai.getPrice_rateentityid())
								));
						
					} else {
						builder.append(MessageFormat.format(PRICE_FOR_EXTND_PATTERN, 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getStartDate()), 
								DateUtility.formatDate(SEASON_DATE_FORMAT, pricingRule.getEndDate()),
								ObjectUtils.toString(pricingRule.getTierNumber()),
								((rai.getPricingrule() != null) ? rai.getPricingrule() : EMPTY_SPACER),
								ObjectUtils.toString(pricingRule.getPricingAmount()),
								((rai.getCeilingrule() != null) ? rai.getCeilingrule()  : EMPTY_SPACER),
								ObjectUtils.toString(pricingRule.getCeilingAmount()),
								ObjectUtils.toString(rai.getPrice_mirrorrateofferid()),
								ObjectUtils.toString(rai.getPrice_priority_tag()),
								ObjectUtils.toString(rai.getPrice_pricing_type()),
								ObjectUtils.toString(rai.getPrice_rateentityid())
								));
					} 
				}
			}
		}
		
		return builder.toString();
	}

	public String getAllBlackOutDatesDelimited(List <Season> seasons) {

		final String BLACKOUT_PATTERN = "START-{0}*END-{1}/";
		
		StringBuilder builder = new StringBuilder();
			
			if (seasons != null) {
				for (Season season : seasons) {
					builder.append(MessageFormat.format(BLACKOUT_PATTERN, 
							DateUtility.formatDate(SEASON_DATE_FORMAT, season.getStartDate()), 
							DateUtility.formatDate(SEASON_DATE_FORMAT, season.getEndDate())));
				}
			}

		return builder.toString();
	}


}
