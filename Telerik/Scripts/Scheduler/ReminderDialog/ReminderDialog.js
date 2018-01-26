Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.SchedulerReminderDialog");
(function(a,c,b){var f=60000;
var e=60*f;
var d=c.SchedulerReminderDialog;
c.ReminderDialog=function(g){c.ReminderDialog.initializeBase(this,[g]);
this._baseId=this.get_id();
this._reminders=[];
this._localization=null;
};
c.ReminderDialog.prototype={initialize:function(){c.ReminderDialog.callBaseMethod(this,"initialize");
this._initializeView();
},_initializeView:function(){var g;
switch(this.get_renderMode()){case c.RenderMode.Mobile:g=new d.NativeView(this);
break;
case c.RenderMode.Lite:g=new d.LiteView(this);
break;
default:g=new d.ClassicView(this);
break;
}this._view=g;
this._view.initialize();
},dispose:function(){this._view.dispose();
this._view=null;
c.ReminderDialog.callBaseMethod(this,"dispose");
},registerReminder:function(g){if(this._isReminderRegistered(g)){return;
}this._reminders.push(g);
this._view.updateRemindersUI(g);
},clearReminders:function(){this._reminders=[];
this._view.clearReminders();
},_getReminderText:function(g){return this._view._getReminderText(g);
},_isReminderRegistered:function(h){var g=false,i=this;
a.each(i._reminders,function(){if(this.get_id()==h.get_id()){var j=this.get_owner(),k=h.get_owner();
if(j&&k){g=j.get_id()==k.get_id();
}else{g=true;
}if(g){return false;
}}});
return g;
},_unregisterReminders:function(g){var h=this;
a.each(g,function(){var i=Array.indexOf(h._reminders,this);
if(i!=-1){Array.removeAt(h._reminders,i);
h._view.removeReminderAt(i);
h._view.updateSelectedReminder(i);
}});
this._view._updateTitleBar();
},get_localization:function(){if(!this._localization){this._localization=this.get_parent().get_localization();
}return this._localization;
},set_localization:function(g){this._localization=Sys.Serialization.JavaScriptSerializer.deserialize(g);
},repaint:function(){this._view.repaint();
}};
a.registerControlEvents(c.ReminderDialog,["close","dismiss","openItem","snooze"]);
c.ReminderDialog.registerClass("Telerik.Web.UI.ReminderDialog",c.RadWebControl);
d.ViewBase=function(g){this._owner=g;
this._element=g.get_element();
};
d.ViewBase.prototype={initialize:function(){this._initializeButtons();
this._applicationLoadedCallback=Function.createDelegate(this,this._applicationLoaded);
Sys.Application.add_load(this._applicationLoadedCallback);
},_applicationLoaded:function(){Sys.Application.remove_load(this._applicationLoadedCallback);
this._initializeListBox();
},_initializeListBox:function(){var h=Function.createDelegate(this,this._updateTitle);
var g=this._getRemindersListBox();
g.add_selectedIndexChanged(h);
g.add_disposing(function(){g.remove_selectedIndexChanged(h);
});
},dispose:function(){a(this._element).off();
},repaint:function(){this._getRemindersListBox().repaint();
},removeReminderAt:function(g){this._getRemindersListBox().get_items().removeAt(g);
},clearReminders:function(){this._getRemindersListBox().get_items().clear();
},updateRemindersUI:function(i){var h=this._getRemindersListBox();
var g=new c.RadListBoxItem();
h.get_items().add(g);
this._updateRemindersText();
this._updateTitleBar();
if(h.get_items().get_count()==1){g.select();
this._updateTitle();
}},updateSelectedReminder:function(g){var h=this._getRemindersListBox().get_items();
var i=h.get_count();
if(i>g){h.getItem(g).select();
}else{if(i>0){h.getItem(i-1).select();
}}},_updateRemindersText:function(){var m=this;
var j=this._getRemindersListBox();
var k=j.get_items();
var l=this._owner._reminders;
for(var h=0,g=k.get_count();
h<g;
h++){k.getItem(h).set_text(this._getReminderText(l[h]));
}if(l.length>0){setTimeout(function(){m._updateRemindersText();
},f);
}},_initializeButtons:function(){var i=this;
var g=this._owner;
var h=this._element;
a(".rsRemTitleBarCloseBtn",h).click(function(j){a.raiseControlEvent(g,"close",{});
$telerik.cancelRawEvent(j);
}).attr("href","#");
a(".rsRemDismissAllBtn",h).click(function(j){var k=g._reminders;
a.raiseControlEvent(g,"dismiss",{reminders:k,hasMoreReminders:false});
$telerik.cancelRawEvent(j);
g._unregisterReminders(k);
}).attr("href","#");
a(".rsRemOpenItemBtn",h).click(function(j){a.raiseControlEvent(g,"openItem",{reminders:i._getSelectedReminders()});
$telerik.cancelRawEvent(j);
}).attr("href","#");
a(".rsRemDismissBtn",h).click(function(j){var l=i._getSelectedReminders();
var k=g._reminders.length>l.length;
a.raiseControlEvent(g,"dismiss",{reminders:l,hasMoreReminders:k});
$telerik.cancelRawEvent(j);
g._unregisterReminders(l);
}).attr("href","#");
a(".rsRemSnoozeBtn",h).click(function(j){var k=i._getSelectedReminders();
var l=parseInt(i._getSnoozeTimeValue(),10);
a.raiseControlEvent(g,"snooze",{reminders:k,minutes:l});
$telerik.cancelRawEvent(j);
g._unregisterReminders(k);
}).attr("href","#");
},_getSelectedReminder:function(){return this._owner._reminders[this._getRemindersListBox().get_selectedIndex()];
},_getSelectedReminders:function(){var g=this._owner;
return a.map(this._getRemindersListBox().get_selectedItems(),function(h){return g._reminders[h.get_index()];
});
},_getReminderText:function(j){var g=j.get_owner(),h=this._owner.get_localization(),k=b.subtract(g.get_start(),new Date()),i="{0} ({1} {2} {3})",m,l;
if(Math.abs(k)<e){m=Math.floor(Math.abs(k)/f);
l=(m==1)?h.Minute:h.Minutes;
}else{m=Math.floor(Math.abs(k)/e);
l=(m==1)?h.Hour:h.Hours;
}if(k<0){return String.format(i,g.get_subject(),m,l,h.Overdue);
}return String.format(i,g.get_subject(),h.DueIn,m,l);
},_updateTitleBar:function(){var i=this._owner;
var g=i._reminders.length;
var h=i.get_localization();
var j=g+" "+(g>1?h.Reminders:h.Reminder);
a(this._getTitleBarElement()).text(j);
},_getTitleBarElement:function(){var g=a(this._element).find(".rsRemTitleBarText").get(0);
return g;
},_getRemindersListBox:function(){return this._getControl("RemindersList");
},_updateTitle:function(){var i=this._getSelectedReminder();
var h=i.get_owner();
var g=a(this._element);
g.find(".rsRemTitleSubject").text(h.get_subject());
g.find(".rsRemTitleDate").text(h.get_start().toLocaleString());
},_getControl:function(g){return $find(this._owner._baseId+"_"+g);
}};
d.ViewBase.registerClass("Telerik.Web.UI.SchedulerReminderDialog.ViewBase");
d.ClassicView=function(g){d.ClassicView.initializeBase(this,[g]);
};
d.ClassicView.prototype={_getSnoozeTimeValue:function(){return this._getControl("SnoozeTime").get_value();
}};
d.ClassicView.registerClass("Telerik.Web.UI.SchedulerReminderDialog.ClassicView",d.ViewBase);
d.LiteView=function(g){d.LiteView.initializeBase(this,[g]);
};
d.LiteView.prototype={_getSnoozeTimeValue:function(){return this._getControl("SnoozeTime").get_selectedItem().get_value();
}};
d.LiteView.registerClass("Telerik.Web.UI.SchedulerReminderDialog.LiteView",d.ViewBase);
d.NativeView=function(g){d.NativeView.initializeBase(this,[g]);
};
d.NativeView.prototype={initialize:function(){this._initializeButtons();
},clearReminders:function(){this._getRemindersList().innerHTML="";
},updateRemindersUI:function(i){var h=this._getRemindersList();
var g=document.createElement("li");
g.className="rsLi";
h.appendChild(g);
this._updateRemindersText();
this._updateTitleBar();
if(a(h).children().length==1){this._selectReminder(g);
}},removeReminderAt:function(g){a(this._getRemindersList()).children().eq(g).remove();
},updateSelectedReminder:function(h){var g=a(this._getRemindersList()).children();
var i=g.length;
if(i>h){g.eq(h).addClass("rsLiSelected");
}else{if(i>0){g.eq(i-1).addClass("rsLiSelected");
}}},repaint:function(){},_initializeButtons:function(){var i=this;
var h=this._owner;
var g=$telerik.isTouchDevice?"touchend":"click";
a(this._element).on(g,".rsRemList .rsLi",function(j){i._selectReminder(this);
$telerik.cancelRawEvent(j);
}).on(g,".rsRemDismissBtn",function(j){var l=i._getSelectedReminders();
var k=h._reminders.length>l.length;
a.raiseControlEvent(h,"dismiss",{reminders:l,hasMoreReminders:k});
$telerik.cancelRawEvent(j);
h._unregisterReminders(l);
}).on(g,".rsRemSnoozeBtn",function(j){a(i._element).find(".rsRemSnoozePanel").show().end().find(".rsRemListPanel").hide();
}).on(g,".rsRemSnoozePanelList .rsLi",function(j){var k=i._getSelectedReminders();
var l=parseFloat(this.value,10);
a(i._element).find(".rsRemSnoozePanel").hide().end().find(".rsRemListPanel").show();
a.raiseControlEvent(h,"snooze",{reminders:k,minutes:l});
$telerik.cancelRawEvent(j);
h._unregisterReminders(k);
});
if($telerik.isTouchDevice){a(this._element).on("touchstart",function(j){j.preventDefault();
});
}},_updateRemindersText:function(){var h=this;
var g=this._getRemindersList();
a(g).children().each(function(i,j){j.innerHTML=h._getReminderText(h._owner._reminders[i]);
});
},_selectReminder:function(h){var g=a(this._getRemindersList());
g.find(".rsLiSelected").removeClass("rsLiSelected");
a(h).addClass("rsLiSelected");
this._updateTitle();
},_getSelectedReminder:function(){var g=a(this._getRemindersList()).find(".rsLiSelected").index();
return this._owner._reminders[g];
},_getSelectedReminders:function(){var g=this._owner;
return a.map(a(this._getRemindersList()).children(".rsLiSelected"),function(h){return g._reminders[a(h).index()];
});
},_getRemindersList:function(){return a(this._element).find("ul.rsRemList")[0];
}};
d.NativeView.registerClass("Telerik.Web.UI.SchedulerReminderDialog.NativeView",d.ViewBase);
})($telerik.$,Telerik.Web.UI,Telerik.Web.UI.Scheduler.DateTime);
