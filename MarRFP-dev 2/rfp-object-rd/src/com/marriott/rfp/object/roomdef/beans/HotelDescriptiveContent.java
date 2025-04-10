/*
 * This class was automatically generated with 
 * <a href="http://www.castor.org">Castor 1.0.4</a>, using an XML
 * Schema.
 * $Id$
 */

package com.marriott.rfp.object.roomdef.beans;

/**
 * Class HotelDescriptiveContent.
 * 
 * @version $Revision$ $Date$
 */
public class HotelDescriptiveContent implements java.io.Serializable {


      //--------------------------/
     //- Class/Member Variables -/
    //--------------------------/

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * Field _hotelCode
     */
    private java.lang.String hotelCode;

    /**
     * Field _hotelName
     */
    private java.lang.String hotelName;

    /**
     * Field _MI_HotelRoomProductOptionsRS
     */
    private MI_HotelRoomProductOptionsRS MI_HotelRoomProductOptionsRS;

    /**
     * Field _MI_HotelRoomProductInfoRS
     */
    private MI_HotelRoomProductInfoRS MI_HotelRoomProductInfoRS;


      //----------------/
     //- Constructors -/
    //----------------/

    public HotelDescriptiveContent() 
     {
        super();
    } //-- com.marriott.ir.marrfp.dao.roomdef.beans.HotelDescriptiveContent()


      //-----------/
     //- Methods -/
    //-----------/

    /**
     * Returns the value of field 'hotelCode'.
     * 
     * @return the value of field 'HotelCode'.
     */
    public java.lang.String getHotelCode()
    {
        return this.hotelCode;
    } //-- java.lang.String getHotelCode() 

    /**
     * Returns the value of field 'hotelName'.
     * 
     * @return the value of field 'HotelName'.
     */
    public java.lang.String getHotelName()
    {
        return this.hotelName;
    } //-- java.lang.String getHotelName() 

    /**
     * Returns the value of field 'MI_HotelRoomProductInfoRS'.
     * 
     * @return the value of field 'MI_HotelRoomProductInfoRS'.
     */
    public MI_HotelRoomProductInfoRS getMI_HotelRoomProductInfoRS()
    {
        return this.MI_HotelRoomProductInfoRS;
    } //-- com.marriott.ir.marrfp.dao.roomdef.beans.MI_HotelRoomProductInfoRS getMI_HotelRoomProductInfoRS() 

    /**
     * Returns the value of field 'MI_HotelRoomProductOptionsRS'.
     * 
     * @return the value of field 'MI_HotelRoomProductOptionsRS'.
     */
    public MI_HotelRoomProductOptionsRS getMI_HotelRoomProductOptionsRS()
    {
        return this.MI_HotelRoomProductOptionsRS;
    } //-- com.marriott.ir.marrfp.dao.roomdef.beans.MI_HotelRoomProductOptionsRS getMI_HotelRoomProductOptionsRS() 

  
    /**
     * Sets the value of field 'hotelCode'.
     * 
     * @param hotelCode the value of field 'hotelCode'.
     */
    public void setHotelCode(java.lang.String hotelCode)
    {
        this.hotelCode = hotelCode;
    } //-- void setHotelCode(java.lang.String) 

    /**
     * Sets the value of field 'hotelName'.
     * 
     * @param hotelName the value of field 'hotelName'.
     */
    public void setHotelName(java.lang.String hotelName)
    {
        this.hotelName = hotelName;
    } //-- void setHotelName(java.lang.String) 

    /**
     * Sets the value of field 'MI_HotelRoomProductInfoRS'.
     * 
     * @param MI_HotelRoomProductInfoRS the value of field
     * 'MI_HotelRoomProductInfoRS'.
     */
    public void setMI_HotelRoomProductInfoRS(MI_HotelRoomProductInfoRS MI_HotelRoomProductInfoRS)
    {
        this.MI_HotelRoomProductInfoRS = MI_HotelRoomProductInfoRS;
    } 

    /**
     * Sets the value of field 'MI_HotelRoomProductOptionsRS'.
     * 
     * @param MI_HotelRoomProductOptionsRS the value of field
     * 'MI_HotelRoomProductOptionsRS'.
     */
    public void setMI_HotelRoomProductOptionsRS(MI_HotelRoomProductOptionsRS MI_HotelRoomProductOptionsRS)
    {
        this.MI_HotelRoomProductOptionsRS = MI_HotelRoomProductOptionsRS;
    } //-- void setMI_HotelRoomProductOptionsRS(com.marriott.ir.marrfp.dao.roomdef.beans.MI_HotelRoomProductOptionsRS) 

}

   
