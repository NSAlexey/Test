Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.Gauge");
(function(a,b){var c=200;
b.RadGaugeControl=function(d){b.RadGaugeControl.initializeBase(this,[d]);
this._gaugeObject=null;
this._height=null;
this._width=null;
};
b.RadGaugeControl.prototype={initialize:function(){b.RadGaugeControl.callBaseMethod(this,"initialize");
this.createGauge();
this._gaugeObject=this.getGauge();
this._showTrial();
},dispose:function(){b.RadGaugeControl.callBaseMethod(this,"dispose");
},repaint:function(){if(this._gaugeObject){this._gaugeObject.redraw();
}},get_kendoWidget:function(){return this._gaugeObject;
},_showTrial:function(){var d=this.get_element();
var e=d.innerHTML.toLowerCase();
if(e.toLowerCase().indexOf("trial")>0){var f=e.indexOf("<input");
var g=document.createElement("div");
g.innerHTML=e.substring(0,f);
d.parentNode.insertBefore(g,d);
}},_isSvgBasedGauge:function(){var d=this.get_kendoWidget();
return d&&d.surface.type==="svg";
},_getMainGaugeElement:function(){var d=this._isSvgBasedGauge()?"svg":"div";
return $telerik.getFirstChildByTagName(this.get_element(),d);
},_getGaugeCurrentBaseSize:function(){var e=this._getMainGaugeElement();
var d=e?$telerik.getBounds(e):$telerik.getBounds(this.get_element());
if(e&&e.tagName.toLowerCase()=="svg"){return{width:e.width.baseVal.valueAsString,height:e.height.baseVal.valueAsString};
}return{width:d.width,height:d.height};
},createGauge:function(){},getGauge:function(){},_getGaugeOptions:function(){var d=this;
var e={};
var g=d.get_pointers();
var f=d.get_pointerData();
e.theme=d.get_skin();
e.pointer=g.pointers||f;
e.scale=d.get_scaleData();
e.transitions=d.get_transitions();
e.gaugeArea=d.get_appearanceData();
if($telerik.isIE7&&!d._height){e.gaugeArea.height=c;
}e.renderAs=d.get_renderAs();
d._gaugeConfig=e;
return e;
},get_width:function(){var d=this._getGaugeCurrentBaseSize().width;
if(!this._width||this._width!=d){this._width=parseInt(d,10);
}return this._width;
},set_width:function(e){if(this._isSizeInPercentage(e)){this.get_element().style.width=e;
}else{var d=parseInt(e,10);
if(isNaN(d)||d<=0||this._width==d){return;
}this.get_element().style.width=d+"px";
if(!this._isSvgBasedGauge()){var f=this._getMainGaugeElement();
if(f){f.style.width=d+"px";
}}this._width=d;
}this.repaint();
},_isSizeInPercentage:function(d){return typeof d==="string"&&d.indexOf("%")===(d.length-1);
},get_height:function(){var d=this._getGaugeCurrentBaseSize().height;
if(!this._height||this._height!=d){this._height=parseInt(d,10);
}return this._height;
},set_height:function(e){if(this._isSizeInPercentage(e)){this.get_element().style.height=e;
}else{var d=parseInt(e,10);
if(isNaN(d)||d<=0||this._height==d){return;
}this.get_element().style.height=d+"px";
if(!this._isSvgBasedGauge()){var f=this._getMainGaugeElement();
if(f){f.style.height=d+"px";
}}this._height=d;
}this.repaint();
},get_value:function(){if(this._gaugeObject){return this._gaugeObject.value();
}},set_value:function(e){if(!this._gaugeObject){return;
}var d=parseFloat(e);
if(!isNaN(d)){this._gaugeObject.value(d);
}}};
a.registerControlProperties(b.RadGaugeControl,{skin:"Default",transitions:true,scaleData:{},pointerData:{},appearanceData:{},pointers:[],renderAs:""});
a.registerControlEvents(b.RadGaugeControl,[]);
Telerik.Web.UI.RadGaugeControl.registerClass("Telerik.Web.UI.RadGaugeControl",b.RadWebControl);
})($telerik.$,Telerik.Web.UI);
(function(){var f=window.kendo,b=f.dataviz,c=f.deepExtend;
var a="#000",g="Arial,Helvetica,sans-serif",h="12px "+g,i="#fff";
var d={scale:{labels:{font:h}}};
var e={Black:{gauge:c({},d,{pointer:{color:"#a1da29",track:{color:"#4f4f4f"}},scale:{rangePlaceholderColor:"#4f4f4f",labels:{color:i},minorTicks:{color:"#ffffff"},majorTicks:{color:"#ffffff"},line:{color:"#ffffff"}}})},BlackMetroTouch:{gauge:c({},d,{pointer:{color:"#25a0da",track:{color:"#444444"}},scale:{rangePlaceholderColor:"#444444",labels:{font:"16px Segoe UI,Arial",color:i},minorTicks:{color:"#e2e8eb"},majorTicks:{color:"#e2e8eb"},line:{color:"#e2e8eb"}}})},Bootstrap:{gauge:c({},d,{pointer:{color:"#428bca",track:{color:"#cccccc"}},scale:{rangePlaceholderColor:"#cccccc",labels:{color:"#333333"},minorTicks:{color:"#adadad"},majorTicks:{color:"#898989"},line:{color:"#adadad"}}})},Default:{gauge:c({},d,{pointer:{color:"#aeaeae",track:{color:"#e3e3e3"}},scale:{rangePlaceholderColor:"#e3e3e3",labels:{color:a},minorTicks:{color:"#b0b0b0"},majorTicks:{color:"#b0b0b0"},line:{color:"#b0b0b0"}}})},Glow:{gauge:c({},d,{pointer:{color:"#f89d26",track:{color:a,border:{color:"#485258"}}},scale:{rangePlaceholderColor:"#485258",labels:{color:"#c1c7ca"},minorTicks:{color:"#616b73"},majorTicks:{color:"#616b73"},line:{color:"#485258"}}})},Material:{gauge:c({},d,{pointer:{color:"#607d8b",track:{color:"#cfd8dc"}},scale:{rangePlaceholderColor:"#cfd8dc",labels:{color:"#607d8b"},minorTicks:{color:"#9aafb8"},majorTicks:{color:"#9aafb8"},line:{color:"#9aafb8"}}})},Metro:{gauge:c({},d,{pointer:{color:"#25a0da",track:{color:"#e5e5e5"}},scale:{rangePlaceholderColor:"#e5e5e5",labels:{color:"#767676"},minorTicks:{color:"#e5e5e5"},majorTicks:{color:"#e5e5e5"},line:{color:"#e5e5e5"}}})},MetroTouch:{gauge:c({},d,{pointer:{color:"#25a0da",track:{color:"#e5e5e5"}},scale:{rangePlaceholderColor:"#e5e5e5",labels:{font:"16px Segoe UI,Arial",color:"#767676"},minorTicks:{color:"#e5e5e5"},majorTicks:{color:"#e5e5e5"},line:{color:"#e5e5e5"}}})},Office2007:{gauge:c({},d,{pointer:{color:"#40689e",track:{color:"#c1d1eb"}},scale:{rangePlaceholderColor:"#c1d1eb",labels:{color:"#00156e"},minorTicks:{color:"#799bc9"},majorTicks:{color:"#799bc9"},line:{color:"#799bc9"}}})},Office2010Black:{gauge:c({},d,{pointer:{color:"#fbd55e",track:{color:"#303030"}},scale:{rangePlaceholderColor:"#303030",labels:{color:"#ffffff"},minorTicks:{color:"#222222"},majorTicks:{color:"#222222"},line:{color:"#222222"}}})},Office2010Blue:{gauge:c({},d,{pointer:{color:"#fbd55e",track:{color:"#bbcbde"}},scale:{rangePlaceholderColor:"#bbcbde",labels:{color:"#667d9b"},minorTicks:{color:"#8ba0bc"},majorTicks:{color:"#8ba0bc"},line:{color:"#8ba0bc"}}})},Office2010Silver:{gauge:c({},d,{pointer:{color:"#f9cd4c",track:{color:"#bdc2c7"}},scale:{rangePlaceholderColor:"#bdc2c7",labels:{color:"#65676a"},minorTicks:{color:"#8b9097"},majorTicks:{color:"#8b9097"},line:{color:"#8b9097"}}})},Outlook:{gauge:c({},d,{pointer:{color:"#fd8c1f",track:{color:"#c1d1eb"}},scale:{rangePlaceholderColor:"#c1d1eb",labels:{color:"#00156e"},minorTicks:{color:"#799bc9"},majorTicks:{color:"#799bc9"},line:{color:"#799bc9"}}})},Silk:{gauge:c({},d,{pointer:{color:"#2dabc1",track:{color:"#e6e6e6"}},scale:{rangePlaceholderColor:"#d7d7d7",labels:{color:"#6c6c6c"},minorTicks:{color:"#d7d7d7"},majorTicks:{color:"#d7d7d7"},line:{color:"#d7d7d7"}}})},Simple:{gauge:c({},d,{pointer:{color:"#ffa517",track:{color:"#e4e4e4"}},scale:{rangePlaceholderColor:"#e4e4e4",labels:{color:a},minorTicks:{color:"#a4a4a4"},majorTicks:{color:"#a4a4a4"},line:{color:"#a4a4a4"}}})},Sunset:{gauge:c({},d,{pointer:{color:"#cf6921",track:{color:"#cec7b7"}},scale:{rangePlaceholderColor:"#cec7b7",labels:{color:"#333333"},minorTicks:{color:"#a39787"},majorTicks:{color:"#a39787"},line:{color:"#a39787"}}})},Telerik:{gauge:c({},d,{pointer:{color:"#65b33f",track:{color:"#dedede"}},scale:{rangePlaceholderColor:"#dedede",labels:{color:a},minorTicks:{color:"#b0b0b0"},majorTicks:{color:"#b0b0b0"},line:{color:"#b0b0b0"}}})},Vista:{gauge:c({},d,{pointer:{color:"#0f41cd",track:{color:"#e7eaea"}},scale:{rangePlaceholderColor:"#e7eaea",labels:{color:a},minorTicks:{color:"#b0b0b0"},majorTicks:{color:"#b0b0b0"},line:{color:"#b0b0b0"}}})},Web20:{gauge:c({},d,{pointer:{color:"#67cd0f",track:{color:"#d0e4ff"}},scale:{rangePlaceholderColor:"#d0e4ff",labels:{color:a},minorTicks:{color:"#bcd2f1"},majorTicks:{color:"#bcd2f1"},line:{color:"#bcd2f1"}}})},WebBlue:{gauge:c({},d,{pointer:{color:"#0fcd1f",track:{color:"#cad3db"}},scale:{rangePlaceholderColor:"#cad3db",labels:{color:a},minorTicks:{color:"#b0b0b0"},majorTicks:{color:"#b0b0b0"},line:{color:"#b0b0b0"}}})},Windows7:{gauge:c({},d,{pointer:{color:"#359af6",track:{color:"#b7cbea"}},scale:{rangePlaceholderColor:"#b7cbea",labels:{color:a},minorTicks:{color:"#b0b0b0"},majorTicks:{color:"#b0b0b0"},line:{color:"#b0b0b0"}}})}};
c(b.ui,{themes:e});
})($telerik.$);
Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.Gauge");
(function(a,b){$telerik.toLinearGauge=function(c){return c;
};
$telerik.findLinearGauge=$find;
b.RadLinearGauge=function(c){b.RadLinearGauge.initializeBase(this,[c]);
};
b.RadLinearGauge.prototype={initialize:function(){b.RadLinearGauge.callBaseMethod(this,"initialize");
},dispose:function(){b.RadLinearGauge.callBaseMethod(this,"dispose");
},createGauge:function(){var d=this;
var c=null;
b.RadLinearGauge.callBaseMethod(d,"createGauge");
c=d._getLinearGaugeOptions();
a(d.get_element()).kendoLinearGauge(c);
},getGauge:function(){b.RadLinearGauge.callBaseMethod(this,"getGauge");
return a(this.get_element()).data("kendoLinearGauge");
},_getLinearGaugeOptions:function(){var d=this;
var c=b.RadLinearGauge.callBaseMethod(d,"_getGaugeOptions");
d._gaugeConfig=c;
return c;
}};
a.registerControlProperties(b.RadLinearGauge,{});
a.registerControlEvents(b.RadLinearGauge,[]);
Telerik.Web.UI.RadLinearGauge.registerClass("Telerik.Web.UI.RadLinearGauge",b.RadGaugeControl);
})($telerik.$,Telerik.Web.UI);
Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.Gauge");
(function(a,b){$telerik.toRadialGauge=function(c){return c;
};
$telerik.findRadialGauge=$find;
b.RadRadialGauge=function(c){b.RadRadialGauge.initializeBase(this,[c]);
};
b.RadRadialGauge.prototype={initialize:function(){b.RadRadialGauge.callBaseMethod(this,"initialize");
},dispose:function(){b.RadRadialGauge.callBaseMethod(this,"dispose");
},createGauge:function(){b.RadRadialGauge.callBaseMethod(this,"createGauge");
a(this.get_element()).kendoRadialGauge(this._getRadialGaugeConfig());
},getGauge:function(){b.RadRadialGauge.callBaseMethod(this,"getGauge");
return a(this.get_element()).data("kendoRadialGauge");
},_getRadialGaugeConfig:function(){var d=this;
var c=b.RadRadialGauge.callBaseMethod(this,"_getGaugeOptions");
d._gaugeConfig=c;
return c;
}};
a.registerControlProperties(b.RadRadialGauge,{});
a.registerControlEvents(b.RadRadialGauge,[]);
b.RadRadialGauge.registerClass("Telerik.Web.UI.RadRadialGauge",b.RadGaugeControl);
})($telerik.$,Telerik.Web.UI);
