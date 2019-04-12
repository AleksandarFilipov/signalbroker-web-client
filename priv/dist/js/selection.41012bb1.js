(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["selection"],{"11dc":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("VCard",{staticClass:"marginToolbar"},[i("VToolbar",{attrs:{card:"",color:"transparent",extended:""},scopedSlots:e._u([{key:"extension",fn:function(){return[i("VSheet",{staticClass:"\n        grow\n        ml-2\n      "},[i("VTextField",{attrs:{disabled:0===e.signalSelectionItems.length,label:"Search signals",flat:"","hide-details":"",clearable:"","prepend-icon":"search"},model:{value:e.search,callback:function(t){e.search="string"===typeof t?t.trim():t},expression:"search"}}),i("VCheckbox",{attrs:{disabled:0===e.signalSelectionItems.length,"hide-details":"",label:"Case sensitive"},model:{value:e.caseSensitive,callback:function(t){e.caseSensitive=t},expression:"caseSensitive"}})],1)]},proxy:!0}])},[i("VIcon",[e._v("\n      directions_car\n    ")]),i("VToolbarTitle",[e._v("\n      Signal tree\n    ")]),i("VSpacer")],1),i("VLayout",{attrs:{row:"",wrap:""}},[i("VFlex",{attrs:{"py-4":"","pl-4":"",xs12:"",sm12:"",md6:""}},[1===e.signalSelectionItems.length?i("VCardText",{staticClass:"overflowY",attrs:{"py-0":""}},[i("VExpandTransition",[i("VTreeview",{attrs:{search:e.search,itemid:"id",items:e.signalSelectionItems,selectable:"",transition:"",open:e.treeOpenItems,"return-object":""},on:{"update:open":function(t){e.treeOpenItems=t}},model:{value:e.selectedSignalsLocal,callback:function(t){e.selectedSignalsLocal=t},expression:"selectedSignalsLocal"}})],1)],1):i("VCardText",{attrs:{"pt-3":""}},[i("VBtn",{attrs:{depressed:"",block:""},on:{click:e.fetchLists}},[e._v("\n          Fetch\n        ")])],1)],1),i("VDivider"),i("VFlex",{attrs:{xs12:"",sm12:"",md6:"","py-4":""}},[i("VDivider",{staticClass:"hidden-md-and-up"}),i("VLayout",{staticClass:"overflowY",attrs:{row:"",wrap:"","py-3":""}},[0===e.selectedSignalsLocal.length?i("div",{key:"title",staticClass:"title font-weight-light grey--text pa-3 text-xs-center"},[e._v("\n          Select signals to be controlled through this interface\n        ")]):e._e(),i("VScrollXTransition",{attrs:{group:"","hide-on-leave":""}},e._l(e.selectedSignalsLocal,function(t,n){return i("VChip",{key:n,attrs:{small:""}},[e._v("\n            "+e._s(t.name)+"\n          ")])}),1)],1)],1)],1),i("VDivider"),i("VCardActions",[i("VBtn",{attrs:{flat:""},on:{click:e.clear}},[e._v("\n      Clear\n    ")]),i("VBtn",{attrs:{flat:""},on:{click:e.fetchLists}},[e._v("\n      Fetch\n    ")]),i("VSpacer"),i("VBtn",{attrs:{disabled:e.selectedSignalsLocal===e.selectedSignals,color:"success",depressed:""},on:{click:e.saveSignalState}},[e._v("\n      Save\n      "),i("VIcon",{staticClass:"hidden-sm-and-down",attrs:{right:""}},[e._v("\n        save\n      ")])],1),i("VBtn",{attrs:{disabled:0===e.selectedSignals.length,color:"info",depressed:"",to:"control"}},[e._v("\n      Control\n      "),i("VIcon",{staticClass:"hidden-sm-and-down",attrs:{right:""}},[e._v("\n        gamepad\n      ")])],1)],1),i("VSnackbar",{attrs:{bottom:"",right:"",color:"error",timeout:8e3},model:{value:e.snackbarDisplayed,callback:function(t){e.snackbarDisplayed=t},expression:"snackbarDisplayed"}},[i("VLayout",[i("VIcon",{attrs:{left:""}},[e._v("\n        "+e._s(e.snackbarIcon)+"\n      ")]),e._v("\n      "+e._s(e.snackbarMessage)+"\n    ")],1),i("VBtn",{attrs:{flat:""},nativeOn:{click:function(t){e.value=!1}}},[i("VIcon",[e._v("\n        close\n      ")])],1)],1)],1)},s=[],a=i("0a0d"),r=i.n(a),o=(i("7f7f"),i("ac6a"),i("386d"),i("9508"),{data:function(){return{request:"",caseSensitive:!1,snackbarDisplayed:!1,treeOpenItems:[],selectedSignalsLocal:[],snackbarMessage:"Not connected",snackbarIcon:"warning"}},computed:{search:{get:function(){return this.$store.state.search},set:function(e){this.$store.commit("updateSearch",e)}},signalSelectionItems:{get:function(){return this.$store.state.signalSelectionItems},set:function(e){this.$store.commit("updateSignalSelectionItems",e)}},connectionStatus:{get:function(){return this.$store.state.connectionStatus},set:function(e){this.$store.commit("updateConnectionStatus",e)}},selectedSignals:{get:function(){return this.$store.state.selectedSignals},set:function(e){this.$store.commit("updateSelectedSignals",e)}},requestHistory:{get:function(){return this.$store.state.requestHistory},set:function(e){this.$store.commit("updateRequestHistory",e)}},filter:function(){var e=this;return this.caseSensitive?function(t,i){return t[i].indexOf(e.search)>-1}:void 0}},watch:{},created:function(){},mounted:function(){this.selectedSignalsLocal=this.selectedSignals,this.reset()},methods:{clear:function(){this.search=null,this.selectedSignalsLocal=[]},reset:function(){var e=[];e.push({name:"Signal Buses",id:"Signal Buses",children:[]}),this.selectedSignals.forEach(function(t){e[0].children.push({name:t.name,id:t.id,children:t.children})}),this.treeOpenItems=e},snackbar:function(e,t){this.connectionStatus=e,this.snackbarMessage=t,this.snackbarDisplayed=!0},saveSignalState:function(){this.selectedSignals=this.selectedSignalsLocal},fetchLists:function(){this.request="Fetch lists";var e=new api.default.SystemServiceClient(this.$store.state.brokerServerIp),t=new api.default.Empty;e.getConfiguration(t,{},this.fetchListsCallback)},fetchListsCallback:function(e,t){t?(this.connectionStatus,this.requestHistory.push({date:r()(),request:this.request,response:"List networks"}),this.populateParents(t.getNetworkinfoList())):this.snackbar("error--text","The broker is offline.")},populateParents:function(e){var t=this,i=0,n={id:"Signal Buses",name:"Signal Buses",children:[]};e.forEach(function(e){var s={id:e.getNamespace().getName()+i,name:e.getNamespace().getName(),children:t.listNamespaceSignals(e)};i+=1,n.children.push(s)}),this.signalSelectionItems=[n]},listNamespaceSignals:function(e){var t=[],i=e.getNamespace().getName();this.request="Fetch signals";var n=new api.default.SystemServiceClient(this.$store.state.brokerServerIp),s=new api.default.NameSpace;return s.setName(i),this.connectionStatus="success--text",this.requestHistory.push({date:r()(),request:this.request,response:"List signals"}),n.listSignals(s,{},function(e,i){if(i){var n=0,s=i.getFrameList();s.forEach(function(e){var i=e.getSignalinfo().getMetadata(),s=e.getSignalinfo().getId(),a=s.getName(),r=e.getChildinfoList(),o=[];r.forEach(function(e){var t=e.getId(),i=e.getMetadata(),s=t.getName(),a={id:s+n,name:s,children:[],signalId:t,min:i.getMin(),max:i.getMax(),size:i.getSize(),unit:i.getUnit(),description:i.getDescription()};n+=1,o.push(a)}),t.push({id:a+n,name:a,children:o,signalId:s,min:i.getMin(),max:i.getMax(),size:i.getSize(),unit:i.getUnit(),description:i.getDescription()}),n+=1})}}),t}}}),c=o,l=(i("72a6"),i("2877")),h=i("6544"),d=i.n(h),u=i("8336"),p=i("b0af"),f=i("99d9"),v=i("ac7c"),m=i("cc20"),g=i("ce7e"),b=i("0789"),S=i("0e8f"),C=i("132d"),y=i("a722"),O=i("8dd9"),w=i("2db4"),k=i("9910"),x=i("2677"),I=i("71d9"),V=i("2a7f"),A=(i("7b16"),i("94ab")),j=i("58df"),$=i("80d2"),_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function L(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var T={activatable:Boolean,activeClass:{type:String,default:"v-treeview-node--active"},selectable:Boolean,selectedColor:{type:String,default:"accent"},indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"},expandIcon:{type:String,default:"$vuetify.icons.subgroup"},loadingIcon:{type:String,default:"$vuetify.icons.loading"},itemKey:{type:String,default:"id"},itemText:{type:String,default:"name"},itemChildren:{type:String,default:"children"},loadChildren:Function,openOnClick:Boolean,transition:Boolean},B=Object(j["a"])(Object(A["a"])("treeview")).extend({name:"v-treeview-node",inject:{treeview:{default:null}},props:_({item:{type:Object,default:function(){return null}}},T),data:function(){return{isOpen:!1,isSelected:!1,isIndeterminate:!1,isActive:!1,isLoading:!1,hasLoaded:!1}},computed:{key:function(){return Object($["m"])(this.item,this.itemKey)},children:function(){return Object($["m"])(this.item,this.itemChildren)},text:function(){return Object($["m"])(this.item,this.itemText)},scopedProps:function(){return{item:this.item,leaf:!this.children,selected:this.isSelected,indeterminate:this.isIndeterminate,active:this.isActive,open:this.isOpen}},computedIcon:function(){return this.isIndeterminate?this.indeterminateIcon:this.isSelected?this.onIcon:this.offIcon},hasChildren:function(){return!!this.children&&(!!this.children.length||!!this.loadChildren)}},created:function(){this.treeview.register(this)},beforeDestroy:function(){this.treeview.unregister(this)},methods:{checkChildren:function(){var e=this;return new Promise(function(t){if(!e.children||e.children.length||!e.loadChildren||e.hasLoaded)return t();e.isLoading=!0,t(e.loadChildren(e.item))}).then(function(){e.isLoading=!1,e.hasLoaded=!0})},open:function(){this.isOpen=!this.isOpen,this.treeview.updateOpen(this.key,this.isOpen),this.treeview.emitOpen()},genLabel:function(){var e=[];return this.$scopedSlots.label?e.push(this.$scopedSlots.label(this.scopedProps)):e.push(this.text),this.$createElement("div",{slot:"label",staticClass:"v-treeview-node__label"},e)},genContent:function(){var e=[this.$scopedSlots.prepend&&this.$scopedSlots.prepend(this.scopedProps),this.genLabel(),this.$scopedSlots.append&&this.$scopedSlots.append(this.scopedProps)];return this.$createElement("div",{staticClass:"v-treeview-node__content"},e)},genToggle:function(){var e=this;return this.$createElement(C["a"],{staticClass:"v-treeview-node__toggle",class:{"v-treeview-node__toggle--open":this.isOpen,"v-treeview-node__toggle--loading":this.isLoading},slot:"prepend",on:{click:function(t){t.stopPropagation(),e.isLoading||e.checkChildren().then(function(){return e.open()})}}},[this.isLoading?this.loadingIcon:this.expandIcon])},genCheckbox:function(){var e=this;return this.$createElement(C["a"],{staticClass:"v-treeview-node__checkbox",props:{color:this.isSelected?this.selectedColor:void 0},on:{click:function(t){t.stopPropagation(),e.isLoading||e.checkChildren().then(function(){e.$nextTick(function(){e.isSelected=!e.isSelected,e.isIndeterminate=!1,e.treeview.updateSelected(e.key,e.isSelected),e.treeview.emitSelected()})})}}},[this.computedIcon])},genNode:function(){var e=this,t=[this.genContent()];return this.selectable&&t.unshift(this.genCheckbox()),this.hasChildren&&t.unshift(this.genToggle()),this.$createElement("div",{staticClass:"v-treeview-node__root",class:L({},this.activeClass,this.isActive),on:{click:function(){e.openOnClick&&e.children?e.open():e.activatable&&(e.isActive=!e.isActive,e.treeview.updateActive(e.key,e.isActive),e.treeview.emitActive())}}},t)},genChild:function(e){return this.$createElement(B,{key:Object($["m"])(e,this.itemKey),props:{activatable:this.activatable,activeClass:this.activeClass,item:e,selectable:this.selectable,selectedColor:this.selectedColor,expandIcon:this.expandIcon,indeterminateIcon:this.indeterminateIcon,offIcon:this.offIcon,onIcon:this.onIcon,loadingIcon:this.loadingIcon,itemKey:this.itemKey,itemText:this.itemText,itemChildren:this.itemChildren,loadChildren:this.loadChildren,transition:this.transition,openOnClick:this.openOnClick},scopedSlots:this.$scopedSlots})},genChildrenWrapper:function(){if(!this.isOpen||!this.children)return null;var e=[this.children.map(this.genChild)];return this.$createElement("div",{staticClass:"v-treeview-node__children"},e)},genTransition:function(){return this.$createElement(b["a"],[this.genChildrenWrapper()])}},render:function(e){var t=[this.genNode()];return this.transition?t.push(this.genTransition()):t.push(this.genChildrenWrapper()),e("div",{staticClass:"v-treeview-node",class:{"v-treeview-node--leaf":!this.hasChildren,"v-treeview-node--click":this.openOnClick,"v-treeview-node--selected":this.isSelected,"v-treeview-node--excluded":this.treeview.isExcluded(this.key)}},t)}}),E=i("6a18"),N=i("d9bd");function P(e,t,i){var n=Object($["m"])(e,i);return n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}function D(e,t,i,n,s,a,r){if(e(t,i,s))return!0;var o=Object($["m"])(t,a);if(o){for(var c=!1,l=0;l<o.length;l++)D(e,o[l],i,n,s,a,r)&&(c=!0);if(c)return!0}return r.add(Object($["m"])(t,n)),!1}var K=function(){function e(e,t){var i=[],n=!0,s=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0)if(i.push(r.value),t&&i.length===t)break}catch(c){s=!0,a=c}finally{try{!n&&o["return"]&&o["return"]()}finally{if(s)throw a}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function q(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var M=Object(j["a"])(Object(A["b"])("treeview"),E["a"]).extend({name:"v-treeview",provide:function(){return{treeview:this}},props:F({active:{type:Array,default:function(){return[]}},items:{type:Array,default:function(){return[]}},hoverable:Boolean,multipleActive:Boolean,open:{type:Array,default:function(){return[]}},openAll:Boolean,returnObject:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}},search:String,filter:Function},T),data:function(){return{nodes:{},selectedCache:new Set,activeCache:new Set,openCache:new Set}},computed:{excludedItems:function(){var e=new Set;if(!this.search)return e;for(var t=0;t<this.items.length;t++)D(this.filter||P,this.items[t],this.search,this.itemKey,this.itemText,this.itemChildren,e);return e}},watch:{items:{handler:function(){var e=this,t=Object.keys(this.nodes).map(function(t){return Object($["m"])(e.nodes[t].item,e.itemKey)}),i=this.getKeys(this.items),n=Object($["c"])(i,t);if(n.length||!(i.length<t.length)){n.forEach(function(t){return delete e.nodes[t]});var s=[].concat(q(this.selectedCache));this.selectedCache=new Set,this.activeCache=new Set,this.openCache=new Set,this.buildTree(this.items),Object($["j"])(s,[].concat(q(this.selectedCache)))||this.emitSelected()}},deep:!0},active:function(e){this.handleNodeCacheWatcher(e,this.activeCache,this.updateActive,this.emitActive)},value:function(e){this.handleNodeCacheWatcher(e,this.selectedCache,this.updateSelected,this.emitSelected)},open:function(e){this.handleNodeCacheWatcher(e,this.openCache,this.updateOpen,this.emitOpen)}},created:function(){var e=this;this.buildTree(this.items),this.value.forEach(function(t){return e.updateSelected(t,!0)}),this.emitSelected(),this.active.forEach(function(t){return e.updateActive(t,!0)}),this.emitActive()},mounted:function(){var e=this;(this.$slots.prepend||this.$slots.append)&&Object(N["c"])("The prepend and append slots require a slot-scope attribute",this),this.openAll?this.updateAll(!0):(this.open.forEach(function(t){return e.updateOpen(t,!0)}),this.emitOpen())},methods:{updateAll:function(e){var t=this;Object.keys(this.nodes).forEach(function(i){return t.updateOpen(Object($["m"])(t.nodes[i].item,t.itemKey),e)}),this.emitOpen()},getKeys:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=0;i<e.length;i++){var n=Object($["m"])(e[i],this.itemKey);t.push(n);var s=Object($["m"])(e[i],this.itemChildren);s&&t.push.apply(t,q(this.getKeys(s)))}return t},buildTree:function(e){for(var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=0;n<e.length;n++){var s=e[n],a=Object($["m"])(s,this.itemKey),r=Object($["m"])(s,this.itemChildren,[]),o=this.nodes.hasOwnProperty(a)?this.nodes[a]:{isSelected:!1,isIndeterminate:!1,isActive:!1,isOpen:!1,vnode:null},c={vnode:o.vnode,parent:i,children:r.map(function(e){return Object($["m"])(e,t.itemKey)}),item:s};this.buildTree(r,a),!this.nodes.hasOwnProperty(a)&&null!==i&&this.nodes.hasOwnProperty(i)?(c.isSelected=this.nodes[i].isSelected,c.isIndeterminate=this.nodes[i].isIndeterminate):(c.isSelected=o.isSelected,c.isIndeterminate=o.isIndeterminate),c.isActive=o.isActive,c.isOpen=o.isOpen,this.nodes[a]=r.length?this.calculateState(c,this.nodes):c,this.nodes[a].isSelected&&this.selectedCache.add(a),this.nodes[a].isActive&&this.activeCache.add(a),this.nodes[a].isOpen&&this.openCache.add(a),this.updateVnodeState(a)}},calculateState:function(e,t){var i=e.children.reduce(function(e,i){return e[0]+=+Boolean(t[i].isSelected),e[1]+=+Boolean(t[i].isIndeterminate),e},[0,0]);return e.isSelected=!!e.children.length&&i[0]===e.children.length,e.isIndeterminate=!e.isSelected&&(i[0]>0||i[1]>0),e},emitOpen:function(){this.emitNodeCache("update:open",this.openCache)},emitSelected:function(){this.emitNodeCache("input",this.selectedCache)},emitActive:function(){this.emitNodeCache("update:active",this.activeCache)},emitNodeCache:function(e,t){var i=this;this.$emit(e,this.returnObject?[].concat(q(t)).map(function(e){return i.nodes[e].item}):[].concat(q(t)))},handleNodeCacheWatcher:function(e,t,i,n){var s=this;e=this.returnObject?e.map(function(e){return Object($["m"])(e,s.itemKey)}):e;var a=[].concat(q(t));Object($["j"])(a,e)||(a.forEach(function(e){return i(e,!1)}),e.forEach(function(e){return i(e,!0)}),n())},getDescendants:function(e){var t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=this.nodes[e].children;(t=i).push.apply(t,q(n));for(var s=0;s<n.length;s++)i=this.getDescendants(n[s],i);return i},getParents:function(e){var t=this.nodes[e].parent,i=[];while(null!==t)i.push(t),t=this.nodes[t].parent;return i},register:function(e){var t=Object($["m"])(e.item,this.itemKey);this.nodes[t].vnode=e,this.updateVnodeState(t)},unregister:function(e){var t=Object($["m"])(e.item,this.itemKey);this.nodes[t]&&(this.nodes[t].vnode=null)},updateActive:function(e,t){var i=this;if(this.nodes.hasOwnProperty(e)){this.multipleActive||this.activeCache.forEach(function(e){i.nodes[e].isActive=!1,i.updateVnodeState(e),i.activeCache.delete(e)});var n=this.nodes[e];n&&(t?this.activeCache.add(e):this.activeCache.delete(e),n.isActive=t,this.updateVnodeState(e))}},updateSelected:function(e,t){var i=this;if(this.nodes.hasOwnProperty(e)){var n=new Map,s=[e].concat(q(this.getDescendants(e)));s.forEach(function(e){i.nodes[e].isSelected=t,i.nodes[e].isIndeterminate=!1,n.set(e,t)});var a=this.getParents(e);a.forEach(function(e){i.nodes[e]=i.calculateState(i.nodes[e],i.nodes),n.set(e,i.nodes[e].isSelected)});var r=[e].concat(q(s),q(a));r.forEach(this.updateVnodeState);var o=!0,c=!1,l=void 0;try{for(var h,d=n.entries()[Symbol.iterator]();!(o=(h=d.next()).done);o=!0){var u=h.value,p=K(u,2),f=p[0],v=p[1];!0===v?this.selectedCache.add(f):this.selectedCache.delete(f)}}catch(m){c=!0,l=m}finally{try{!o&&d.return&&d.return()}finally{if(c)throw l}}}},updateOpen:function(e,t){var i=this;if(this.nodes.hasOwnProperty(e)){var n=this.nodes[e],s=Object($["m"])(n.item,this.itemChildren);s&&!s.length&&n.vnode&&!n.vnode.hasLoaded?n.vnode.checkChildren().then(function(){return i.updateOpen(e,t)}):s&&s.length&&(n.isOpen=t,n.isOpen?this.openCache.add(e):this.openCache.delete(e),this.updateVnodeState(e))}},updateVnodeState:function(e){var t=this.nodes[e];t&&t.vnode&&(t.vnode.isSelected=t.isSelected,t.vnode.isIndeterminate=t.isIndeterminate,t.vnode.isActive=t.isActive,t.vnode.isOpen=t.isOpen)},isExcluded:function(e){return!!this.search&&this.excludedItems.has(e)}},render:function(e){var t=this.items.length?this.items.map(B.options.methods.genChild.bind(this)):this.$slots.default;return e("div",{staticClass:"v-treeview",class:F({"v-treeview--hoverable":this.hoverable},this.themeClasses)},t)}}),W=Object(l["a"])(c,n,s,!1,null,"6c5b1a24",null);t["default"]=W.exports;d()(W,{VBtn:u["a"],VCard:p["a"],VCardActions:f["a"],VCardText:f["b"],VCheckbox:v["a"],VChip:m["a"],VDivider:g["a"],VExpandTransition:b["a"],VFlex:S["a"],VIcon:C["a"],VLayout:y["a"],VScrollXTransition:b["e"],VSheet:O["a"],VSnackbar:w["a"],VSpacer:k["a"],VTextField:x["a"],VToolbar:I["a"],VToolbarTitle:V["a"],VTreeview:M})},"169e":function(e,t,i){},5368:function(e,t,i){"use strict";var n=i("c37a"),s=i("ad54"),a=i("5e28");t["a"]=n["a"].extend({name:"selectable",mixins:[s["a"],a["a"]],model:{prop:"inputValue",event:"change"},props:{color:{type:String,default:"accent"},id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(e){return{lazyValue:e.inputValue}},computed:{computedColor:function(){return this.isActive?this.color:this.validationState},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some(function(i){return e.valueComparator(i,t)}):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive}},watch:{inputValue:function(e){this.lazyValue=e}},methods:{genLabel:function(){if(!this.hasLabel)return null;var e=n["a"].options.methods.genLabel.call(this);return e.data.on={click:this.onChange},e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-label":this.label,"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.id,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var e=this;if(!this.isDisabled){var t=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter(function(i){return!e.valueComparator(i,t)}),i.length===n&&i.push(t)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(i,t)?null:t:!i;this.validate(!0,i),this.internalValue=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})},"5e28":function(e,t,i){"use strict";var n=i("2b0e"),s=i("80d2");t["a"]=n["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:s["j"]}}})},"72a6":function(e,t,i){"use strict";var n=i("169e"),s=i.n(n);s.a},"7b16":function(e,t,i){},"94a7":function(e,t,i){},9910:function(e,t,i){"use strict";i.d(t,"a",function(){return c});var n=i("80d2"),s=i("a523"),a=i("549c"),r=i("0e8f"),o=i("a722"),c=Object(n["h"])("spacer","div","v-spacer");s["a"],a["a"],r["a"],o["a"]},ac7c:function(e,t,i){"use strict";i("94a7");var n=i("9d26"),s=i("5368"),a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};t["a"]={name:"v-checkbox",mixins:[s["a"]],props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"}},data:function(e){return{inputIndeterminate:e.indeterminate}},computed:{classes:function(){return{"v-input--selection-controls":!0,"v-input--checkbox":!0}},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon}},watch:{indeterminate:function(e){this.inputIndeterminate=e}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",a({},this.$attrs,{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(n["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}},ad54:function(e,t,i){"use strict";var n=i("3ccf"),s=i("2b0e");t["a"]=s["a"].extend({name:"rippleable",directives:{Ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),e.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",e)):null},onChange:function(){}}})},bf5a:function(e,t,i){},cc20:function(e,t,i){"use strict";i("bf5a");var n=i("58df"),s=i("9d26"),a=i("b64a"),r=i("6a18"),o=i("98a1"),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};t["a"]=Object(n["a"])(a["a"],r["a"],o["a"]).extend({name:"v-chip",props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:!0}},computed:{classes:function(){return c({"v-chip--disabled":this.disabled,"v-chip--selected":this.selected&&!this.disabled,"v-chip--label":this.label,"v-chip--outline":this.outline,"v-chip--small":this.small,"v-chip--removable":this.close},this.themeClasses)}},methods:{genClose:function(e){var t=this,i={staticClass:"v-chip__close",on:{click:function(e){e.stopPropagation(),t.$emit("input",!1)}}};return e("div",i,[e(s["a"],"$vuetify.icons.delete")])},genContent:function(e){return e("span",{staticClass:"v-chip__content"},[this.$slots.default,this.close&&this.genClose(e)])}},render:function(e){var t=this.setBackgroundColor(this.color,{staticClass:"v-chip",class:this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),i=this.textColor||this.outline&&this.color;return e("span",this.setTextColor(i,t),[this.genContent(e)])}})}}]);
//# sourceMappingURL=selection.41012bb1.js.map