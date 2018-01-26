(function(b,a){a("kendo.data.odata",["kendo.core"],b);
}(function(){var a={id:"data.odata",name:"OData",category:"framework",depends:["core"],hidden:true};
(function(b,k){var e=window.kendo,d=b.extend,g={eq:"eq",neq:"ne",gt:"gt",gte:"ge",lt:"lt",lte:"le",contains:"substringof",doesnotcontain:"substringof",endswith:"endswith",startswith:"startswith",isnull:"eq",isnotnull:"ne",isempty:"eq",isnotempty:"ne"},h=d({},g,{contains:"contains"}),f={pageSize:b.noop,page:b.noop,filter:function(m,l,n){if(l){l=j(l,n);
if(l){m.$filter=l;
}}},sort:function(n,m){var l=b.map(m,function(p){var o=p.field.replace(/\./g,"/");
if(p.dir==="desc"){o+=" desc";
}return o;
}).join(",");
if(l){n.$orderby=l;
}},skip:function(l,m){if(m){l.$skip=m;
}},take:function(l,m){if(m){l.$top=m;
}}},c={read:{dataType:"jsonp"}};
function j(m,w){var u=[],s=m.logic||"and",p,r,l,v,o,t,x,q,n=m.filters;
for(p=0,r=n.length;
p<r;
p++){m=n[p];
l=m.field;
x=m.value;
t=m.operator;
if(m.filters){m=j(m,w);
}else{q=m.ignoreCase;
l=l.replace(/\./g,"/");
m=g[t];
if(w){m=h[t];
}if(t==="isnull"||t==="isnotnull"){m=e.format("{0} {1} null",l,m);
}else{if(t==="isempty"||t==="isnotempty"){m=e.format("{0} {1} ''",l,m);
}else{if(m&&x!==k){v=b.type(x);
if(v==="string"){o="'{1}'";
x=x.replace(/'/g,"''");
if(q===true){l="tolower("+l+")";
}}else{if(v==="date"){if(w){o="{1:yyyy-MM-ddTHH:mm:ss+00:00}";
x=e.timezone.apply(x,"Etc/UTC");
}else{o="datetime'{1:yyyy-MM-ddTHH:mm:ss}'";
}}else{o="{1}";
}}if(m.length>3){if(m!=="substringof"){o="{0}({2},"+o+")";
}else{o="{0}("+o+",{2})";
if(t==="doesnotcontain"){if(w){o="{0}({2},'{1}') eq -1";
m="indexof";
}else{o+=" eq false";
}}}}else{o="{2} {0} "+o;
}m=e.format(o,m,x,l);
}}}}u.push(m);
}m=u.join(" "+s+" ");
if(u.length>1){m="("+m+")";
}return m;
}function i(m){for(var l in m){if(l.indexOf("@odata")===0){delete m[l];
}}}d(true,e.data,{schemas:{odata:{type:"json",data:function(l){return l.d.results||[l.d];
},total:"d.__count"}},transports:{odata:{read:{cache:true,dataType:"jsonp",jsonp:"$callback"},update:{cache:true,dataType:"json",contentType:"application/json",type:"PUT"},create:{cache:true,dataType:"json",contentType:"application/json",type:"POST"},destroy:{cache:true,dataType:"json",type:"DELETE"},parameterMap:function(n,p,q){var o,r,m,l;
n=n||{};
p=p||"read";
l=(this.options||c)[p];
l=l?l.dataType:"json";
if(p==="read"){o={$inlinecount:"allpages"};
if(l!="json"){o.$format="json";
}for(m in n){if(f[m]){f[m](o,n[m],q);
}else{o[m]=n[m];
}}}else{if(l!=="json"){throw new Error("Only json dataType can be used for "+p+" operation.");
}if(p!=="destroy"){for(m in n){r=n[m];
if(typeof r==="number"){n[m]=r+"";
}}o=e.stringify(n);
}}return o;
}}}});
d(true,e.data,{schemas:{"odata-v4":{type:"json",data:function(l){l=b.extend({},l);
i(l);
if(l.value){return l.value;
}return[l];
},total:function(l){return l["@odata.count"];
}}},transports:{"odata-v4":{read:{cache:true,dataType:"json"},update:{cache:true,dataType:"json",contentType:"application/json;IEEE754Compatible=true",type:"PUT"},create:{cache:true,dataType:"json",contentType:"application/json;IEEE754Compatible=true",type:"POST"},destroy:{cache:true,dataType:"json",type:"DELETE"},parameterMap:function(l,n){var m=e.data.transports.odata.parameterMap(l,n,true);
if(n=="read"){m.$count=true;
delete m.$inlinecount;
}return m;
}}}});
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));