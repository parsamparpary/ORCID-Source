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
package org.orcid.api.common.util;

import java.util.List;

import javax.annotation.Resource;

import org.orcid.core.manager.SourceNameCacheManager;
import org.orcid.jaxb.model.common_rc2.Source;
import org.orcid.jaxb.model.common_rc2.SourceName;
import org.orcid.jaxb.model.record.summary_rc2.ActivitiesSummary;
import org.orcid.jaxb.model.record.summary_rc2.EducationSummary;
import org.orcid.jaxb.model.record.summary_rc2.Educations;
import org.orcid.jaxb.model.record.summary_rc2.EmploymentSummary;
import org.orcid.jaxb.model.record.summary_rc2.Employments;
import org.orcid.jaxb.model.record.summary_rc2.FundingGroup;
import org.orcid.jaxb.model.record.summary_rc2.FundingSummary;
import org.orcid.jaxb.model.record.summary_rc2.Fundings;
import org.orcid.jaxb.model.record.summary_rc2.PeerReviewGroup;
import org.orcid.jaxb.model.record.summary_rc2.PeerReviewSummary;
import org.orcid.jaxb.model.record.summary_rc2.PeerReviews;
import org.orcid.jaxb.model.record.summary_rc2.WorkGroup;
import org.orcid.jaxb.model.record.summary_rc2.WorkSummary;
import org.orcid.jaxb.model.record.summary_rc2.Works;
import org.orcid.jaxb.model.record_rc2.Address;
import org.orcid.jaxb.model.record_rc2.Addresses;
import org.orcid.jaxb.model.record_rc2.Email;
import org.orcid.jaxb.model.record_rc2.Emails;
import org.orcid.jaxb.model.record_rc2.Keyword;
import org.orcid.jaxb.model.record_rc2.Keywords;
import org.orcid.jaxb.model.record_rc2.OtherName;
import org.orcid.jaxb.model.record_rc2.OtherNames;
import org.orcid.jaxb.model.record_rc2.Person;
import org.orcid.jaxb.model.record_rc2.PersonExternalIdentifier;
import org.orcid.jaxb.model.record_rc2.PersonExternalIdentifiers;
import org.orcid.jaxb.model.record_rc2.PersonalDetails;
import org.orcid.jaxb.model.record_rc2.ResearcherUrl;
import org.orcid.jaxb.model.record_rc2.ResearcherUrls;
import org.orcid.jaxb.model.record_rc2.SourceAware;
import org.orcid.pojo.ajaxForm.PojoUtil;

public class SourceUtils {
    @Resource
    private SourceNameCacheManager sourceNameCacheManager;
    
    public void setSourceName(SourceAware sourceAware) {
        if(sourceAware != null) {
            Source source = sourceAware.getSource();
            if(source != null) {
                String sourceId = source.retrieveSourcePath();
                if(!PojoUtil.isEmpty(sourceId)) {
                    String sourceName = sourceNameCacheManager.retrieve(sourceId);
                    if(!PojoUtil.isEmpty(sourceName)) {
                        source.setSourceName(new SourceName(sourceName));
                    }
                }
            }
        }
    }
    
    public void setSourceName(ActivitiesSummary as) {
        if(as == null) {
            return;
        }
        if(as.getEducations() != null){
            Educations educations = as.getEducations();
            List<EducationSummary> list = educations.getSummaries();
            if(list != null) {
                for(EducationSummary summary : list) {
                    setSourceName(summary);
                }
            }
        }
        if(as.getEmployments() != null){
            Employments employments = as.getEmployments();
            List<EmploymentSummary> list = employments.getSummaries();
            if(list != null) {
                for(EmploymentSummary summary : list) {
                    setSourceName(summary);
                }
            }
        }
        if(as.getFundings() != null){
            Fundings fundings = as.getFundings();
            List<FundingGroup> groups = fundings.getFundingGroup();
            if(groups != null) {
                for(FundingGroup group : groups) {
                    List<FundingSummary> summaryList = group.getFundingSummary();
                    if(summaryList != null) {
                        for(FundingSummary summary : summaryList) {
                            setSourceName(summary);
                        }
                    }
                }
            }
        }
        if(as.getPeerReviews() != null){
            PeerReviews peerReviews = as.getPeerReviews();
            List<PeerReviewGroup> groups = peerReviews.getPeerReviewGroup();
            if(groups != null) {
                for(PeerReviewGroup group : groups) {
                    List<PeerReviewSummary> summaryList = group.getPeerReviewSummary();
                    if(summaryList != null) {
                        for(PeerReviewSummary summary : summaryList) {
                            setSourceName(summary);
                        }
                    }
                }
            }
        }
        if(as.getWorks() != null){
            Works works = as.getWorks();
            List<WorkGroup> groups = works.getWorkGroup();
            if(groups != null) {
                for(WorkGroup group : groups) {
                    List<WorkSummary> summaryList = group.getWorkSummary();
                    if(summaryList != null) {
                        for(WorkSummary summary : summaryList) {
                            setSourceName(summary);
                        }
                    }
                }
            }
        }
    }
    
    public void setSourceName(PersonalDetails personalDetails) {
        if(personalDetails == null) {
            return;
        }
        
        if(personalDetails.getOtherNames() != null) {
            OtherNames otherNames = personalDetails.getOtherNames();
            setSourceName(otherNames);
        }
    }
    
    public void setSourceName(Person person) {
        if(person == null) {
            return;
        }
        
        if(person.getAddresses() != null) {
            Addresses addresses = person.getAddresses();
            setSourceName(addresses); 
        }
        
        if(person.getEmails() != null) {
            Emails emails = person.getEmails();
            setSourceName(emails); 
        }
        
        if(person.getExternalIdentifiers() != null) {
            PersonExternalIdentifiers extIds = person.getExternalIdentifiers();
            setSourceName(extIds); 
        }
        
        if(person.getKeywords() != null) {
            Keywords keywords = person.getKeywords();
            setSourceName(keywords);
        }
        
        if(person.getOtherNames() != null) {
            OtherNames otherNames = person.getOtherNames();
            setSourceName(otherNames);
        }
        
        if(person.getResearcherUrls() != null) {
            ResearcherUrls researcherUrls = person.getResearcherUrls();
            setSourceName(researcherUrls);
        }
    }
    
    public void setSourceName(Addresses addresses) {
        List<Address> list = addresses.getAddress();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }    
    }
    
    public void setSourceName(Emails emails) {
        List<Email> list = emails.getEmails();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }
    }
    
    public void setSourceName(PersonExternalIdentifiers extIds) {
        List<PersonExternalIdentifier> list = extIds.getExternalIdentifier();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }
    }
    
    public void setSourceName(Keywords keywords) {
        List<Keyword> list = keywords.getKeywords();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }
    }

    public void setSourceName(OtherNames otherNames) {
        List<OtherName> list = otherNames.getOtherNames();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }
    }
    
    public void setSourceName(ResearcherUrls researcherUrls) {
        List<ResearcherUrl> list = researcherUrls.getResearcherUrls();
        if(list != null) {
            for(SourceAware element : list) {
                setSourceName(element);
            }
        }
    }
}
