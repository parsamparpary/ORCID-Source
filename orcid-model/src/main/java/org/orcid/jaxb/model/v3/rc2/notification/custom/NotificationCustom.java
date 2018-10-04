//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.4-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2014.07.22 at 06:46:00 PM BST 
//

package org.orcid.jaxb.model.v3.rc2.notification.custom;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.orcid.jaxb.model.v3.rc2.notification.Notification;
import org.orcid.jaxb.model.v3.rc2.notification.NotificationType;

/**
 * <p>
 * Java class for anonymous complex type.
 * 
 * <p>
 * The following schema fragment specifies the expected content contained within
 * this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.orcid.org/ns/common}put-code" minOccurs="0"/>
 *         &lt;element ref="{http://www.orcid.org/ns/notification}notification-type"/>
 *         &lt;element name="subject" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="body-text" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="body-html" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="created-date" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="sent-date" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="read-date" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="archived-date" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element ref="{http://www.orcid.org/ns/common}source" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "putCode", "notificationType", "subject", "bodyText", "bodyHtml", "createdDate", "sentDate", "readDate", "archivedDate", "source" })
@XmlRootElement(name = "notification", namespace = "http://www.orcid.org/ns/notification")
public class NotificationCustom extends Notification implements Serializable {

    private final static long serialVersionUID = 1L;
    @XmlElement(required = true)
    protected String subject;
    @XmlElement(name = "body-text", required = true)
    protected String bodyText;
    @XmlElement(name = "body-html", required = true)
    protected String bodyHtml;
    @XmlAttribute(name = "lang", namespace = "http://www.w3.org/XML/1998/namespace")
    protected String lang;
    @XmlTransient
    protected String overwrittenSourceName;

    {
        notificationType = NotificationType.CUSTOM;
    }

    /**
     * Gets the value of the subject property.
     * 
     * @return possible object is {@link String }
     * 
     */
    public String getSubject() {
        return subject;
    }

    /**
     * Sets the value of the subject property.
     * 
     * @param value
     *            allowed object is {@link String }
     * 
     */
    public void setSubject(String value) {
        this.subject = value;
    }

    /**
     * Gets the value of the bodyText property.
     * 
     * @return possible object is {@link String }
     * 
     */
    public String getBodyText() {
        return bodyText;
    }

    /**
     * Sets the value of the bodyText property.
     * 
     * @param value
     *            allowed object is {@link String }
     * 
     */
    public void setBodyText(String value) {
        this.bodyText = value;
    }

    /**
     * Gets the value of the bodyHtml property.
     * 
     * @return possible object is {@link String }
     * 
     */
    public String getBodyHtml() {
        return bodyHtml;
    }

    /**
     * Sets the value of the bodyHtml property.
     * 
     * @param value
     *            allowed object is {@link String }
     * 
     */
    public void setBodyHtml(String value) {
        this.bodyHtml = value;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    /**
     * Gets the value of the overwrittenSourceName property.
     * 
     * @return possible object is {@link String }
     * 
     */
	public String getOverwrittenSourceName() {
		return overwrittenSourceName;
	}
	
	/**
     * Sets the value of the overwrittenSourceName property.
     * 
     * @param value
     *            allowed object is {@link String }
     * 
     */
	public void setOverwrittenSourceName(String overwrittenSourceName) {
		this.overwrittenSourceName = overwrittenSourceName;
	}       
}
