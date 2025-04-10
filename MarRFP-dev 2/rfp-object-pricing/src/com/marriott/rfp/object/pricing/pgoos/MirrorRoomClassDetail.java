package com.marriott.rfp.object.pricing.pgoos;

import java.util.List;

public class MirrorRoomClassDetail {
	private Long roomClassSeq;
	
	
	private List<MirrorRoomPoolDetail> mirrorRoomPoolList;
	
	public List<MirrorRoomPoolDetail> getMirrorRoomPoolList() {
		return mirrorRoomPoolList;
	}
	public void setMirrorRoomPoolList(List<MirrorRoomPoolDetail> mirrorRoomPoolList) {
		this.mirrorRoomPoolList = mirrorRoomPoolList;
	}
	
	public Long getRoomClassSeq() {
		return roomClassSeq;
	}
	public void setRoomClassSeq(Long roomClassSeq) {
		this.roomClassSeq = roomClassSeq;
	}


}
