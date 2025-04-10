package com.marriott.rfp.object.pgoos;

import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

public class PGOOSBatchRecord {

	private static final String FILLER = " ";

	private static final String DELIMITER = "|";

	private static final int STAGESEQ_POS = 0;
	private static final int MARSHACMD_POS = 1;
	private static final int BATCHID_POS = 2;
	private static final int EID_POS = 3;
	private static final int HOTELID_POS = 4;
	private static final int ACCOUNTID_POS = 5;
	private static final int ACCOUNTRECID_POS = 6;
	private static final int RPGMS_POS = 7;
	private static final int BYPERIOD_POS = 8;
	private static final int TOTAL_FIELD_POS = 9;

	private Long stageseq;
	private Long batchId;
	private String eid;
	private Long accountId;
	private Long accountRecId;
	private Long hotelId;
	private String rpgms;
	private String byPeriod = "Y";
	private TransactionType transactionType;

	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public Long getAccountRecId() {
		return accountRecId;
	}

	public void setAccountRecId(Long accountRecId) {
		this.accountRecId = accountRecId;
	}

	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public String toDelimitedString() {

		// Create: MARSHACMD|BATCHID|EID|HOTELID|ACCOUNTID|ACCOUNTRECID
		StringBuilder builder = new StringBuilder();
		builder.append(ObjectUtils.defaultIfNull(getStageseq(), FILLER));
		builder.append(DELIMITER).append(getTransactionType().value());
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getBatchId(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getEid(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getHotelId(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getAccountId(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getAccountRecId(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getRpgms(), FILLER));
		builder.append(DELIMITER).append(ObjectUtils.defaultIfNull(getByPeriod(), FILLER));

		return builder.toString();
	}

	public static PGOOSBatchRecord fromDelimitedString(String text) {

		PGOOSBatchRecord record = null;

		// The 'text' is in the following format:
		// MARSHACMD|BATCHID|EID|HOTELID|ACCOUNTID|ACCOUNTRECID
		String chunks[] = StringUtils.split(text, '|');

		if (chunks != null && chunks.length == TOTAL_FIELD_POS) {

			record = new PGOOSBatchRecord();

			record.setStageseq(NumberUtils.toLong(chunks[STAGESEQ_POS]));
			record.setTransactionType(chunks[MARSHACMD_POS]);
			record.setBatchId(NumberUtils.toLong(chunks[BATCHID_POS]));
			record.setEid(chunks[EID_POS]);
			record.setHotelId(NumberUtils.toLong(chunks[HOTELID_POS]));
			record.setAccountId(NumberUtils.toLong(chunks[ACCOUNTID_POS]));
			record.setAccountRecId(NumberUtils.toLong(chunks[ACCOUNTRECID_POS]));
			record.setRpgms(chunks[RPGMS_POS]);
			record.setByPeriod(chunks[BYPERIOD_POS]);
		}

		return record;
	}

	public void setStageseq(Long stageseq) {
		this.stageseq = stageseq;
	}

	public Long getStageseq() {
		return stageseq;
	}

	public void setRpgms(String rpgms) {
		if (rpgms!=null && rpgms.trim().equals(""))
			this.rpgms = null;
		else
			this.rpgms = rpgms;
	}

	public String getRpgms() {
		return rpgms;
	}

	public void setTransactionType(String transtype) {
		if (transtype != null) {
			this.transactionType = TransactionType.fromValue(transtype);
		}
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setByPeriod(String byPeriod) {
		this.byPeriod = byPeriod;
		if (this.byPeriod == null) {
			this.byPeriod = "Y";
		}
	}

	public String getByPeriod() {
		return byPeriod;
	}

}
