Type.registerNamespace("Telerik.Web.UI.Scheduler.Rendering");
(function(){var a=Telerik.Web.UI.Scheduler.Rendering;
a.Row=function(b){this._index=b;
this._parts=[];
};
a.Row.prototype={tryAdd:function(d){for(var b=0,c=this._parts.length;
b<c;
b++){if(this.partsOverlap(this._parts[b],d)){this.addToNextRow(d);
return;
}}this.addPart(d);
},partsOverlap:function(b,c){return(b.end>c.start&&b.start<c.end);
},addToNextRow:function(b){if(!this._nextRow){this._nextRow=new a.Row(this._index+1);
}this._nextRow.tryAdd(b);
},addPart:function(b){Array.insert(this._parts,this._parts.length,b);
b.rowIndex=this._index;
}};
a.HorizontalBlockCollection=function(){this._parts=[];
};
a.HorizontalBlockCollection.prototype={add:function(b){if(!this._firstRow){this._firstRow=new a.Row(0);
}this._firstRow.tryAdd(b);
Array.insert(this._parts,this._parts.length,b);
},remove:function(d){if(!this._firstRow){return;
}Array.remove(this._parts,d);
this._firstRow=new a.Row(0);
for(var b=0,c=this._parts.length;
b<c;
b++){this._firstRow.tryAdd(this._parts[b]);
}}};
a.HorizontalBlockCollection.registerClass("Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection");
})();
