(function(a,b){var c={BelowFileInput:0,AboveFileInput:1};
if(!b.RadAsyncUpload.Statics){b.RadAsyncUpload.Statics={};
}b.RadAsyncUpload.Statics={extendViewWith:function(d){a.extend(d,{_calculateSelectedFiles:function(e){if(e.find(".ruUploadSuccess, .ruUploadFailure, .ruUploadCancelled, .ruCancel").length>0){this._selectedFilesCount--;
}},_appendCancelButton:function(e){var f=this._createInput("Cancel","ruButton ruCancel","button",this._tabIndex);
f.name="RowRemove";
e.appendChild(f);
return f;
},_appendSelectButton:function(e){var f=this._createInput("Select","ruButton ruBrowse","button","-1");
e.appendChild(f);
return f;
},_createSpan:function(e,f){return a("<span>"+f+"</span>").attr({"class":e})[0];
},_createStyledRow:function(){var e=a("<li></li>"),f=a("<span class='ruFileWrap ruStyled' />")[0];
e.append(f);
return e;
},_appendFakeInput:function(e){var f;
if(!this._hideFileInput){f=this._createInput("","ruFakeInput radPreventDecorate","text","-1");
a(f).attr("id",this.getID("fakeInput"));
f.size=this.get_inputSize()-1;
e.appendChild(f);
var i=this._createLabel(a(f).attr("id"));
e.appendChild(i);
}var j=this._appendSelectButton(e);
if($telerik.isSafari){var k=$telerik.getBounds(j).width;
var h=0;
if(!this._hideFileInput){h=$telerik.getBounds(f).width;
}var g=this._fileInput;
if(g&&(k+h)>0){g.style.width=(k+h)+"px";
}}},_updateRowContent:function(h,g){var f,e=a("<span class='ruUploadProgress'>"+this._getFileName(g)+"</span>");
if(this._isManualUpload()){e.addClass("ruUploadOnHold");
}if(this._enableInlineProgress){f=a('<span class="ruFileProgressWrap"><span class="ruFileProgress"></span></span>');
e.append(f);
}a(".ruCheck, .ruFakeInput, .ruBrowse",h).remove();
a(".ruFileWrap",h).append(e);
if(($telerik.isIE7)&&this._enableInlineProgress){f.width(e.width());
}},_updateRowImage:function(f,g){var e;
switch(g){case"success":e="ruUploadSuccess";
break;
case"cancel":e="ruUploadCancelled";
break;
default:e="ruUploadFailure";
break;
}if(this._isManualUpload()){a(".ruUploadOnHold",f).removeClass("ruUploadOnHold");
}a(".ruUploadProgress",f).addClass(e);
},_updateCancelButton:function(g){var f=this.get_localization()["Remove"];
var e=a(".ruCancel",g);
e.removeClass("ruCancel").addClass("ruRemove");
e.val(f);
},_updateModules:function(e){var f=this.get_element();
a("li",f).each(function(h,g){e(g);
});
},_disable:function(){var f=this.get_element(),g=this.get_loadedModuleName();
a("input",f).add(f).attr("disabled","disabled");
if(!this._isInitializing&&g!="IFrame"&&g!="File API"){var e=function(h){a(h).find("object").parent().remove();
};
this._updateModules(e);
}},_enable:function(){var h=this,f=this.get_element(),g=this.get_loadedModuleName();
a("input[disabled]",f).add(f).removeAttr("disabled");
if(!this._isInitializing&&g!="IFrame"&&g!="File API"){var e=function(i){h._uploadModule.fileInputAdded(a(i).children("span")[0]);
};
this._updateModules(e);
}},_deleteFileInput:function(h,i,j){var e=a(h);
if(a(".ruUploadSuccess",e).length>0){var f=e.data("fileInfo");
if(this._onFileUploadRemoving(f,e[0],e.index())){return;
}Array.remove(this._uploadedFiles,f);
this.updateClientState();
this._uploadModule.rowRemoved(e);
if(e.find("span span object").length==1&&!j){this._markForDeletion(e);
}else{e.remove();
}}else{e.remove();
}this._calculateSelectedFiles(e);
var g=e.find(".ruUploadProgress").text();
this._onFileUploadRemoved(g);
if(this._shouldAddNewInputOnDelete()){this.addFileInput();
}},getUploadedFiles:function(){var e=[];
a(".ruUploadSuccess",this.get_element()).each(function(f,g){e[f]=a(g).text();
});
return e;
},getInvalidFiles:function(){var e=[];
a(".ruUploadFailure",this.get_element()).each(function(f,g){e[f]=a(g).text();
});
return e;
},_marshalUploadedFiles:function(f){var m=this;
var e=Sys.Serialization.JavaScriptSerializer.deserialize(f);
var n=e.uploadedFiles;
var l=function(j){var i=a('<li><span class="ruFileWrap ruStyled"><span class="ruUploadProgress ruUploadSuccess">'+n[j].fileInfo.FileName+'</span></span><input class="ruButton ruRemove" type="button" tabindex="-1" value=\''+m.get_localization().Remove+'\' name="RowRemove"></li>');
i.data("fileInfo",n[j]);
a(".ruInputs",m.get_element()).append(i);
};
this._uploadedFiles=n;
this._selectedFilesCount=n.length;
if(this._uploadedFilesRendering===c.AboveFileInput){for(var g=0,k=n.length;
g<k;
g++){l(g);
}}else{for(var h=n.length-1;
h>=0;
h--){l(h);
}}},_initializeKeyboardSupport:function(){if(this.get_loadedModuleName()=="IFrame"||this.get_loadedModuleName()=="File API"){var e=this;
a(this._element).on("focus",function(f){f.preventDefault();
e._onFocus();
}).on("focus",".ruFileInput",function(f){e._onInputFocus(f);
}).on("blur",".ruFileInput",function(f){e._onInputBlur(f);
});
a(this._element).removeAttr("tabindex").removeAttr("accesskey");
if($telerik.isIE){a(this._element).removeAttr("tabIndex").removeAttr("accessKey");
}a(document).on("keydown."+this.get_id(),function(g){var f=e._accessKey;
if($telerik.isFirefox){if(g.altKey==true&&g.shiftKey==true&&g.which==f.charCodeAt()){e._onFocus();
}}if($telerik.isChrome||$telerik.isSafari||$telerik.isIE){if(g.altKey==true&&g.which==f.charCodeAt()){e._onFocus();
}}});
}},_onInputBlur:function(){var e=a(this._element).find(".ruButton.ruBrowse");
e.removeClass("ruButtonFocus");
},_onInputFocus:function(){var e=a(this._element).find(".ruButton.ruBrowse");
e.addClass("ruButtonFocus");
},_isUploading:function(){var k=a(this._element).find(".ruUploadProgress");
for(var j=0;
j<k.length;
j++){var e=a(k[j]),f=e.hasClass("ruUploadCancelled"),g=e.hasClass("ruUploadFailure"),h=e.hasClass("ruUploadSuccess");
if(!f&&!g&&!h){return true;
}}return false;
}});
}};
})($telerik.$,Telerik.Web.UI);
