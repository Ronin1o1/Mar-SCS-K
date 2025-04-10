package com.marriott.rfp.dataaccess.state.api;

import java.util.List;



import com.marriott.rfp.object.state.State;


public interface StateManager {
	public List<State> getStates(String country);
}
