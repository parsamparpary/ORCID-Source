//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.1.10 in JDK 6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2012.08.09 at 01:52:56 PM BST 
//

package org.orcid.jaxb.model.message;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{http://www.orcid.org/ns/orcid}alternative-emails" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *       &lt;attGroup ref="{http://www.orcid.org/ns/orcid}visibility"/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType( propOrder = { "alternativeEmails" })
@XmlRootElement(name = "alternative-emails")
public class AlternativeEmails implements VisibilityType, Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    @XmlElement(name = "alternative-email", required = true)
    protected List<AlternativeEmail> alternativeEmails;
    @XmlAttribute
    protected Visibility visibility;

    /**
     * Gets the value of the alternativeEmails property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the alternativeEmails property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAlternativeEmails().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link org.orcid.jaxb.model.message.ApplicationSummary }
     *
     *
     */
    public List<AlternativeEmail> getAlternativeEmails() {
        if (alternativeEmails == null) {
            alternativeEmails = new ArrayList<AlternativeEmail>();
        }
        return this.alternativeEmails;
    }

    /**
     * Gets the value of the visibility property.
     *
     * @return
     *     possible object is
     *     {@link org.orcid.jaxb.model.message.Visibility }
     *
     */
    @Override
    public Visibility getVisibility() {
        return visibility;
    }

    /**
     * Sets the value of the visibility property.
     *
     * @param value
     *     allowed object is
     *     {@link org.orcid.jaxb.model.message.Visibility }
     *     
     */
    @Override
    public void setVisibility(Visibility value) {
        this.visibility = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlternativeEmails)) {
            return false;
        }

        AlternativeEmails that = (AlternativeEmails) o;

        if (alternativeEmails != null ? !alternativeEmails.equals(that.alternativeEmails) : that.alternativeEmails != null) {
            return false;
        }
        if (visibility != that.visibility) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = alternativeEmails != null ? alternativeEmails.hashCode() : 0;
        result = 31 * result + (visibility != null ? visibility.hashCode() : 0);
        return result;
    }
}
