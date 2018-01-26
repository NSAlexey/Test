(function(a,o){$telerik.findCloudUpload=$find;
$telerik.toCloudUpload=function(p){return p;
};
Type.registerNamespace("Telerik.Web.UI");
var c=Telerik.Web.UI;
var b=Sys.Serialization.JavaScriptSerializer;
a.registerEnum(c,"CloudUploadMultipleFileSelection",{Disabled:0,Automatic:1});
a.registerEnum(c,"UploadedFileState",{InProgress:0,Succeeded:1,UploadFailed:2,SizeValidationFailed:3,ExtensionValidationFailed:4});
a.registerEnum(c,"CloudUploadProviderType",{NotSet:-1,Amazon:0,Everlive:1,Azure:2});
var n=".",k="rcuFileInput",h="rcuFileSelect",e="rcuDisabled",j="rcuInfoPanel",d="button",l="input",f="disabled",m="multiple",g="File API",i="IFrame";
c.RadCloudUpload=function(p){c.RadCloudUpload.initializeBase(this,[p]);
this._maxFileSize=0;
this._allowedFileExtensions=[];
this._handlerUrl="";
this._encryptedConfiguration="";
this._panelContainerSelector=null;
this._multipleFileSelection=c.CloudUploadMultipleFileSelection.Disabled;
this._renderingManager=null;
this._providerType=c.CloudUploadProviderType.NotSet;
this._uploadedFiles=[];
this._enabled=true;
this._panelHeight=null;
this._panelMaxHeight=null;
this._showEmptyFileListPanel=false;
this._dropZones="";
this._isPanelInfoDettached=false;
};
c.RadCloudUpload.GetView=function(q){var r=q._renderMode,p=c.RadCloudUpload.Views;
if(r==c.RenderMode.Classic){return new p.Classic(q);
}else{return new p.Lite(q);
}};
c.RadCloudUpload.isFileApiAvailable=function(){return window.File&&window.FileList&&window.FormData;
};
c.RadCloudUpload.prototype={initialize:function(){c.RadCloudUpload.callBaseMethod(this,"initialize");
var p=this;
this.withView(function(){p.get_view().initialize();
});
this._initializeRenderingManager();
this._dettachInfoPanel();
this._initializeUploadModule();
this._onLoad();
},dispose:function(){c.RadCloudUpload.callBaseMethod(this,"dispose");
this._module.dispose();
this._disposeRenderingManager();
this.get_view().dispose();
this._infoPanel=null;
},saveClientState:function(){var p=b.serialize(this._uploadedFiles);
return'{"uploadedFiles":'+p+"}";
},updateClientState:function(){this.set_clientState(this.saveClientState());
},get_view:function(){return this._view;
},withView:function(p){if(!this.get_view()){this._view=c.RadCloudUpload.GetView(this);
}return p();
},get_uploadedFiles:function(){return this._uploadedFiles;
},get_loadedModuleName:function(){if(c.RadCloudUpload.isFileApiAvailable()){return g;
}else{return i;
}},set_enabled:function(p){if(p==this._enabled){return;
}this._enabled=p;
this._toggleFileSelectDisabledState(a(this._element).find(n+h),p);
this._toggleElementDisabledState(a(this._renderingManager._element),p);
},get_enabled:function(){return this._enabled;
},get_dropZones:function(){return this._parseToArray(this._dropZones);
},get_rippleZonesConfiguration:function(){var p=this._panelContainerSelector||this.get_element();
var q=[{element:this.get_element(),rippleConfigurations:[{containerSelector:".rcuFileWrap"}]}];
q[q.length]={element:p,rippleConfigurations:[{containerSelector:".rcuToggleButton",rippleType:c.MaterialRippleType.Icon,maxRippleSize:70},{containerSelector:".rcuRemoveButton, .rcuCancelButton",rippleType:c.MaterialRippleType.Icon,maxRippleSize:60}]};
return q;
},_toggleFileSelectDisabledState:function(p,q){if(q){p.find(l).removeAttr(f);
}else{p.find(l).attr(f,f);
}this._toggleElementDisabledState(p,q);
},_toggleElementDisabledState:function(p,q){if(q){p.removeClass(e);
p.find(d).removeAttr(f);
}else{p.addClass(e);
p.find(d).attr(f,f);
}},_initializeUploadModule:function(){var p=a(this._element).find(n+k);
if(c.RadCloudUpload.isFileApiAvailable()){this._initializeFileApi(p);
}else{this._initializeIFrame();
}this._module.initialize();
this._module.on({FileSelected:this._onFileSelected,FilesSelecting:this._onFilesSelecting,FileUploading:this._onFileUploading,FileUploaded:this._onFileUploaded,FilesUploaded:this._onFilesUploaded,ValidationFailed:this._onValidationFailed,FileUploadFailed:this._onFileUploadFailed,ValidateExtension:this._onValidateExtension},this);
},_initializeFileApi:function(p){if(this._multipleFileSelection==c.CloudUploadMultipleFileSelection.Automatic){p.attr(m,"true");
}this._module=new c.RadCloudUpload.FileApi({input:p[0],renderingManager:this._renderingManager,handlerUrl:this._handlerUrl,encryptedConfiguration:this._encryptedConfiguration,providerType:this._providerType,controlElement:this._element,maxFileSize:this._maxFileSize,localization:this.get_localization(),dropZones:this.get_dropZones(),multipleFileSelection:this._multipleFileSelection,isPanelInfoDettached:this._isPanelInfoDettached,controlId:this.get_id()});
},_initializeIFrame:function(){this._module=new c.RadCloudUpload.IFrame({controlElement:this._element,renderingManager:this._renderingManager,handlerUrl:this._handlerUrl,encryptedConfiguration:this._encryptedConfiguration,controlId:this.get_id()});
},_initializeRenderingManager:function(){var p=this;
this._renderingManager=new c.RadCloudUpload.RenderingManager(p._getInfoPanel(),p.get_localization(),p,p._showEmptyFileListPanel);
this._renderingManager.initialize();
this._renderingManager.on({removeFailedUpload:p._removeFailedUpload,removeSuccceededUpload:p._removeSuccceededUpload},p);
},_disposeRenderingManager:function(){this._renderingManager.dispose();
if(this._panelContainerSelector){a(this._renderingManager._element).parent().remove();
}this._renderingManager.element=null;
this._renderingManager=null;
},_getRenderingManager:function(){return this._renderingManager;
},_dettachInfoPanel:function(){var p=a(this._panelContainerSelector),r,q=this._getInfoPanel();
if(p.length>0){r=document.createElement("div");
r.className=this._element.className;
a(r).append(q);
p.append(r);
if(c.RadCloudUpload.isFileApiAvailable()){this._renderingManager.appendDefaultDropZone(r);
}this._isPanelInfoDettached=true;
}},_getInfoPanel:function(){if(!this._infoPanel){var p=a(this._element).find(n+j);
this.get_view()._initializeInfoPanel(p);
this._infoPanel=p.get(0);
}return this._infoPanel;
},_removeFailedUpload:function(r){var p=r._fileName,q=this._onFileUploadRemoving(r,true,p);
if(!q){this._removeUpload(r,p);
}},_removeSuccceededUpload:function(r){var p=r._fileInfo.originalFileName,q=this._onFileUploadRemoving(r,false,p);
if(!q){this._removeUploadedFile(r._fileInfo);
this.updateClientState();
this._removeUpload(r,p);
}},_removeUpload:function(q,p){this._renderingManager.removeRow(q);
this._onFileUploadRemoved(p);
},_removeUploadedFile:function(p){for(var q=0;
q<this._uploadedFiles.length;
q++){if(p==this._uploadedFiles[q]){this._uploadedFiles.splice(q,1);
break;
}}},_parseToArray:function(p){return a.parseJSON(p);
},_raiseControlEvent:function(q,r,p){a.raiseControlEvent(q,r,p);
},_raiseCancellableControlEvent:function(q,r,p){return a.raiseCancellableControlEvent(q,r,p);
},_onValidateExtension:function(r){var t=r.fileName,q=this._parseToArray(this._allowedFileExtensions);
if(q.length===0){r.isValid=true;
return;
}var v=t.lastIndexOf(".");
if(v==-1){r.isValid=false;
return;
}var s=t.substr(v+1);
for(var u=0;
u<q.length;
u++){var p=this._trimExtensionDot(q[u]);
if(s.toLowerCase()==p.toLowerCase().trim()){r.isValid=true;
break;
}}return;
},_trimExtensionDot:function(p){var q=p.indexOf(".");
if(q>-1){p=p.substr(q+1);
}return p;
},_onLoad:function(){a.raiseControlEvent(this,"load",{});
},_onFileSelected:function(p){a.raiseControlEvent(this,"fileSelected",{fileName:p.fileName,row:p.row});
},_onFilesSelecting:function(q){var p=this._raiseCancellableControlEvent(this,"filesSelecting",{count:q.count});
q.isCanceled=p;
},_onFileUploading:function(q){var p=this._raiseCancellableControlEvent(this,"fileUploading",{fileName:q.fileName,row:q.row});
q.isCanceled=p;
},_onFileUploaded:function(p){this._uploadedFiles.push(p.fileInfo);
this.updateClientState();
this._raiseControlEvent(this,"fileUploaded",{fileInfo:p.fileInfo,row:p.row});
},_onFilesUploaded:function(p){this._raiseControlEvent(this,"filesUploaded",{});
},_onValidationFailed:function(q){var p;
if(q.state==c.UploadedFileState.ExtensionValidationFailed){p=this._localization.ExtensionValidationFailedMessage;
}else{p=this._localization.SizeValidationFailedMessage;
}this._raiseControlEvent(this,"validationFailed",{fileName:q.fileName,message:p});
},_onFileUploadFailed:function(p){this._raiseControlEvent(this,"fileUploadFailed",{message:p.message});
},_onFileUploadRemoving:function(q,r,p){return this._raiseCancellableControlEvent(this,"fileUploadRemoving",{fileName:p,row:q,isFailed:r});
},_onFileUploadRemoved:function(p){this._raiseControlEvent(this,"fileUploadRemoved",{fileName:p});
}};
a.registerControlProperties(c.RadCloudUpload,{localization:null});
a.registerControlEvents(c.RadCloudUpload,["load","filesSelecting","fileSelected","fileUploading","fileUploaded","filesUploaded","fileUploadFailed","validationFailed","fileUploadRemoving","fileUploadRemoved"]);
c.RadCloudUpload.registerClass("Telerik.Web.UI.RadCloudUpload",c.RadWebControl);
})($telerik.$);
(function(a,Y){var b=Telerik.Web.UI,r="rcuHeader",e="rcuBody",s="radHideButtonText",o="rcuFileName",p="rcuFileSize",D="rcuList",C="rcuLI",u="p-icon",z="p-i-upload",y="p-i-loading",A="p-i-check",w="p-i-x",t="p-i-cancel",v="p-i-trash",x="p-i-info",h="rcuButtons",f="rcuButton",n="rcuFakeButton",H="rcuRemoveButton",i="rcuCancelButton",g="rcuButtonText",J="rcuToolTip",G="rcuProgressBar",E="rcuProgress",I="rcuToggleButton",j="p-i-arrow-60-up",m="p-i-arrow-60-down",M="rcuTmplStatus",L="rcuUploadedFiles",K="rcuTotalFiles",F="p-i-loading",l="rcuErrorNotification",q="rcuFileWrap",B="rcuFileInput",k="rcuDisabled",V="span",c="button",X="ul",R="li",d="click",S="mouseenter",T="mouseleave",W="type",P="input",Q="label",O=60,Z=12,U=" ",N=".";
b.RadCloudUpload.RenderingManager=function(aa,ab,ac,ad){this._owner=ac;
this._controlElement=this._owner._element;
this._element=aa;
this._localization=ab;
this._headerElement=null;
this._invalidFilesListWrapper=null;
this._validFilesListWrapper=null;
this._totalFilesCount=0;
this._uploadedFilesCount=0;
this._failedFilesCount=0;
this._showEmptyFileListPanel=ad;
};
b.RadCloudUpload.RenderingManager.prototype={initialize:function(){var aa=a(this._element);
this._validFilesListWrapper=aa.find(".rcuFileList:not(.rcuFailed)").get(0);
this._invalidFilesListWrapper=aa.find(".rcuFailed").get(0);
this._initializeEvents();
a.observable(this);
this._appendToolTipToBody();
if(this._showEmptyFileListPanel){this._updateUploadingLabel();
}if(b.RadCloudUpload.isFileApiAvailable()){this.appendDefaultDropZone(this._controlElement);
}},dispose:function(){this._disposeEvents();
this._disposeDomElements();
this.disposeObservable();
},createRow:function(aa){var ab;
this._fileInfo=aa;
ab=this._renderRow();
this._getValidFilesListElement().appendChild(ab);
this._showInfoPanel();
this._showValidFilesList();
this._totalFilesCount++;
this._fileInfo=null;
this._updateUploadingLabel();
return ab;
},changeRowState:function(ai,aj){var ab=a(aj),aa=ab.children(N+u),ak=b.UploadedFileState,ah=this._localization,ac=ah.Remove,ad=true,ag,af=y,ae=w;
switch(ai){case ak.InProgress:af=z;
ae=y;
ad=false;
ac=ah.Cancel;
break;
case ak.Succeeded:af=y;
ae=A;
this._uploadedFilesCount++;
break;
case ak.UploadFailed:ag=ah.ServerErrorMessage;
this._failedFilesCount++;
this._showInvalidFilesList();
break;
case ak.SizeValidationFailed:if(aa.hasClass(z)){af=z;
}this._failedFilesCount++;
this._showInvalidFilesList();
ag=ah.SizeValidationFailedMessage;
break;
case ak.ExtensionValidationFailed:if(aa.hasClass(z)){af=z;
}this._failedFilesCount++;
this._showInvalidFilesList();
ag=ah.ExtensionValidationFailedMessage;
break;
}aa.removeClass(af);
aa.addClass(ae);
if(ad){this._removeProgressBar(ab);
this._toggleActionButtonState(ab,ac);
}if(ag){aj._message=ag;
this._invalidateFileRow(aj);
}this._updateUploadingLabel();
this._hideValidFilesList();
},updateRowProgress:function(ac,ab,aa){this._checkRowForProgressBar(ac,aa);
this._updateProgressBar(ac,ab);
},removeRow:function(aa){a(aa).remove();
this._hideInfoPanel();
this._hideInvalidFilesList();
this._hideValidFilesList();
this._totalFilesCount--;
this._updateUploadingLabel();
},renderFileInput:function(){var aa=this._renderInput(B,"file"),ab=this._renderLabel();
a(ab).append(aa);
a(this._controlElement).find(N+q).prepend(ab);
},appendDefaultDropZone:function(aa){this._owner.get_view().appendDefaultDropZone(aa);
},_initializeEvents:function(){var aa=this;
a(aa._validFilesListWrapper).on(d,N+f,function(ab){aa._onButtonClick(ab);
});
a(aa._invalidFilesListWrapper).on(d,N+f,function(ab){aa._onButtonClick(ab);
}).on(S,N+n,function(ab){if(aa._getEnabled()){aa._onErrorButtonMouseEnter(ab);
}}).on(T,N+n,function(ab){if(aa._getEnabled()){aa._onErrorButtonMouseLeave(ab);
}});
a(aa._element).on(d,N+I,function(ab){aa._onToggleButtonClick(ab);
});
},_disposeEvents:function(){a(this._validFilesListWrapper).off();
a(this._invalidFilesListWrapper).off();
this.disposeObservable();
},_disposeDomElements:function(){a(this._toolTip).remove();
this._headerElement=null;
this._invalidFilesListWrapper=null;
this._validFilesListWrapper=null;
this._invalidList=null;
this._validList=null;
this._toolTip=null;
},_appendToolTipToBody:function(){a(this._getToolTipElement()).appendTo("body");
},_getEnabled:function(){return !a(this._element).hasClass(k);
},_checkRowForProgressBar:function(ab,aa){if(a(ab).find(N+G).length===0){this._renderProgressBar(ab,aa);
}},_updateProgressBar:function(ab,aa){a(ab).find(N+E).css("width",aa).text(aa);
},_removeProgressBar:function(aa){aa.find(N+G).remove();
},_showInfoPanel:function(){if(!this._showEmptyFileListPanel){this._showElement(this._element);
}},_hideInfoPanel:function(){if(!this._showEmptyFileListPanel){this._hideListElement(this._element);
}},_showInvalidFilesList:function(){this._showElement(this._invalidFilesListWrapper);
},_hideInvalidFilesList:function(){this._hideListElement(this._invalidFilesListWrapper);
},_showValidFilesList:function(){this._showElement(this._validFilesListWrapper);
},_hideValidFilesList:function(){this._hideListElement(this._validFilesListWrapper);
},_showElement:function(aa,ab){this._owner.get_view()._showElement(aa,ab);
},_hideElement:function(aa){this._owner.get_view()._hideElement(aa);
},_hideListElement:function(aa){if(a(aa).find("li").length===0){this._hideElement(aa);
}},_onButtonClick:function(ab){var ad=ab.currentTarget,ac=a(ad).parents(N+C).get(0),aa=this._extractCommandFromClassName(ad,ac);
this.trigger(aa,ac);
},_onErrorButtonMouseEnter:function(ab){var aa=a(ab.currentTarget),ac=aa.offset(),ad=this._getToolTipElement();
ad.style.visibility="hidden";
this._showElement(ad);
ad.innerHTML=aa.find(N+g)[0].innerHTML;
ad.style.left=ac.left-a(ad).outerWidth(true)+O+"px";
ad.style.top=(ac.top-a(ad).outerHeight(true)-Z)+"px";
ad.style.visibility="visible";
},_onErrorButtonMouseLeave:function(aa){this._hideElement(this._getToolTipElement());
},_onToggleButtonClick:function(aa){this._togglePanelBody(aa);
},_extractCommandFromClassName:function(ac,ad){var aa=a(ac),ab="removeFailedUpload";
if(aa.hasClass(i)){ab="cancelUpload";
}else{if(a(ad).children(N+u).hasClass(A)){ab="removeSuccceededUpload";
this._uploadedFilesCount--;
}else{this._failedFilesCount--;
}}return ab;
},_getHeaderElement:function(){if(!this._headerElement){this._headerElement=a(this._element).find(N+r).get(0);
}return this._innerWrapElement;
},_getToolTipElement:function(){if(!this._toolTip){this._toolTip=a(this._element).find(N+J).get(0);
}return this._toolTip;
},_getValidFilesListElement:function(){var aa=this._validFilesListWrapper;
if(!this._validList){this._validList=this._createChildListElement(aa);
}return this._validList;
},_getInvalidFilesListElement:function(){var aa=this._invalidFilesListWrapper;
if(!this._invalidList){this._invalidList=this._createChildListElement(aa);
}return this._invalidList;
},_getProgressIcon:function(){if(!this._progressIcon){this._progressIcon=a(this._getHeaderElement()).find(N+F);
}return this._progressIcon;
},_getFileSizeInKB:function(aa){return Math.round((aa/1024)*100)/100;
},_getCurrentUploadingIndex:function(){var aa=this._uploadedFilesCount+this._failedFilesCount+1;
return aa;
},_toggleProgressIconVisibility:function(ab){var aa=this._getProgressIcon();
aa.css("display",ab?"inline-block":"none");
},_toggleActionButtonState:function(ab,ad){var aa=ab.find(N+f);
var ac=aa.find(N+u);
aa.removeClass(i);
aa.addClass(H);
ac.removeClass(t);
ac.addClass(v);
aa.find(N+g).html(ad);
},_togglePanelBody:function(ad){var ac=a(ad.currentTarget),ab=ac.find(N+j),aa=a(this._element).find(N+e);
if(ab.length>0){ab.removeClass(j);
ab.addClass(m);
if(aa.length>0){this._hideElement(aa[0]);
}}else{ab=ac.find(N+m);
ab.removeClass(m);
ab.addClass(j);
if(aa.length>0){this._showElement(aa[0]);
}}},_invalidateFileRow:function(aa){this._getInvalidFilesListElement().appendChild(aa);
this._createFakeButton(aa);
},_updateUploadingLabel:function(){var aa=a(this._element),ab=aa.find(N+F)[0],ac=aa.find(N+M)[0],ae=aa.find(N+L)[0],ad=aa.find(N+K)[0];
if(this._uploadedFilesCount+this._failedFilesCount!=this._totalFilesCount){if(ac.innerHTML!=this._localization.UploadingFilesMessage){ac.innerHTML=this._localization.UploadingFilesMessage+U;
this._showElement(ab,true);
}ae.innerHTML=this._getCurrentUploadingIndex();
}else{ac.innerHTML=this._localization.UploadedFilesMessage+U;
this._hideElement(ab);
ae.innerHTML=this._uploadedFilesCount;
}ad.innerHTML=this._totalFilesCount;
},_renderRow:function(){var aa=document.createElement(R);
aa.className=C;
this._renderPendingIcon(aa);
this._renderFileName(aa);
this._renderFileSize(aa);
this._renderButtons(aa);
return aa;
},_renderSpan:function(aa,ab){var ac=document.createElement(V);
ac.className=aa;
if(ab){ac.innerHTML=ab;
}return ac;
},_renderInput:function(aa,ac){var ab=document.createElement(P);
ab.className=aa;
ab.setAttribute(W,ac);
return ab;
},_renderLabel:function(){var aa=document.createElement(Q);
return aa;
},_renderButton:function(ab){var aa=document.createElement(c);
aa.className=ab;
aa.setAttribute(W,c);
return aa;
},_renderIcon:function(aa){var ab=this._owner._cssClasses._rcuIcon;
if(aa){ab+=U+aa;
}return this._renderSpan(ab);
},_renderPendingIcon:function(aa){aa.appendChild(this._renderIcon(z));
},_renderFileName:function(aa){var ab=this._fileInfo.name,ac=this._renderSpan(o,ab);
a(ac).attr("title",ab);
aa.appendChild(ac);
},_renderFileSize:function(aa){this._owner.get_view()._renderFileSize(aa);
},_renderButtons:function(ad){var ac=this._renderSpan(h),aa,ab=f+U+i,ae=this._localization;
ad.appendChild(ac);
aa=this._renderButton(ab);
this._renderButtonContent(aa,ae.Cancel,false,t);
ac.appendChild(aa);
},_renderButtonContent:function(ab,aa,ad,ac){if(!ad){ab.appendChild(this._renderIcon(ac));
}ab.appendChild(this._renderSpan(g,aa));
},_renderProgressBar:function(ae,ab){var aa="0%",ad=this._renderSpan(E,aa);
ad.style.width=aa;
var ac=this._renderSpan(G);
ac.appendChild(ad);
if(ab){a(ae).find(N+p).after(ac);
}else{a(ae).find(N+o).after(ac);
}},_createChildListElement:function(aa){var ab=document.createElement(X);
ab.className=D;
aa.appendChild(ab);
return ab;
},_createFakeButton:function(ac){var ae=!a(this._element).hasClass(s),ab=(ae)?l:n,ad=this._renderSpan(ab),aa;
if(!ae){this._renderButtonContent(ad,ac._message,ae,x);
a(ac).find(N+h).prepend(ad);
}else{ad.innerHTML=ac._message;
aa=a(ac).find(N+p);
if(aa.length>0){aa.after(ad);
}else{a(ac).find(N+o).after(ad);
}}}};
})($telerik.$);
(function(c,a,b){a.registerEnum(c,"UploadRequestStatus",{OK:0,SizeValidationFailed:1,ExtensionValidationFailed:2});
var l=5242880,n=2097152,g="rcuConfigurationData",m="rcuPostData",f="rcuFileInput",e="rcuDropZone",h=".",d="change",j="dragover",i="dragenter",k="drop";
c.RadCloudUpload.HandlerUploader=function(o){this._module=o;
this._xhr=null;
this._providerType=o._providerType;
this._uploadingEntity=null;
this._totalChunks=0;
this._chunkNumber=0;
this._position=0;
this._chunkSize=0;
this._formData=null;
this._tempPartEtags=[];
this._partEtags=[];
this._keyName="";
this._uploadId="";
this._uploadedSize=0;
this._uploadedFilesCount=0;
};
c.RadCloudUpload.HandlerUploader.prototype={uploadFile:function(p){this._uploadingEntity=p;
var o={fileName:this._uploadingEntity.file.name,row:this._uploadingEntity.row,isCanceled:false};
this._module.trigger("FileUploading",o);
if(!o.isCanceled){this._calculateChunkSize();
this._calculateTotalChunks();
this._uploadChunk();
var q=c.UploadedFileState.InProgress;
this._module._renderingManager.changeRowState(q,this._uploadingEntity.row);
}else{this._module._renderingManager.removeRow(this._uploadingEntity.row);
this._module._uploadingEntity=null;
this._module._uploadNextFile();
}},_sendPartEtags:function(){this._formData=new FormData();
this._partEtags=this._tempPartEtags;
var o=b.serialize(this._getRequestMetaData());
this._partEtags=[];
this._tempPartEtags=[];
this._formData.append(g,this._module._encryptedConfiguration);
this._formData.append(m,o);
this._xhr.open("POST",this._module._handlerUrl);
this._xhr.setRequestHeader("Cache-Control","no-cache");
this._xhr.send(this._formData);
},_uploadChunk:function(){this._formData=new FormData();
this._chunkNumber++;
this._formData.append(g,this._module._encryptedConfiguration);
var o=this._getCurrentChunk();
if($telerik.isOpera){this._formData.append("file",o,"blob");
}else{this._formData.append("file",o);
}var p=b.serialize(this._getRequestMetaData());
this._formData.append(m,p);
this._xhr.open("POST",this._module._handlerUrl);
this._xhr.setRequestHeader("Cache-Control","no-cache");
this._xhr.send(this._formData);
},_abort:function(){this._xhr.abort();
this._module._uploadingEntity=null;
this._module._uploadNextFile();
},_getRequestMetaData:function(){var o={KeyName:this._keyName,OriginalName:this._uploadingEntity.file.name,UploadId:this._uploadId,IsSingleUpload:(this._totalChunks==1),IsLastChunk:(this._chunkNumber==this._totalChunks),ChunkNumber:this._chunkNumber,PartEtags:this._partEtags};
return o;
},_calculateTotalChunks:function(){if(this._uploadingEntity.file.size===0){this._totalChunks=1;
}else{this._totalChunks=Math.ceil(this._uploadingEntity.file.size/this._chunkSize);
}},_calculateChunkSize:function(){switch(this._providerType){case c.CloudUploadProviderType.Amazon:this._chunkSize=l;
break;
case c.CloudUploadProviderType.Everlive:this._chunkSize=this._uploadingEntity.file.size;
break;
case c.CloudUploadProviderType.Azure:this._chunkSize=n;
break;
}},_getCurrentChunk:function(){var p=this._position;
this._position+=this._chunkSize;
var o;
if(!!(o=this._getChunker())){return this._uploadingEntity.file[o](p,this._position);
}else{return this._uploadingEntity.file;
}},_getChunker:function(){if(this._uploadingEntity.file.slice){return"slice";
}else{if(this._uploadingEntity.file.mozSlice){return"mozSlice";
}else{if(this._uploadingEntity.file.webkitSlice){return"webkitSlice";
}else{return null;
}}}},_initialize:function(){this._resetVariablesState();
this._initializeXmlHttpRequest();
},_resetVariablesState:function(){this._totalChunks=0;
this._chunkNumber=0;
this._position=0;
this._chunkSize=0;
this._uploadedSize=0;
this._keyName="";
this._uploadId="";
this._partEtags=[];
},_initializeXmlHttpRequest:function(){this._xhr=new XMLHttpRequest();
var q=this,o=this._module,r=this._xhr;
r.onreadystatechange=function p(){if(r.readyState==4){if(r.status==200){q._successfulResponseStatus(r);
}else{if(r.status!=0){q._failedResponseStatus(r);
}}}};
r.upload.onprogress=function(s){q._uploadedSize+=s.loaded;
var t=Math.round((q._uploadedSize/q._uploadingEntity.file.size)*100)+"%";
o._renderingManager.updateRowProgress(q._uploadingEntity.row,t,true);
};
},_failedResponseStatus:function(q){var p=this._uploadingEntity.row;
var o=c.UploadedFileState.UploadFailed;
this._module._renderingManager.changeRowState(o,p);
this._module.trigger("FileUploadFailed",{message:"HTTP Error code is: "+q.status});
if(this._module._uploadingEntities.length==0){this._module.trigger("FilesUploaded",{});
}this._module._uploadingEntity=null;
this._module._uploadNextFile();
},_successfulResponseStatus:function(v){var r=b.deserialize(v.responseText),q=this._module,u=q._uploadingEntity,t;
if(r.Status==c.UploadRequestStatus.OK){if(r.PartETag){this._tempPartEtags.push(r.PartETag);
}if(this._chunkNumber!=this._totalChunks){if(this._chunkNumber==1){this._keyName=r.KeyName;
this._uploadId=r.UploadId;
}this._uploadChunk();
}else{var s=(this._providerType==c.CloudUploadProviderType.Amazon&&this._tempPartEtags.length>0);
if(s){this._sendPartEtags();
return;
}t=c.UploadedFileState.Succeeded;
q._renderingManager.changeRowState(t,u.row);
var p=(this._chunkNumber==1)?r.KeyName:this._keyName;
var o={keyName:p,originalFileName:u.file.name,contentType:u.file.type,contentLength:u.file.size};
u.row._fileInfo=o;
q.trigger("FileUploaded",{fileInfo:o,row:u.row});
this._uploadedFilesCount++;
if(!s){q._uploadingEntity=null;
}this._prepareForNextUpload();
}}else{if(r.Status==c.UploadRequestStatus.SizeValidationFailed){t=c.UploadedFileState.SizeValidationFailed;
}else{t=c.UploadedFileState.ExtensionValidationFailed;
}u.row._fileName=u.file.name;
q._renderingManager.changeRowState(t,u.row);
q.trigger("ValidationFailed",{fileName:u.file.name,state:t});
q._uploadingEntity=null;
this._prepareForNextUpload();
}},_prepareForNextUpload:function(){if(this._module._uploadingEntities.length==0&&this._uploadedFilesCount>0){this._uploadedFilesCount=0;
this._module.trigger("FilesUploaded",{});
}this._module._uploadNextFile();
}};
c.RadCloudUpload.FileApi=function(o){this._input=o.input;
this._renderingManager=o.renderingManager;
this._handlerUrl=o.handlerUrl;
this._encryptedConfiguration=o.encryptedConfiguration;
this._uploadingEntities=[];
this._uploadingEntity=null;
this._uploader=null;
this._providerType=o.providerType;
this._maxFileSize=o.maxFileSize;
this._controlElement=o.controlElement;
this._localization=o.localization;
this._dropZones=o.dropZones;
this._multipleFileSelection=o.multipleFileSelection;
this._isPanelInfoDettached=o.isPanelInfoDettached;
this._controlId=o.controlId;
};
c.RadCloudUpload.FileApi.prototype={initialize:function(){var o=this;
o._uploader=new c.RadCloudUpload.HandlerUploader(o);
a.observable(o);
a(o._controlElement).on(d,h+f,function(p){var q=o._input;
o._processSelectedFiles(q.files);
a(q).wrap("<form>").closest("form").get(0).reset();
a(q).unwrap();
});
o._renderingManager.on({cancelUpload:o._onCancelUpload},o);
o._initializeDragAndDrop();
},dispose:function(){a(this._input).off();
this.disposeObservable();
var o=this._controlId;
a(document).off(j+h+o).off(k+h+o);
if($telerik.isIE){a(document).off(i+h+o);
}},_processSelectedFiles:function(w){var p=[],o={count:w.length,isCanceled:false};
this.trigger("FilesSelecting",o);
if(!o.isCanceled){for(var s=0;
s<w.length;
s++){var q=w[s];
var v=this._renderingManager.createRow({name:q.name,size:q.size});
var u=this._validateFile(q,v);
if(u){var r={row:v,file:q};
this.trigger("FileSelected",{fileName:q.name,row:v});
p.push(r);
}}var t=(this._uploadingEntities.length>0||this._uploadingEntity!=null);
this._uploadingEntities=this._uploadingEntities.concat(p);
if(!t){this._uploadNextFile();
}}},_uploadNextFile:function(){if(this._uploadingEntities.length>0){var o=this._uploadingEntities.shift();
this._uploadingEntity=o;
this._uploader._initialize();
this._uploader.uploadFile(o);
}},_onCancelUpload:function(o){for(var p=0;
p<this._uploadingEntities.length;
p++){if(o==this._uploadingEntities[p].row){this._uploadingEntities.splice(p,1);
break;
}}if(this._uploader._uploadingEntity&&o==this._uploader._uploadingEntity.row){this._uploader._abort();
}this._renderingManager.removeRow(o);
},_validateFile:function(p,q){var r=null,o={fileName:p.name,isValid:false};
this.trigger("ValidateExtension",o);
if(!o.isValid){r=c.UploadedFileState.ExtensionValidationFailed;
}if(!this._isSizeValid(p.size)){r=c.UploadedFileState.SizeValidationFailed;
}if(r!=null){q._fileName=p.name;
this._renderingManager.changeRowState(r,q);
this.trigger("ValidationFailed",{fileName:p.name,state:r});
return false;
}return true;
},_isSizeValid:function(p){var o=this._maxFileSize==0?true:p<=this._maxFileSize;
return o;
},_initializeDragAndDrop:function(){this._handleDefaultDropZone(this._controlElement);
if(this._isPanelInfoDettached){this._handleDefaultDropZone(a(this._renderingManager._element).parent()[0]);
}this._handleCustomDropZones(this._dropZones);
},_handleDefaultDropZone:function(q){var o=a(q),p=o.find(h+e),r=this;
o.on({dragover:function(s){r._dropoverHandler(s);
},dragleave:function(s){if(!$telerik.isMouseOverElement(this,s.originalEvent)){if(p.find(".rcuDropZoneInner").length>0){p.addClass("rcuHidden");
}else{p[0].style.display="none";
}}},drop:function(s){r._dropHandler(s);
if(p.find(".rcuDropZoneInner").length>0){p.addClass("rcuHidden");
}else{p[0].style.display="none";
}},dragenter:function(t){if($telerik.isIE){t.preventDefault();
t.stopPropagation();
}var s=t.originalEvent.dataTransfer,u=(s.types!=null&&(s.types.indexOf?s.types.indexOf("Files")!=-1:s.types.contains("application/x-moz-file")));
if(u||$telerik.isSafari5||$telerik.isIE10Mode||$telerik.isOpera){if(p.find(".rcuDropZoneInner").length>0){p.removeClass("rcuHidden");
}else{p[0].style.display="block";
}}}});
},_dropoverHandler:function(o){o.preventDefault();
o.stopPropagation();
},_dropHandler:function(o){o.preventDefault();
o.stopPropagation();
var p=o.originalEvent.dataTransfer.files;
if(p.length>0){var q=(this._multipleFileSelection==c.CloudUploadMultipleFileSelection.Automatic)?p:[p[0]];
this._processSelectedFiles(q);
}},_handleCustomDropZones:function(p){var s=p.length,r=this;
for(var q=0;
q<s;
q++){var o=p[q];
a(document).on(j+h+r._controlId,o,r._dropoverHandler).on(k+h+r._controlId,o,a.proxy(r._dropHandler,r));
if($telerik.isIE){a(document).on(i+h+r._controlId,o,r._dropoverHandler);
}}}};
})(Telerik.Web.UI,$telerik.$,Sys.Serialization.JavaScriptSerializer);
(function(c,a,b){var d="change",e="rcuFileInput",j="rcuPostData",f="rcuConfigurationData",h="file",i="100%",g=".",k=1;
c.RadCloudUpload.IFrame=function(l){this._uploadingEntity=null;
this._uploadingEntities=[];
this._controlElement=l.controlElement;
this._handlerUrl=l.handlerUrl;
this._encryptedConfiguration=l.encryptedConfiguration;
this._renderingManager=l.renderingManager;
this._controlId=l.controlId;
this._uploadingIndex=0;
this._uploadedFilesCount=0;
};
c.RadCloudUpload.IFrame.prototype={initialize:function(){var l=this;
a.observable(this);
a(this._controlElement).on(d,g+e,function(m){l._marshalSelectedFile(m);
});
this._renderingManager.on({cancelUpload:this._onCancelUpload},this);
},dispose:function(){this.disposeObservable();
if(this._uploadingEntity){a(this._uploadingEntity.frame).remove();
a(this._uploadingEntity.inputForm).remove();
this._uploadingEntity=null;
}},_marshalSelectedFile:function(l){var n=l.currentTarget,m=this._getUploadingIdentifier();
a(n).attr("id",m).attr("name",m);
this._uploadingIndex++;
this._renderingManager.renderFileInput();
this._processSelectedFile(n,m);
},_processSelectedFile:function(r,s){var n={count:k,isCanceled:false},q=this._getFileName(r.value),m,l,u,x;
this.trigger("FilesSelecting",n);
if(!n.isCanceled){x=this._renderingManager.createRow({name:q});
u=this._validateFile(q,x,r);
if(u){this.trigger("FileSelected",{fileName:q,row:x});
var o=a("<input type='hidden' name='"+f+"' />").val(this._encryptedConfiguration)[0],v=b.serialize(this._getRequestMetaData(q)),w=a("<input type='hidden' name='"+j+"' />").val(v)[0],p=null,y=this;
m=this._createForm(s,this._handlerUrl);
l=this._createFrame(s);
m.append(a(r).parent()).append(o).append(w);
l.on("load",function(z){y._onFrameLoad(z.target,x,q);
});
p={inputForm:m[0],fileName:q,row:x,frame:l[0]};
var t=(this._uploadingEntities.length>0||this._uploadingEntity!=null);
this._uploadingEntities.push(p);
if(!t){this._uploadNextFile();
}}}},_uploadNextFile:function(){if(this._uploadingEntities.length>0){this._uploadingEntity=this._uploadingEntities.shift();
this._uploadEntity(this._uploadingEntity);
}},_uploadEntity:function(m){var l={fileName:m.fileName,row:m.row,isCanceled:false};
this.trigger("FileUploading",l);
if(!l.isCanceled){var n=c.UploadedFileState.InProgress;
this._renderingManager.changeRowState(n,m.row);
this._renderingManager.updateRowProgress(m.row,i,false);
a(document.body).append(m.inputForm).append(m.frame);
this._formSubmit(m.inputForm);
}else{this._renderingManager.removeRow(m.row);
this._uploadingEntity=null;
this._uploadNextFile();
}},_formSubmit:function(l){l.submit();
},_getFileName:function(n){var m=n.lastIndexOf("\\"),l=n.substring(m+1);
return l;
},_getUploadingIdentifier:function(){return this._controlId+h+this._uploadingIndex;
},_getRequestMetaData:function(l){var m={KeyName:"",OriginalName:l,UploadId:"",IsSingleUpload:true,IsLastChunk:true,ChunkNumber:1,PartEtags:[]};
return m;
},_validateFile:function(m,o,n){var p=null,l={fileName:m,isValid:false};
this.trigger("ValidateExtension",l);
if(!l.isValid){p=c.UploadedFileState.ExtensionValidationFailed;
}if(p!=null){this._renderingManager.changeRowState(p,o);
this.trigger("ValidationFailed",{fileName:m,state:p});
a(n).remove();
return false;
}return true;
},_createForm:function(m,l){return a("<form />",{"class":"ruForm",action:l,method:"POST",encoding:"multipart/form-data",enctype:"multipart/form-data",target:m+"frame",id:m+"form"}).css("display","none");
},_createFrame:function(l){return a(["<iframe name='",l,"frame' id='",l,"frame' style='display: none' />"].join(""));
},_onCancelUpload:function(l){for(var o=0;
o<this._uploadingEntities.length;
o++){if(l==this._uploadingEntities[o].row){this._uploadingEntities.splice(o,1);
break;
}}var m=this._uploadingEntity;
if(m&&l==m.row){var n=m.frame;
if(n.contentWindow.stop){n.contentWindow.stop();
}else{n.contentWindow.document.execCommand("Stop");
}this._marshalForNextUpload(false);
}this._renderingManager.removeRow(l);
},_onFrameLoad:function(n,r,m){var o=null;
try{o=n.contentDocument||n.contentWindow.document;
}catch(l){this._marshalFailedUpload("Error occurs during upload",r);
return;
}if(o){var q="";
try{var p=o.body.innerHTML.trim();
if(p!=""&&p!=undefined){q=a.parseJSON(p);
if(q.Status==c.UploadRequestStatus.OK){this._marshalSucceededUpload(q,r,m);
}else{this._marshalValidationFailed(q,r,m);
}}}catch(l){this._marshalFailedUpload(o.body.innerHTML,r);
}}},_marshalValidationFailed:function(m,n,l){var o;
if(m.Status==c.UploadRequestStatus.SizeValidationFailed){o=c.UploadedFileState.SizeValidationFailed;
}else{o=c.UploadedFileState.ExtensionValidationFailed;
}n._fileName=l;
this._renderingManager.changeRowState(o,n);
this.trigger("ValidationFailed",{fileName:l,state:o});
this._marshalForNextUpload(true);
},_marshalSucceededUpload:function(n,o,m){var p=c.UploadedFileState.Succeeded,l={keyName:n.KeyName,originalFileName:m,contentType:n.ContentType,contentLength:n.ContentLength};
this._renderingManager.changeRowState(p,o);
o._fileInfo=l;
this.trigger("FileUploaded",{fileInfo:l,row:o});
this._uploadedFilesCount++;
this._marshalForNextUpload(true);
},_marshalFailedUpload:function(m,n){var l=c.UploadedFileState.UploadFailed;
this._renderingManager.changeRowState(l,n);
this.trigger("FileUploadFailed",{message:m});
this._marshalForNextUpload(true);
},_marshalForNextUpload:function(l){a(this._uploadingEntity.frame).remove();
a(this._uploadingEntity.inputForm).remove();
this._uploadingEntity=null;
if(l&&this._uploadingEntities.length==0&&this._uploadedFilesCount>0){this._uploadedFilesCount=0;
this.trigger("FilesUploaded",{});
}else{this._uploadNextFile();
}}};
})(Telerik.Web.UI,$telerik.$,Sys.Serialization.JavaScriptSerializer);
