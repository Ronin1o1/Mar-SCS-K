package com.marriott.rfp.object.rateproduct;

import java.util.Vector;

public class RateProductListView {
		private String RP_ListCode;
		private String RP_ListName;
		@SuppressWarnings("rawtypes")
		private Vector  rateProductGroupView;

		public  RateProductListView() {
			
		}

		public String getRP_ListCode() {
			return RP_ListCode;
		}

		public void setRP_ListCode(String listCode) {
			RP_ListCode = listCode;
		}

		public String getRP_ListName() {
			return RP_ListName;
		}

		public void setRP_ListName(String listName) {
			RP_ListName = listName;
		}

		@SuppressWarnings("rawtypes")
		public Vector getRateProductGroupView() {
			return rateProductGroupView;
		}

		@SuppressWarnings("rawtypes")
		public void setRateProductGroupView(Vector rateProductGroupView) {
			this.rateProductGroupView = rateProductGroupView;
		}
		
}
