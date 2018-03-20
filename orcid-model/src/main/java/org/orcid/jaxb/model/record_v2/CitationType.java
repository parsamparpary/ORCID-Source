//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.4 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2012.10.04 at 01:24:28 PM BST 
//

package org.orcid.jaxb.model.record_v2;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Java class for citation-type.
 * 
 * 
 */
@XmlType(name = "citationType", namespace = "http://www.orcid.org/ns/work")
@XmlEnum
public enum CitationType {

    @XmlEnumValue("formatted-unspecified")
    FORMATTED_UNSPECIFIED("formatted-unspecified"), @XmlEnumValue("bibtex")
    BIBTEX("bibtex"), @XmlEnumValue("formatted-apa")
    FORMATTED_APA("formatted-apa"), @XmlEnumValue("formatted-harvard")
    FORMATTED_HARVARD("formatted-harvard"), @XmlEnumValue("formatted-ieee")
    FORMATTED_IEEE("formatted-ieee"), @XmlEnumValue("formatted-mla")
    FORMATTED_MLA("formatted-mla"), @XmlEnumValue("formatted-vancouver")
    FORMATTED_VANCOUVER("formatted-vancouver"), @XmlEnumValue("formatted-chicago")
    FORMATTED_CHICAGO("formatted-chicago"),
    @XmlEnumValue("ris") RIS("ris");
    
    private final String value;

    CitationType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static CitationType fromValue(String v) {
        for (CitationType c : CitationType.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
