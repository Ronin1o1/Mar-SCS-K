/**
 * RoomType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.object.roomdef;

import java.util.Vector;

public class ProductView implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	Vector<ProductDescriptionsView> productOptions;
	Vector<ProductDescriptionsView> productDefinition;

	public ProductView() {
	}

	public Vector<ProductDescriptionsView> getProductOptions() {
		return productOptions;
	}

	public void setProductOptions(Vector<ProductDescriptionsView> productOptions) {
		this.productOptions = productOptions;
	}

	public Vector<ProductDescriptionsView> getProductDefinition() {
		return productDefinition;
	}

	public void setProductDefinition(Vector<ProductDescriptionsView> productDefinition) {
		this.productDefinition = productDefinition;
	}

}
