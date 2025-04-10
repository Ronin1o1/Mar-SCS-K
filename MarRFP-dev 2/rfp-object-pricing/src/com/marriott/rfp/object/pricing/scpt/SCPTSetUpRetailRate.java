package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class SCPTSetUpRetailRate implements Serializable {
		private static final long serialVersionUID = 1L;
		private long hotelid;
		private long period;
		private long seasonid;
		private Double prev_ret_rate;
		private Double curr_ret_rate;
		public void setHotelid(long hotelid) {
			this.hotelid = hotelid;
		}
		public long getHotelid() {
			return hotelid;
		}
		public long getPeriod() {
			return period;
		}
		public void setPeriod(long period) {
			this.period = period;
		}
		public Double getPrev_ret_rate() {
			return prev_ret_rate;
		}
		public void setPrev_ret_rate(Double prev_ret_rate) {
			this.prev_ret_rate = prev_ret_rate;
		}
		public Double getCurr_ret_rate() {
			return curr_ret_rate;
		}
		public void setCurr_ret_rate(Double curr_ret_rate) {
			this.curr_ret_rate = curr_ret_rate;
		}
		public void setSeasonid(long seasonid) {
			this.seasonid = seasonid;
		}
		public long getSeasonid() {
			return seasonid;
		}

		
}
