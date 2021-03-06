<script type="text/ng-template" id="peer-review-ng2-template">
    <div *ngIf="peerReviewService.groups?.length > 0">
        <!-- PEER REVIEW -->
        <div id="workspace-peer-review" class="workspace-accordion-item workspace-accordion-active" [hidden]="publicView == 'true' && peerReviewService.groups.length < 1">
            <div class="workspace-accordion-header clearfix">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <a (click)="workspaceSrvc.togglePeerReview()" class="toggle-text">
                            <i class="glyphicon-chevron-down glyphicon x075" [ngClass]="{'glyphicon-chevron-right':workspaceSrvc.displayPeerReview==false}"></i>
                            <@orcid.msg 'workspace_peer_review_body_list.peerReview'/> (<span>{{peerReviewService.groups.length}}</span>)
                        </a>
                        <#if !(isPublicProfile??)> 
                            <div class="popover-help-container">
                                <i class="glyphicon glyphicon-question-sign"></i>
                                <div id="peer-review-help" class="popover bottom">
                                    <div class="arrow"></div>
                                    <div class="popover-content">
                                        <p><@orcid.msg 'manage_peer_review_settings.helpPopoverPeerReview'/> <a href="<@orcid.msg 'common.kb_uri_default'/>360006971333" target="manage_peer_review_settings.helpPopoverPeerReview"><@orcid.msg 'common.learn_more'/></a></p>
                                    </div>
                                </div>
                            </div>
                        </#if>                     
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12 action-button-bar" *ngIf="workspaceSrvc.displayPeerReview">
                        <#escape x as x?html>                        
                        <!--Sort menu-->
                        <div class="menu-container">                                     
                            <ul class="toggle-menu">
                                <li>
                                    <span class="glyphicon glyphicon-sort"></span>
                                    <@orcid.msg 'manual_orcid_record_contents.sort'/>
                                    <ul class="menu-options sort">
                                        <li [ngClass]="{'checked':sortState.predicateKey=='startDate'}" *ngIf="!(sortHideOption || sortState.type == 'affiliation')">                                          
                                            <a (click)="sort('startDate');" class="action-option manage-button">
                                                <@orcid.msg 'manual_orcid_record_contents.sort_start_date'/>
                                                <span *ngIf="sortState.reverseKey['startDate']" [ngClass]="{'glyphicon glyphicon-sort-by-order-alt':sortState.predicateKey=='startDate'}"></span>
                                                <span *ngIf="sortState.reverseKey['startDate'] == false" [ngClass]="{'glyphicon glyphicon-sort-by-order':sortState.predicateKey=='startDate'}"></span>
                                            </a>                                                                                    
                                        </li>
                                        <li [ngClass]="{'checked':sortState.predicateKey=='endDate'}" *ngIf="!(sortHideOption || sortState.type == 'affiliation')">                                          
                                            <a (click)="sort('endDate');" class="action-option manage-button">
                                                <@orcid.msg 'manual_orcid_record_contents.sort_end_date'/>
                                                <span *ngIf="sortState.reverseKey['endDate']" [ngClass]="{'glyphicon glyphicon-sort-by-order-alt':sortState.predicateKey=='endDate'}"></span>
                                                <span *ngIf="sortState.reverseKey['endDate'] == false" [ngClass]="{'glyphicon glyphicon-sort-by-order':sortState.predicateKey=='endDate'}"></span>
                                            </a>                                                                                    
                                        </li>
                                        <li [ngClass]="{'checked':sortState.predicateKey=='groupName'}" *ngIf="sortHideOption != null">
                                            <a (click)="sort('groupName');" class="action-option manage-button">
                                                <@orcid.msg 'manual_orcid_record_contents.sort_title'/>
                                                <span *ngIf="sortState.reverseKey['groupName']" [ngClass]="{'glyphicon glyphicon-sort-by-alphabet-alt':sortState.predicateKey=='groupName'}" ></span>
                                                <span *ngIf="sortState.reverseKey['groupName'] == false" [ngClass]="{'glyphicon glyphicon-sort-by-alphabet':sortState.predicateKey=='groupName'}" ></span>
                                            </a>                                            
                                        </li>
                                        <li [ngClass]="{'checked':sortState.predicateKey=='title'}" *ngIf="!sortHideOption">                                            
                                            <a (click)="sort('title');" class="action-option manage-button">
                                                <@orcid.msg 'manual_orcid_record_contents.sort_title'/>
                                                <span *ngIf="sortState.reverseKey['title']" [ngClass]="{'glyphicon glyphicon-sort-by-alphabet-alt':sortState.predicateKey=='title'}" ></span>
                                                <span *ngIf="sortState.reverseKey['title'] == false" [ngClass]="{'glyphicon glyphicon-sort-by-alphabet':sortState.predicateKey=='title'}" ></span>
                                            </a>                                            
                                        </li>
                                    </ul>                                           
                                </li>
                            </ul>                                   
                        </div>
                        <!--End sort menu-->
                        </#escape>                                
                    </div>
                </div>
            </div>                        
            <div *ngIf="workspaceSrvc.displayPeerReview" class="workspace-accordion-content">
                <ul class="workspace-peer-review workspace-body-list bottom-margin-medium" id="peer-review-header">
                    <li class="bottom-margin-small workspace-border-box card" *ngFor="let group of peerReviewService.groups">
                        <#include "peer-review-details-ng2.ftl"/> 
                    </li>
                </ul>
                <div *ngIf="peerReviewService.loading == false && peerReviewService.groups.length == 0">
                    <strong><#if (publicProfile)?? && publicProfile == true>${springMacroRequestContext.getMessage("workspace_peer_review_body_list.Nopublicationsaddedyet")}<#else>${springMacroRequestContext.getMessage("workspace_peer_review_body_list.havenotaddedanypeerreviews")} <a *ngIf="noLinkFlag" (click)="showPeerReviewImportWizard()" class="no-wrap">${springMacroRequestContext.getMessage("workspace_peer_review_body_list.addsomenow")}</a></#if></strong>
                </div>
            </div>                                                   
        </div>      
    </div>
</script>