/**
 * =============================================================================
 *
 * ORCID (R) Open Source
 * http://orcid.org
 *
 * Copyright (c) 2012-2014 ORCID, Inc.
 * Licensed under an MIT-Style License (MIT)
 * http://orcid.org/open-source-license
 *
 * This copyright and license information (including a link to the full license)
 * shall be included in its entirety in all copies or substantial portion of
 * the software.
 *
 * =============================================================================
 */
package org.orcid.core.adapter.v3.impl.jsonidentifiers;

import org.orcid.jaxb.model.v3.dev1.record.ExternalID;

import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

public class EducationExternalIDConverter extends BidirectionalConverter<ExternalID, String> {

    @Override
    public ExternalID convertFrom(String externalIdentifiersAsString, Type<ExternalID> arg1) {
        return EducationExternalIdentifier.fromDBJSONString(externalIdentifiersAsString).toRecordPojo();
    }

    @Override
    public String convertTo(ExternalID externalID, Type<String> arg1) {
        return new EducationExternalIdentifier(externalID).toDBJSONString();
    }

}
