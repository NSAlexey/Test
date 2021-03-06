Type.registerNamespace("Telerik.Web");
(function(){var a=Telerik.Web.UI;
var d=20;
$telerik.toRating=function(f){return f;
};
$telerik.findRating=$find;
var c=function(g,f){a[g]=function(){var h=Array.prototype.slice.call(arguments);
a[g].initializeBase(this,h);
};
a[g].registerClass("Telerik.Web.UI."+g,f);
};
a.RatingPrecision=function(){};
a.RatingPrecision.prototype={Item:0,Half:1,Exact:2};
a.RatingPrecision.registerEnum("Telerik.Web.UI.RatingPrecision");
a.RatingSelectionMode=function(){};
a.RatingSelectionMode.prototype={Single:0,Continuous:1};
a.RatingSelectionMode.registerEnum("Telerik.Web.UI.RatingSelectionMode");
a.RatingRatingEventArgs=function(f){a.RatingRatingEventArgs.initializeBase(this);
this._newValue=f;
};
a.RatingRatingEventArgs.prototype={get_newValue:function(){return this._newValue;
}};
a.RatingRatingEventArgs.registerClass("Telerik.Web.UI.RatingRatingEventArgs",Sys.CancelEventArgs);
c("RadRatingRatingEventArgs",Telerik.Web.UI.RatingRatingEventArgs);
a.RatingRatedEventArgs=function(f){a.RatingRatedEventArgs.initializeBase(this);
this._oldValue=f;
};
a.RatingRatedEventArgs.prototype={get_oldValue:function(){return this._oldValue;
}};
a.RatingRatedEventArgs.registerClass("Telerik.Web.UI.RatingRatedEventArgs",Sys.EventArgs);
c("RadRatingRatedEventArgs",Telerik.Web.UI.RatingRatedEventArgs);
a.RadRating=function(f){a.RadRating.initializeBase(this,[f]);
this._itemCount=5;
this._value=0;
this._doubleValue="0";
this._selectionMode=a.RatingSelectionMode.Continuous;
this._precision=a.RatingPrecision.Item;
this._orientation=a.Orientation.Horizontal;
this._isDirectionReversed=false;
this._enableToolTips=true;
this._autoPostBack=false;
this._readOnly=false;
this._enabled=true;
this._uniqueID=null;
this._preInitializeComplete=false;
this._ulWrapper=null;
this._items=[];
this._itemData=[];
this._definedItems=false;
this._itemWidth="";
this._itemHeight="";
this._documentMouseMoveDelegate=null;
this._selectedItemCssClass="rrtSelected";
this._hoveredItemCssClass="rrtOver";
this._clearSelectedStateOnHover=false;
this._clearHoverStateDelegate=Function.createDelegate(this,this._clearHoverState);
};
a.RadRating.prototype={initialize:function(){if(!this._preInitializeComplete){a.RadRating._preInitialize(this.get_id(),this._orientation);
}a.RadRating.callBaseMethod(this,"initialize");
$telerik.$(".tm",this.get_element()).remove().contents().insertBefore(this.get_element());
var g=this._ulWrapper=$telerik.getFirstChildByTagName(this.get_element(),"ul",0);
this._decorateListWrapper();
this._createItemData();
this._enableRatingControl(!this._readOnly&&this._enabled);
$addHandler(g,"click",this._cancelEvent);
this._synchronizeUIWithValue(this._value,true);
this.get_element().value=this._doubleValue;
var f=this;
setTimeout(function(){f._requestItemsHoverImages();
},0);
this.raiseEvent("load");
if(!this.canRepaint()){this.add_parentShown(this.get_element());
}},dispose:function(){this._attachDocumentHandlers(false);
this._createPartElements(false);
this._storeStartCoords(false);
this._spanSize=null;
this._hoveredItem=null;
$clearHandlers(this._ulWrapper);
this._ulWrapper=null;
this._items=null;
this._itemData=[];
a.RadRating.callBaseMethod(this,"dispose");
},repaint:function(){a.RadRating._preInitialize(this.get_id(),this._orientation);
var f=this._value;
this._clearSelection(f);
this._synchronizeUIWithValue(f);
},_decorateListWrapper:function(){if($telerik.isMobileSafari){$telerik.$(this._ulWrapper).addClass("_Telerik_MobileSafari");
}},_getMainEventHandlers:function(){return $telerik.isTouchDevice?{mouseup:this._mouseUpTouchDevice}:{mouseover:this._mouseOver,mouseup:this._mouseUp,mouseout:this._mouseOut};
},_createItemData:function(){var l=this._isDirectionReversed,k,s;
var o=this._items=$telerik.getChildrenByTagName(this._ulWrapper,"li");
if(l){var t=[];
for(k=(o.length-1);
k>=0;
k--){t[t.length]=o[k];
}o=this._items=t;
}var q=0;
var p=0;
var m=this._itemData;
var g=this._definedItems=(m&&m.length>0);
for(k=0,s=o.length;
k<s;
k++){var f;
if(!g){f={value:(k+1)};
}else{f=m[k];
var x={};
var u={};
if(!f.imageUrl){f.imageUrl="";
}else{x.url="url("+f.imageUrl+")";
}if(!f.selectedImageUrl){f.selectedImageUrl=f.imageUrl;
}if(f.selectedImageUrl){u.url="url("+f.selectedImageUrl+")";
}if(f.imageUrl||f.selectedImageUrl){q++;
}var h=f.hoveredImageUrl;
var j=f.hoveredSelectedImageUrl;
if(h||j){f.hoveredImageUrl=h?h:j;
f.hoveredSelectedImageUrl=j?j:h;
p++;
}else{f.hoveredImageUrl=f.selectedImageUrl;
f.hoveredSelectedImageUrl=f.selectedImageUrl;
}if(f.hoveredImageUrl){x.hoveredUrl="url("+f.hoveredImageUrl+")";
}if(f.hoveredSelectedImageUrl){u.hoveredUrl="url("+f.hoveredSelectedImageUrl+")";
}f.item=(l?u:x);
f.itemSpan=(l?x:u);
}f.index=k;
f.itemElement=o[k];
m[k]=f;
}if(g&&p==0&&q>0){this._clearSelectedStateOnHover=true;
}var r=this._itemWidth;
var w=(""!=r);
r=parseInt(r,10)+"px";
var n=this._itemHeight;
var v=(""!=n);
n=parseInt(n,10)+"px";
if(a.Orientation.Horizontal==this._orientation){if(w){o.itemSpanWidth=l?r:"0px";
o.itemSpanSelectedWidth=l?"0px":r;
if(v){o.itemPartsStaticSize=n;
}}}else{if(v){o.itemSpanHeight=l?n:"0px";
o.itemSpanSelectedHeight=l?"0px":n;
if(w){o.itemPartsStaticSize=r;
}}}},_requestItemsHoverImages:function(){var k=this._itemData;
for(var j=0,l=k.length;
j<l;
j++){var f=k[j];
var h=f.hoveredImageUrl;
if(h!=f.selectedImageUrl){this._requestImage(h);
var g=f.hoveredSelectedImageUrl;
if(g!=h){this._requestImage(g);
}}}},_requestImage:function(f){var g=document.createElement("img");
g.setAttribute("src",f);
g.setAttribute("alt","");
g.setAttribute("class","rrtHiddenImages");
this.get_element().appendChild(g);
},_getItem:function(f){for(var g=0;
g<3&&f!==this._ulWrapper;
g++,f=f.parentNode){if("li"==f.tagName.toLowerCase()){return f;
}}return null;
},_getItemA:function(g){var f=g.getElementsByTagName("a");
if(f&&f.length>0){return f[0];
}return null;
},_getItemSpan:function(f){var g=f.getElementsByTagName("span");
if(g&&g.length>0){return g[0];
}return null;
},_getItemData:function(h){var j=this._itemData;
for(var g=0,k=j.length;
g<k;
g++){var f=j[g];
if(f.itemElement===h){return f;
}}},_getItemValue:function(g,f){var h=this._getItemData(g).value;
if(a.RatingPrecision.Item!=this._precision){h-=1;
h+=this._getFraction(g,f);
}if(!isNaN(h)){return h;
}return 0;
},_getItemByValue:function(k){k=Math.ceil(k);
var h=this._itemData;
for(var g=0,j=h.length;
g<j;
g++){var f=h[g];
if(f.value===k){return f.itemElement;
}}},_getItemIndexByValue:function(k){k=Math.ceil(k);
var h=this._itemData;
for(var g=0,j=h.length;
g<j;
g++){var f=h[g];
if(f.value===k){return f.index;
}}},_getItemIndex:function(g){var f=this._getItemData(g).index;
if(!isNaN(f)){return f;
}return -1;
},_getFraction:function(h,f){if(!h){return;
}var g=0;
var n=(a.Orientation.Horizontal==this._orientation?"width":"height");
var i=$telerik.getSize(this._getItemA(h))[n];
var j=this._overPartItem;
var k=this._overPartItemComplement;
if(f&&j&&k){var m=$telerik.getSize(j)[n];
var l=$telerik.getSize(k)[n];
g=Math.max(m,l);
if(0==g&&Sys.UI.DomElement.containsCssClass(h,this._hoveredItemCssClass)){return 1;
}}else{g=$telerik.getSize(this._getItemSpan(h))[n];
if(this._isDirectionReversed){g=i-g;
}}return this._calculateFraction(g,i);
},_calculateFraction:function(f,g){return e(f/g);
},_markContinuousHovered:function(f){if(this._selectionMode!=a.RatingSelectionMode.Continuous){return;
}var j=this._items;
for(var g=0,k=j.length;
g<k;
g++){var h=j[g];
if(f===h){break;
}this._markItemHovered(h);
}},_markItemHovered:function(i){Sys.UI.DomElement.addCssClass(i,this._hoveredItemCssClass);
var h=this._getItemData(i);
var k=h.itemSpan;
if(k&&k.hoveredUrl){var j=this._getItemSpan(i);
j.style.backgroundImage=k.hoveredUrl;
}var g=h.item;
if(g&&g.hoveredUrl){var f=this._getItemA(i);
f.style.backgroundImage=g.hoveredUrl;
}},_clearOverState:function(f){var j=(a.RatingSelectionMode.Continuous==this._selectionMode);
var l=this._items;
var g=f?this._getItemIndex(f):null;
for(var h=(l.length-1);
h>=0;
h--){var k=l[h];
if(j&&g!=null&&(g>this._getItemIndex(k))){return;
}this._clearItemOverState(k);
}},_clearItemOverState:function(i){Sys.UI.DomElement.removeCssClass(i,this._hoveredItemCssClass);
var h=this._getItemData(i);
var k=h.itemSpan;
if(k&&k.url){var j=this._getItemSpan(i);
j.style.backgroundImage=k.url;
}var g=h.item;
if(g&&g.url){var f=this._getItemA(i);
f.style.backgroundImage=g.url;
}},_markContinuousSelected:function(f){var j=this._items;
var l=j.itemSpanSelectedWidth;
var k=j.itemSpanSelectedHeight;
this._markItemSelected(f,l,k);
if(a.RatingSelectionMode.Continuous!=this._selectionMode){return;
}for(var g=0,m=j.length;
g<m;
g++){var h=j[g];
if(f===h){break;
}this._markItemSelected(h,l,k);
}},_markItemSelected:function(f,h,g){Sys.UI.DomElement.addCssClass(f,this._selectedItemCssClass);
this._setItemSize(f,h,g);
},_clearSelection:function(p){var g=(a.RatingSelectionMode.Continuous==this._selectionMode);
var k=this._items;
var m=k.itemSpanWidth;
var l=k.itemSpanHeight;
var o=this._getItemIndexByValue(p);
var n=this._getItemIndexByValue(this._value);
for(var f=n;
f>=0;
f--){var h=k[f];
if(n==f){this._clearPart(h);
}var j=this._getItemIndex(h);
if(o!=null&&((g&&o>j)||(o==j))){return;
}this._clearItemSelectedState(h,m,l);
}},_clearItemSelectedState:function(f,h,g){Sys.UI.DomElement.removeCssClass(f,this._selectedItemCssClass);
this._setItemSize(f,h,g);
},_setItemSize:function(f,h,g){var i=this._getItemSpan(f);
if(h){i.style.width=h;
}if(g){i.style.height=g;
}},_clearPart:function(f,g){var i=this._getItemSpan(f);
if(!i){return;
}var h=g?(g.toString()+"px"):"";
i.style[a.Orientation.Horizontal==this._orientation?"width":"height"]=h;
},_updateHoveredItem:function(i){this._mouseOut(i,true);
var k=this._hoveredItem;
var q=this._overPartItem;
var r=this._overPartItemComplement;
if(!k||!q||!r){return;
}var o=$telerik.getDocumentRelativeCursorPosition(i)[this._locationProperty];
var w=o-this._ulLocation;
w=Math.min(this._maxMousePosition,Math.max(0,w));
w%=this._itemOuterSize;
w-=this._positionOffset;
this._clearItemOverState(k);
var p=this._getOverPartsSize(w,k);
var v=p.partSize;
var t=p.partComplementSize;
var x=this._sizeProperty;
var g=parseInt(q.style[x],10);
if(isNaN(g)||g<1){q.style[x]="1px";
}var f=parseInt(r.style[x],10);
if(isNaN(g)||f<1){r.style[x]="1px";
}var j=(a.Orientation.Horizontal==this._orientation);
if(this._isDirectionReversed){var n=this._marginProperty;
var m=this._itemSize;
var y=this._spanSize;
var u=m-v-(j?0:y);
q.style[n]=u.toString()+"px";
var s=m-t-(j?0:(y+u+v));
r.style[n]=s.toString()+"px";
}else{if(!j){q.style.marginTop=(-t).toString()+"px";
}}q.style[x]=v.toString()+"px";
r.style[x]=t.toString()+"px";
this._updateHoveredItemPartsImages(k);
if(this._enableToolTips){var h=this._getItemData(k);
if(!h.tooltip){var l=this._getItemA(k);
l.title=this._getItemValue(k,true);
}}},_updateHoveredItemPartsImages:function(i){var g=this._isDirectionReversed?"right bottom":"left top";
var h=this._getItemData(i);
var l=h.itemSpan;
var k=this._overPartItem.style;
if(l&&l.hoveredUrl){k.backgroundImage=l.hoveredUrl;
k.backgroundPosition=g;
}else{if(k.backgroundPosition){this._clearBackgroundPosition(k);
}}var f=h.item;
var j=this._overPartItemComplement.style;
if(f&&f.hoveredUrl){j.backgroundImage=f.hoveredUrl;
j.backgroundPosition=g;
}else{if(j.backgroundPosition){this._clearBackgroundPosition(j);
}}},_clearBackgroundPosition:function(f){if(f.removeAttribute){f.removeAttribute("backgroundPosition");
}else{f.removeProperty("backgroundPosition");
}},_getOverPartsSize:function(o,k){var i=this.get_renderMode()==a.RenderMode.Lite;
var j=this._isDirectionReversed;
var l=this._itemSize;
var g=this._itemHalfSize;
var p=this._precision;
var h=(a.RatingPrecision.Half==p);
var n=0;
var m=0;
if(((a.RatingPrecision.Exact==p)&&(o<0||o>=l))||(h&&((!j&&o>g)||(j&&o<=g)))){if((!j&&o>=0)||(j&&o<l)){this._markItemHovered(k);
}}else{var r=this._spanSize;
if(j){if(i){var f=l-r;
if(o>f){if(h){m=g;
}else{m=l-o;
}}else{if(h){n=g;
}else{m=r;
n=l-o;
}}}else{if(o>r){m=h?g:(l-o);
if(h&&(r>g)){n=g;
m=(l-r);
}}else{n=h?g:(l-o);
m=l-r;
}}}else{if((o>r)||(h&&(r<g))){n=r;
m=h?g:o;
}else{n=h?g:o;
}}}var q={partSize:((n<0)?0:n),partComplementSize:((m<0)?0:m)};
return q;
},_createPartElements:function(k){var g=this._overPartItem;
var h=this._overPartItemComplement;
if(k){if(!g){g=document.createElement("span");
g.className="rrtPart";
h=document.createElement("span");
h.className="rrtPartComplement";
var i=this._items.itemPartsStaticSize;
if(i){var j=(a.Orientation.Horizontal==this._orientation)?"height":"width";
g.style[j]=i;
h.style[j]=i;
var f="-"+i;
g.style.marginTop=f;
h.style.marginTop=f;
}this._overPartItem=g;
this._overPartItemComplement=h;
}}else{if(g&&h){g.parentNode.removeChild(g);
this._overPartItem=null;
h.parentNode.removeChild(h);
this._overPartItemComplement=null;
}}},_storeStartCoords:function(k){if(k){var g=(a.Orientation.Horizontal==this._orientation);
var h=this._items[0];
var f=this._getItemA(h);
var l=this._ulWrapper;
var i=this._locationProperty=g?"left":"top";
var j=this._sizeProperty=g?"width":"height";
this._marginProperty=g?"marginLeft":"marginTop";
this._ulLocation=$telerik.getLocation(l)[g?"x":"y"]+($telerik.getMarginBox(l)[i]+$telerik.getBorderBox(l)[i]+$telerik.getPaddingBox(l)[i]);
this._itemOuterSize=$telerik.getOuterSize(h)[j];
this._itemSize=$telerik.getSize(f)[j];
this._itemHalfSize=parseFloat(this._itemSize/2,10);
this._positionOffset=$telerik.getMarginBox(f)[i]+$telerik.getBorderBox(f)[i];
this._maxMousePosition=(this._itemOuterSize*this._itemCount)-1;
}else{this._locationProperty=null;
this._sizeProperty=null;
this._marginProperty=null;
this._ulLocation=null;
this._itemOuterSize=null;
this._itemSize=null;
this._itemHalfSize=null;
this._positionOffset=null;
this._maxMousePosition=null;
}},_attachDocumentHandlers:function(f){if(true==f){this._documentMouseMoveDelegate=Function.createDelegate(this,this._updateHoveredItem);
$telerik.addExternalHandler(document,"mousemove",this._documentMouseMoveDelegate);
}else{if(this._documentMouseMoveDelegate){$telerik.removeExternalHandler(document,"mousemove",this._documentMouseMoveDelegate);
this._documentMouseMoveDelegate=null;
}}},_attachDisabledHandlers:function(f){var g=$telerik.$(this.get_element()).find("a");
if(f){g.on("focus",b);
}else{g.off("focus",b);
}},_getFractionSize:function(n,v){var q=this._overPartItem;
var r=this._overPartItemComplement;
if(!(q&&r)&&typeof(v)=="undefined"){return 0;
}var l=this.get_renderMode()==a.RenderMode.Lite;
var m=this._isDirectionReversed&&!l;
var k=(a.Orientation.Horizontal==this._orientation);
var u=(k?"width":"height");
var o=this._items;
var p;
if(this._caching){p=this._cachedItemSize=(this._cachedItemSize||$telerik.getSize(this._getItemA(n?n:o[0]))[u]);
}else{p=this._cachedItemSize=$telerik.getSize(this._getItemA(n?n:o[0]))[u];
}var h=0;
if(q&&r){var t=$telerik.getSize(q)[u];
var s=$telerik.getSize(r)[u];
h=(t>s)?t:s;
if(0==h&&Sys.UI.DomElement.containsCssClass(n,this._hoveredItemCssClass)){h=p;
}if(m){h=p-h;
}}else{if(v!=null){var g=v-Math.floor(v);
if(g>0){if(m){g=1-g;
}h=Math.round(p*g);
}else{h=(-1);
}}}var j=(m&&h==p)||(!m&&h==0);
var i=(m&&h==0)||(!m&&h==p);
var f=k?(""!=this._itemWidth):(""!=this._itemHeight);
if((!f&&i)||j){h=(-1);
if(j){this._clearItemSelectedState(n,o.itemSpanWidth,o.itemSpanHeight);
}}h=(h<0)?"":h.toString()+"px";
return h;
},_mouseOver:function(f){window.clearTimeout(this._mouseOutTimeout);
var g=this._getItem(f.target||f.srcElement);
if(!g){this._hoveredItem=null;
return;
}var i=this._hoveredItem;
if(i&&i===g){return;
}this._clearOverState(g);
if(this._clearSelectedStateOnHover){this._clearSelection();
}this._markContinuousHovered(g);
if(a.RatingPrecision.Item!=this._precision){this._mouseOverPrecise(g,f);
}else{this._markItemHovered(g);
}if(this._enableToolTips){var h=this._getItemA(g);
var j=this._getItemData(g).tooltip;
h.title=j?j:this._getItemValue(g);
}},_mouseOverPrecise:function(h,f){this._createPartElements(true);
this._hoveredItem=h;
var j=(a.Orientation.Horizontal==this._orientation);
var n=(j?"width":"height");
var i=this._getItemSpan(h);
if(i){this._spanSize=$telerik.getSize(i)[n];
}var l=this._overPartItem;
var m=this._overPartItemComplement;
var k=this._isDirectionReversed;
l.style[n]="0px";
m.style[n]="0px";
if(!j&&!k){m.style.marginTop=(-this._spanSize).toString()+"px";
}var g=this._getItemA(h);
g.appendChild(k?l:m);
g.appendChild(k?m:l);
if(!this._itemOuterSize){this._storeStartCoords(true);
}if(!this._documentMouseMoveDelegate){this._attachDocumentHandlers(true);
}this._updateHoveredItem(f);
},_mouseUp:function(f){var n=this._getItem(f.target||f.srcElement);
if(!n){return;
}var h=(a.RatingPrecision.Item!=this._precision);
var k=this._overPartItem;
var l=this._overPartItemComplement;
if(h&&(!k||!this._overPartItemComplement)){return;
}var j=this._value;
var i=this._getItemValue(n,true);
var m=new a.RatingRatingEventArgs(i);
this.raiseEvent("rating",m);
if(m.get_cancel()){return;
}if(j!=i){this._clearSelection(i);
this._markContinuousSelected(n);
if(h){var p=this._getItemSpan(n);
var q=this._getFractionSize(n,i);
var g=(a.Orientation.Horizontal==this._orientation);
var o=g?"width":"height";
k.style[o]="1px";
l.style[o]="1px";
p.style[o]=q;
this._spanSize=$telerik.getSize(p)[o];
if(!g&&!this._isDirectionReversed){q=(q!="")?("-"+q):"";
l.style.marginTop=q;
}this._updateHoveredItem(f);
}}this._setValue(i);
this.raiseEvent("rated",new a.RatingRatedEventArgs(j));
if(this._autoPostBack){this._raiseServerEvent();
}},_mouseUpTouchDevice:function(h){var q=this._getItem(h.target||h.srcElement);
if(!q){return;
}var r=this._getItemA(q);
var j=this._precision!=a.RatingPrecision.Item;
var m={left:h.rawEvent.pageX,top:h.rawEvent.pageY};
var k=$telerik.getLocation(q);
k={left:k.x,top:k.y};
var f=a.Orientation.Horizontal==this._orientation?"left":"top";
var t=a.Orientation.Horizontal==this._orientation?"width":"height";
var l=$telerik.getSize(q)[t]-2*($telerik.getMarginBox(r)[f]+$telerik.getBorderBox(r)[f]);
var i=0,s=0;
if(j){s=m[f]-k[f];
var g=this._isDirectionReversed?l-s:s;
i=this._calculateFraction(g,l);
s=this._calculateFractionSize(l,s);
}var o=this._value;
var n=this._calculateItemValue(q,i);
var p=new a.RatingRatingEventArgs(n);
this.raiseEvent("rating",p);
if(p.get_cancel()){return;
}if(o!=n){this._clearSelection(n);
this._markContinuousSelected(q);
if(j){var u=this._getItemSpan(q);
u.style[t]=s+"px";
this._spanSize=s;
}}this._setValue(n);
this.raiseEvent("rated",new a.RatingRatedEventArgs(o));
if(this._autoPostBack){this._raiseServerEvent();
}},_calculateItemValue:function(g,f){var h=this._getItemData(g).value;
var i=h-1;
switch(this._precision){case a.RatingPrecision.Item:return h;
case a.RatingPrecision.Half:return f>0.5?h:h-0.5;
case a.RatingPrecision.Exact:return i+f;
default:throw"impossible";
}},_calculateFractionSize:function(g,h){var f=parseInt(g/2,10);
var i=this._isDirectionReversed?[f,0]:[g,f];
switch(this._precision){case a.RatingPrecision.Item:return 0;
case a.RatingPrecision.Half:return h>f?i[0]:i[1];
case a.RatingPrecision.Exact:return h;
default:throw"impossible";
}},_mouseOut:function(f,i){var j=this;
var g=(j._precision===a.RatingPrecision.Item);
var h=$telerik.isMouseOverElementEx(j._ulWrapper,f);
if(h){if(!i&&a.RatingPrecision.Item!=j._precision){j._hoveredItem=null;
}if(!g){return $telerik.cancelRawEvent(f);
}}if(g){this._mouseOutTimeout=window.setTimeout(this._clearHoverStateDelegate,d);
}else{this._clearHoverState();
}},_clearHoverState:function(){var f=this;
f._attachDocumentHandlers(false);
f._createPartElements(false);
f._storeStartCoords(false);
f._spanSize=null;
f._hoveredItem=null;
f._clearOverState();
if(f._clearSelectedStateOnHover){f._synchronizeUIWithValue(f._value);
}},_cancelEvent:function(f){if(!f){return false;
}if(f.preventDefault){f.preventDefault();
}f.returnValue=false;
return false;
},_raiseServerEvent:function(){setTimeout(Function.createDelegate(this,function(){__doPostBack(this._uniqueID);
}),0);
},add_load:function(f){this.get_events().addHandler("load",f);
},remove_load:function(f){this.get_events().removeHandler("load",f);
},add_rating:function(f){this.get_events().addHandler("rating",f);
},remove_rating:function(f){this.get_events().removeHandler("rating",f);
},add_rated:function(f){this.get_events().addHandler("rated",f);
},remove_rated:function(f){this.get_events().removeHandler("rated",f);
},get_itemCount:function(){return this._itemCount;
},get_value:function(){return this._value;
},set_value:function(i){var g=this._value;
var f=this.get_isInitialized();
if(f){i=this._fixValuePrecision(i);
var h=new a.RatingRatingEventArgs(i);
this.raiseEvent("rating",h);
if(h.get_cancel()){return;
}if(i!=g){this._clearSelection(i);
this._synchronizeUIWithValue(i);
}}this._setValue(i);
if(this._enableToolTips&&this._ulWrapper&&(this._readOnly||!this._enabled)){this._setAllItemTooltips(i);
}if(f){this.raiseEvent("rated",new a.RatingRatedEventArgs(g));
if(this._autoPostBack){this._raiseServerEvent();
}}},_setValue:function(f){this._value=f;
this._doubleValue=f.toString();
this.get_element().value=this._doubleValue;
this.updateClientState();
},_setAllItemTooltips:function(f){$telerik.$(this._ulWrapper).find("a").each(function(){this.title=f;
});
},_synchronizeUIWithValue:function(j,i){var f=this._getItemByValue(j);
if(f){if(!i){this._markContinuousSelected(f);
}if(j!=parseInt(j,10)){var g=this._getItemSpan(f);
var h=this._getFractionSize(f,j);
g.style[a.Orientation.Horizontal==this._orientation?"width":"height"]=h;
}}},_fixValuePrecision:function(g){if(!this._definedItems){var f=this._items;
if(g<0){g=0;
}else{if(g>f.length){g=f.length;
}}}return e(g);
},get_selectionMode:function(){return this._selectionMode;
},set_selectionMode:function(f){this._selectionMode=f;
},get_precision:function(){return this._precision;
},set_precision:function(f){this._precision=f;
},get_orientation:function(){return this._orientation;
},set_orientation:function(f){this._orientation=f;
},get_isDirectionReversed:function(){return this._isDirectionReversed;
},set_isDirectionReversed:function(f){this._isDirectionReversed=f;
},get_enableToolTips:function(){return this._enableToolTips;
},set_enableToolTips:function(f){this._enableToolTips=f;
},get_readOnly:function(){return this._readOnly;
},set_readOnly:function(f){if(this.get_isInitialized()&&f!=this._readOnly){this._enableRatingControl(!f);
}this._readOnly=f;
this.updateClientState();
},get_enabled:function(){return this._enabled;
},set_enabled:function(f){if(this.get_isInitialized()&&f!=this._enabled){this._enableRatingControl(f);
}this._enabled=f;
},get_itemData:function(){return this._itemData;
},set_itemData:function(f){this._itemData=f;
},_enableRatingControl:function(i){var j=this._ulWrapper;
var h=$telerik.$(j).find("a");
$clearHandlers(j);
this._attachDocumentHandlers(false);
this._attachDisabledHandlers(!i);
if(i){var g=this._getMainEventHandlers();
$addHandlers(j,g,this);
h.removeAttr("tabIndex");
}else{this._clearOverState();
h.attr("tabIndex","-1");
if(this._enableToolTips){var f=this.get_value();
this._setAllItemTooltips(f);
}}$addHandler(j,"click",this._cancelEvent);
},saveClientState:function(){var j=["readOnly"];
var k={value:this._doubleValue};
for(var f=0,g=j.length;
f<g;
f++){var h=j[f];
k[h]=this["get_"+h]();
}return Sys.Serialization.JavaScriptSerializer.serialize(k);
}};
a.RadRating._preInitialize=function(j,q){var i=$get(j);
if(!i||($telerik.getInvisibleParent(i)!=null)){return;
}var n=i.getElementsByTagName("li");
if(n&&n.length>0){var l=n[0];
var m=a.RadRating._getElementBox(l);
var r=a.RadRating._getElementBox($telerik.getChildrenByTagName(i,"ul")[0]);
var f=$telerik.getChildrenByTagName(l,"a")[0];
var p=$telerik.getOuterSize(f);
p.width+=m.horizontal;
p.height+=m.vertical;
var o=n.length;
var k=(0==q);
var h=r.horizontal+(k?(o*p.width):p.width);
var g=r.vertical+(k?p.height:(o*p.height));
if(parseInt(i.style.width,10)!=h||parseInt(i.style.height,10)!=g){$telerik.setContentSize(i,{width:h,height:g});
}}};
a.RadRating._getElementBox=function(h){var g={horizontal:0,vertical:0};
if(h){var f=$telerik.getBorderBox(h);
var j=$telerik.getPaddingBox(h);
var i=$telerik.getMarginBox(h);
g.horizontal=f.horizontal+j.horizontal+i.horizontal;
g.vertical=f.vertical+j.vertical+i.vertical;
}return g;
};
a.RadRating.registerClass("Telerik.Web.UI.RadRating",a.RadWebControl);
function e(f){return Math.round(f*10)/10;
}function b(f){f.target.blur();
}})();
