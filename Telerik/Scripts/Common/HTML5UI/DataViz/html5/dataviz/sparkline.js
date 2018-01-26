(function(b,a){a("util/text-metrics",["kendo.core"],b);
}(function(){(function(a){window.kendo.util=window.kendo.util||{};
var e=kendo.Class.extend({init:function(j){this._size=j;
this._length=0;
this._map={};
},put:function(k,m){var l=this._map;
var j={key:k,value:m};
l[k]=j;
if(!this._head){this._head=this._tail=j;
}else{this._tail.newer=j;
j.older=this._tail;
this._tail=j;
}if(this._length>=this._size){l[this._head.key]=null;
this._head=this._head.newer;
this._head.older=null;
}else{this._length++;
}},get:function(k){var j=this._map[k];
if(j){if(j===this._head&&j!==this._tail){this._head=j.newer;
this._head.older=null;
}if(j!==this._tail){if(j.older){j.older.newer=j.newer;
j.newer.older=j.older;
}j.older=this._tail;
j.newer=null;
this._tail.newer=j;
this._tail=j;
}return j.value;
}}});
function g(k){var l=[];
for(var j in k){l.push(j+k[j]);
}return l.sort().join("");
}function d(l){var j=2166136261;
for(var k=0;
k<l.length;
++k){j+=(j<<1)+(j<<4)+(j<<7)+(j<<8)+(j<<24);
j^=l.charCodeAt(k);
}return j>>>0;
}function i(){return{width:0,height:0,baseline:0};
}var b={baselineMarkerSize:1};
var c;
if(typeof document!=="undefined"){c=document.createElement("div");
c.style.cssText="position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;padding: 0 !important; margin: 0 !important; border: 0 !important;line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;";
}var h=kendo.Class.extend({init:function(j){this._cache=new e(1000);
this.options=a.extend({},b,j);
},measure:function(s,q,k){if(!s){return i();
}var r=g(q);
var m=d(s+r);
var l=this._cache.get(m);
if(l){return l;
}var p=i();
var o=k||c;
var j=this._baselineMarker().cloneNode(false);
for(var n in q){var t=q[n];
if(typeof t!=="undefined"){o.style[n]=t;
}}o.textContent=s;
o.appendChild(j);
document.body.appendChild(o);
if(String(s).length){p.width=o.offsetWidth-this.options.baselineMarkerSize;
p.height=o.offsetHeight;
p.baseline=j.offsetTop+this.options.baselineMarkerSize;
}if(p.width>0&&p.height>0){this._cache.put(m,p);
}o.parentNode.removeChild(o);
return p;
},_baselineMarker:function(){var j=document.createElement("div");
j.style.cssText="display: inline-block; vertical-align: baseline;width: "+this.options.baselineMarkerSize+"px; height: "+this.options.baselineMarkerSize+"px;overflow: hidden;";
return j;
}});
h.current=new h();
function f(l,k,j){return h.current.measure(l,k,j);
}kendo.deepExtend(kendo.util,{LRUCache:e,TextMetrics:h,measureText:f,objectKey:g,hashKey:d});
}(window.kendo.jQuery));
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
(function(b,a){a("dataviz/sparkline/kendo-sparkline",["kendo.dataviz.chart"],b);
}(function(){(function(){window.kendo.dataviz=window.kendo.dataviz||{};
var c=kendo.dataviz;
var b=c.constants;
var a=c.Chart;
var g=c.elementSize;
var f=c.deepExtend;
var d=150;
var e=150;
var i=[b.BAR,b.BULLET];
function h(n){var p=[];
for(var o=0;
o<n.length;
o++){var m=n[o];
p[o]=m.style.display;
m.style.display="none";
}return p;
}function j(m,o){for(var n=0;
n<m.length;
n++){m[n].style.display=o[n];
}}function l(m){return c.isNumber(m)?[m]:m;
}var k=a.extend({_setElementClass:function(m){c.addClass(m,"k-sparkline");
},_initElement:function(m){a.fn._initElement.call(this,m);
this._initialWidth=Math.floor(g(m).width);
},_resize:function(){var m=this.element;
var n=h(m.childNodes);
this._initialWidth=Math.floor(g(m).width);
j(m.childNodes,n);
a.fn._resize.call(this);
},_modelOptions:function(){var m=this.options;
var q=this._surfaceWrap();
var n=h(q.childNodes);
var p=document.createElement("span");
p.innerHTML="&nbsp;";
q.appendChild(p);
var o=f({width:this._autoWidth,height:g(q).height,transitions:m.transitions},m.chartArea,{inline:true,align:false});
g(q,{width:o.width,height:o.height});
q.removeChild(p);
j(q.childNodes,n);
this.surface.resize();
return o;
},_surfaceWrap:function(){if(!this.stage){var m=this.stage=document.createElement("span");
this.element.appendChild(m);
}return this.stage;
},_createPlotArea:function(n){var m=a.fn._createPlotArea.call(this,n);
this._autoWidth=this._initialWidth||this._calculateWidth(m);
return m;
},_calculateWidth:function(t){var s=this.options;
var r=c.getSpacing(s.chartArea.margin);
var n=t.charts;
var w=this._surfaceWrap();
var x=0;
for(var q=0;
q<n.length;
q++){var o=n[q];
var p=(o.options.series||[])[0];
if(!p){continue;
}if(p.type===b.BAR){return d;
}if(p.type===b.BULLET){return e;
}if(p.type===b.PIE){return g(w).height;
}var m=o.categoryAxis;
if(m){var u=m.options.categories.length*(!o.options.isStacked&&c.inArray(p.type,[b.COLUMN,b.VERTICAL_BULLET])?o.seriesOptions.length:1);
x=Math.max(x,u);
}}var v=x*s.pointWidth;
if(v>0){v+=r.left+r.right;
}return v;
}});
k.normalizeOptions=function(n){var m=l(n);
if(c.isArray(m)){m={seriesDefaults:{data:m}};
}else{m=f({},m);
}if(!m.series){m.series=[{data:l(m.data)}];
}f(m,{seriesDefaults:{type:m.type}});
if(c.inArray(m.series[0].type,i)||c.inArray(m.seriesDefaults.type,i)){m=f({},{categoryAxis:{crosshair:{visible:false}}},m);
}return m;
};
c.setDefaultOptions(k,{chartArea:{margin:2},axisDefaults:{visible:false,majorGridLines:{visible:false},valueAxis:{narrowRange:true}},seriesDefaults:{type:"line",area:{line:{width:0.5}},bar:{stack:true},padding:2,width:0.5,overlay:{gradient:null},highlight:{visible:false},border:{width:0},markers:{size:2,visible:false}},tooltip:{visible:true,shared:true},categoryAxis:{crosshair:{visible:true,tooltip:{visible:false}}},legend:{visible:false},transitions:false,pointWidth:5,panes:[{clip:false}]});
kendo.deepExtend(kendo.dataviz,{Sparkline:k});
}());
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
(function(b,a){a("dataviz/sparkline/sparkline",["dataviz/sparkline/kendo-sparkline"],b);
}(function(){(function(){var c=kendo.dataviz;
var a=c.ui.Chart;
var d=c.Sparkline;
var b=c.ChartInstanceObserver;
var e=a.extend({init:function(g,i){var h=i;
if(h instanceof kendo.data.ObservableArray){h={seriesDefaults:{data:h}};
}a.fn.init.call(this,g,d.normalizeOptions(h));
},_createChart:function(g,h){this._instance=new d(this.element[0],g,h,{observer:new b(this),sender:this});
},_createTooltip:function(){return new f(this.element,this.options.tooltip);
},options:{name:"Sparkline",chartArea:{margin:2},axisDefaults:{visible:false,majorGridLines:{visible:false},valueAxis:{narrowRange:true}},seriesDefaults:{type:"line",area:{line:{width:0.5}},bar:{stack:true},padding:2,width:0.5,overlay:{gradient:null},highlight:{visible:false},border:{width:0},markers:{size:2,visible:false}},tooltip:{visible:true,shared:true},categoryAxis:{crosshair:{visible:true,tooltip:{visible:false}}},legend:{visible:false},transitions:false,pointWidth:5,panes:[{clip:false}]}});
c.ui.plugin(e);
var f=c.Tooltip.extend({options:{animation:{duration:0}},_hideElement:function(){if(this.element){this.element.hide().remove();
}}});
c.SparklineTooltip=f;
}());
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
(function(b,a){a("kendo.dataviz.sparkline",["dataviz/sparkline/kendo-sparkline","dataviz/sparkline/sparkline"],b);
}(function(){var a={id:"dataviz.sparkline",name:"Sparkline",category:"dataviz",description:"Sparkline widgets.",depends:["dataviz.chart"]};
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));