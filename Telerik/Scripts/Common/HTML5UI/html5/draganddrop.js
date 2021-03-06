(function(b,a){a("kendo.draganddrop",["kendo.core","kendo.userevents"],b);
}(function(){var a={id:"draganddrop",name:"Drag & drop",category:"framework",description:"Drag & drop functionality for any DOM element.",depends:["core","userevents"]};
(function(b,V){var E=window.kendo,R=E.support,k=window.document,c=b(window),g=E.Class,X=E.ui.Widget,J=E.Observable,W=E.UserEvents,O=b.proxy,z=b.extend,B=E.getOffset,q={},x={},u={},G,y=E.elementUnderCursor,F="keyup",e="change",s="dragstart",D="hold",l="drag",n="dragend",m="dragcancel",C="hintDestroyed",o="dragenter",r="dragleave",t="drop";
function i(ab,Z){try{return b.contains(ab,Z)||ab==Z;
}catch(aa){return false;
}}function I(Z,aa){return parseInt(Z.css(aa),10)||0;
}function Y(aa,Z){return Math.min(Math.max(aa,Z.min),Z.max);
}function h(Z,aa){var af=B(Z),ah=E._outerWidth,ag=E._outerHeight,ad=af.left+I(Z,"borderLeftWidth")+I(Z,"paddingLeft"),ae=af.top+I(Z,"borderTopWidth")+I(Z,"paddingTop"),ab=ad+Z.width()-ah(aa,true),ac=ae+Z.height()-ag(aa,true);
return{x:{min:ad,max:ab},y:{min:ae,max:ac}};
}function f(ac,ae,aa){var ag,af,ab=0,ad=ae&&ae.length,Z=aa&&aa.length;
while(ac&&ac.parentNode){for(ab=0;
ab<ad;
ab++){ag=ae[ab];
if(ag.element[0]===ac){return{target:ag,targetElement:ac};
}}for(ab=0;
ab<Z;
ab++){af=aa[ab];
if(b.contains(af.element[0],ac)&&R.matchesSelector.call(ac,af.options.filter)){return{target:af,targetElement:ac};
}}ac=ac.parentNode;
}return V;
}var S=J.extend({init:function(aa,ab){var ac=this,Z=aa[0];
ac.capture=false;
if(Z.addEventListener){b.each(E.eventMap.down.split(" "),function(){Z.addEventListener(this,O(ac._press,ac),true);
});
b.each(E.eventMap.up.split(" "),function(){Z.addEventListener(this,O(ac._release,ac),true);
});
}else{b.each(E.eventMap.down.split(" "),function(){Z.attachEvent(this,O(ac._press,ac));
});
b.each(E.eventMap.up.split(" "),function(){Z.attachEvent(this,O(ac._release,ac));
});
}J.fn.init.call(ac);
ac.bind(["press","release"],ab||{});
},captureNext:function(){this.capture=true;
},cancelCapture:function(){this.capture=false;
},_press:function(Z){var aa=this;
aa.trigger("press");
if(aa.capture){Z.preventDefault();
}},_release:function(Z){var aa=this;
aa.trigger("release");
if(aa.capture){Z.preventDefault();
aa.cancelCapture();
}}});
var M=J.extend({init:function(Z){var aa=this;
J.fn.init.call(aa);
aa.forcedEnabled=false;
b.extend(aa,Z);
aa.scale=1;
if(aa.horizontal){aa.measure="offsetWidth";
aa.scrollSize="scrollWidth";
aa.axis="x";
}else{aa.measure="offsetHeight";
aa.scrollSize="scrollHeight";
aa.axis="y";
}},makeVirtual:function(){b.extend(this,{virtual:true,forcedEnabled:true,_virtualMin:0,_virtualMax:0});
},virtualSize:function(aa,Z){if(this._virtualMin!==aa||this._virtualMax!==Z){this._virtualMin=aa;
this._virtualMax=Z;
this.update();
}},outOfBounds:function(Z){return Z>this.max||Z<this.min;
},forceEnabled:function(){this.forcedEnabled=true;
},getSize:function(){return this.container[0][this.measure];
},getTotal:function(){return this.element[0][this.scrollSize];
},rescale:function(Z){this.scale=Z;
},update:function(aa){var ac=this,ad=ac.virtual?ac._virtualMax:ac.getTotal(),Z=ad*ac.scale,ab=ac.getSize();
if(ad===0&&!ac.forcedEnabled){return;
}ac.max=ac.virtual?-ac._virtualMin:0;
ac.size=ab;
ac.total=Z;
ac.min=Math.min(ac.max,ab-Z);
ac.minScale=ab/ad;
ac.centerOffset=(Z-ab)/2;
ac.enabled=ac.forcedEnabled||Z>ab;
if(!aa){ac.trigger(e,ac);
}}});
var N=J.extend({init:function(Z){var aa=this;
J.fn.init.call(aa);
aa.x=new M(z({horizontal:true},Z));
aa.y=new M(z({horizontal:false},Z));
aa.container=Z.container;
aa.forcedMinScale=Z.minScale;
aa.maxScale=Z.maxScale||100;
aa.bind(e,Z);
},rescale:function(Z){this.x.rescale(Z);
this.y.rescale(Z);
this.refresh();
},centerCoordinates:function(){return{x:Math.min(0,-this.x.centerOffset),y:Math.min(0,-this.y.centerOffset)};
},refresh:function(){var Z=this;
Z.x.update();
Z.y.update();
Z.enabled=Z.x.enabled||Z.y.enabled;
Z.minScale=Z.forcedMinScale||Math.min(Z.x.minScale,Z.y.minScale);
Z.fitScale=Math.max(Z.x.minScale,Z.y.minScale);
Z.trigger(e);
}});
var L=J.extend({init:function(Z){var aa=this;
z(aa,Z);
J.fn.init.call(aa);
},outOfBounds:function(){return this.dimension.outOfBounds(this.movable[this.axis]);
},dragMove:function(aa){var ae=this,ab=ae.dimension,Z=ae.axis,ac=ae.movable,ad=ac[Z]+aa;
if(!ab.enabled){return;
}if(ad<ab.min&&aa<0||ad>ab.max&&aa>0){aa*=ae.resistance;
}ac.translateAxis(Z,aa);
ae.trigger(e,ae);
}});
var K=g.extend({init:function(aa){var ac=this,ad,ae,ab,Z;
z(ac,{elastic:true},aa);
ab=ac.elastic?0.5:0;
Z=ac.movable;
ac.x=ad=new L({axis:"x",dimension:ac.dimensions.x,resistance:ab,movable:Z});
ac.y=ae=new L({axis:"y",dimension:ac.dimensions.y,resistance:ab,movable:Z});
ac.userEvents.bind(["press","move","end","gesturestart","gesturechange"],{gesturestart:function(af){ac.gesture=af;
ac.offset=ac.dimensions.container.offset();
},press:function(af){if(b(af.event.target).closest("a").is("[data-navigate-on-press=true]")){af.sender.cancel();
}},gesturechange:function(ah){var an=ac.gesture,am=an.center,af=ah.center,ao=ah.distance/an.distance,aj=ac.dimensions.minScale,ai=ac.dimensions.maxScale,ag;
if(Z.scale<=aj&&ao<1){ao+=(1-ao)*0.8;
}if(Z.scale*ao>=ai){ao=ai/Z.scale;
}var ak=Z.x+ac.offset.left,al=Z.y+ac.offset.top;
ag={x:(ak-am.x)*ao+af.x-ak,y:(al-am.y)*ao+af.y-al};
Z.scaleWith(ao);
ad.dragMove(ag.x);
ae.dragMove(ag.y);
ac.dimensions.rescale(Z.scale);
ac.gesture=ah;
ah.preventDefault();
},move:function(af){if(af.event.target.tagName.match(/textarea|input/i)){return;
}if(ad.dimension.enabled||ae.dimension.enabled){ad.dragMove(af.x.delta);
ae.dragMove(af.y.delta);
af.preventDefault();
}else{af.touch.skip();
}},end:function(af){af.preventDefault();
}});
}});
var T=R.transitions.prefix+"Transform",U;
if(R.hasHW3D){U=function(aa,ab,Z){return"translate3d("+aa+"px,"+ab+"px,0) scale("+Z+")";
};
}else{U=function(aa,ab,Z){return"translate("+aa+"px,"+ab+"px) scale("+Z+")";
};
}var H=J.extend({init:function(Z){var aa=this;
J.fn.init.call(aa);
aa.element=b(Z);
aa.element[0].style.webkitTransformOrigin="left top";
aa.x=0;
aa.y=0;
aa.scale=1;
aa._saveCoordinates(U(aa.x,aa.y,aa.scale));
},translateAxis:function(Z,aa){this[Z]+=aa;
this.refresh();
},scaleTo:function(Z){this.scale=Z;
this.refresh();
},scaleWith:function(Z){this.scale*=Z;
this.refresh();
},translate:function(Z){this.x+=Z.x;
this.y+=Z.y;
this.refresh();
},moveAxis:function(Z,aa){this[Z]=aa;
this.refresh();
},moveTo:function(Z){z(this,Z);
this.refresh();
},refresh:function(){var aa=this,ab=aa.x,ac=aa.y,Z;
if(aa.round){ab=Math.round(ab);
ac=Math.round(ac);
}Z=U(ab,ac,aa.scale);
if(Z!=aa.coordinates){if(E.support.browser.msie&&E.support.browser.version<10){aa.element[0].style.position="absolute";
aa.element[0].style.left=aa.x+"px";
aa.element[0].style.top=aa.y+"px";
}else{aa.element[0].style[T]=Z;
}aa._saveCoordinates(Z);
aa.trigger(e);
}},_saveCoordinates:function(Z){this.coordinates=Z;
}});
function j(Z,ad){var ab=ad.options.group,aa=Z[ab],ac;
X.fn.destroy.call(ad);
if(aa.length>1){for(ac=0;
ac<aa.length;
ac++){if(aa[ac]==ad){aa.splice(ac,1);
break;
}}}else{aa.length=0;
delete Z[ab];
}}var v=X.extend({init:function(Z,ab){var ac=this;
X.fn.init.call(ac,Z,ab);
var aa=ac.options.group;
if(!(aa in x)){x[aa]=[ac];
}else{x[aa].push(ac);
}},events:[o,r,t],options:{name:"DropTarget",group:"default"},destroy:function(){j(x,this);
},_trigger:function(ab,aa){var ac=this,Z=q[ac.options.group];
if(Z){return ac.trigger(ab,z({},aa.event,{draggable:Z,dropTarget:aa.dropTarget}));
}},_over:function(Z){this._trigger(o,Z);
},_out:function(Z){this._trigger(r,Z);
},_drop:function(aa){var ab=this,Z=q[ab.options.group];
if(Z){Z.dropped=!ab._trigger(t,aa);
}}});
v.destroyGroup=function(aa){var Z=x[aa]||u[aa],ab;
if(Z){for(ab=0;
ab<Z.length;
ab++){X.fn.destroy.call(Z[ab]);
}Z.length=0;
delete x[aa];
delete u[aa];
}};
v._cache=x;
var w=v.extend({init:function(Z,ab){var ac=this;
X.fn.init.call(ac,Z,ab);
var aa=ac.options.group;
if(!(aa in u)){u[aa]=[ac];
}else{u[aa].push(ac);
}},destroy:function(){j(u,this);
},options:{name:"DropTargetArea",group:"default",filter:null}});
var p=X.extend({init:function(Z,aa){var ab=this;
X.fn.init.call(ab,Z,aa);
ab._activated=false;
ab.userEvents=new W(ab.element,{global:true,allowSelection:true,filter:ab.options.filter,threshold:ab.options.distance,start:O(ab._start,ab),hold:O(ab._hold,ab),move:O(ab._drag,ab),end:O(ab._end,ab),cancel:O(ab._cancel,ab),select:O(ab._select,ab)});
ab._afterEndHandler=O(ab._afterEnd,ab);
ab._captureEscape=O(ab._captureEscape,ab);
},events:[D,s,l,n,m,C],options:{name:"Draggable",distance:E.support.touch?0:5,group:"default",cursorOffset:null,axis:null,container:null,filter:null,ignore:null,holdToDrag:false,autoScroll:false,dropped:false},cancelHold:function(){this._activated=false;
},_captureEscape:function(Z){var aa=this;
if(Z.keyCode===E.keys.ESC){aa._trigger(m,{event:Z});
aa.userEvents.cancel();
}},_updateHint:function(ad){var af=this,ab,ae=af.options,aa=af.boundaries,Z=ae.axis,ac=af.options.cursorOffset;
if(ac){ab={left:ad.x.location+ac.left,top:ad.y.location+ac.top};
}else{af.hintOffset.left+=ad.x.delta;
af.hintOffset.top+=ad.y.delta;
ab=b.extend({},af.hintOffset);
}if(aa){ab.top=Y(ab.top,aa.y);
ab.left=Y(ab.left,aa.x);
}if(Z==="x"){delete ab.top;
}else{if(Z==="y"){delete ab.left;
}}af.hint.css(ab);
},_shouldIgnoreTarget:function(aa){var Z=this.options.ignore;
return Z&&b(aa).is(Z);
},_select:function(Z){if(!this._shouldIgnoreTarget(Z.event.target)){Z.preventDefault();
}},_start:function(aa){var ae=this,ad=ae.options,Z=ad.container,ab=ad.hint;
if(this._shouldIgnoreTarget(aa.touch.initialTouch)||ad.holdToDrag&&!ae._activated){ae.userEvents.cancel();
return;
}ae.currentTarget=aa.target;
ae.currentTargetOffset=B(ae.currentTarget);
if(ab){if(ae.hint){ae.hint.stop(true,true).remove();
}ae.hint=E.isFunction(ab)?b(ab.call(ae,ae.currentTarget)):ab;
var ac=B(ae.currentTarget);
ae.hintOffset=ac;
ae.hint.css({position:"absolute",zIndex:20000,left:ac.left,top:ac.top}).appendTo(k.body);
ae.angular("compile",function(){ae.hint.removeAttr("ng-repeat");
var af=b(aa.target);
while(!af.data("$$kendoScope")&&af.length){af=af.parent();
}return{elements:ae.hint.get(),scopeFrom:af.data("$$kendoScope")};
});
}q[ad.group]=ae;
ae.dropped=false;
if(Z){ae.boundaries=h(Z,ae.hint);
}b(k).on(F,ae._captureEscape);
if(ae._trigger(s,aa)){ae.userEvents.cancel();
ae._afterEnd();
}ae.userEvents.capture();
},_hold:function(Z){this.currentTarget=Z.target;
if(this._trigger(D,Z)){this.userEvents.cancel();
}else{this._activated=true;
}},_drag:function(aa){aa.preventDefault();
var Z=this._elementUnderCursor(aa);
if(this.options.autoScroll&&this._cursorElement!==Z){this._scrollableParent=A(Z);
this._cursorElement=Z;
}this._lastEvent=aa;
this._processMovement(aa,Z);
if(this.options.autoScroll){if(this._scrollableParent[0]){var ab=d(aa.x.location,aa.y.location,Q(this._scrollableParent));
this._scrollCompenstation=b.extend({},this.hintOffset);
this._scrollVelocity=ab;
if(ab.y===0&&ab.x===0){clearInterval(this._scrollInterval);
this._scrollInterval=null;
}else{if(!this._scrollInterval){this._scrollInterval=setInterval(b.proxy(this,"_autoScroll"),50);
}}}}if(this.hint){this._updateHint(aa);
}},_processMovement:function(aa,Z){this._withDropTarget(Z,function(ab,ac){if(!ab){if(G){G._trigger(r,z(aa,{dropTarget:b(G.targetElement)}));
G=null;
}return;
}if(G){if(ac===G.targetElement){return;
}G._trigger(r,z(aa,{dropTarget:b(G.targetElement)}));
}ab._trigger(o,z(aa,{dropTarget:b(ac)}));
G=z(ab,{targetElement:ac});
});
this._trigger(l,z(aa,{dropTarget:G,elementUnderCursor:Z}));
},_autoScroll:function(){var ac=this._scrollableParent[0],ad=this._scrollVelocity,Z=this._scrollCompenstation;
if(!ac){return;
}var aa=this._elementUnderCursor(this._lastEvent);
this._processMovement(this._lastEvent,aa);
var aj,ag;
var ab=ac===P()[0];
if(ab){aj=k.body.scrollHeight>c.height();
ag=k.body.scrollWidth>c.width();
}else{aj=ac.offsetHeight<=ac.scrollHeight;
ag=ac.offsetWidth<=ac.scrollWidth;
}var ah=ac.scrollTop+ad.y;
var ai=aj&&ah>0&&ah<ac.scrollHeight;
var ae=ac.scrollLeft+ad.x;
var af=ag&&ae>0&&ae<ac.scrollWidth;
if(ai){ac.scrollTop+=ad.y;
}if(af){ac.scrollLeft+=ad.x;
}if(ab&&(af||ai)){if(ai){Z.top+=ad.y;
}if(af){Z.left+=ad.x;
}this.hint.css(Z);
}},_end:function(Z){this._withDropTarget(this._elementUnderCursor(Z),function(aa,ab){if(aa){aa._drop(z({},Z,{dropTarget:b(ab)}));
G=null;
}});
this._cancel(this._trigger(n,Z));
},_cancel:function(Z){var aa=this;
aa._scrollableParent=null;
this._cursorElement=null;
clearInterval(this._scrollInterval);
aa._activated=false;
if(aa.hint&&!aa.dropped){setTimeout(function(){aa.hint.stop(true,true);
if(Z){aa._afterEndHandler();
}else{aa.hint.animate(aa.currentTargetOffset,"fast",aa._afterEndHandler);
}},0);
}else{aa._afterEnd();
}},_trigger:function(aa,Z){var ab=this;
return ab.trigger(aa,z({},Z.event,{x:Z.x,y:Z.y,currentTarget:ab.currentTarget,initialTarget:Z.touch?Z.touch.initialTouch:null,dropTarget:Z.dropTarget,elementUnderCursor:Z.elementUnderCursor}));
},_elementUnderCursor:function(Z){var ab=y(Z),aa=this.hint;
if(aa&&i(aa[0],ab)){aa.hide();
ab=y(Z);
if(!ab){ab=y(Z);
}aa.show();
}return ab;
},_withDropTarget:function(ab,aa){var ad,ac=this.options.group,ae=x[ac],Z=u[ac];
if(ae&&ae.length||Z&&Z.length){ad=f(ab,ae,Z);
if(ad){aa(ad.target,ad.targetElement);
}else{aa();
}}},destroy:function(){var Z=this;
X.fn.destroy.call(Z);
Z._afterEnd();
Z.userEvents.destroy();
this._scrollableParent=null;
this._cursorElement=null;
clearInterval(this._scrollInterval);
Z.currentTarget=null;
},_afterEnd:function(){var Z=this;
if(Z.hint){Z.hint.remove();
}delete q[Z.options.group];
Z.trigger("destroy");
Z.trigger(C);
b(k).off(F,Z._captureEscape);
}});
E.ui.plugin(v);
E.ui.plugin(w);
E.ui.plugin(p);
E.TapCapture=S;
E.containerBoundaries=h;
z(E.ui,{Pane:K,PaneDimensions:N,Movable:H});
function Q(Z){var ac=P()[0],ab,ad,aa;
if(Z[0]===ac){ad=ac.scrollTop;
aa=ac.scrollLeft;
return{top:ad,left:aa,bottom:ad+c.height(),right:aa+c.width()};
}else{ab=Z.offset();
ab.bottom=ab.top+Z.height();
ab.right=ab.left+Z.width();
return ab;
}}function P(){return b(E.support.browser.chrome?k.body:k.documentElement);
}function A(Z){var ab=P();
if(!Z||Z===k.body||Z===k.documentElement){return ab;
}var aa=b(Z)[0];
while(aa&&!E.isScrollable(aa)&&aa!==k.body){aa=aa.parentNode;
}if(aa===k.body){return ab;
}return b(aa);
}function d(aa,ab,ac){var ad={x:0,y:0};
var Z=50;
if(aa-ac.left<Z){ad.x=-(Z-(aa-ac.left));
}else{if(ac.right-aa<Z){ad.x=Z-(ac.right-aa);
}}if(ab-ac.top<Z){ad.y=-(Z-(ab-ac.top));
}else{if(ac.bottom-ab<Z){ad.y=Z-(ac.bottom-ab);
}}return ad;
}E.ui.Draggable.utils={autoScrollVelocity:d,scrollableViewPort:Q,findScrollableParent:A};
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
