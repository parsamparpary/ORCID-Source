/**
 * =============================================================================
 *
 * ORCID (R) Open Source
 * http://orcid.org
 *
 * Copyright (c) 2012-2013 ORCID, Inc.
 * Licensed under an MIT-Style License (MIT)
 * http://orcid.org/open-source-license
 *
 * This copyright and license information (including a link to the full license)
 * shall be included in its entirety in all copies or substantial portion of
 * the software.
 *
 * =============================================================================
 */
package org.orcid.pojo.ajaxForm;

import java.util.ArrayList;
import java.util.List;


public class Contributor implements ErrorsInterface {
    @SuppressWarnings("unused")
    private static final long serialVersionUID = 1L;

    private List<String> errors = new ArrayList<String>();
    
    private Text contributorSequence;
    
    private Text contributorRole;

    public Contributor(org.orcid.jaxb.model.message.Contributor contributor) {
       if (contributor != null) {
           if (contributor.getContributorAttributes() != null) {
               contributor.getContributorAttributes();
               if (contributor.getContributorAttributes().getContributorRole() != null) 
                   this.setContributorRole( new Text(contributor.getContributorAttributes().getContributorRole().value()));
               if (contributor.getContributorAttributes().getContributorRole() != null)
                this.setContributorSequence(new Text(contributor.getContributorAttributes().getContributorSequence().value()));
           }
       }
        
    }
    
    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public Text getContributorSequence() {
        return contributorSequence;
    }

    public void setContributorSequence(Text contributorSequence) {
        this.contributorSequence = contributorSequence;
    }

    public Text getContributorRole() {
        return contributorRole;
    }

    public void setContributorRole(Text contributorRole) {
        this.contributorRole = contributorRole;
    }

    

}
