(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["publish"],{"02f4":function(t,e,n){var a=n("4588"),r=n("be13");t.exports=function(t){return function(e,n){var i,s,o=String(r(e)),c=a(n),l=o.length;return c<0||c>=l?t?"":void 0:(i=o.charCodeAt(c),i<55296||i>56319||c+1===l||(s=o.charCodeAt(c+1))<56320||s>57343?t?o.charAt(c):i:t?o.slice(c,c+2):s-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var a=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},"20d6":function(t,e,n){"use strict";var a=n("5ca1"),r=n("0a49")(6),i="findIndex",s=!0;i in[]&&Array(1)[i](function(){s=!1}),a(a.P+a.F*s,"Array",{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(i)},"214f":function(t,e,n){"use strict";n("b0c5");var a=n("2aba"),r=n("32e9"),i=n("79e5"),s=n("be13"),o=n("2b4c"),c=n("520a"),l=o("species"),u=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var p=o(t),d=!i(function(){var e={};return e[p]=function(){return 7},7!=""[t](e)}),g=d?!i(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[p](""),!e}):void 0;if(!d||!g||"replace"===t&&!u||"split"===t&&!f){var h=/./[p],b=n(s,p,""[t],function(t,e,n,a,r){return e.exec===c?d&&!r?{done:!0,value:h.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}}),v=b[0],y=b[1];a(String.prototype,t,v),r(RegExp.prototype,p,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var a=n("aae3"),r=n("cb7c"),i=n("ebd6"),s=n("0390"),o=n("9def"),c=n("5f1b"),l=n("520a"),u=n("79e5"),f=Math.min,p=[].push,d="split",g="length",h="lastIndex",b=4294967295,v=!u(function(){RegExp(b,"y")});n("214f")("split",2,function(t,e,n,u){var y;return y="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[g]||2!="ab"[d](/(?:ab)*/)[g]||4!="."[d](/(.?)(.?)/)[g]||"."[d](/()()/)[g]>1||""[d](/.?/)[g]?function(t,e){var r=String(this);if(void 0===t&&0===e)return[];if(!a(t))return n.call(r,t,e);var i,s,o,c=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,d=void 0===e?b:e>>>0,v=new RegExp(t.source,u+"g");while(i=l.call(v,r)){if(s=v[h],s>f&&(c.push(r.slice(f,i.index)),i[g]>1&&i.index<r[g]&&p.apply(c,i.slice(1)),o=i[0][g],f=s,c[g]>=d))break;v[h]===i.index&&v[h]++}return f===r[g]?!o&&v.test("")||c.push(""):c.push(r.slice(f)),c[g]>d?c.slice(0,d):c}:"0"[d](void 0,0)[g]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,a){var r=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,r,a):y.call(String(r),n,a)},function(t,e){var a=u(y,t,this,e,y!==n);if(a.done)return a.value;var l=r(t),p=String(this),d=i(l,RegExp),g=l.unicode,h=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(v?"y":"g"),S=new d(v?l:"^(?:"+l.source+")",h),m=void 0===e?b:e>>>0;if(0===m)return[];if(0===p.length)return null===c(S,p)?[p]:[];var x=0,V=0,T=[];while(V<p.length){S.lastIndex=v?V:0;var I,k=c(S,v?p:p.slice(V));if(null===k||(I=f(o(S.lastIndex+(v?0:V)),p.length))===x)V=s(p,V,g);else{if(T.push(p.slice(x,V)),T.length===m)return T;for(var w=1;w<=k.length-1;w++)if(T.push(k[w]),T.length===m)return T;V=x=I}}return T.push(p.slice(x)),T}]})},2957:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("VCard",{staticClass:"marginToolbar"},[n("VToolbar",{attrs:{card:"",color:"transparent"}},[n("VIcon",[t._v("\n        publish\n      ")]),n("VToolbarTitle",[t._v("\n        Publish\n      ")])],1),n("VCardText",{staticClass:"py-3"},[n("div",[0===t.selectedSignals.length?n("div",{staticClass:"title font-weight-light grey--text pa-3 text-xs-center my-4"},[t._v("\n          You have no selected signals at this time."),n("br"),n("VBtn",{attrs:{flat:"",to:"/selection",depressed:""}},[n("VIcon",{attrs:{left:""}},[t._v("\n              nature\n            ")]),t._v(" Selection Tree\n          ")],1)],1):t._e()]),n("VContainer",{attrs:{"mt-4":"","mb-5":""}},t._l(t.selectedSignals,function(e,a){return n("VLayout",{key:a,attrs:{"justify-start":""}},[n("VTextField",{staticClass:"my-3 text-capitalize",attrs:{label:e.name,hint:t.determineSignalValueType(a),"persistent-hint":""},on:{input:function(e){return t.parseDataType(e,a)}},model:{value:t.signalValues[a],callback:function(e){t.$set(t.signalValues,a,e)},expression:"signalValues[index]"}}),n("VSelect",{staticClass:"my-3 ml-5 capitalize shrink",attrs:{items:t.dataTypes,label:"Payload Type"},model:{value:t.signalValueType[a],callback:function(e){t.$set(t.signalValueType,a,e)},expression:"signalValueType[index]"}}),n("VBtn",{staticClass:"my-3",attrs:{large:"",flat:""},on:{click:function(e){return t.remove(a)}}},[n("VIcon",[t._v("\n              close\n            ")])],1)],1)}),1)],1),n("VDivider"),n("VCardActions",[n("VLayout",{attrs:{row:"",wrap:""}},[n("div",{staticClass:"mx-1"},[n("VTooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("VBtn",t._g({attrs:{flat:"",color:"grey",depressed:"",to:"selection"}},a),[n("VIcon",[t._v("\n                  nature\n                ")])],1)]}}])},[n("span",[t._v("Selection tree")])])],1),n("VSpacer"),n("VTooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("VBtn",t._g({staticClass:"mx-2",attrs:{depressed:"",flat:""},on:{click:t.readSignals}},a),[n("VIcon",[t._v("\n                cached\n              ")])],1)]}}])},[n("span",[t._v("Refresh")])]),n("VBtn",{attrs:{depressed:"",disabled:t.selectedSignals.length<1,color:" success"},on:{click:t.publishSignals}},[n("span",[t._v("\n            Publish")])])],1)],1)],1),n("VSnackbar",{attrs:{bottom:"",right:"",color:t.snackbarColor,timeout:8e3},model:{value:t.snackbarDisplayed,callback:function(e){t.snackbarDisplayed=e},expression:"snackbarDisplayed"}},[n("VLayout",[n("VIcon",{attrs:{left:""}},[t._v("\n        "+t._s(t.snackbarIcon)+"\n      ")]),t._v("\n      "+t._s(t.snackbarMessage)+"\n    ")],1),n("VBtn",{attrs:{flat:""},nativeOn:{click:function(e){t.value=!1}}},[n("VIcon",[t._v("\n        close\n      ")])],1)],1)],1)},r=[],i=(n("7f7f"),n("20d6"),n("ac6a"),n("c5f6"),n("7cdf"),n("28a5"),n("6b54"),n("f576"),n("9508"),{name:"Publish",filters:{rawStringFilter:function(t){return t.toString(16).padStart(2,"0")},decimalPad:function(t){return t.toString().padStart(3,"0")},toDate:function(t){var e=new Date(t);return e.toLocaleTimeString({},{hour12:!1})},dec2bin:function(t){function e(t){return{from:function(e){return{to:function(n){return parseInt(t,e).toString(n).padStart(8,"0")}}}}}return e(t).from(10).to(2)},hex2bin:function(t){function e(t){return{from:function(e){return{to:function(n){return parseInt(t,e).toString(n)}}}}}return e(t).from(16).to(2)}},data:function(){return{snackbarDisplayed:!1,signalValues:[],signalValueType:[],chipValue:[],showEmptyResults:!0,subscribed:!1,request:"",hexDec:"hex",snackbarMessage:"Not connected",snackbarIcon:"warning",snackbarColor:"error",responseArray:[],signalDataList:[],firstRun:!0,chipOnline:[],selected:!1,responsePayload:null,dataTypes:["integer","double","raw","arbitration","empty"]}},computed:{connectionStatus:{get:function(){return this.$store.state.connectionStatus},set:function(t){this.$store.commit("updateConnectionStatus",t)}},brokerServerIp:{get:function(){return this.$store.state.brokerServerIp},set:function(t){this.$store.commit("updateBrokerServerIp",t)}},selectedSignals:{get:function(){return this.$store.state.selectedSignals},set:function(t){this.$store.commit("updateSelectedSignals",t)}},requestHistory:{get:function(){return this.$store.state.requestHistory},set:function(t){this.$store.commit("updateRequestHistory",t)}}},watch:{},created:function(){},mounted:function(){var t=this;this.readSignals(),setTimeout(function(){t.readSignals(),setTimeout(function(){t.$forceUpdate()},100)},600)},beforeDestroy:function(){},methods:{parseDataType:function(t,e){switch(!0){case!isNaN(t)&&parseInt(t).toString()===t:this.signalValueType[e]=null,this.signalValueType[e]=this.dataTypes[0];break;case!isNaN(t)&&parseFloat(t).toString()===t:this.signalValueType[e]=null,this.signalValueType[e]=this.dataTypes[1];break;case isNaN(t)&&"0"===t[0]&&"x"===t[1]:this.signalValueType[e]=null,this.signalValueType[e]=this.dataTypes[2];break;case isNaN(t)&&t.toString().length>0:this.signalValueType[e]=null,this.signalValueType[e]=this.dataTypes[3];break;case""===t.toString():this.signalValueType[e]=null,this.signalValueType[e]=this.dataTypes[4];break;default:break}},remove:function(t){this.selectedSignals.splice(t,1)},rawStringLength:function(t){return t.toString(16).length},snackbar:function(t,e,n){this.snackbarColor=t,this.snackbarMessage=e,this.snackbarIcon=n||"warning",this.snackbarDisplayed=!0},determineSignalValueType:function(t){return void 0!==this.signalValueType[t]?this.signalValueType[t]:"Undetermined data type"},clientName:function(){return"SBWebClient"+Date.now()},determineDataType:function(t,e){""===e||null===e?this.signalValueType[t]=this.dataTypes[4]:"0"===e.split("")[0]&&"x"===e.split("")[1]?this.signalValueType[t]=this.dataTypes[2]:isNaN(e)?"true"===e.toLowerCase()||"false"===e.toLowerCase()?this.signalValueType[t]=this.dataTypes[3]:this.signalValueType[t]=this.dataTypes[4]:(this.signalValueType[t]=this.dataTypes[1],Number.isInteger(parseFloat(e))&&(this.signalValueType[t]=this.dataTypes[0]))},readSignals:function(){var t=this,e=new api.default.NetworkServiceClient(this.brokerServerIp),n=new api.default.SubscriberConfig;this.request="Read";var a=[];this.selectedSignals.forEach(function(t){t.signalId&&a.push(t.signalId)});var r=new api.default.SignalIds;r.setSignalidList(a);var i=new api.default.ClientId;i.setId(this.clientName),n.setSignals(r),n.setClientid(i);var s=e.subscribeToSignals(n);s.on("status",function(e){return t.snackbar("info","Status: "+e.details,"info")}),s.on("data",function(e){s.cancel();var n=e.getSignalList();n.forEach(function(e){var n,a=e.getId().getName(),r=t.selectedSignals.findIndex(function(t){return t.name===a}),i={empty:null,arbitration:null,double:null,integer:null};e.hasEmpty()&&(i.empty=!0,n=t.dataTypes[4]),e.hasArbitration()&&(i.arbitration=!0,n=t.dataTypes[3]),e.hasDouble()&&(i.double=!0,n=t.dataTypes[1]),e.hasInteger()&&(i.integer=!0,n=t.dataTypes[0]),t.signalValueType[r]=n}),setTimeout(function(){t.$forceUpdate()},100)})},publishSignals:function(){var t=this,e=new api.default.NetworkServiceClient(this.brokerServerIp),n=new api.default.PublisherConfig;this.request="Publish";var a=[];this.selectedSignals.forEach(function(e,n){if(e.signalId){var r=new api.default.Signal;r.setId(e.signalId);var i=t.signalValues[n],s=t.signalValueType[n];if(void 0!==i){var o;switch(s){case"integer":o=parseInt(i),r.setInteger(o);break;case"double":o=parseFloat(i),r.setDouble(o);break;case"arbitration":o=i.toString().toLowerCase(),"true"===i?r.setArbitration(!0):r.setArbitration(!1);break;case"empty":default:r.setEmpty();break}a.push(r)}}});var r=new api.default.Signals;r.setSignalList(a);var i=new api.default.ClientId;i.setId(this.clientName()),n.setSignals(r),n.setClientid(i),n.setFrequency(0),e.publishSignals(n,{},this.callback)},callback:function(t,e){e&&this.snackbar("success","Signals Published","publish"),null!==t&&this.snackbar("error",t.message,"warning")}}}),s=i,o=(n("9c2d"),n("2877")),c=n("6544"),l=n.n(c),u=n("8336"),f=n("b0af"),p=n("99d9"),d=n("a523"),g=n("ce7e"),h=n("132d"),b=n("a722"),v=n("b56d"),y=n("2db4"),S=n("9910"),m=n("2677"),x=n("71d9"),V=n("2a7f"),T=n("3a2f"),I=Object(o["a"])(s,a,r,!1,null,null,null);e["default"]=I.exports;l()(I,{VBtn:u["a"],VCard:f["a"],VCardActions:p["a"],VCardText:p["b"],VContainer:d["a"],VDivider:g["a"],VIcon:h["a"],VLayout:b["a"],VSelect:v["a"],VSnackbar:y["a"],VSpacer:S["a"],VTextField:m["a"],VToolbar:x["a"],VToolbarTitle:V["a"],VTooltip:T["a"]})},"2e08":function(t,e,n){var a=n("9def"),r=n("9744"),i=n("be13");t.exports=function(t,e,n,s){var o=String(i(t)),c=o.length,l=void 0===n?" ":String(n),u=a(e);if(u<=c||""==l)return o;var f=u-c,p=r.call(l,Math.ceil(f/l.length));return p.length>f&&(p=p.slice(0,f)),s?p+o:o+p}},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"48e9":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Roboto+Mono);",""]),e.push([t.i,".overflowY{overflow-x:hidden;overflow-y:auto;max-height:calc(86vh - 300px)}.marginToolbar{margin-top:-64px}.monoSpace{font-family:Roboto Mono,monospace;font-weight:400;text-transform:uppercase}.pointerCursor{cursor:pointer}",""])},"520a":function(t,e,n){"use strict";var a=n("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,s=r,o="lastIndex",c=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t[o]||0!==e[o]}(),l=void 0!==/()??/.exec("")[1],u=c||l;u&&(s=function(t){var e,n,s,u,f=this;return l&&(n=new RegExp("^"+f.source+"$(?!\\s)",a.call(f))),c&&(e=f[o]),s=r.call(f,t),c&&s&&(f[o]=f.global?s.index+s[0].length:e),l&&s&&s.length>1&&i.call(s[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(s[u]=void 0)}),s}),t.exports=s},"5dbc":function(t,e,n){var a=n("d3f4"),r=n("8b97").set;t.exports=function(t,e,n){var i,s=e.constructor;return s!==n&&"function"==typeof s&&(i=s.prototype)!==n.prototype&&a(i)&&r&&r(t,i),t}},"5f1b":function(t,e,n){"use strict";var a=n("23c6"),r=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"6b54":function(t,e,n){"use strict";n("3846");var a=n("cb7c"),r=n("0bfb"),i=n("9e1e"),s="toString",o=/./[s],c=function(t){n("2aba")(RegExp.prototype,s,t,!0)};n("79e5")(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?c(function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?r.call(t):void 0)}):o.name!=s&&c(function(){return o.call(this)})},"7cdf":function(t,e,n){var a=n("5ca1");a(a.S,"Number",{isInteger:n("9c12")})},"7f7f":function(t,e,n){var a=n("86cc").f,r=Function.prototype,i=/^\s*function ([^ (]*)/,s="name";s in r||n("9e1e")&&a(r,s,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},"8b97":function(t,e,n){var a=n("d3f4"),r=n("cb7c"),i=function(t,e){if(r(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(r){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:a(t,n),t}}({},!1):void 0),check:i}},9744:function(t,e,n){"use strict";var a=n("4588"),r=n("be13");t.exports=function(t){var e=String(r(this)),n="",i=a(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(n+=e);return n}},"9c12":function(t,e,n){var a=n("d3f4"),r=Math.floor;t.exports=function(t){return!a(t)&&isFinite(t)&&r(t)===t}},"9c2d":function(t,e,n){"use strict";var a=n("a7a1"),r=n.n(a);r.a},a7a1:function(t,e,n){var a=n("48e9");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("499e").default;r("8596c6a4",a,!0,{sourceMap:!1,shadowMode:!1})},aa77:function(t,e,n){var a=n("5ca1"),r=n("be13"),i=n("79e5"),s=n("fdef"),o="["+s+"]",c="​",l=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),f=function(t,e,n){var r={},o=i(function(){return!!s[t]()||c[t]()!=c}),l=r[t]=o?e(p):s[t];n&&(r[n]=l),a(a.P+a.F*o,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},aae3:function(t,e,n){var a=n("d3f4"),r=n("2d95"),i=n("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==r(t))}},b0c5:function(t,e,n){"use strict";var a=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},c5f6:function(t,e,n){"use strict";var a=n("7726"),r=n("69a8"),i=n("2d95"),s=n("5dbc"),o=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,f=n("86cc").f,p=n("aa77").trim,d="Number",g=a[d],h=g,b=g.prototype,v=i(n("2aeb")(b))==d,y="trim"in String.prototype,S=function(t){var e=o(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():p(e,3);var n,a,r,i=e.charCodeAt(0);if(43===i||45===i){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+e}for(var s,c=e.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>r)return NaN;return parseInt(c,a)}}return+e};if(!g(" 0o1")||!g("0b1")||g("+0x1")){g=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof g&&(v?c(function(){b.valueOf.call(n)}):i(n)!=d)?s(new h(S(e)),n,g):S(e)};for(var m,x=n("9e1e")?l(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),V=0;x.length>V;V++)r(h,m=x[V])&&!r(g,m)&&f(g,m,u(h,m));g.prototype=b,b.constructor=g,n("2aba")(a,d,g)}},f576:function(t,e,n){"use strict";var a=n("5ca1"),r=n("2e08"),i=n("a25f"),s=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);a(a.P+a.F*s,"String",{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);