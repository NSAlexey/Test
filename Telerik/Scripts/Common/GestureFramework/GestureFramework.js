(function(b,a){a.fn.gestures=function(e){var d;
if(a(this).length>1){d=a(a(this).get(0));
}else{d=a(this);
}return c.Create(d,e);
};
function c(d,e){this._$element=d;
this._options=a.extend({},c.Defaults,e);
this._startTime={};
this._fingerData=[];
this._previousTouchEndTime=0;
this._doubleTapStartTime=null;
this._cancelEvent=false;
this._tapHoldFired=false;
this._numberOfTouches=0;
this._isGesturePerformed=false;
this._bounds={};
this._instanceData={};
this._init();
}c.Create=function(d,e){return new c(d,e);
};
c.Defaults={threshold:75,fingerReleaseThreshold:250,pinchThreshold:20,holdThreshold:500,doubleTapThreshold:200,tapRadius:10,swipeFingersCount:1,alwaysPreventDefault:true,ignoreMoveEvents:false};
c.CalculateAngle=function(e){var g=e.start.x-e.end.x;
var h=e.start.y-e.end.y;
var f=Math.atan2(h,g);
var d=Math.round(f*180/Math.PI);
if(d<0){d=360-Math.abs(d);
}return d;
};
c.CalculateFingerMovementDistance=function(d){return Math.sqrt(Math.pow((d.start.x-d.end.x),2)+Math.pow((d.start.y-d.end.y),2));
};
c.CalculateTwoFingersDistance=function(e,g){var f=Math.sqrt(Math.pow((e.start.x-g.start.x),2)+Math.pow((e.start.y-g.start.y),2));
var d=Math.sqrt(Math.pow((e.end.x-g.end.x),2)+Math.pow((e.end.y-g.end.y),2));
return d-f;
};
c.CalculateDirection=function(e){var d=c.CalculateAngle(e);
if((d<=45)&&(d>=0)){return"left";
}else{if((d<=360)&&(d>=315)){return"left";
}else{if((d>=135)&&(d<=225)){return"right";
}else{if((d>45)&&(d<135)){return"up";
}else{return"down";
}}}}};
c.prototype={_init:function(){var d=this._$element;
d.data("options",this._options);
this._startDelegate=a.proxy(this._start,this);
this._moveDelegate=a.proxy(this._move,this);
this._endDelegate=a.proxy(this._end,this);
this._leaveDelegate=a.proxy(this._leave,this);
if(Telerik.Web.BrowserFeatures.pointerEvents){d.on("pointerdown",this._startDelegate).on("pointerup",this._endDelegate).on("pointermove",this._moveDelegate).on("pointerout",this._leaveDelegate);
if(this._options.alwaysPreventDefault){d.css("-ms-touch-action","none");
}else{d.css("-ms-touch-action","manipulation");
}}else{if($telerik.isIE10){d.on("MSPointerDown",this._startDelegate).on("MSPointerUp",this._endDelegate).on("MSPointerMove",this._moveDelegate).on("MSPointerOut",this._leaveDelegate);
if(this._options.alwaysPreventDefault){d.css("-ms-touch-action","none");
}else{d.css("-ms-touch-action","manipulation");
}}else{d.on("touchstart",this._startDelegate).on("touchend",this._endDelegate).on("touchmove",this._moveDelegate);
}}this._bounds=this._getBounds(d);
this._instanceData={name:this._options.instanceName,time:new Date().getTime()};
},_start:function(d){var g=d.originalEvent;
if(($telerik.isIE10&&g.pointerType!==2)||(Telerik.Web.BrowserFeatures.pointerEvents&&g.pointerType!=="touch")){return;
}this._startTime=this._getTimeStamp();
if(this._fingerData.length===0){this._tapHoldFired=false;
setTimeout(a.proxy(this._tapHoldCallBack,this,d),this._options.holdThreshold);
}if($telerik.isIE10||Telerik.Web.BrowserFeatures.pointerEvents||!g.touches){this._createFingerData(g);
}else{this._fingerData=[];
for(var f=0;
f<=g.touches.length-1;
f++){this._createFingerData(g.touches[f],f);
}}this._fireEvent(this._options.touchStart,{domEvent:d,points:this._fingerData});
if(this._options.alwaysPreventDefault){d.preventDefault();
}},_end:function(d){var h=this._options;
var i=d.originalEvent;
var f;
var g;
this._numberOfTouches=($telerik.isIE||$telerik.isSpartan||!i.touches)?this._numberOfTouches-1:i.touches.length;
if(($telerik.isIE10&&i.pointerType!==2)||(Telerik.Web.BrowserFeatures.pointerEvents&&i.pointerType!=="touch")||this._tapHoldFired){this._numberOfTouches=0;
return;
}this._fireEvent(this._options.touchEnd,{domEvent:d,points:this._fingerData});
if(this._fingerData.length>1&&!this._previousTouchEndTime&&this._numberOfTouches>0){this._startMultiFingerRelease();
}else{if(this._numberOfTouches===0){f=this._getTimeStamp()-this._startTime;
g=this._validateFingerCount();
if((this._inMultiFingerRelease()||this._fingerData.length>1)&&!this._doubleTapStartTime){if(this._isGesturePinch()){this._fireSpecificPinch(d);
}else{if(g&&this._validateMultiFingerSwipe()){this._handleSwipe(d);
}}this._clearState();
this._cancelEvent=false;
}else{if(g&&this._validateSwipeDistance(c.CalculateFingerMovementDistance(this._fingerData[0]))){this._handleSwipe(d);
this._clearState();
this._cancelEvent=false;
}else{if(h.doubleTap){if(this._doubleTapStartTime&&((this._getTimeStamp()-this._doubleTapStartTime)<=h.doubleTapThreshold)){this._cancelEvent=true;
this._fireEvent(h.doubleTap,d);
this._clearState();
return;
}this._doubleTapStartTime=this._getTimeStamp();
setTimeout(a.proxy(this._singleTapCallBack,this,d),h.doubleTapThreshold);
}else{if(f<h.holdThreshold&&this._validateTap()){this._fireEvent(h.tap,d);
this._clearState();
}}}}setTimeout(a.proxy(this._isGestureValid,this),Math.max(h.doubleTapThreshold,h.holdThreshold));
}}},_move:function(d){var h=this._validateFingerCount();
var j=this._options;
var k=d.originalEvent;
var f=($telerik.isIE||$telerik.isSpartan||!k.touches)?this._numberOfTouches-1:k.touches.length;
if(($telerik.isIE10&&k.pointerType!==2)||(Telerik.Web.BrowserFeatures.pointerEvents&&k.pointerType!=="touch")||this._tapHoldFired){return;
}if(j.ignoreMoveEvents){if(j.alwaysPreventDefault){d.preventDefault();
}return;
}if($telerik.isIE10||Telerik.Web.BrowserFeatures.pointerEvents||!k.touches){this._updateFingerData(k);
}else{if(!this._inMultiFingerRelease()){for(var g=0;
g<=k.touches.length-1;
g++){this._updateFingerData(k.touches[g],g);
}}}this._fireEvent(j.move,{eventData:d,points:this._fingerData});
if(this._fingerData.length==2&&this._isGesturePinch()&&!this._cancelEvent){this._fireEvent(this._options.pinch,{eventData:d,distance:this._getPinchDistance(),points:this._fingerData});
}else{if(h&&this._validateMultiFingerSwipe()){this._fireEvent(this._options.swipe,{eventData:d,direction:this._fingerData[0].direction,distance:this._calculateSwipeDistance(),points:this._fingerData});
}}if(j.alwaysPreventDefault||(j.swipeFingersCount==f&&(j.swipeLeft||j.swipeRight||j.swipeUp||j.swipeDown||j.swipe))||((j.pinchIn||j.pinchOut||j.pinch)&&f==2)){d.preventDefault();
}},_leave:function(d){var f=d.originalEvent;
if(!this._isInBoundaries(f,this._bounds)){this._cancelEvent=true;
this._numberOfTouches--;
if(this._numberOfTouches<=0){this._clearState();
this._cancelEvent=false;
}}},_isInBoundaries:function(e,d){return(e.pageX>d.left&&e.pageX<d.right&&e.pageY>d.top&&e.pageY<d.bottom);
},_getBounds:function(e){var f=e.offset();
var d={left:f.left,right:f.left+e.outerWidth(),top:f.top,bottom:f.top+e.outerHeight()};
return d;
},_tapHoldCallBack:function(d){var f=this._getTimeStamp()-this._startTime;
if(!this._cancelEvent&&this._validateTap()&&this._numberOfTouches>0&&this._doubleTapStartTime===null&&f>=this._options.holdThreshold){this._fireEvent(this._options.tapHold,d);
this._clearState();
this._tapHoldFired=true;
}},_singleTapCallBack:function(d){if(!this._cancelEvent&&this._validateTap()){this._fireEvent(this._options.tap,d);
this._clearState();
}this._cancelEvent=false;
},_calculateSwipeDistance:function(){var e=0;
var f;
for(var d=0;
d<this._fingerData.length;
d++){f=c.CalculateFingerMovementDistance(this._fingerData[d]);
if(this._validateSwipeDistance(f)&&e<f){e=f;
}}return f;
},_clearState:function(){this._doubleTapStartTime=null;
this._startTime=null;
this._numberOfTouches=0;
this._fingerData=[];
},_isGestureValid:function(){if(!this._isGesturePerformed&&!this._inMultiFingerRelease()){this._clearState();
}this._isGesturePerformed=false;
},_validateMultiFingerSwipe:function(){var e=true;
for(var d=0;
d<this._fingerData.length;
d++){if(!this._validateSwipeDistance(c.CalculateFingerMovementDistance(this._fingerData[d]))){e=false;
break;
}}return e;
},_validateSwipeDistance:function(d){if(d>this._options.threshold){return true;
}return false;
},_handleSwipe:function(d){var f=c.CalculateDirection(this._fingerData[0]);
var g;
if(!this._cancelEvent){g=f.charAt(0).toUpperCase()+f.substring(1);
this._fireEvent(this._options["swipe"+g],{eventData:d,direction:this._fingerData[0].direction,distance:this._calculateSwipeDistance()});
}},_fireSpecificPinch:function(d){var f=this._getPinchDistance();
if(f>0){this._fireEvent(this._options.pinchOut,{eventData:d,distance:this._getPinchDistance(),points:this._fingerData});
}else{this._fireEvent(this._options.pinchIn,{eventData:d,distance:this._getPinchDistance(),points:this._fingerData});
}},_getPinchDistance:function(){return c.CalculateTwoFingersDistance(this._fingerData[0],this._fingerData[1]);
},_isGesturePinch:function(){return(this._fingerData.length===2)&&(c.CalculateDirection(this._fingerData[0])!==c.CalculateDirection(this._fingerData[1]))&&(Math.abs(this._getPinchDistance())>this._options.pinchThreshold);
},_validateFingerCount:function(){return this._fingerData.length===this._options.swipeFingersCount;
},_createFingerData:function(e,f){var d={start:{x:e.pageX,y:e.pageY},end:{x:e.pageX,y:e.pageY},identifier:(e.pointerId)?e.pointerId:f,direction:null};
this._numberOfTouches++;
this._fingerData.push(d);
},_updateFingerData:function(g,k){var f;
var m=this._options;
var j=(g.pointerId)?g.pointerId:k;
var d;
var e;
var l;
if(this._fingerData.length===0){return;
}for(var h=0;
h<this._fingerData.length;
h++){if(this._fingerData[h].identifier===j){f=this._fingerData[h];
break;
}}if(!f){return;
}if(f.end.x!==g.pageX||f.end.y!==g.pageY){d=Math.abs(f.end.x-g.pageX);
e=Math.abs(f.end.y-g.pageY);
f.end.x=g.pageX;
f.end.y=g.pageY;
l=c.CalculateDirection(f);
if(f.direction===null&&(d>m.tapRadius||e>m.tapRadius)){f.direction=l;
}else{if(f.direction!==null&&f.direction!==l){this._cancelEvent=true;
}}}},_inMultiFingerRelease:function(){var e=false;
var d;
if(this._previousTouchEndTime){d=this._getTimeStamp()-this._previousTouchEndTime;
if(d<=this._options.fingerReleaseThreshold){e=true;
}}return e&&(this._fingerData.length>1);
},_validateTap:function(){if(!this._fingerData){return false;
}if(this._fingerData.length==1&&this._fingerData[0].direction===null){return true;
}return false;
},_startMultiFingerRelease:function(){this._previousTouchEndTime=this._getTimeStamp();
},_fireEvent:function(e,d){if(e){e(d);
}this._isGesturePerformed=true;
},_getTimeStamp:function(){return new Date().getTime();
},destroy:function(){if(Telerik.Web.BrowserFeatures.pointerEvents){this._$element.off("pointerdown",this._startDelegate).off("pointerup",this._endDelegate).off("pointermove",this._moveDelegate).off("pointerout",this._leaveDelegate);
}else{if($telerik.isIE10){this._$element.off("MSPointerDown",this._startDelegate).off("MSPointerUp",this._endDelegate).off("MSPointerMove",this._moveDelegate).off("MSPointerOut",this._leaveDelegate);
}else{this._$element.off("touchstart",this._startDelegate).off("touchend",this._endDelegate).off("touchmove",this._moveDelegate);
}}this._$element.removeData("options");
this._options=this._startTime=this._fingerData=this._previousTouchEndTime=this._doubleTapStartTime=this._cancelEvent=this._tapHoldFired=this._numberOfTouches=this._startDelegate=this._endDelegate=this._moveDelegate=this._leaveDelegate=this._bounds=null;
}};
})($telerik,$telerik.$);
