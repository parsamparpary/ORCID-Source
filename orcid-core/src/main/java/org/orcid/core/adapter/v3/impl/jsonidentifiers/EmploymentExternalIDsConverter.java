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

import org.orcid.core.exception.ActivityIdentifierValidationException;
import org.orcid.jaxb.model.v3.dev1.record.ExternalIDs;

import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

public class EmploymentExternalIDsConverter extends BidirectionalConverter<ExternalIDs, String> {

    @Override
    public ExternalIDs convertFrom(String externalIdentifiersAsString, Type<ExternalIDs> type) {
        EmploymentExternalIdentifiers jpaExtIds = EmploymentExternalIdentifiers.fromDBJSONString(externalIdentifiersAsString);
        ExternalIDs result = new ExternalIDs();
        for (EmploymentExternalIdentifier jpaExtId : jpaExtIds.getEmploymentExternalIdentifier()) {
            result.getExternalIdentifier().add(jpaExtId.toRecordPojo());
        }
        return result;
    }

    @Override
    public String convertTo(ExternalIDs employmentExternalIdentifiers, Type<String> arg1) {
        try {
            EmploymentExternalIdentifiers jpaExternalIdentifiers = new EmploymentExternalIdentifiers(employmentExternalIdentifiers);
            return jpaExternalIdentifiers.toDBJSONString();
        } catch (IllegalArgumentException e) {
            throw new ActivityIdentifierValidationException(e);
        }
    }

}