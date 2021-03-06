(function(a,b,c){b.Editor.AlignCommandMoz=function(g,e,f,h,d){b.Editor.AlignCommandMoz.initializeBase(this,[(g||f),e,f,true,d]);
this.utils=Telerik.Web.UI.Editor.Utils;
};
b.Editor.AlignCommandMoz.prototype={getState:function(g){g=g||this.get_window();
var f=g.document;
if($telerik.isFirefox){var d=this.get_alignment();
var h=f.getSelection().getRangeAt(0).commonAncestorContainer;
var e=this.utils.getFirstBlockElementUp(h);
var i=e.style.textAlign==d;
return i?Telerik.Web.UI.Editor.CommandStates.On:Telerik.Web.UI.Editor.CommandStates.Off;
}else{return b.Editor.AlignCommandMoz.callBaseMethod(this,"getState",[g]);
}},get_argument:function(){return"";
},getValue:function(){return"";
},onExecute:function(){var f=this.get_window();
if(!f){return false;
}var d=f.document;
if($telerik.isFirefox){var h;
try{return this.onExecuteFirefox(d);
}catch(e){var g=this.getSelectedParentElement(d);
h=document.createElement("br");
g.insertBefore(h,g.firstChild);
return d.execCommand(this.CommandID,false);
}finally{if(h){h.parentNode.removeChild(h);
}}}else{if(this.CommandID=="JustifyNone"&&!$telerik.isIE){return this.applyCustomJustifyNone(d);
}else{return b.Editor.AlignCommandMoz.callBaseMethod(this,"onExecute");
}}},onExecuteFirefox:function(e){var f=this.utils.getSelectedParentElement(e);
if(this.utils.checkForElement(f,/^(?:table|tr|td)$/i)){this.firefoxFirstChildAlign(e,f);
}else{if(this.utils.isBlockElement(f)){this.applyMultiCustomAlign(e);
}else{var d=this.utils.getFirstBlockElementUp(f);
if(this.utils.isEditorContentArea(d)){this.applyMultiCustomAlign(e);
}else{this.applyCustomAlign(d);
}}}return true;
},applyMultiCustomAlign:function(d){var e=d.getSelection().getRangeAt(0);
this.alignSelectedContent(e,a.proxy(function(f){if(f.nodeType==3){if(this.utils.isTextNodeEmpty(f)){return;
}var g=this.utils.getFirstBlockElementUp(f);
if(this.utils.isEditorContentArea(g)){g=this.wrapInlineContent(this.getNeighborInlineContent(f));
}f=g;
}if(this.isSuitableToAlign(f)){this.applyCustomAlign(f);
}},this));
},alignSelectedContent:function(h,d){if(h.commonAncestorContainer==h.startContainer&&h.commonAncestorContainer==h.endContainer){d(h.commonAncestorContainer);
return;
}var i=Infinity,g=-1;
var e=h.commonAncestorContainer;
var f=a(e).contents().filter(function(l,m){var k=a.contains(m,h.startContainer)||(m==h.startContainer);
var j=a.contains(m,h.endContainer)||(m==h.endContainer);
if(k&&i==Infinity){i=l;
}if(j&&g==-1){g=l;
}return k||(i<l&&(g==-1||l<g))||j;
});
f.each(a.proxy(function(m,n){var k=a.contains(n,h.startContainer);
var j=a.contains(n,h.endContainer);
if(n.nodeType==1&&(k||j)){var l=h.cloneRange();
l.selectNodeContents(n);
if(k){l.setStart(h.startContainer,h.startOffset);
l.setEnd(n.childNodes[n.childNodes.length-1],1);
}if(j){l.setStart(n.childNodes[0],0);
l.setEnd(h.endContainer,h.endOffset);
}this.alignSelectedContent(l,d);
}else{d(n);
}},this));
},isSuitableToAlign:function(d){return d.nodeType==3&&this.utils.isEditorContentArea(d.parentNode)||d.nodeType==1&&this.utils.checkForElement(d,/^(?:p|div|h[1-6]|form|fieldset|td|li|dl|blockquote|address|hr)$/i)&&!this.utils.isEditorContentArea(d);
},applyCustomAlign:function(e){var d=this.get_alignment();
if(e.nodeType==3){e=this.wrapInlineContent(e);
}e.style.textAlign=d;
},applyCustomJustifyNone:function(d){var e=this.utils.getFirstBlockElementUp(this.utils.getSelectedParentElement(d));
if($telerik.isSafari||$telerik.isFirefox){this.utils.cleanStylePorperty(e,"textAlign");
}e.removeAttribute("align");
return true;
},wrapInlineContent:function(d){var e=a(d);
return e.wrapAll("<div></div>").parent()[0];
},getNeighborInlineContent:function(h){var f=a(h);
var e=f.parentsUntil(this.utils.getFirstBlockElementUp(h));
var j=e.length?e.last():f;
var d=a(j);
var k=j[0];
var g=k;
while(g.previousSibling&&!this.utils.isBlockElementOrNewLine(g.previousSibling)){d=d.add(g.previousSibling);
g=g.previousSibling;
}var i=k;
while(i.nextSibling&&!this.utils.isBlockElement(i.nextSibling)){d=d.add(i.nextSibling);
i=i.nextSibling;
if(this.utils.checkForElement(i,/^br$/i)){break;
}}return d;
},firefoxFirstChildAlign:function(f,h,j){var d=this.utils.isEditorContentArea(h)?h:h.parentNode;
if(this.utils.isEditorContentArea(d)&&this.utils.isContentOneBlockElementOnly(d)){d.appendChild(f.createTextNode(" "));
}var i;
if(this.needsFirefoxEditableWorkaround(d,h)){i=f.createElement("br");
d.insertBefore(i,d.firstChild);
}try{return this.finallyExecuteAlignCommand(f,this.CommandID);
}catch(g){if(!j){this.firefoxFirstChildAlign(f,this.CommandID,h,true);
}}finally{this.removeExtraContent(i);
}},finallyExecuteAlignCommand:function(e,d){return e.execCommand(d,false,null);
},needsFirefoxEditableWorkaround:function(d,e){return d==e||!this.utils.checkForElement(d,/^(?:body|tr|thead|tbody|td)$/i);
},removeExtraContent:function(d){if(d){if(d.parentNode.getAttribute("_moz_dirty")!=null){d=d.parentNode;
}d.parentNode.removeChild(d);
}},get_alignment:function(){return this.CommandID.toLowerCase().replace("justify","").replace("full","justify").replace("none","");
}};
b.Editor.AlignCommandMoz.registerClass("Telerik.Web.UI.Editor.AlignCommandMoz",b.Editor.BrowserCommand);
b.Editor.InsertListCommand=function(i,h,g,d,f,e){b.Editor.InsertListCommand.initializeBase(this,[(i||"Insert List"),h,true,e]);
this._newLineModeBr=(g==true);
this._commandName=d;
this._listType=(d=="InsertOrderedList")?"OL":"UL";
this._listStyle=f;
this._document=this._window.document;
};
b.Editor.InsertListCommand.prototype={_insertList:function(){var l=b.Editor.Utils.execDocumentCommand(this._document,this._commandName);
var e=this.get_editor();
if(e){var d=e.get_html();
var k=/(<ul>\s*<\/ul>)|(<ol>\s*<\/ol>)/gi;
var f;
if(k.test(d)){var j=e.get_contentArea().getElementsByTagName("OL");
var n=e.get_contentArea().getElementsByTagName("UL");
var h=j.concat(n);
for(f=h.length-1;
f>=0;
f--){this._removeEmptyLists(h[f]);
}}if($telerik.isFirefox&&/\s*<li>\s*<br\/?>\s*<\/li>\s*/mi.test(d)){var m=e.getSelectedElement();
if(m&&m.nodeName&&/ol|ul/i.test(m.nodeName)){for(f=m.children.length-1;
f>=0;
f--){var g=m.children[f];
if(/\s*<br\/?>\s*/i.test(g.innerHTML)||g.nodeName!="LI"){m.removeChild(m.children[f]);
}}}}if($telerik.isSafari){this._splitWrappingParagraph();
this._fixWrappingFont();
}}this._fixContentAreaDivFirstUL();
return l;
},_removeEmptyLists:function(d){if(/^\s*$/.test(d.innerHTML)){d.parentElement.removeChild(d);
}},_fixWrappingFont:function(){var d=this.get_editor();
var f=d.getSelectedElement();
if(f){var e=b.Editor.Utils.getElementParentByTag(f,this._listType);
if(e){if(e.parentNode.nodeName=="FONT"){b.Editor.Utils.removeNode(e.parentNode);
d.selectElement(e);
d.getSelection().collapse(true);
}}}},_fixContentAreaDivFirstUL:function(){var d=this.get_editor();
if($telerik.isIE&&d.get_contentAreaMode()==b.EditorContentAreaMode.Div&&d.get_html()=="<P>&nbsp;</P>"){d.get_contentArea().innerHTML="";
d.setFocus();
}},_splitWrappingParagraph:function(){var f=this.get_editor(),g=f.getSelectedElement(),l=g;
while(l&&!b.Editor.Utils.isEditorContentArea(l)){if(l.tagName=="P"){var e=l.childNodes,j=e.length-1;
if(j==0){b.Editor.Utils.removeNode(l);
}else{var k=this._insertCloneAfter(l);
for(var h=j;
h>=0;
h--){var d=e[h],m=d.nodeName;
if(m=="UL"||m=="OL"){a(d).insertAfter(l);
k=this._insertCloneAfter(l);
}else{a(k).prepend(d);
}}l.parentNode.removeChild(l);
}f.selectElement(g);
break;
}l=l.parentNode;
}},_insertCloneAfter:function(e){var d=e.cloneNode(false);
a(d).insertAfter(e);
return d;
},OnExecuteMoz:function(){var r=new b.Editor.Selection(this._window),i=r.getHtml(),s=r.getParentElement(),o=(s&&s.previousSibling)?s.previousSibling.nodeName:"";
var e=this.get_editor();
var d=e.get_document();
if(i==""&&(o=="UL"||o=="OL")){var l="_telerikInsertList";
var k='<span id="'+l+'"></span>';
var j;
r.pasteHtml(k,true);
var f=s.innerHTML;
var n="\\.*<br\\/?>\\s*"+k;
var q=new RegExp(n,"gi");
if(f.match(q)){j=d.getElementById(l);
j.parentNode.removeChild(j);
var p=r.getRange();
var h="_telerik_insertList_itemId";
var m="<"+this._listType+'><li id="'+h+'"></li></'+this._listType+">";
r.pasteHtml(m,true);
var g=d.getElementById(h);
g.removeAttribute("id");
p.setStart(g,0);
p.setEnd(g,0);
e.getSelection().selectRange(p);
return true;
}else{j=d.getElementById(l);
j.parentNode.removeChild(j);
}}else{if(i!=""&&(s.nodeName=="OL"||s.nodeName=="UL")){if(this._proceedListCommand(e,r,s,i)){return true;
}}}return this._insertList();
},_proceedListCommand:function(e,p,q,g){var d=e.get_document();
var o=d.createElement(q.nodeName);
if($telerik.isFirefox&&/\s*^<(?:o|u)l[^>]*?>/i.test(g)&&/<\/(?:o|u)l[^>]*?>\s*$/i.test(g)){g=g.replace(/\s*^<(?:o|u)l[^>]*?>/i,"");
g=g.replace(/<\/(?:o|u)l[^>]*?>\s*$/i,"");
}Telerik.Web.UI.Editor.Utils.setElementInnerHtml(o,g);
if(o.children.length==q.children.length){if(q.nodeName!=this._listType){var m=d.createElement(this._listType);
while(q.children.length>0){m.appendChild(q.children[0]);
}var j="_telerik_insertedList_id";
if(m.id&&m.id!=""){j=m.id;
}else{m.id=j;
}q.parentElement.removeChild(q);
p.pasteHtml(Telerik.Web.UI.Editor.Utils.getOuterHtml(m),false);
var k=d.getElementById(j);
k.id="";
k.removeAttribute("id");
e.selectElement(k);
return true;
}var f=e.get_newLineMode();
var n="";
for(var h=0;
h<q.children.length;
h++){var l=q.children[h];
if(f==Telerik.Web.UI.EditorNewLineModes.Br){if(h==q.children.length-1&&q.nextElementSibling&&Telerik.Web.UI.Editor.Utils.isBlockElement(q.nextElementSibling)){n=n+l.innerHTML;
}else{n=n+l.innerHTML+"<br/>";
}}else{if(f==Telerik.Web.UI.EditorNewLineModes.Div){n=n+"<div>"+l.innerHTML+"</div>";
}else{if(f==Telerik.Web.UI.EditorNewLineModes.P){n=n+"<p>"+l.innerHTML+"</p>";
}}}}if($telerik.isIE&&!$telerik.isIE9Mode){q.parentElement.removeChild(q);
p.pasteHtml(n,false);
}else{q.innerHTML="";
$telerik.$(q).replaceWith(n);
}return true;
}},OnExecuteIE:function(){var O=new b.Editor.Selection(this._window),p=O.getHtml(),j=this.get_editor(),P=O.getParentElement(),K=(P&&P.previousSibling)?P.previousSibling.nodeName:"",Q=(P)?P.nodeName:"",F,d="",L,E,o=b.Editor.Utils.getElementParentByTag,f=true,e=null;
L=O.getRange();
var h=L.duplicate();
var g=j.get_document();
if(K=="UL"||K=="OL"){var z="_telerikInsertList";
var y='<span id="'+z+'"></span>';
var G,M,x,m;
if(p==""){O.pasteHtml(y,true);
var r=P.innerHTML;
G="\\.*<br\\/?>\\s*"+y;
M=new RegExp(G,"gi");
if(r.match(M)){x=g.getElementById(z);
x.parentNode.removeChild(x);
this.pasteNewList(O,P,"");
}else{x=g.getElementById(z);
x.parentNode.removeChild(x);
m=P.innerHTML;
P.parentNode.removeChild(P);
this.pasteNewList(O,P,m);
}}else{m=P.innerHTML;
P.parentNode.removeChild(P);
this.pasteNewList(O,P,m);
}return true;
}if(Q=="P"||(Q=="DIV"&&!b.Editor.Utils.isEditorContentArea(P))){L=j.getSelection().getRange();
b.Editor.Utils.selectElement(this._window,P);
d=O.getHtml();
if(d==p){var S=new RegExp("^\\s*<"+Q+"[^>]*>","i"),n=new RegExp("</"+Q+">\\s*$","i");
P.parentNode.removeChild(P);
d=d.replace(S,"");
d=d.replace(n,"");
}else{O.selectRange(L);
d="";
}}if("OL"==P.tagName||"UL"==P.tagName||o(P,"UL")||o(P,"OL")||(!d&&p.match(/<P\s*>|<DIV\s*>/i))){if($telerik.isIE9Mode&&/OL|UL/i.test(P.tagName)){if(this._proceedListCommand(j,O,P,p)){return true;
}}this._insertList();
O=new b.Editor.Selection(this._window);
p=O.getHtml();
F=O.getParentElement();
if(F.tagName=="P"){p=F.outerHTML;
}var R=g.createElement("span");
R.innerHTML=p;
if(R.getElementsByTagName("P").length>0){var H=new RegExp("<p>([\\s\\S]+?)</p>","gi");
if(j.get_newLineMode()==Telerik.Web.UI.EditorNewLineModes.Br){p=p.replace(H,"$1<br/>");
}else{if(j.get_newLineMode()==Telerik.Web.UI.EditorNewLineModes.Div){p=p.replace(H,"<div>$1</div>");
}}if(F.tagName=="P"){F.innerHTML="";
}O.pasteHtml(p,true);
O=new b.Editor.Selection(this._window);
P=O.getParentElement();
if(P.tagName=="P"){E=P.parentNode;
while(P.childNodes.length>0){E.insertBefore(P.childNodes[0],P);
}E.removeChild(P);
h.move("character",-1);
h.select();
}}return true;
}p=d||((O.getBrowserSelection().type=="None")?"":O.getHtml());
if(P.tagName=="P"&&p.match(/^\s*<p[^>]*>/i)&&p.match(/<\/p>\s*$/i)){var T=p.replace(/^\s*<p[^>]*>/i,"");
T=T.replace(/<\/p>\s*$/i,"");
if(P.innerHTML==T){p=T;
}}if(p.toLowerCase().trim()=="<p>&nbsp;</p>"){return this._insertList();
}else{if(!p){L=O.getRange();
e=L.getBookmark();
E=L.parentElement();
if(!E.currentStyle.hasLayout){while(!E.currentStyle.hasLayout&&E.currentStyle.display!="block"){E=E.parentNode;
}}if(!E.currentStyle.hasLayout){p=(E.tagName=="P")?E.innerHTML:E.outerHTML;
f=false;
j.selectElement(E);
}else{L.pasteHTML('<span id="_telerik_reInsertList_mark">&nbsp;</span>');
var w=g.getElementById("_telerik_reInsertList_mark");
var J=w.previousSibling;
var D=[];
while(J&&J.nodeName!="BR"){if(J.nodeType==3){p=J.nodeValue+p;
D.push(J);
}else{if(J.currentStyle.display!="block"){p=J.outerHTML+p;
D.push(J);
}else{J=null;
}}if(J!=null){J=J.previousSibling;
}}var B=w.nextSibling;
if(B&&B.nodeName=="BR"){D.push(B);
}while(B&&B.nodeName!="BR"){if(B.nodeType==3){p+=B.nodeValue;
D.push(B);
}else{if(B.currentStyle.display!="block"){p+=B.outerHTML;
D.push(B);
}else{B=null;
}}if(B!=null){B=B.nextSibling;
}}for(var q=0,t=D.length;
q<t;
q++){var C=D[q];
C.parentNode.removeChild(C);
}w.parentNode.removeChild(w);
}p=p.replace(/^\s*<br\s*\/?\s*>/i,"");
}}p=this.getLiElementsHtml(p,f);
var s="_telerik_insertedList_id";
p="<"+this._listType+" id='"+s+"'>"+p+"</"+this._listType+">";
O=j.getSelection();
if(!e){O.pasteHtml("");
}O.pasteHtml(p,true);
if(e){L=O.getRange();
L.moveToBookmark(e);
L.collapse();
L.select();
this.removePreviousEmptyNode(L);
}var k=g.getElementById(s);
if(k){k.id="";
k.removeAttribute("id");
var N=/^\s*<[a-z]+[^>]*?><\/[a-z]+>\s*$/i;
var I=k.previousSibling;
if(I&&((I.nodeType==3&&/^\s+$/.test(I.nodeValue))||N.test(b.Editor.Utils.getOuterHtml(I)))){$telerik.$(I).remove();
}var A=k.nextSibling;
if(A&&A.tagName=="BR"){A.parentNode.removeChild(A);
}else{if(A&&A.nodeType==3&&/^\s+$/.test(A.nodeValue)){$telerik.$(A).remove();
}}A=k.nextSibling;
if(A&&A.innerHTML==""&&N.test(b.Editor.Utils.getOuterHtml(A))){$telerik.$(A).remove();
}if(typeof(h)!="undefined"){var v=k.getElementsByTagName("LI"),u=v.length;
if(u>0){h.moveToElementText(v[u-1]);
h.collapse(false);
h.select();
}return true;
}}O.collapse();
return true;
},pasteNewList:function(g,h,d){var e="<"+this._listType+"><li>"+d+"</li></"+this._listType+">";
g.pasteHtml(e,true);
var f=g.getRange();
f.moveStart("character",(e.length/2)+d.length);
f.collapse(true);
f.select();
},removePreviousEmptyNode:function(){var d=this.get_editor();
var g=d.getSelectedElement();
var e=b.Editor.Utils.getElementParentByTag(g,this._listType);
var h;
if(!e){while(g.currentStyle.display!="block"&&!b.Editor.Utils.isEditorContentArea(g)){g=g.parentNode;
}h=g.previousSibling;
if(h.nodeType==3&&h.nodeValue.match(/^\s*$/)){h.parentNode.removeChild(h);
h=g.previousSibling;
d.selectElement(h);
d.getSelection().collapse(true);
}var f=h.nodeName;
if(f=="OL"||f=="UL"){e=h;
d.selectElement(e);
d.getSelection().collapse(true);
}}if(e){h=e.previousSibling;
if(h&&h.nodeType==3&&h.nodeValue.match(/^\s*$/)){h.parentNode.removeChild(h);
}}},removeFirstParagraph:function(f){var g=f+"";
if(g.match(/^\s*<P/i)){var d=document.createElement("DIV");
d.innerHTML=g.replace(/^\s\s*/,"");
var e=d.firstChild;
if(e&&e.tagName=="P"){b.Editor.Utils.removeNode(e);
}g=d.innerHTML;
}return g;
},getLiElementsHtml:function(f,d){var k="",j,g,h,e=this._document.createElement("div");
f=$telerik.$.trim(f||"");
if(f.match(/<br[^>]*>/ig)&&d!=false){b.Editor.Utils.setElementInnerHtml(e,f);
$telerik.$("br",e).each(function(l,i){i.setAttribute("re_br_"+l,l);
});
f=e.innerHTML;
$telerik.$("br",e).each(function(o,n){var l="<BR>",i,q,m,p=n.parentNode;
while(p&&p!==e){i=p.cloneNode();
q=$telerik.getOuterHtml(i).match(/<[^>]*>/i);
l="</"+i.tagName.toLowerCase()+">"+l+q;
p=p.parentNode;
}if(!n.nextSibling){l="";
}m=new RegExp("<br[^>]*re_br_"+o+"=[^>]*>","ig");
f=f.replace(m,l);
});
j=f.split("<BR>");
for(g=0,h=j.length;
g<h;
g++){k+="<li>"+j[g]+"</li>";
}}else{k+="<li>"+f+"</li>";
}return k;
}};
b.Editor.InsertListCommand.registerClass("Telerik.Web.UI.Editor.InsertListCommand",b.Editor.CommandBase);
})($telerik.$,Telerik.Web.UI);
(function(a,c,b,d,e){a.extend(d,{Indent:new c.BrowserCommand(null,null,"Indent",null),Outdent:new c.BrowserCommand(null,null,"Outdent",null),JustifyLeft:new c.AlignCommandMoz(null,null,"JustifyLeft",null),JustifyRight:new c.AlignCommandMoz(null,null,"JustifyRight",null),JustifyCenter:new c.AlignCommandMoz(null,null,"JustifyCenter",null),JustifyNone:new c.AlignCommandMoz(null,null,"JustifyNone",null),JustifyFull:new c.AlignCommandMoz(null,null,"JustifyFull",null)});
b.Indent=b.Outdent=function(g,h,j){h.setActive();
var f="SelectAll"!=g;
if(g=="Unlink"&&!h.isIE){var i=h.getSelectedElement();
if(i&&i.tagName=="A"){h.selectElement(i,false);
}}h.executeBrowserCommand(g,f,null,null);
return true;
};
b.JustifyLeft=b.JustifyRight=b.JustifyCenter=b.JustifyNone=b.JustifyFull=function(f,g,h){g.setActive();
var i=g.getLocalizedString(f);
g.executeCommand(new c.AlignCommandMoz(i,g.get_contentWindow(),f,null,g),true);
return true;
};
b.InsertOrderedList=b.InsertUnorderedList=function(g,h,f){h.setFocus();
h.executeCommand(new Telerik.Web.UI.Editor.InsertListCommand(h.getLocalizedString(g),h.get_contentWindow(),h.get_newLineMode()==Telerik.Web.UI.EditorNewLineModes.Br,g,null,h));
};
b.ApplyClass=function(k,m,f){var B=true;
var s=f.get_value()[0];
var l=m.get_contentWindow();
var n=m.get_document();
var q=new Telerik.Web.UI.Editor.GenericCommand(m.getLocalizedString(k)+' ["'+s+'"]',m.get_contentWindow(),m);
var x=m.getSelectedElement();
var y=(x)?x.tagName:"";
var A=m.getSelection();
var z=A.getHtml();
var v=Telerik.Web.UI.Editor.DomRange.toDomRange(A.getRange(true));
var j=(!s&&!z)||z.match(/<(font|span)[^>]*><\/(font|span)>/ig)||y=="UL"||y=="IMG";
var t=(j)?x:Telerik.Web.UI.Editor.Utils.getFullySelectedElement(l);
var h=["body","p","div","th","td","li","h[1-6]","form","fieldset","dt","dd","blockquote","address","article","details","figcaption","footer","header","hgroup","section"];
var g=new RegExp("^(?:"+h.join("|")+")$","i");
var u=t&&t.nodeName.match(g)&&t!=v.startContainer;
if(t&&!u&&!Telerik.Web.UI.Editor.Utils.isEditorContentArea(t)&&!Telerik.Web.UI.Editor.Utils.isTextNode(t)){Telerik.Web.UI.Editor.Utils.setElementClassName(t,s);
B=false;
}else{if(!s){n.execCommand("RemoveFormat",false,null);
B=false;
}}if(B){var w=Telerik.Web.UI.Editor.CommandList._markEditorSelection(m);
var p=w.markedElements;
if(p.length>0){for(var r=0;
r<p.length;
r++){var o=p[r];
if(o.className&&o.className!="Apple-style-span"){continue;
}else{o.className=s;
}}if(!$telerik.isIE){Telerik.Web.UI.Editor.Utils.addElementsToSelection(m.get_contentWindow(),p);
}}else{Telerik.Web.UI.Editor.CommandList._completeEditorSelection(m,"class='"+s+"'");
}}if(f.addToUndoRedo!=false){m.executeCommand(q);
}};
})($telerik.$,Telerik.Web.UI.Editor,Telerik.Web.UI.Editor.CommandList,Telerik.Web.UI.Editor.UpdateCommandsArray);
