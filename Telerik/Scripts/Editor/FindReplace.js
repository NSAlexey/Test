(function(a,c){Type.registerNamespace("Telerik.Web.UI.Editor");
var b=Telerik.Web.UI.Editor;
b.FindReplaceEventArgs=function(d){this._find=d.find;
this._replace=d.replace;
this._backwards=d.backwards;
};
a.registerControlProperties(b.FindReplaceEventArgs,{find:"",replace:"",backwards:false});
b.FindReplaceEventArgs.registerClass("Telerik.Web.UI.Editor.FindReplaceEventArgs",Sys.EventArgs);
})($telerik.$);
(function(a,f){Type.registerNamespace("Telerik.Web.UI.Editor");
var d=Telerik.Web.UI.Editor;
var c=Function.createDelegate;
var g=d.Utils;
var b=Telerik.Web.Browser;
d.FindReplaceManager=function(h,j,i){this.editor=h;
this.ui=j;
this.highlighter=new d.HighlightCommand(h);
this.options=a.extend({localization:{}},i||{});
this.engine=$create(d.EditorFindReplaceEngine,{editor:h},null,null,null);
this._selectionChangeDelegate=c(this,this._selectionChangeHandler);
this.attachEventHandlers();
};
d.FindReplaceManager.prototype={toggle:function(){if(this.isVisible()){this.hide();
}else{this.show();
}},show:function(){var i=this.ui.get_element();
var h=this.ui.get_findInput();
var j=this.editor.get_toolAdapter();
if(j.isEditEnabled&&j.isEditEnabled()){j.toggleEdit();
}i.style.display="";
h.focus();
this.editor.add_selectionChange(this._selectionChangeDelegate);
},hide:function(){var i=this.ui.get_element();
var h=this.ui.get_findInput();
h.blur();
i.style.display="none";
this.highlighter.remove();
this.editor.remove_selectionChange(this._selectionChangeDelegate);
},isVisible:function(){var h=this.ui.get_element();
return(h.style.display!="none");
},attachEventHandlers:function(){var h=this.ui;
this._findDelegate=c(this,this._findHandler);
this._replaceDelegate=c(this,this._replaceHandler);
this._replaceAllDelegate=c(this,this._replaceAllHandler);
this._settingsDelegate=c(this,this._settingsHandler);
h.add_find(this._findDelegate);
h.add_replace(this._replaceDelegate);
h.add_all(this._replaceAllDelegate);
h.add_settings(this._settingsDelegate);
},detachEventHandlers:function(){var h=this.ui;
h.remove_find(this._findDelegate);
h.remove_replace(this._replaceDelegate);
h.remove_all(this._replaceAllDelegate);
h.remove_settings(this._settingsDelegate);
this.editor.remove_selectionChange(this._selectionChangeDelegate);
this._findDelegate=f;
this._replaceDelegate=f;
this._replaceAllDelegate=f;
this._settingsDelegate=f;
this._selectionChangeDelegate=f;
},dispose:function(){this.detachEventHandlers();
this.engine.dispose();
},_findHandler:function(j,h){var i=this._highlightResult(function(k){return k.find(h.get_find(),h.get_backwards());
});
this._scrollToHightlighted();
this.showMessage(i);
},_scrollToHightlighted:function(){var h=this.editor;
var i=a(h.get_contentArea()).find(".__reTextHighlight:last").get(0);
if(i&&i.scrollIntoView){if(b.iemobile){g.scrollTo(i,h);
}else{i.scrollIntoView();
}}},_replaceHandler:function(j,h){var i=this._highlightResult(function(k){return k.replace(h.get_find(),h.get_replace(),h.get_backwards());
});
this._scrollToHightlighted();
this.showMessage(i);
},_replaceAllHandler:function(j,h){var i=this._highlightResult(function(k){return k.replaceAll(h.get_find(),h.get_replace(),h.get_backwards());
});
this.showReplaceAllMessage(i);
},_highlightResult:function(h){this.highlighter.remove();
var j=h(this.engine);
this.highlighter.highlight();
if(b.iemobile){var k=this.editor.get_toolAdapter();
if(k.get_mobileKeyboardAdapter){var i=k.get_mobileKeyboardAdapter();
i.hideKeyboard();
}}return j;
},_settingsHandler:function(k,h){var i=this.editor;
var j=this.engine;
i.showDialog("FindReplaceSettings",{},function(o,l){var n=l.value;
j.set_caseSensitive(n.matchCase);
var m=d.FindReplaceMode.Find;
if(n.mode=="replace"){m=d.FindReplaceMode.FindAndReplace;
}k.set_mode(m);
});
},_selectionChangeHandler:function(i,h){if(this.isVisible()){this.highlighter.remove();
}},showReplaceAllMessage:function(h){if(h.message){e(String.format(this._localize(h.message),h.replaceCount));
}else{this.showMessage(h);
}},showMessage:function(h){if(h){h=this._localize(h);
e(h);
}},_localize:function(h){var i=this.options.localization;
return i["find_"+h.toLowerCase()]||h;
}};
function e(h){if(h){window.alert(h);
}}})($telerik.$);
(function(a,e){Type.registerNamespace("Telerik.Web.UI.Editor");
var b=Telerik.Web.UI;
var d=b.Editor;
var c=Function.createDelegate;
d.FindReplaceMobile=function(f){d.FindReplaceMobile.initializeBase(this,[f]);
this._mode=d.FindReplaceMode.Find;
};
d.FindReplaceMobile.prototype={initialize:function(){this.attachEventHandlers();
},get_mode:function(){return this._mode;
},set_mode:function(i){var f=this._mode=i;
var h=this.get_rows();
var g=(f==d.FindReplaceMode.Find)?"none":"";
h[1].style.display=g;
},get_rows:function(){return a(this.get_element()).find(".t-hbox");
},attachEventHandlers:function(){this._findPreviousDelegate=c(this,this._findPreviousHandler);
this._findNextDelegate=c(this,this._findNextHandler);
this._settingsDelegate=c(this,this._settingsHandler);
this._replaceDelegate=c(this,this._replaceHandler);
this._replaceAllDelegate=c(this,this._replaceAllHandler);
this.get_findPreviousBtn().add_clicked(this._findPreviousDelegate);
this.get_findNextBtn().add_clicked(this._findNextDelegate);
this.get_settingsBtn().add_clicked(this._settingsDelegate);
$telerik.onEvent(this.get_replaceLink(),"click",this._replaceDelegate);
$telerik.onEvent(this.get_replaceAllLink(),"click",this._replaceAllDelegate);
},detachEventHandlers:function(){this.get_findPreviousBtn().remove_clicked(this._findPreviousDelegate);
this.get_findNextBtn().remove_clicked(this._findNextDelegate);
this.get_settingsBtn().remove_clicked(this._settingsDelegate);
$telerik.offEvent(this.get_replaceLink(),"click",this._replaceDelegate);
$telerik.offEvent(this.get_replaceAllLink(),"click",this._replaceAllDelegate);
this._findPreviousDelegate=e;
this._findNextDelegate=e;
this._settingsDelegate=e;
this._replaceDelegate=e;
this._replaceAllDelegate=e;
},dispose:function(){this.detachEventHandlers();
d.FindReplaceMobile.callBaseMethod(this,"dispose");
},_findPreviousHandler:function(){var f=this._createEventArgs(true);
this.raiseEvent("find",f);
},_findNextHandler:function(){var f=this._createEventArgs(false);
this.raiseEvent("find",f);
},_settingsHandler:function(){this.raiseEvent("settings");
},_replaceHandler:function(){var f=this._createEventArgs(false);
this.raiseEvent("replace",f);
},_replaceAllHandler:function(){var f=this._createEventArgs(false);
this.raiseEvent("all",f);
},_createEventArgs:function(f){var g=(this.get_mode()==d.FindReplaceMode.FindAndReplace);
var h={find:this.get_findInput().value,replace:g?this.get_replaceInput().value:"",backwards:f};
return new d.FindReplaceEventArgs(h);
}};
a.registerControlProperties(d.FindReplaceMobile,{findInput:null,replaceInput:null,findPreviousBtn:null,findNextBtn:null,settingsBtn:null,replaceLink:null,replaceAllLink:null});
a.registerControlEvents(d.FindReplaceMobile,["find","replace","all","settings"]);
d.FindReplaceMobile.registerClass("Telerik.Web.UI.Editor.FindReplaceMobile",b.RadWebControl);
})($telerik.$);
(function(a,b){Type.registerNamespace("Telerik.Web.UI.Editor");
a.registerEnum(Telerik.Web.UI.Editor,"FindReplaceMode",{Find:0,FindAndReplace:1});
})($telerik.$);
