package com.marriott.rfp.business.sync.api;

public interface SyncService {

	public void Synchronize(String firstLetter, String secondLetter, String ldapserver, String ldapuser);

}
