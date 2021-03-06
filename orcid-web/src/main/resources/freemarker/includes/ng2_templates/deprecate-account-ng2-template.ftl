<script type="text/ng-template" id="deprecate-account-ng2-template">
    <div class="editTablePadCell35 close-account-container">
        <p>${springMacroRequestContext.getMessage("deprecate_orcid.if_you_have")}</p>
        <p>${springMacroRequestContext.getMessage("deprecate_orcid.information_in")}</p>
        
        <p>${springMacroRequestContext.getMessage("deprecate_orcid.if_you_have_more")}<br />
            <a
                href="<@orcid.msg 'common.kb_uri_default'/>360006896634"
                target="deprecate_orcid.learn_more_link">${springMacroRequestContext.getMessage("deprecate_orcid.learn_more_link")}</a>
        </p>
        <div>
            <label for="emailOrId" class="">${springMacroRequestContext.getMessage("deprecate_orcid.email_or_id")}</label>
            <div class="relative">
                <input id="emailOrId" type="text" name="emailOrId" (keyup.enter)="deprecateORCID()" 
                    [(ngModel)]="deprecateProfilePojo.deprecatingOrcidOrEmail" class="input-xlarge" />
                <span class="required">*</span>
            </div>
        </div>
        <div>
            <label for="password" class="">${springMacroRequestContext.getMessage("deprecate_orcid.password")}</label>
            <div class="relative">
                <input id="password" type="password"
                    name="password"
                    [(ngModel)]="deprecateProfilePojo.deprecatingPassword" (keyup.enter)="deprecateORCID()" 
                    class="input-xlarge" /> <span class="required">*</span>
            </div>
        </div>
       <span class="orcid-error"
            *ngIf="deprecateProfilePojo?.errors?.length > 0">
            <div *ngFor='let error of deprecateProfilePojo.errors'
                [innerHTML]="error"></div>
        </span>
        <button (click)="deprecateORCID()" class="btn btn-primary">${springMacroRequestContext.getMessage("deprecate_orcid.remove_record")}</button>
    </div>
    <#include "/includes/ng2_templates/deprecate-account-modal-ng2-template.ftl"> 
    <#include "/includes/ng2_templates/deprecate-account-success-modal-ng2-template.ftl"> 
</script>