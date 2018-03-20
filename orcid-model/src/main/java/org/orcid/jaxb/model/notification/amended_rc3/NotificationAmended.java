//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.4-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2014.11.24 at 04:27:39 PM GMT 
//

package org.orcid.jaxb.model.notification.amended_rc3;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.orcid.jaxb.model.notification.permission_rc3.Items;
import org.orcid.jaxb.model.notification_rc3.Notification;
import org.orcid.jaxb.model.notification_rc3.NotificationType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "putCode", "notificationType", "amendedSection", "createdDate", "sentDate", "readDate", "archivedDate", "source" })
@XmlRootElement(name = "notification", namespace = "http://www.orcid.org/ns/notification")
public class NotificationAmended extends Notification {

    private final static long serialVersionUID = 1L;
    @XmlElement(name = "amended-section", namespace = "http://www.orcid.org/ns/notification", required = true)
    protected AmendedSection amendedSection;
    @XmlElement(namespace = "http://www.orcid.org/ns/notification", required = false)
    protected Items items;
    @XmlTransient
    protected String subject;

    {
        notificationType = NotificationType.AMENDED;
    }

    public AmendedSection getAmendedSection() {
        return amendedSection;
    }

    public void setAmendedSection(AmendedSection amendedSection) {
        this.amendedSection = amendedSection;
    }

    public Items getItems() {
        return items;
    }

    public void setItems(Items value) {
        this.items = value;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

}
