(function(a,b,c){Type.registerNamespace("Telerik.Web.UI");
a.registerEnum(b,"ProgressBarType",{Value:0,Percent:1,Chunk:2});
a.registerEnum(b,"ProgressBarOrientation",{Horizontal:0,Vertical:1});
})($telerik.$,Telerik.Web.UI);
(function(a,b,K){$telerik.toProgressBar=function(N){return N;
};
$telerik.findProgressBar=$find;
var l=5,n=0,m=100,o=0,j=400,G="rpbRtl",p="rpbDisabled",i="rpbStateCompleted",r="rpbIndeterminate",J="rpbStateSelected",I="rpbStateDefault",q="rpbChunkFirst",z="rpbChunkLast",g="rpbChunksWrapper",e="rpbChunk",x="rpbLabelWrapper",u="rpbLabel",H="li."+J,k="li."+I,E="div."+J,f="ul."+g,d="li."+e,y="."+z,w="."+x,t="."+u,A="load",s="initialize",M="valueChanging",L="valueChanged",h="completed",D=3,F='<div class="'+J+'" style="width:0%;"></div>',v='<span class="'+x+'"><span class="'+u+'"></span></span>',C=b.ProgressBarOrientation,c=b.ProgressBarType,B=Math;
b.RadProgressBar=function(N){var O=this;
O._initialized=false;
O._element=N;
O._wrapper=a(N);
O._isRightToLeft=false;
O._showLabel=true;
O._enabled=true;
O._value=a(N).hasClass(r)?false:o;
O._progressProperty="width";
O._isStarted=false;
O._animationSettings={duration:j,enableChunkAnimation:false};
b.RadProgressBar.initializeBase(O,[N]);
};
b.RadProgressBar.prototype={initialize:function(){var N=this;
N._setRightToLeft();
N.raiseEvent(s);
N._initializeAnimationDelegates();
N._initializeProgressProperty();
N._initialized=true;
N.raiseEvent(A);
N.updateClientState();
},_setRightToLeft:function(){var O=this,N=$telerik.isRightToLeft(O.get_element());
if(N){O._isRightToLeft=true;
O._wrapper.addClass(G);
}},_initializeAnimationDelegates:function(){var N=this;
N._progressAnimationStartDelegate=Function.createDelegate(N,N._onProgressAnimationStart);
N._progressAnimationProgressDelegate=Function.createDelegate(N,N._onProgressAnimationProgress);
N._progressAnimationCompleteDelegate=Function.createDelegate(N,N._onProgressAnimationComplete);
N._progressAnimationAlwaysDelegate=Function.createDelegate(N,N._onProgressAnimationAlways);
},_initializeProgressProperty:function(){if(this.get_orientation()==C.Vertical){this._progressProperty="height";
}},find:function(N){return this._wrapper.find(N);
},dispose:function(){},repaint:function(){},get_value:function(){var P=this,Q=P._value;
if(Q===K||Q===false||isNaN(Q)){return K;
}else{var O=P.get_minValue(),N=P.get_maxValue();
return B.min(B.max(P._value,O),N);
}},set_value:function(P){var O=this;
if(!O._initialized){O._value=P;
}else{var N=O._raiseValueChanging(P);
if(!N.get_cancel()){O._setValue(N.get_value());
}}},_raiseValueChanging:function(O){var N=new b.ProgressBarCancelEventArgs(O);
this.raiseEvent(M,N);
return N;
},_raiseCompleted:function(){var N=this;
if(N.isCompleted()){N.raiseEvent(h,new Sys.EventArgs());
}},isCompleted:function(){return this.get_value()>=this.get_maxValue();
},_setValue:function(Q){var P=this,N=P.get_value();
if(Q===K||Q===false){P._setIndeterminate();
}else{var O=P._roundValue(Q);
if(O!=N&&O>=P.get_minValue()&&O<=P.get_maxValue()){P._isStarted=true;
}P._value=O;
if(P._wrapper.hasClass(r)){P._wrapper.removeClass(r);
P._ensureProgressElements();
}if(P.get_barType()!=c.Chunk){P._updateProgress();
}else{P._udateChunks();
}}P.updateClientState();
},_setIndeterminate:function(){var N=this;
N._wrapper.addClass(r).find(E+","+w+","+f).remove();
N._progressWrapper=null;
N._value=K;
N.raiseEvent(L,new Sys.EventArgs());
},_ensureProgressElements:function(){var N=this;
if(N.get_barType()!=c.Chunk){N._wrapper.prepend(F);
N._ensureLabelElements();
}else{N._ensureChunkElements();
}},_ensureChunkElements:function(){var N=this;
if(N.find(f).length==0){N._addChunkProgressWrapper();
}},_addChunkProgressWrapper:function(){var Q=this,N=Q.get_chunksCount(),O="";
if(N<=1){N=l;
Q.set_chunksCount(N);
}O+='<ul class="'+g+'">';
for(var P=N;
P>=0;
P--){O+='<li class="'+e+" "+I+'"></li>';
}O+="</ul>";
Q._wrapper.prepend(O).find(d).css(Q._progressProperty,Q._roundValue(100/N)+"%").first().addClass(q).end().last().addClass(z);
Q._normalizeChunkSize();
},_normalizeChunkSize:function(){var Q=this,P=Q.find(y),N=parseFloat(P[0].style[Q._progressProperty]),O=100-(Q.get_chunksCount()*N);
if(O>0){P.css(Q._progressProperty,(N+O)+"%");
}},_updateProgress:function(){var P=this,N={},O=!P._isStarted?0:P.get_animationSettings().duration||0;
N[P._progressProperty]=P._calculatePercentage()+"%";
P._getProgressWrapper().stop().animate(N,{duration:O,start:P._progressAnimationStartDelegate,progress:P._progressAnimationProgressDelegate,complete:P._progressAnimationCompleteDelegate,always:P._progressAnimationAlwaysDelegate});
},_onProgressAnimationStart:function(){this._getProgressWrapper().show();
},_onProgressAnimationProgress:function(){var N=this;
if(N.get_showLabel()){N._updateLabelWrapperSize();
}N._updateCompletion();
},_onProgressAnimationComplete:function(){var P=this,Q=P.get_value(),N=P._calculatePercentage()+"%",O=P._getProgressWrapper();
O.css(P._progressProperty,N);
P._updateLabelText();
if(Q<=P.get_minValue()){O.hide();
}},_onProgressAnimationAlways:function(){var N=this,O=N.get_value();
N.raiseEvent(L,new Sys.EventArgs());
N._raiseCompleted();
if(O<=N.get_minValue()||O>=N.get_maxValue()){N._isStarted=false;
}},_updateLabelText:function(){var O=this,N=(O.get_barType()==c.Percent)?O._calculatePercentage()+"%":O.get_value();
O.set_label(N);
},_updateCompletion:function(){var O=this,N=O._getProgressWrapper(),P=parseInt(N[0].style.width,10);
if(P>=98){N.addClass(i);
}else{N.removeClass(i);
}},_updateLabelWrapperSize:function(){var Q=this,N=Q._getProgressWrapper(),O=parseFloat(N[0].style[Q._progressProperty],10),P=O===0?"":Q._roundValue(10000/O)+"%";
N.find(w).css(Q._progressProperty,P);
},_udateChunks:function(){var Z=this,N=Z.get_chunksCount(),R=Z.get_orientation(),S=Z._calculatePercentage(),T=parseInt(S*100,10)/100,U=parseInt((100/N)*100,10)/100,Q=B.floor(T/U),X=this.get_reversed(),Y=false,O,V;
if((R===C.Horizontal&&!X)||(R===C.Vertical&&X)){O=Z.find(d+":lt("+Q+")");
V=Z.find(H+":gt("+(Q-1)+")");
}else{O=Z.find(d+":gt(-"+(Q+1)+")");
V=Z.find(H+":lt(-"+(Q)+")");
}if(Q==0){V=Z.find(H);
}if(Z.get_animationSettings().enableChunkAnimation){var W=V.get();
var P=O.filter(k).get();
if((Z.get_reversed()||R==C.Vertical)&&!(Z.get_reversed()&&R==C.Vertical)){W.reverse();
P.reverse();
}Y=V.length==0&&P.length==0;
Z.removeSelectionChunksArray=W;
Z.completedChunksArray=P;
if(!Y){if(V.length>0){Z._animateRemoveSelection();
}else{Z._animateCompleteChunks();
}}}else{Y=true;
Z.find("."+J).removeClass(J).addClass(I);
O.removeClass(I).addClass(J);
}if(Y){Z.raiseEvent(L,new Sys.EventArgs());
Z._raiseCompleted();
}},_animateRemoveSelection:function(){var P=this,O=P.removeSelectionChunksArray;
if(O.length==0){P._animateCompleteChunks();
return;
}var N=O.pop();
a(N).fadeOut({duration:P._getChunkAnimationDuration(),complete:function(){a(N).removeClass(J).addClass(I).show();
P._animateRemoveSelection();
}});
},_animateCompleteChunks:function(){var P=this,O=P.completedChunksArray;
if(O.length==0){P.raiseEvent(L,new Sys.EventArgs());
P._raiseCompleted();
return;
}var N=O.shift();
a(N).hide().removeClass(I).addClass(J).fadeIn({duration:P._getChunkAnimationDuration(),complete:function(){P._animateCompleteChunks(O);
}});
},_getChunkAnimationDuration:function(){var O=this.get_animationSettings().duration||400,N=this.get_chunksCount();
if(N<=0){N=l;
}return O/N;
},_calculatePercentage:function(N){var R=this,P=R.get_minValue(),O=R.get_maxValue(),Q=B.abs((O-P)/100),S=R.get_value();
return B.abs((S-P)/Q);
},_roundValue:function(O){O=parseFloat(O,10)||0;
var N=B.pow(10,D);
return B.floor(O*N)/N;
},get_label:function(){return this.find(t).filter(":first").text();
},set_label:function(N){this.find(t).text(N);
},get_enabled:function(){return this._enabled;
},set_enabled:function(O){var N=this;
N._enabled=O;
if(!O){N._wrapper.addClass(p);
}else{N._wrapper.removeClass(p);
}},get_showLabel:function(){return this._showLabel;
},set_showLabel:function(P){var O=this,N=O.get_element();
O._showLabel=P;
if(P&&O.get_barType()!=c.Chunk){O._updateLabelWrapperSize();
a(t,N).show();
}else{a(t,N).hide();
}},_ensureLabelElements:function(){var O=this,N=O.find(w).length>0;
if(!N){O._wrapper.prepend(v);
O._getProgressWrapper().prepend(v);
O._updateLabelText();
O.set_showLabel(O.get_showLabel());
}},get_animationSettings:function(){return this._animationSettings;
},set_animationSettings:function(N){this._animationSettings=N;
},get_progressWrapper:function(){return this._getProgressWrapper()[0];
},_getProgressWrapper:function(){var N=this;
if(!N._progressWrapper){N._progressWrapper=N.find(E+","+f);
}return N._progressWrapper;
},saveClientState:function(){var O=this.get_value(),N=O===K;
return'{"value":'+(N?0:O)+',"indeterminate":'+N+"}";
}};
b.RadProgressBar.registerClass("Telerik.Web.UI.RadProgressBar",b.RadWebControl);
a.registerControlProperties(b.RadProgressBar,{barType:c.Value,orientation:C.Horizontal,reversed:false,chunksCount:l,minValue:n,maxValue:m});
a.registerControlEvents(b.RadProgressBar,[s,A,M,L,h]);
b.ProgressBarCancelEventArgs=function(N){b.ProgressBarCancelEventArgs.initializeBase(this);
this._value=N;
};
b.ProgressBarCancelEventArgs.prototype={get_value:function(){return this._value;
},set_value:function(N){this._value=N;
}};
b.ProgressBarCancelEventArgs.registerClass("Telerik.Web.UI.ProgressBarCancelEventArgs",Sys.CancelEventArgs);
})($telerik.$,Telerik.Web.UI);