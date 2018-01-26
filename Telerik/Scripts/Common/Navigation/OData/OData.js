(function(b,a){var c="Telerik.OData.ItemsUrl",e="$callback",d="application/json",f={0:"json",1:"jsonp"};
b.NavigationControlODataSettings=function(h){b.NavigationControlODataSettings.initializeBase(this,[h]);
var g=h.ODataSettings;
this._path=h.Path;
this._odata=true;
this._responseType=g.ResponseType;
if(!this.get_isEmpty()){this._tree=new b.ODataBinderTree(g.InitialContainerName,g.Entities,g.EntityContainer);
}};
b.NavigationControlODataSettings.prototype={get_path:function(){return this._path;
},get_responseType:function(){return this._responseType;
},get_tree:function(){return this._tree;
},get_isEmpty:function(){var g=this._odata;
return this._path==""||(g.InitialContainerName==""||g.Entities>0);
}};
b.NavigationControlODataSettings.registerClass("Telerik.Web.UI.NavigationControlODataSettings",b.WebServiceSettings);
b.ODataBinderTree=function(h,g,i){this._entities=g;
this._map=i;
this._loaded=false;
this._tree=this._buildTree(h);
};
b.ODataBinderTree.prototype={get_settingsByDepth:function(g){function h(i,j){if(i==g){return j;
}return h(++i,j.child);
}return h(0,this._tree);
},_buildTree:function(g){var h=!!g?this._getEntitySetByName(g):this._map[0];
return this._buildNode(h,this._findChildCallback);
},_findChildCallback:function(g){if(!g){return;
}var h=this._getEntitySetByName(g);
return this._buildNode(h,this._findChildCallback);
},_buildNode:function(j,g){var h=this._getEntityByName(j.Name),i=this,k={name:j.Name,type:j.EntityType,entity:h,child:g.apply(i,[h.NavigationProperty])};
return k;
},_getByName:function(g,k){for(var h=0;
h<g.length;
h++){var j=g[h];
if(j.Name===k){return j;
}}},_getEntityByName:function(g){return this._getByName(this._entities,this._getEntitySetByName(g).EntityType);
},_getEntitySetByName:function(g){return this._getByName(this._map,g);
}};
b.NavigationControlODataLoader=function(h,g){b.NavigationControlODataLoader.initializeBase(this,[h]);
if(g){this._expandCallback=g;
}else{this._expandCallback=function(){return -1;
};
}};
b.NavigationControlODataLoader.prototype={_createRootUrl:function(h,g){if(h[h.length-1]=="/"){h=h.slice(0,h.length-1);
}return h+"/"+g;
},_getDefferedItemsUrl:function(h){var g=h.get_attributes();
var i=g.getAttribute(c);
g.removeAttribute(c);
return i;
},_appendQueryStringParameters:function(g){return g+"/?$format=json";
},_getAjaxSettings:function(h){h=this._appendQueryStringParameters(h);
var g=this.get_webServiceSettings();
return{url:h,headers:{Accepts:d},dataType:f[g.get_responseType()],jsonp:e};
},get_expandCallback:function(){return this._expandCallback;
},loadData:function(k,h){var n=this.get_webServiceSettings(),j,g,i,l=false,m=n.get_tree();
if(n.get_isEmpty()){return;
}if(k.isRootLevel){j=m.get_settingsByDepth(0);
g=this._getAjaxSettings(this._createRootUrl(n.get_path(),j.name));
}else{g=this._getAjaxSettings(this._getDefferedItemsUrl(h)),i=h.get_level()+1,j=n.get_tree().get_settingsByDepth(i);
l=true;
}this._sendAjaxRequest(g,h,j.entity,this._onWebServiceSuccess);
if(l){this._raiseEvent("loadingStarted",new Telerik.Web.UI.WebServiceLoaderEventArgs(h));
}},_sendAjaxRequest:function(k,g,h,l){var j=this,i=a.ajax(k);
i.fail(function(n){var m={get_message:function(){return n.statusText;
}};
j._onWebServiceError(m,g);
}).done(function(m){var n=[],o=j._sanitize(m);
a.each(o,function(q,p){n[n.length]={Text:p[h.DataTextField],Value:p[h.DataValueField],ExpandMode:j.get_expandCallback()(h.NavigationProperty),Attributes:(function(){if(h.NavigationProperty&&p[h.NavigationProperty]){return{"Telerik.OData.ItemsUrl":p[h.NavigationProperty].__deferred.uri};
}else{return{};
}})()};
});
l.apply(j,[n,g]);
});
},_sanitize:function(g){var h=g.d.results?g.d.results:g.d;
if(!(h instanceof Array)){h=a.makeArray(h);
}return h;
}};
b.NavigationControlODataLoader.registerClass("Telerik.Web.UI.NavigationControlODataLoader",b.WebServiceLoader);
})(Telerik.Web.UI,$telerik.$);
