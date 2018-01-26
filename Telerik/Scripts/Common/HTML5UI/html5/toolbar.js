(function(b,a){a("kendo.toolbar",["kendo.core","kendo.userevents","kendo.popup"],b);
}(function(){var a={id:"toolbar",name:"ToolBar",category:"web",description:"The ToolBar widget displays one or more command buttons divided into groups.",depends:["core"]};
(function(b,an){var x=window.kendo,k=x.Class,ao=x.ui.Widget,V=b.proxy,v=x.isFunction,z=x.keys,D=x._outerWidth,ai="k-toolbar",f="k-button",H="k-overflow-button",af="k-toggle-button",g="k-button-group",Y="k-split-button",X="k-separator",S="k-popup",W="k-toolbar-resizable",aa="k-state-active",ab="k-state-disabled",ac="k-state-hidden",s="k-group-start",r="k-group-end",U="k-primary",t="k-icon",u="k-i-",h="k-button-icon",i="k-button-icontext",B="k-list-container k-split-container",Z="k-split-button-arrow",F="k-overflow-anchor",J="k-overflow-container",p="k-toolbar-first-visible",A="k-toolbar-last-visible",l="click",ae="toggle",C="open",m="close",M="overflowOpen",I="overflowClose",L="never",G="auto",E="always",K="k-overflow-hidden",y=x.attr("uid");
x.toolbar={};
var n={overflowAnchor:'<div tabindex="0" class="k-overflow-anchor"></div>',overflowContainer:'<ul class="k-overflow-container k-list-container"></ul>'};
x.toolbar.registerComponent=function(ap,ar,aq){n[ap]={toolbar:ar,overflow:aq};
};
var w=x.Class.extend({addOverflowAttr:function(){this.element.attr(x.attr("overflow"),this.options.overflow||G);
},addUidAttr:function(){this.element.attr(y,this.options.uid);
},addIdAttr:function(){if(this.options.id){this.element.attr("id",this.options.id);
}},addOverflowIdAttr:function(){if(this.options.id){this.element.attr("id",this.options.id+"_overflow");
}},attributes:function(){if(this.options.attributes){this.element.attr(this.options.attributes);
}},show:function(){this.element.removeClass(ac).show();
this.options.hidden=false;
},hide:function(){this.element.addClass(ac).hide();
this.options.hidden=true;
},remove:function(){this.element.remove();
},enable:function(ap){if(ap===an){ap=true;
}this.element.toggleClass(ab,!ap);
this.options.enable=ap;
},twin:function(){var ap=this.element.attr(y);
if(this.overflow){return this.toolbar.element.find("["+y+"='"+ap+"']").data(this.options.type);
}else{if(this.toolbar.options.resizable){return this.toolbar.popup.element.find("["+y+"='"+ap+"']").data(this.options.type);
}}}});
x.toolbar.Item=w;
var e=w.extend({init:function(aq,ar){var ap=aq.useButtonTag?b('<button tabindex="0"></button>'):b('<a href tabindex="0"></a>');
this.element=ap;
this.options=aq;
this.toolbar=ar;
this.attributes();
if(aq.primary){ap.addClass(U);
}if(aq.togglable){ap.addClass(af);
this.toggle(aq.selected);
}if(aq.url!==an&&!aq.useButtonTag){ap.attr("href",aq.url);
if(aq.mobile){ap.attr(x.attr("role"),"button");
}}if(aq.group){ap.attr(x.attr("group"),aq.group);
this.group=this.toolbar.addToGroup(this,aq.group);
}if(!aq.togglable&&aq.click&&v(aq.click)){this.clickHandler=aq.click;
}if(aq.togglable&&aq.toggle&&v(aq.toggle)){this.toggleHandler=aq.toggle;
}},toggle:function(aq,ap){aq=!!aq;
if(this.group&&aq){this.group.select(this);
}else{if(!this.group){this.select(aq);
}}if(ap&&this.twin()){this.twin().toggle(aq);
}},getParentGroup:function(){if(this.options.isChild){return this.element.closest("."+g).data("buttonGroup");
}},_addGraphics:function(){var ap=this.element,aq=this.options.icon,aw=this.options.spriteCssClass,ar=this.options.imageUrl,au,av,at;
if(aw||ar||aq){au=true;
ap.contents().filter(function(){return !b(this).hasClass("k-sprite")&&!b(this).hasClass(t)&&!b(this).hasClass("k-image");
}).each(function(ay,ax){if(ax.nodeType==1||ax.nodeType==3&&b.trim(ax.nodeValue).length>0){au=false;
}});
if(au){ap.addClass(h);
}else{ap.addClass(i);
}}if(aq){av=ap.children("span."+t).first();
if(!av[0]){av=b('<span class="'+t+'"></span>').prependTo(ap);
}av.addClass(u+aq);
}else{if(aw){av=ap.children("span.k-sprite").first();
if(!av[0]){av=b('<span class="k-sprite '+t+'"></span>').prependTo(ap);
}av.addClass(aw);
}else{if(ar){at=ap.children("img.k-image").first();
if(!at[0]){at=b('<img alt="icon" class="k-image" />').prependTo(ap);
}at.attr("src",ar);
}}}}});
x.toolbar.Button=e;
var aj=e.extend({init:function(aq,ar){e.fn.init.call(this,aq,ar);
var ap=this.element;
ap.addClass(f);
this.addIdAttr();
if(aq.align){ap.addClass("k-align-"+aq.align);
}if(aq.showText!="overflow"&&aq.text){if(aq.mobile){ap.html('<span class="km-text">'+aq.text+"</span>");
}else{ap.html(aq.text);
}}aq.hasIcon=aq.showIcon!="overflow"&&(aq.icon||aq.spriteCssClass||aq.imageUrl);
if(aq.hasIcon){this._addGraphics();
}this.addUidAttr();
this.addOverflowAttr();
this.enable(aq.enable);
if(aq.hidden){this.hide();
}this.element.data({type:"button",button:this});
},select:function(ap){if(ap===an){ap=false;
}this.element.toggleClass(aa,ap);
this.options.selected=ap;
}});
x.toolbar.ToolBarButton=aj;
var N=e.extend({init:function(aq,ar){this.overflow=true;
e.fn.init.call(this,aq,ar);
var ap=this.element;
if(aq.showText!="toolbar"&&aq.text){if(aq.mobile){ap.html('<span class="km-text">'+aq.text+"</span>");
}else{ap.html('<span class="k-text">'+aq.text+"</span>");
}}aq.hasIcon=aq.showIcon!="toolbar"&&(aq.icon||aq.spriteCssClass||aq.imageUrl);
if(aq.hasIcon){this._addGraphics();
}if(!aq.isChild){this._wrap();
}this.addOverflowIdAttr();
this.attributes();
this.addUidAttr();
this.addOverflowAttr();
this.enable(aq.enable);
ap.addClass(H+" "+f);
if(aq.hidden){this.hide();
}this.element.data({type:"button",button:this});
},_wrap:function(){this.element=this.element.wrap("<li></li>").parent();
},overflowHidden:function(){this.element.addClass(K);
},select:function(ap){if(ap===an){ap=false;
}if(this.options.isChild){this.element.toggleClass(aa,ap);
}else{this.element.find(".k-button").toggleClass(aa,ap);
}this.options.selected=ap;
}});
x.toolbar.OverflowButton=N;
x.toolbar.registerComponent("button",aj,N);
var j=w.extend({createButtons:function(ap){var au=this.options;
var at=au.buttons||[];
var ar;
for(var aq=0;
aq<at.length;
aq++){if(!at[aq].uid){at[aq].uid=x.guid();
}ar=new ap(b.extend({mobile:au.mobile,isChild:true,type:"button"},at[aq]),this.toolbar);
ar.element.appendTo(this.element);
}},refresh:function(){this.element.children().filter(":not('."+ac+"'):first").addClass(s);
this.element.children().filter(":not('."+ac+"'):last").addClass(r);
}});
x.toolbar.ButtonGroup=j;
var ak=j.extend({init:function(aq,ar){var ap=this.element=b("<div></div>");
this.options=aq;
this.toolbar=ar;
this.addIdAttr();
if(aq.align){ap.addClass("k-align-"+aq.align);
}this.createButtons(aj);
this.attributes();
this.addUidAttr();
this.addOverflowAttr();
this.refresh();
ap.addClass(g);
this.element.data({type:"buttonGroup",buttonGroup:this});
}});
x.toolbar.ToolBarButtonGroup=ak;
var O=j.extend({init:function(aq,ar){var ap=this.element=b("<li></li>");
this.options=aq;
this.toolbar=ar;
this.overflow=true;
this.addOverflowIdAttr();
this.createButtons(N);
this.attributes();
this.addUidAttr();
this.addOverflowAttr();
this.refresh();
ap.addClass((aq.mobile?"":g)+" k-overflow-group");
this.element.data({type:"buttonGroup",buttonGroup:this});
},overflowHidden:function(){this.element.addClass(K);
}});
x.toolbar.OverflowButtonGroup=O;
x.toolbar.registerComponent("buttonGroup",ak,O);
var am=w.extend({init:function(aq,ar){var ap=this.element=b('<div class="'+Y+'" tabindex="0"></div>');
this.options=aq;
this.toolbar=ar;
this.mainButton=new aj(b.extend({},aq,{hidden:false}),ar);
this.arrowButton=b('<a class="'+f+" "+Z+'"><span class="'+(aq.mobile?"km-icon km-arrowdown":"k-icon k-i-arrow-60-down")+'"></span></a>');
this.popupElement=b('<ul class="'+B+'"></ul>');
this.mainButton.element.removeAttr("href tabindex").appendTo(ap);
this.arrowButton.appendTo(ap);
this.popupElement.appendTo(ap);
if(aq.align){ap.addClass("k-align-"+aq.align);
}if(!aq.id){aq.id=aq.uid;
}ap.attr("id",aq.id+"_wrapper");
this.addOverflowAttr();
this.addUidAttr();
this.createMenuButtons();
this.createPopup();
this._navigatable();
this.mainButton.main=true;
this.enable(aq.enable);
if(aq.hidden){this.hide();
}ap.data({type:"splitButton",splitButton:this,kendoPopup:this.popup});
},_navigatable:function(){var ap=this;
ap.popupElement.on("keydown","."+f,function(aq){var ar=b(aq.target).parent();
aq.preventDefault();
if(aq.keyCode===z.ESC||aq.keyCode===z.TAB||aq.altKey&&aq.keyCode===z.UP){ap.toggle();
ap.focus();
}else{if(aq.keyCode===z.DOWN){o(ar,"next").focus();
}else{if(aq.keyCode===z.UP){o(ar,"prev").focus();
}else{if(aq.keyCode===z.SPACEBAR||aq.keyCode===z.ENTER){ap.toolbar.userEvents.trigger("tap",{target:b(aq.target)});
}}}}});
},createMenuButtons:function(){var at=this.options;
var ar=at.menuButtons;
var aq;
for(var ap=0;
ap<ar.length;
ap++){aq=new aj(b.extend({mobile:at.mobile,type:"button",click:at.click},ar[ap]),this.toolbar);
aq.element.wrap("<li></li>").parent().appendTo(this.popupElement);
}},createPopup:function(){var aq=this.options;
var ap=this.element;
this.popupElement.attr("id",aq.id+"_optionlist").attr(y,aq.rootUid);
if(aq.mobile){this.popupElement=c(this.popupElement);
}this.popup=this.popupElement.kendoPopup({appendTo:aq.mobile?b(aq.mobile).children(".km-pane"):null,anchor:ap,isRtl:this.toolbar._isRtl,copyAnchorStyles:false,animation:aq.animation,open:d,activate:function(){this.element.find(":kendoFocusable").first().focus();
},close:function(){ap.focus();
}}).data("kendoPopup");
this.popup.element.on(l,"a.k-button",T);
},remove:function(){this.popup.element.off(l,"a.k-button");
this.popup.destroy();
this.element.remove();
},toggle:function(){this.popup.toggle();
},enable:function(ap){if(ap===an){ap=true;
}this.mainButton.enable(ap);
this.options.enable=ap;
},focus:function(){this.element.focus();
},hide:function(){if(this.popup){this.popup.close();
}this.element.addClass(ac).hide();
this.options.hidden=true;
},show:function(){this.element.removeClass(ac).hide();
this.options.hidden=false;
}});
x.toolbar.ToolBarSplitButton=am;
var Q=w.extend({init:function(au,av){var ap=this.element=b('<li class="'+Y+'"></li>'),at=au.menuButtons,ar;
this.options=au;
this.toolbar=av;
this.overflow=true;
this.mainButton=new N(b.extend({isChild:true},au));
this.mainButton.element.appendTo(ap);
for(var aq=0;
aq<at.length;
aq++){ar=new N(b.extend({mobile:au.mobile,isChild:true},at[aq]),this.toolbar);
ar.element.appendTo(ap);
}this.addUidAttr();
this.addOverflowAttr();
this.mainButton.main=true;
ap.data({type:"splitButton",splitButton:this});
},overflowHidden:function(){this.element.addClass(K);
}});
x.toolbar.OverflowSplitButton=Q;
x.toolbar.registerComponent("splitButton",am,Q);
var al=w.extend({init:function(aq,ar){var ap=this.element=b("<div>&nbsp;</div>");
this.element=ap;
this.options=aq;
this.toolbar=ar;
this.attributes();
this.addIdAttr();
this.addUidAttr();
this.addOverflowAttr();
ap.addClass(X);
ap.data({type:"separator",separator:this});
}});
var P=w.extend({init:function(aq,ar){var ap=this.element=b("<li>&nbsp;</li>");
this.element=ap;
this.options=aq;
this.toolbar=ar;
this.overflow=true;
this.attributes();
this.addUidAttr();
this.addOverflowIdAttr();
ap.addClass(X);
ap.data({type:"separator",separator:this});
},overflowHidden:function(){this.element.addClass(K);
}});
x.toolbar.registerComponent("separator",al,P);
var ad=w.extend({init:function(ar,aq,at){var ap=v(ar)?ar(aq):ar;
if(!(ap instanceof jQuery)){ap=b("<div></div>").html(ap);
}else{ap=ap.wrap("<div></div>").parent();
}this.element=ap;
this.options=aq;
this.options.type="template";
this.toolbar=at;
this.attributes();
this.addUidAttr();
this.addIdAttr();
this.addOverflowAttr();
ap.data({type:"template",template:this});
}});
x.toolbar.TemplateItem=ad;
var R=w.extend({init:function(ar,aq,at){var ap=v(ar)?b(ar(aq)):b(ar);
if(!(ap instanceof jQuery)){ap=b("<li></li>").html(ap);
}else{ap=ap.wrap("<li></li>").parent();
}this.element=ap;
this.options=aq;
this.options.type="template";
this.toolbar=at;
this.overflow=true;
this.attributes();
this.addUidAttr();
this.addOverflowIdAttr();
this.addOverflowAttr();
ap.data({type:"template",template:this});
},overflowHidden:function(){this.element.addClass(K);
}});
x.toolbar.OverflowTemplateItem=R;
function d(){var ap=this.options.anchor,aq=D(ap),ar;
x.wrap(this.element).addClass("k-split-wrapper");
if(this.element.css("box-sizing")!=="border-box"){ar=aq-(D(this.element)-this.element.width());
}else{ar=aq;
}this.element.css({fontFamily:ap.css("font-family"),"min-width":ar});
}function ag(ap){if(!ap.target.is(".k-toggle-button")){ap.target.toggleClass(aa,ap.type=="press");
}}function c(ap){ap=b(ap);
return ap.hasClass("km-actionsheet")?ap.closest(".km-popup-wrapper"):ap.addClass("km-widget km-actionsheet").wrap('<div class="km-actionsheet-wrapper km-actionsheet-tablet km-widget km-popup"></div>').parent().wrap('<div class="km-popup-wrapper k-popup"></div>').parent();
}function T(ap){ap.preventDefault();
}function o(ar,aq){var at=aq==="next"?b.fn.next:b.fn.prev;
var au=aq==="next"?b.fn.first:b.fn.last;
var ap=at.call(ar);
if(ap.is(":kendoFocusable")||!ap.length){return ap;
}if(ap.find(":kendoFocusable").length){return au.call(ap.find(":kendoFocusable"));
}return o(ap,aq);
}var q=k.extend({init:function(ap){this.name=ap;
this.buttons=[];
},add:function(ap){this.buttons[this.buttons.length]=ap;
},remove:function(ap){var aq=b.inArray(ap,this.buttons);
this.buttons.splice(aq,1);
},select:function(ap){var ar;
for(var aq=0;
aq<this.buttons.length;
aq++){ar=this.buttons[aq];
ar.select(false);
}ap.select(true);
if(ap.twin()){ap.twin().select(true);
}}});
var ah=ao.extend({init:function(ap,ar){var at=this;
ao.fn.init.call(at,ap,ar);
ar=at.options;
ap=at.wrapper=at.element;
ap.addClass(ai+" k-widget");
this.uid=x.guid();
this._isRtl=x.support.isRtl(ap);
this._groups={};
ap.attr(y,this.uid);
at.isMobile=typeof ar.mobile==="boolean"?ar.mobile:at.element.closest(".km-root")[0];
at.animation=at.isMobile?{open:{effects:"fade"}}:{};
if(at.isMobile){ap.addClass("km-widget");
t="km-icon";
u="km-";
f="km-button";
g="km-buttongroup km-widget";
aa="km-state-active";
ab="km-state-disabled";
}if(ar.resizable){at._renderOverflow();
ap.addClass(W);
at.overflowUserEvents=new x.UserEvents(at.element,{threshold:5,allowSelection:true,filter:"."+F,tap:V(at._toggleOverflow,at)});
at._resizeHandler=x.onResize(function(){at.resize();
});
}else{at.popup={element:b([])};
}if(ar.items&&ar.items.length){for(var aq=0;
aq<ar.items.length;
aq++){at.add(ar.items[aq]);
}}at.userEvents=new x.UserEvents(document,{threshold:5,allowSelection:true,filter:"["+y+"="+this.uid+"] a."+f+", ["+y+"="+this.uid+"] ."+H,tap:V(at._buttonClick,at),press:ag,release:ag});
at.element.on(l,"a.k-button",T);
at._navigatable();
if(ar.resizable){at.popup.element.on(l,+"a.k-button",T);
}if(ar.resizable){this._toggleOverflowAnchor();
}x.notify(at);
},events:[l,ae,C,m,M,I],options:{name:"ToolBar",items:[],resizable:true,mobile:null},addToGroup:function(ap,ar){var aq;
if(!this._groups[ar]){aq=this._groups[ar]=new q();
}else{aq=this._groups[ar];
}aq.add(ap);
return aq;
},destroy:function(){var ap=this;
ap.element.find("."+Y).each(function(ar,aq){b(aq).data("kendoPopup").destroy();
});
ap.element.off(l,"a.k-button");
ap.userEvents.destroy();
if(ap.options.resizable){x.unbindResize(ap._resizeHandler);
ap.overflowUserEvents.destroy();
ap.popup.element.off(l,"a.k-button");
ap.popup.destroy();
}ao.fn.destroy.call(ap);
},add:function(at){var ap=n[at.type],aw=at.template,ay,ax=this,ar=ax.isMobile?"":"k-item k-state-default",au=at.overflowTemplate,av;
b.extend(at,{uid:x.guid(),animation:ax.animation,mobile:ax.isMobile,rootUid:ax.uid});
if(at.menuButtons){for(var aq=0;
aq<at.menuButtons.length;
aq++){b.extend(at.menuButtons[aq],{uid:x.guid()});
}}if(aw&&!au){at.overflow=L;
}else{if(!at.overflow){at.overflow=G;
}}if(at.overflow!==L&&ax.options.resizable){if(au){av=new R(au,at,ax);
}else{if(ap){av=new ap.overflow(at,ax);
av.element.addClass(ar);
}}if(av){if(at.overflow===G){av.overflowHidden();
}av.element.appendTo(ax.popup.container);
ax.angular("compile",function(){return{elements:av.element.get()};
});
}}if(at.overflow!==E){if(aw){ay=new ad(aw,at,ax);
}else{if(ap){ay=new ap.toolbar(at,ax);
}}if(ay){if(ax.options.resizable){ay.element.appendTo(ax.element).css("visibility","hidden");
ax._shrink(ax.element.innerWidth());
ay.element.css("visibility","visible");
}else{ay.element.appendTo(ax.element);
}ax.angular("compile",function(){return{elements:ay.element.get()};
});
}}},_getItem:function(ap){var aq,au,at,ar=this.options.resizable,av;
aq=this.element.find(ap);
if(!aq.length){aq=b(".k-split-container[data-uid="+this.uid+"]").find(ap);
}av=aq.length?aq.data("type"):"";
au=aq.data(av);
if(au){if(au.main){aq=aq.parent("."+Y);
av="splitButton";
au=aq.data(av);
}if(ar){at=au.twin();
}}else{if(ar){aq=this.popup.element.find(ap);
av=aq.length?aq.data("type"):"";
at=aq.data(av);
if(at&&at.main){aq=aq.parent("."+Y);
av="splitButton";
at=aq.data(av);
}}}return{type:av,toolbar:au,overflow:at};
},remove:function(ap){var aq=this._getItem(ap);
if(aq.toolbar){aq.toolbar.remove();
}if(aq.overflow){aq.overflow.remove();
}this.resize(true);
},hide:function(ap){var aq=this._getItem(ap);
if(aq.toolbar){if(aq.toolbar.options.type==="button"&&aq.toolbar.options.isChild){aq.toolbar.hide();
aq.toolbar.getParentGroup().refresh();
}else{if(!aq.toolbar.options.hidden){aq.toolbar.hide();
}}}if(aq.overflow){if(aq.overflow.options.type==="button"&&aq.overflow.options.isChild){aq.overflow.hide();
aq.overflow.getParentGroup().refresh();
}else{if(!aq.overflow.options.hidden){aq.overflow.hide();
}}}this.resize(true);
},show:function(ap){var aq=this._getItem(ap);
if(aq.toolbar){if(aq.toolbar.options.type==="button"&&aq.toolbar.options.isChild){aq.toolbar.show();
aq.toolbar.getParentGroup().refresh();
}else{if(aq.toolbar.options.hidden){aq.toolbar.show();
}}}if(aq.overflow){if(aq.overflow.options.type==="button"&&aq.overflow.options.isChild){aq.toolbar.show();
aq.overflow.getParentGroup().refresh();
}else{if(aq.overflow.options.hidden){aq.overflow.show();
}}}this.resize(true);
},enable:function(ap,aq){var ar=this._getItem(ap);
if(typeof aq=="undefined"){aq=true;
}if(ar.toolbar){ar.toolbar.enable(aq);
}if(ar.overflow){ar.overflow.enable(aq);
}},getSelectedFromGroup:function(ap){return this.element.find("."+af+"[data-group='"+ap+"']").filter("."+aa);
},toggle:function(ap,aq){var ar=b(ap),at=ar.data("button");
if(at.options.togglable){if(aq===an){aq=true;
}at.toggle(aq,true);
}},_renderOverflow:function(){var at=this,ar=n.overflowContainer,aq=at._isRtl,ap=aq?"left":"right";
at.overflowAnchor=b(n.overflowAnchor).addClass(f);
at.element.append(at.overflowAnchor);
if(at.isMobile){at.overflowAnchor.append('<span class="km-icon km-more"></span>');
ar=c(ar);
}else{at.overflowAnchor.append('<span class="k-icon k-i-arrow-60-down"></span>');
}at.popup=new x.ui.Popup(ar,{origin:"bottom "+ap,position:"top "+ap,anchor:at.overflowAnchor,isRtl:aq,animation:at.animation,appendTo:at.isMobile?b(at.isMobile).children(".km-pane"):null,copyAnchorStyles:false,open:function(au){var av=x.wrap(at.popup.element).addClass("k-overflow-wrapper");
if(!at.isMobile){av.css("margin-left",(aq?-1:1)*((D(av)-av.width())/2+1));
}else{at.popup.container.css("max-height",parseFloat(b(".km-content:visible").innerHeight())-15+"px");
}if(at.trigger(M)){au.preventDefault();
}},activate:function(){this.element.find(":kendoFocusable").first().focus();
},close:function(au){if(at.trigger(I)){au.preventDefault();
}this.element.focus();
}});
at.popup.element.on("keydown","."+f,function(au){var ay=b(au.target),ax=ay.parent(),aw=ax.is("."+g)||ax.is("."+Y),av;
au.preventDefault();
if(au.keyCode===z.ESC||au.keyCode===z.TAB||au.altKey&&au.keyCode===z.UP){at._toggleOverflow();
at.overflowAnchor.focus();
}else{if(au.keyCode===z.DOWN){av=!aw||aw&&ay.is(":last-child")?ax:ay;
o(av,"next").focus();
}else{if(au.keyCode===z.UP){av=!aw||aw&&ay.is(":first-child")?ax:ay;
o(av,"prev").focus();
}else{if(au.keyCode===z.SPACEBAR||au.keyCode===z.ENTER){at.userEvents.trigger("tap",{target:b(au.target)});
}}}}});
if(at.isMobile){at.popup.container=at.popup.element.find("."+J);
}else{at.popup.container=at.popup.element;
}at.popup.container.attr(y,this.uid);
},_toggleOverflowAnchor:function(){var ap=false;
if(this.options.mobile){ap=this.popup.element.find("."+J).children(":not(."+K+", ."+S+")").length>0;
}else{ap=this.popup.element.children(":not(."+K+", ."+S+")").length>0;
}if(ap){this.overflowAnchor.css({visibility:"visible",width:""});
}else{this.overflowAnchor.css({visibility:"hidden",width:"1px"});
}},_buttonClick:function(ap){var ay=this,av,ax,au,aw,at=ap.target.closest("."+Z).length,ar,aq,az;
ap.preventDefault();
if(at){ay._toggle(ap);
return;
}ax=b(ap.target).closest("."+f,ay.element);
if(ax.hasClass(F)){return;
}au=ax.data("button");
if(!au&&ay.popup){ax=b(ap.target).closest("."+H,ay.popup.container);
au=ax.parent("li").data("button");
}if(!au||!au.options.enable){return;
}if(au.options.togglable){ar=v(au.toggleHandler)?au.toggleHandler:null;
au.toggle(!au.options.selected,true);
aq={target:ax,group:au.options.group,checked:au.options.selected,id:au.options.id};
if(ar){ar.call(ay,aq);
}ay.trigger(ae,aq);
}else{ar=v(au.clickHandler)?au.clickHandler:null;
aq={sender:ay,target:ax,id:au.options.id};
if(ar){ar.call(ay,aq);
}ay.trigger(l,aq);
}if(au.options.url){if(au.options.attributes&&au.options.attributes.target){az=au.options.attributes.target;
}window.open(au.options.url,az||"_self");
}if(ax.hasClass(H)){ay.popup.close();
}aw=ax.closest(".k-split-container");
if(aw[0]){av=aw.data("kendoPopup");
(av?av:aw.parents(".km-popup-wrapper").data("kendoPopup")).close();
}},_navigatable:function(){var ap=this;
ap.element.attr("tabindex",0).focus(function(){var aq=b(this).find(":kendoFocusable:first");
if(aq.length===0){return;
}if(aq.is("."+F)){aq=o(aq,"next");
}aq[0].focus();
}).on("keydown",V(ap._keydown,ap));
},_keydown:function(ap){var aA=b(ap.target),aw=ap.keyCode,av=this.element.children(":not(.k-separator):visible");
if(aw===z.TAB){var aq=aA.parentsUntil(this.element).last(),ax=false,ar=false;
if(!aq.length){aq=aA;
}if(aq.is("."+F)){if(ap.shiftKey){ap.preventDefault();
}if(av.last().is(":kendoFocusable")){av.last().focus();
}else{av.last().find(":kendoFocusable").last().focus();
}}if(!ap.shiftKey&&av.index(aq)===av.length-1){if(aq.is("."+g)){ax=aA.is(":last-child");
}else{ax=true;
}}var at=av.index(aq)===av.not(".k-overflow-anchor").first().index();
if(ap.shiftKey&&at){if(aq.is("."+g)){ar=aA.is(":first-child");
}else{ar=true;
}}if(ax&&this.overflowAnchor&&this.overflowAnchor.css("visibility")!=="hidden"){ap.preventDefault();
this.overflowAnchor.focus();
}if(ar){ap.preventDefault();
var ay=this._getPrevFocusable(this.wrapper);
if(ay){ay.focus();
}}}if(ap.altKey&&aw===z.DOWN){var az=b(document.activeElement).data("splitButton");
var au=b(document.activeElement).is("."+F);
if(az){az.toggle();
}else{if(au){this._toggleOverflow();
}}return;
}if((aw===z.SPACEBAR||aw===z.ENTER)&&!aA.is("input, checkbox")){ap.preventDefault();
if(aA.is("."+Y)){aA=aA.children().first();
}this.userEvents.trigger("tap",{target:aA});
return;
}},_getPrevFocusable:function(ap){if(ap.is("html")){return ap;
}var aq,ar,at=ap.prevAll();
at.each(function(){ar=b(this);
if(ar.is(":kendoFocusable")){aq=ar;
return false;
}else{if(ar.find(":kendoFocusable").length>0){aq=ar.find(":kendoFocusable").last();
return false;
}}});
if(aq){return aq;
}else{return this._getPrevFocusable(ap.parent());
}},_toggle:function(ap){var ar=b(ap.target).closest("."+Y).data("splitButton"),aq;
ap.preventDefault();
if(!ar.options.enable){return;
}if(ar.popup.element.is(":visible")){aq=this.trigger(m,{target:ar.element});
}else{aq=this.trigger(C,{target:ar.element});
}if(!aq){ar.toggle();
}},_toggleOverflow:function(){this.popup.toggle();
},_resize:function(aq){var ap=aq.width;
if(!this.options.resizable){return;
}this.popup.close();
this._shrink(ap);
this._stretch(ap);
this._markVisibles();
this._toggleOverflowAnchor();
},_childrenWidth:function(){var ap=0;
this.element.children(":visible:not('."+ac+"')").each(function(){ap+=D(b(this),true);
});
return Math.ceil(ap);
},_shrink:function(aq){var ap,at;
if(aq<this._childrenWidth()){at=this.element.children(":visible:not([data-overflow='never'], ."+F+")");
for(var ar=at.length-1;
ar>=0;
ar--){ap=at.eq(ar);
if(aq>this._childrenWidth()){break;
}else{this._hideItem(ap);
}}}},_stretch:function(aq){var ap,ar;
if(aq>this._childrenWidth()){ar=this.element.children(":hidden:not('."+ac+"')");
for(var at=0;
at<ar.length;
at++){ap=ar.eq(at);
if(aq<this._childrenWidth()||!this._showItem(ap,aq)){break;
}}}},_hideItem:function(ap){ap.hide();
if(this.popup){this.popup.container.find(">li[data-uid='"+ap.data("uid")+"']").removeClass(K);
}},_showItem:function(aq,ap){if(aq.length&&ap>this._childrenWidth()+D(aq,true)){aq.show();
if(this.popup){this.popup.container.find(">li[data-uid='"+aq.data("uid")+"']").addClass(K);
}return true;
}return false;
},_markVisibles:function(){var ap=this.popup.container.children(),aq=this.element.children(":not(.k-overflow-anchor)"),ar=ap.filter(":not(.k-overflow-hidden)"),at=aq.filter(":visible");
ap.add(aq).removeClass(p+" "+A);
ar.first().add(at.first()).addClass(p);
ar.last().add(at.last()).addClass(A);
}});
x.ui.plugin(ah);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));