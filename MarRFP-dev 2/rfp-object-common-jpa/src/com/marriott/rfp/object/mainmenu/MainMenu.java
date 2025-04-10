package com.marriott.rfp.object.mainmenu;

import java.io.Serializable;

public class MainMenu implements Serializable {

    /**
	 * 
	 */
    private static final long serialVersionUID = -1L;
    private long menuid;

    public MainMenu() {
	super();
    }

    public long getMenuid() {
	return menuid;
    }

    public void setMenuid(long menuid) {
	this.menuid = menuid;
    }

}
