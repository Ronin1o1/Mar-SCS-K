package com.marriott.rfp.webapp.common.misc;

import java.util.Collection;

public class JsonResponse {

	private String identifier;
	private String label;
	
	private Collection<?> items;

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public Collection<?> getItems() {
		return items;
	}

	public void setItems(Collection<?> items) {
		this.items = items;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
