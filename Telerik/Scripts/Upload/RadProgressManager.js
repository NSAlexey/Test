Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.ProgressManager");
function getRadProgressManager(){return Telerik.Web.UI.ProgressManager.Manager;
}function RadUploadSafariPoller(a,c,d,b){this._callbackUrl=a;
this._refreshPeriod=c;
this._waitingForResponse=false;
this._timeFormat=d;
this._allowCustomProgress=false;
}function RadUploadSafariProgressArea(a){this._id=a;
if(typeof(window.progressAreas)=="undefined"){window.progressAreas=[];
}window.progressAreas[window.progressAreas.length]=this;
}Telerik.Web.UI.RadProgressManager=function(a){Telerik.Web.UI.RadProgressManager.initializeBase(this,[a]);
this._uniqueRequestIdentifier="RadUrid";
this._formId="";
this._form=null;
this._pageGUID="";
this._suppressMissingHttpModuleError=false;
this._refreshPeriod=500;
this._shouldRegisterForSubmit=true;
this._ajaxCallUrl="";
$telerik.RadUpload_isIFrameProgress=($telerik.isSafari||$telerik.isOpera)&&!$telerik.isChrome;
this._disposed=false;
this._timeOutPointer=null;
this._isInAsyncUpload=false;
this._allowCustomProgress=null;
this._timeFormat="%HOURS%:%MINUTES%:%SECONDS%s";
this._failureCounter=1;
};
Telerik.Web.UI.RadProgressManager.prototype={initialize:function(){Telerik.Web.UI.RadProgressManager.callBaseMethod(this,"initialize");
this._registerAsPageManager();
this._initializeForm();
this._callbackUrl=this._createCallbackUrl(this._ajaxCallUrl);
this._waitingForResponse=false;
if(typeof(Telerik.Web.UI.ProgressAreas)=="undefined"){Telerik.Web.UI.ProgressAreas=[];
}if($telerik.RadUpload_isIFrameProgress){this._safariPollerDelegate=Function.createDelegate(this,this._createSafariPoller);
Sys.Application.add_load(this._safariPollerDelegate);
}},dispose:function(){this._disposed=true;
if(Sys&&Sys.WebForms&&Sys.WebForms.PageRequestManager){var a=Sys.WebForms.PageRequestManager.getInstance();
if(a){a.remove_beginRequest(this._clientSubmitDelegate);
}}if(this._form&&this._shouldRegisterForSubmit==true){$telerik.removeHandler(this._form,"submit",this._clientSubmitDelegate);
this._clientSubmitDelegate=null;
}if($telerik.RadUpload_isIFrameProgress&&this._safariPollerDelegate){Sys.Application.remove_load(this._safariPollerDelegate);
this._safariPollerDelegate=null;
}this._stopAsyncPolling();
this._failureCounter=1;
Telerik.Web.UI.RadProgressManager.callBaseMethod(this,"dispose");
$telerik.$(this._safariPoller).remove();
},_getSafariPollerDefinition:function(){RadUploadSafariPoller.prototype={_createReadyStateChangeDelegate:this._createReadyStateChangeDelegate,_sendXmlHttpRequest:this._sendXmlHttpRequest,_makeCallback:this._makeCallback,_getTimeStampedCallbackUrl:this._getTimeStampedCallbackUrl,_handleCallback:this._handleCallback,_errorOccured:this._errorOccured,_showNotFoundMessage:this._showNotFoundMessage,_showGenericErrorMessage:this._showGenericErrorMessage,_showInvalidContentMessage:this._showInvalidContentMessage,get_refreshPeriod:this.get_refreshPeriod,_modifyProgressData:this._modifyProgressData,getFormattedTime:this.getFormattedTime,_normalizeTime:this._normalizeTime,_toSeconds:this._toSeconds,_updateProgressAreas:this._updateProgressAreas,_formatTimePart:this._formatTimePart};
return RadUploadSafariPoller;
},_getSafariProgressAreaDefinition:function(){RadUploadSafariProgressArea.prototype={get_id:function(){return this._id;
},show:Telerik.Web.UI.RadProgressArea.prototype.show,update:Telerik.Web.UI.RadProgressArea.prototype.update,updateHorizontalProgressBar:Telerik.Web.UI.RadProgressArea.prototype.updateHorizontalProgressBar,updateTextIndicator:Telerik.Web.UI.RadProgressArea.prototype.updateTextIndicator};
return RadUploadSafariProgressArea;
},_addClassAsString:function(b,a,f){f[f.length]=b.toString();
f[f.length]=";";
f[f.length]=a;
f[f.length]=".prototype = {";
var c=true;
for(var e in b.prototype){var d=b.prototype[e];
if(typeof(d)!="function"){continue;
}if(!c){f[f.length]=",";
}c=false;
f[f.length]=e;
f[f.length]=":";
f[f.length]=d.toString();
}f[f.length]="};";
},_createSafariPoller:function(){this._createSafariIFrame();
},_addSafariProgressAreas:function(a){for(var b=0;
b<Telerik.Web.UI.ProgressAreas.length;
b++){Telerik.Web.UI.ProgressAreas[b]._addSafariDefinition(a);
}},_setupSafariProgressAreas:function(){for(var a=0;
a<Telerik.Web.UI.ProgressAreas.length;
a++){Telerik.Web.UI.ProgressAreas[a]._setupSafariProgressAreaControls();
}},_createSafariIFrame:function(){this._safariPoller=document.createElement("iframe");
this._safariPoller.id=this._safariPoller.name=this.get_id()+"_safariPoller";
this._safariPoller.src="about:blank";
this._safariPoller.style.display="none";
document.forms[0].appendChild(this._safariPoller);
var a=this._safariPoller.contentWindow.document;
a.open();
var b=[];
b[b.length]="<script type='text/javascript'>";
this._addClassAsString(this._getSafariPollerDefinition(),"RadUploadSafariPoller",b);
b[b.length]="var pollerInstance = new RadUploadSafariPoller('"+this._callbackUrl+"', "+this.get_refreshPeriod()+", '"+this.get_timeFormat()+"');";
b[b.length]="$telerik = {};";
b[b.length]="$telerik.RadUpload_isIFrameProgress = ";
b[b.length]=$telerik.RadUpload_isIFrameProgress.toString();
b[b.length]=";";
if(Telerik.Web.UI.ProgressAreas.length>0){this._addClassAsString(this._getSafariProgressAreaDefinition(),"RadUploadSafariProgressArea",b);
this._addSafariProgressAreas(b);
}b[b.length]="</script>";
a.write("<html><head>"+b.join("")+"</head><body></body></html>");
a.close();
this._setupSafariProgressAreas();
},_getParentForm:function(){var a=this.get_element();
while(a&&a.tagName&&a.tagName.toLowerCase()!="form"){a=a.parentNode;
}if(a&&(!a.tagName||a.tagName.toLowerCase()!="form")){a=null;
}return a;
},_registerAsPageManager:function(){Telerik.Web.UI.ProgressManager.Manager=this;
},_initializeForm:function(){var a=null;
this._form=this._getParentForm();
if(!this._form){alert("RadProgressManager requires to be in a form tag to operate properly!");
return;
}this._updateFormAction(this._form);
if(this._shouldRegisterForSubmit==true){this._registerForSubmit(this._form);
}},_updateFormAction:function(a){if(typeof(a.action)=="undefined"){a.action="";
}if(a.action.match(/\?/)){a.action=this._removeQueryStringParameter(a.action,this._uniqueRequestIdentifier);
if(a.action.substring(a.action.length-1)!="?"){a.action+="&";
}}else{a.action+="?";
}a.action+=this._uniqueRequestIdentifier+"="+this._pageGUID;
a.enctype=a.encoding="multipart/form-data";
a._initialAction=a.action;
},_removeQueryStringParameter:function(c,a){var b=new RegExp("&?"+a+"=[^&]*");
if(c.match(b)){return c.replace(b,"");
}return c;
},_registerForSubmit:function(a){this._registerForLinkButtons(a);
this._registerForRegularButtons(a);
},startAsyncPolling:function(){this._startAsyncPolling();
},_startAsyncPolling:function(){this._isInAsyncUpload=true;
this.startProgressPolling();
},stopAsyncPolling:function(){this._stopAsyncPolling();
},_stopAsyncPolling:function(){if($telerik.RadUpload_isIFrameProgress){this._safariPoller.contentWindow.clearTimeout(this._safariPoller.contentWindow.pollerInstance._timeOutPointer);
}else{clearTimeout(this._timeOutPointer);
}this._isInAsyncUpload=false;
this.hideProgressAreas();
},_registerForLinkButtons:function(b){var d=b.submit;
try{var e=this;
b.submit=function(){if(e._clientSubmitHandler()==false){return;
}b.submit=d;
b.submit();
};
}catch(a){try{var c=__doPostBack;
__doPostBack=function(g,f){var h=true;
if(typeof(Page_ClientValidate)=="function"){h=Page_ClientValidate();
}if(h){if(e._clientSubmitHandler()==false){return;
}c(g,f);
}};
}catch(a){}}},_registerForRegularButtons:function(a){this._clientSubmitDelegate=Function.createDelegate(this,this._clientSubmitHandler);
$telerik.addHandler(a,"submit",this._clientSubmitDelegate);
if(Sys&&Sys.WebForms&&Sys.WebForms.PageRequestManager){var b=Sys.WebForms.PageRequestManager.getInstance();
if(b){b.add_beginRequest(this._clientSubmitDelegate);
}}},_clientSubmitHandler:function(b){var a=new Sys.CancelEventArgs();
a.originalEventArgs=b;
this.raiseEvent("submitting",a);
if(a.get_cancel()){return $telerik.cancelRawEvent(b);
}if(!this._allowCustomProgress){var c=false;
var d=$telerik.$("input[type='file']");
$telerik.$.each(d,function(){if(this.value!=""){c=true;
return;
}});
if(!c){return;
}}if(typeof(Page_IsValid)!="undefined"){if(!Page_IsValid){return;
}}this._isInAsyncUpload=false;
this.startProgressPolling();
},startProgressPolling:function(){this._initSelectedFilesCount();
this._ensurePageGUIDIsAppliedInFromAction();
this.raiseEvent("progressStarted");
if($telerik.RadUpload_isIFrameProgress){this._safariPoller.contentWindow.pollerInstance._startTime=new Date();
this._safariPoller.contentWindow.pollerInstance._makeCallback();
this._safariPoller.contentWindow.pollerInstance._selectedFilesCount=this._selectedFilesCount;
}else{this._startTime=new Date();
this._makeCallback();
}},_ensurePageGUIDIsAppliedInFromAction:function(){if(this._form.action.indexOf(this._pageGUID)<0){this._updateFormAction(this._form);
}},_initSelectedFilesCount:function(){this._selectedFilesCount=0;
var b=document.getElementsByTagName("input");
for(var c=0;
c<b.length;
c++){var a=b[c];
if(a.type=="file"&&a.value!=""){this._selectedFilesCount++;
}}},_createReadyStateChangeDelegate:function(){if(!$telerik.RadUpload_isIFrameProgress){return Function.createDelegate(this,this._handleCallback);
}var a=this;
return function(){a._handleCallback();
};
},_sendXmlHttpRequest:function(){if(typeof(XMLHttpRequest)!="undefined"){this._xmlHttpRequest=new XMLHttpRequest();
}else{if(typeof(ActiveXObject)!="undefined"){this._xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
}else{return;
}}this._xmlHttpRequest.onreadystatechange=this._createReadyStateChangeDelegate();
if($telerik.RadUpload_isIFrameProgress){this._xmlHttpRequest.open("GET",this._getTimeStampedCallbackUrl(),false);
}else{this._xmlHttpRequest.open("GET",this._getTimeStampedCallbackUrl(),true);
}this._xmlHttpRequest.send("");
},_makeCallback:function(){if(!this._waitingForResponse){this._waitingForResponse=true;
this._sendXmlHttpRequest();
}},_handleCallback:function(){if(this._xmlHttpRequest.readyState!=4){return;
}this._waitingForResponse=false;
if(this._errorOccured()){return;
}var e=this._xmlHttpRequest.responseText;
if(e){try{eval(e);
}catch(a){this._showInvalidContentMessage();
return;
}if(rawProgressData){if(!this._suppressMissingHttpModuleError&&rawProgressData.ProgressError){this.handleProgressError(rawProgressData.ProgressError);
return;
}if(rawProgressData.InProgress){this._modifyProgressData(rawProgressData);
if(!this._updateProgressAreas(rawProgressData)){this.hideProgressAreas();
this._resetCancelClicked();
if(window.stop){window.stop();
}else{try{document.execCommand("Stop");
}catch(a){window.location.href=window.location.href;
}}return;
}}}}var d=typeof(rawProgressData)!="undefined"&&rawProgressData.OperationComplete&&rawProgressData.OperationComplete.toLowerCase()=="true";
var b=(typeof(rawProgressData)!="undefined")?rawProgressData.InProgress:true;
if(d){if(this._stopAsyncPolling){this._stopAsyncPolling();
}else{parent.getRadProgressManager()._stopAsyncPolling();
}return;
}if(!b){if(this._failureCounter){this._failureCounter++;
}if(this._failureCounter>10){this._stopAsyncPolling();
this._failureCounter=1;
return;
}}if(this._disposed||d){return;
}if(!this._isInAsyncUpload&&d){return;
}if($telerik.RadUpload_isIFrameProgress){var f=this;
var c=function(){f._makeCallback();
};
this._timeOutPointer=window.setTimeout(c,this.get_refreshPeriod());
}else{if(Function.createDelegate){var c=Function.createDelegate(this,this._makeCallback);
this._timeOutPointer=window.setTimeout(c,this.get_refreshPeriod());
}}},_createCallbackUrl:function(a){var b=a.indexOf("?")<0?"?":"&";
if(document.getElementsByTagName("base").length>0){a=this._getBaseUri()+a;
}return a+b+this._uniqueRequestIdentifier+"="+this._pageGUID;
},_getBaseUri:function(){var a=window.location;
var b=a.pathname.substring(0,a.pathname.lastIndexOf("/"));
return a.protocol+"//"+a.host+(b.charAt(0)=="/"?"":"/")+b+"/";
},_addParamToCallbackUrl:function(a,b){this._callbackUrl+="&"+a+"="+b;
},_getTimeStampedCallbackUrl:function(){return this._callbackUrl+"&RadUploadTimeStamp="+new Date().getTime()+"&";
},_modifyProgressData:function(b){var a=new Date()-this._startTime;
if(typeof(b.TimeElapsed)=="undefined"){b.TimeElapsed=this.getFormattedTime(this._toSeconds(a));
}else{if(parseInt(b.TimeElapsed).toString()==b.TimeElapsed){b.TimeElapsed=this.getFormattedTime(this._toSeconds(b.TimeElapsed));
}}if(typeof(b.SecondaryTotal)=="undefined"){b.SecondaryTotal=this._selectedFilesCount;
}if(typeof(b.SecondaryPercent)=="undefined"){b.SecondaryPercent=Math.round(100*b.SecondaryValue/(this._selectedFilesCount!=0?this._selectedFilesCount:1));
}if(typeof(b.TimeEstimated)=="undefined"&&typeof(b.PrimaryPercent)=="number"){if(b.PrimaryPercent==0){b.TimeEstimated=this.getFormattedTime(this._toSeconds(359999000));
}else{b.TimeEstimated=this.getFormattedTime(this._toSeconds(a*(100/b.PrimaryPercent-1)));
}}else{if(parseInt(b.TimeEstimated).toString()==b.TimeEstimated){b.TimeEstimated=this.getFormattedTime(this._toSeconds(b.TimeEstimated));
}}},_updateProgressAreas:function(c){if($telerik.RadUpload_isIFrameProgress){if(typeof(window.progressAreas)!="undefined"){for(var a=0;
a<progressAreas.length;
a++){var b=progressAreas[a];
if(b.cancelClicked){return false;
}b.update(c);
}}}else{this.raiseEvent("progressUpdating",{ProgressData:c});
for(var a=0;
a<Telerik.Web.UI.ProgressAreas.length;
a++){var b=Telerik.Web.UI.ProgressAreas[a];
if(b.cancelClicked){return false;
}b.update(c);
}}return true;
},_resetCancelClicked:function(){for(var a=0;
a<Telerik.Web.UI.ProgressAreas.length;
a++){Telerik.Web.UI.ProgressAreas[a].cancelClicked=false;
}this._initializeForm();
},hideProgressAreas:function(){for(var a=0;
a<Telerik.Web.UI.ProgressAreas.length;
a++){Telerik.Web.UI.ProgressAreas[a].hide();
}},_toSeconds:function(a){return Math.round(a/1000);
},_formatBytes:function(a){var b=a/1024;
var c=b/1024;
if(c>0.8){return""+Math.round(c*100)/100+"MB";
}if(b>0.8){return""+Math.round(b*100)/100+"kB";
}return""+a+" bytes";
},getFormattedTime:function(b){var a=this._normalizeTime(b);
return this._timeFormat.replace(/%HOURS%/,a.Hours).replace(/%MINUTES%/,a.Minutes).replace(/%SECONDS%/,a.Seconds);
},_normalizeTime:function(e){var c=this._formatTimePart(e%60);
var d=Math.floor(e/60);
var b=this._formatTimePart(d%60);
var a=this._formatTimePart(Math.floor(d/60));
return{Hours:a,Minutes:b,Seconds:c};
},_formatTimePart:function(a){if(a.toString().length>1){return a.toString();
}return"0"+a.toString();
},_errorOccured:function(){if(!document.all){return false;
}if(this._xmlHttpRequest.status==404){this._showNotFoundMessage();
}else{if(this._xmlHttpRequest.status>0&&this._xmlHttpRequest.status!=200){this._showGenericErrorMessage();
}else{return false;
}}return true;
},_showNotFoundMessage:function(){alert("RadUpload Ajax callback error. Source url was not found: \n\r\n\r"+this._callbackUrl+"\n\r\n\rDid you register the RadUploadProgressHandler in web.config?\r\n\r\nPlease, see the help for more details: RadUpload for ASP.NET Ajax - Configuration - RadUploadProgressHandler.");
},_showGenericErrorMessage:function(){alert("RadUpload Ajax callback error. Source url returned error: "+this._xmlHttpRequest.status+" \n\r\n\r"+this._xmlHttpRequest.statusText+" \n\r\n\r"+this._callbackUrl+"\n\r\n\rDid you register the RadUploadProgressHandler in web.config?\r\n\r\nPlease, see the help for more details: RadUpload for ASP.NET Ajax - Configuration - RadUploadProgressHandler.");
},_showInvalidContentMessage:function(){alert("RadUpload Ajax callback error. Source url returned invalid content: \n\r\n\r"+this._xmlHttpRequest.responseText+"\n\r\n\r"+this._callbackUrl+"\n\r\n\rDid you register the RadUploadProgressHandler in web.config?\r\n\r\nPlease, see the help for more details: RadUpload for ASP.NET Ajax - Configuration - RadUploadProgressHandler.");
},handleProgressError:function(a){alert(a);
},get_formId:function(){return this._formId;
},set_formId:function(a){this._formId=a;
},get_refreshPeriod:function(){return this._refreshPeriod;
},set_refreshPeriod:function(a){if(a&&!isNaN(a)&&a>=500){this._refreshPeriod=a;
}},get_pageGUID:function(){return this._pageGUID;
},set_pageGUID:function(a){this._pageGUID=a;
},get_suppressMissingHttpModuleError:function(){return this._suppressMissingHttpModuleError;
},set_suppressMissingHttpModuleError:function(a){this._suppressMissingHttpModuleError=a;
},get_shouldRegisterForSubmit:function(){return this._shouldRegisterForSubmit;
},set_shouldRegisterForSubmit:function(a){this._shouldRegisterForSubmit=a;
},get_ajaxCallUrl:function(){return this._ajaxCallUrl;
},set_ajaxCallUrl:function(a){this._ajaxCallUrl=a;
},get_timeFormat:function(){return this._timeFormat;
},set_timeFormat:function(a){this._timeFormat=a;
},add_progressStarted:function(a){this.get_events().addHandler("progressStarted",a);
},remove_progressStarted:function(a){this.get_events().removeHandler("progressStarted",a);
},add_progressUpdating:function(a){this.get_events().addHandler("progressUpdating",a);
},remove_progressUpdating:function(a){this.get_events().removeHandler("progressUpdating",a);
},add_submitting:function(a){this.get_events().addHandler("submitting",a);
},remove_submitting:function(a){this.get_events().removeHandler("submitting",a);
}};
Telerik.Web.UI.RadProgressManager.registerClass("Telerik.Web.UI.RadProgressManager",Telerik.Web.UI.RadWebControl);
