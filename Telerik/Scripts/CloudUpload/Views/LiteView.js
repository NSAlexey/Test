(function(a,c,b,j){var g="rcuHidden",h="rcuHovered",f="rcuFileSize",i="rcuPressed",d="rcuDropZone",e="rcuDropZoneText";
if(!c.RadCloudUpload.Views){c.RadCloudUpload.Views={};
}c.RadCloudUpload.Views.Lite=function(k){this._owner=k;
};
c.RadCloudUpload.Views.Lite.prototype={initialize:function(){var m=this._owner,l=a(m._element),k=l.find(".rcuButton");
m._cssClasses={_rcuIcon:"p-icon"};
l.on("mouseover",".rcuToggleButton, .rcuRemoveButton, .rcuFakeButton, .rcuCancelButton, .rcuFileWrap",function(){if(m.get_enabled()){a(this).addClass(h);
}}).on("mouseout",".rcuToggleButton, .rcuRemoveButton, .rcuFakeButton, .rcuCancelButton, .rcuFileWrap",function(){if(m.get_enabled()){a(this).removeClass(h);
}});
k.on("mousedown",function(){if(m.get_enabled()){a(this).addClass(i);
}}).on("mouseup",function(){if(m.get_enabled()){a(this).removeClass(i);
}});
},dispose:function(){var m=this._owner,l=a(m._element),k=l.find(".rcuButton");
l.add(k).off();
},_initializeInfoPanel:function(m){var p=this._owner;
if(p._panelMaxHeight||p._panelHeight){var l=m.find(".rcuFileList");
m.css("position","absolute").css("left","-10000px").css("visibility","hidden").removeClass(g);
l.removeClass(g);
var r=m.outerHeight(true),q=m.find(".rcuHeader").outerHeight(true),n=m.find(".rcuBody").outerHeight(true),k=m.find(".rcuBodyScroll"),o=k.outerHeight(true),s="";
if(p._panelMaxHeight){s=p._panelMaxHeight-q-(n-o)-(r-q-n);
k.css("max-height",s+"px");
}if(p._panelHeight){s=p._panelHeight-q-(n-o)-(r-q-n);
k.outerHeight(s);
}m.css("position","").css("left","auto").css("visibility","visible").addClass(g);
l.addClass(g);
}if(p._showEmptyFileListPanel){m.removeClass(g);
}},_showElement:function(k){a(k).removeClass(g);
},_hideElement:function(k){a(k).addClass(g);
},_renderFileSize:function(k){var n=this._owner._renderingManager;
var l=n._fileInfo.size,m=n._getFileSizeInKB(l);
if(l){k.appendChild(n._renderSpan(f," "+m+" KB"));
}},appendDefaultDropZone:function(m){var n=this._owner;
var k=a(m),o="<span class='"+e+"'>"+n.get_localization().DropZone+"</span>",l=a("<div> <div class='rcuDropZoneInner'>"+o+"</div></div>");
l.addClass(d).addClass(g).appendTo(k);
}};
})($telerik.$,Telerik.Web.UI,Telerik.Web.StringBuilder);
