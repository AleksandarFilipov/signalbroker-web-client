(function(e){function t(t){for(var r,o,s=t[0],l=t[1],c=t[2],u=0,p=[];u<s.length;u++)o=s[u],i[o]&&p.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==i[s]&&(r=!1)}r&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={app:0},i={app:0},a=[];function s(e){return l.p+"js/"+({about:"about","controllers~log~monitor":"controllers~log~monitor",controllers:"controllers","log~monitor":"log~monitor",log:"log",interface:"interface","monitor~selection~test":"monitor~selection~test",monitor:"monitor",selection:"selection",test:"test",sequences:"sequences"}[e]||e)+"."+{about:"d1dcce6d","controllers~log~monitor":"2956d205",controllers:"8144c413","log~monitor":"0e43ff07",log:"0fa72a4c",interface:"b80687a1","monitor~selection~test":"470f1149",monitor:"828a2785",selection:"ec68744a",test:"841ddc3a",sequences:"80021af2"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"controllers~log~monitor":1,controllers:1,"log~monitor":1,log:1,interface:1,"monitor~selection~test":1,monitor:1,selection:1,test:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({about:"about","controllers~log~monitor":"controllers~log~monitor",controllers:"controllers","log~monitor":"log~monitor",log:"log",interface:"interface","monitor~selection~test":"monitor~selection~test",monitor:"monitor",selection:"selection",test:"test",sequences:"sequences"}[e]||e)+"."+{about:"31d6cfe0","controllers~log~monitor":"6f2f750c",controllers:"3142f46b","log~monitor":"a2f5448e",log:"ffda0fca",interface:"b8f42640","monitor~selection~test":"851e49dd",monitor:"a74a2342",selection:"7317cf60",test:"a400bb8c",sequences:"31d6cfe0"}[e]+".css",i=l.p+r,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var c=a[s],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===r||u===i))return t()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){c=p[s],u=c.getAttribute("data-href");if(u===r||u===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),n(a)},d.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(d)}).then(function(){o[e]=0}));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise(function(t,n){r=i[e]=[t,n]});t.push(r[2]=a);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(e),c=function(t){u.onerror=u.onload=null,clearTimeout(p);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");a.type=r,a.request=o,n[1](a)}i[e]=void 0}};var p=setTimeout(function(){c({type:"timeout",target:u})},12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var p=0;p<c.length;p++)t(c[p]);var d=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("1356"),o=n.n(r);o.a},1356:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=n("bb71");n("da64");r["a"].use(o["a"],{theme:{primary:"#5581c5",secondary:"#a19675",accent:"#f9ead1",error:"#f44336",warning:"#ff5722",info:"#2196f3",success:"#4caf50"},iconfont:"md"});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VApp",{attrs:{id:"sandbox",dark:e.$store.state.dark}},[n("VNavigationDrawer",{attrs:{permanent:"permanent"===e.primaryDrawerType,temporary:"temporary"===e.primaryDrawerType,clipped:e.primaryDrawerClipped,floating:e.primaryDrawerFloating,"mini-variant":e.primaryDrawerMini,absolute:"",overflow:"",app:""},model:{value:e.primaryDrawerModel,callback:function(t){e.primaryDrawerModel=t},expression:"primaryDrawerModel"}},[n("VList",{attrs:{"two-line":"",dense:e.primaryDrawerDense}},[n("VSubheader",[e._v("\n        Signal Broker\n      ")]),n("VDivider"),n("VListTile",{attrs:{avatar:"",to:"/selection"}},[n("VListTileAvatar",[n("VIcon",[e._v("\n            nature\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Signal tree\n          ")]),n("VListTileSubTitle",[e._v("\n            Choose what to control\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/monitor",disabled:0===e.selectedSignals.length}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:0===e.selectedSignals.length}},[e._v("\n            traffic\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Signal Monitor\n          ")]),n("VListTileSubTitle",[e._v("\n            Observe signal traffic\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/sequences",disabled:""}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:""}},[e._v("\n            linear_scale\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Sequences\n          ")]),n("VListTileSubTitle",[e._v("\n            Create signal chains\n          ")])],1)],1),n("VSubheader",[e._v("\n        Reference\n      ")]),n("VDivider"),n("VListTile",{attrs:{avatar:"",to:"/",disabled:""}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:""}},[e._v("\n            school\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Quick Guide\n          ")]),n("VListTileSubTitle",[e._v("\n            Onboarding\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/about",disabled:""}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:""}},[e._v("\n            help\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            About SB\n          ")]),n("VListTileSubTitle",[e._v("\n            Signal Broker\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/log",disabled:""}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:""}},[e._v("\n            event_note\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Session Log\n          ")]),n("VListTileSubTitle",[e._v("\n            Event history\n          ")])],1)],1),n("VSubheader",[e._v("\n        Settings\n      ")]),n("VDivider"),n("VListTile",{attrs:{avatar:"",to:"/interface"}},[n("VListTileAvatar",[n("VIcon",[e._v("\n            settings\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Interface\n          ")]),n("VListTileSubTitle",[e._v("\n            Layout preferences\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/controllers",disabled:""}},[n("VListTileAvatar",[n("VIcon",{attrs:{disabled:""}},[e._v("\n            videogame_asset\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Controllers\n          ")]),n("VListTileSubTitle",[e._v("\n            External peripherals\n          ")])],1)],1),n("VListTile",{attrs:{avatar:"",to:"/test"}},[n("VListTileAvatar",[n("VIcon",[e._v("\n            settings_remote\n          ")])],1),n("VListTileContent",[n("VListTileTitle",[e._v("\n            Conectivity Test\n          ")]),n("VListTileSubTitle",[e._v("\n            Test the conection\n          ")])],1)],1)],1)],1),n("VToolbar",{attrs:{"clipped-left":e.primaryDrawerClipped,dense:e.toolbarDense,flat:e.toolbarFlat,extended:""}},["permanent"!==e.primaryDrawerType?n("VToolbarSideIcon",{on:{click:function(t){t.stopPropagation(),e.primaryDrawerModel=!e.primaryDrawerModel}}}):e._e(),n("VToolbarTitle",[e._v("\n      "+e._s(e.title)+"\n    ")])],1),n("VContent",[n("VContainer",{attrs:{fluid:""}},[n("VLayout",{attrs:{"align-center":"","justify-center":""}},[n("VFlex",{attrs:{xs12:""}},[n("RouterView")],1)],1)],1)],1),n("VFooter",{attrs:{inset:e.footerInset,app:"",absolute:e.footerFloating}},[n("span",[n("VBtn",{attrs:{slot:"activator",depressed:"",color:e.connectionStatus},on:{click:function(t){e.dialog=!0}},slot:"activator"},[e._v("\n        Broker Envoy: "+e._s(e.brokerServerIp)+"\n      ")])],1)]),n("VSnackbar",{attrs:{bottom:"",right:"","multi-line":"","hide-actions":"",timeout:0},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("VTextField",{attrs:{label:"Broker Envoy IP:Port"},model:{value:e.brokerServerIp,callback:function(t){e.brokerServerIp=t},expression:"brokerServerIp"}}),n("VBtn",{attrs:{flat:""},nativeOn:{click:function(t){e.dialog=!1}}},[n("VIcon",[e._v("\n        close\n      ")])],1)],1)],1)},a=[],s={data:function(){return{dialog:!1}},computed:{selectedSignals:{get:function(){return this.$store.state.selectedSignals},set:function(e){this.$store.commit("updateSelectedSignals",e)}},connectionStatus:{get:function(){return this.$store.state.connectionStatus},set:function(e){this.$store.commit("updateConnectionStatus",e)}},brokerServerIp:{get:function(){return this.$store.state.brokerServerIp},set:function(e){this.$store.commit("updateBrokerServerIp",e)}},title:{get:function(){return this.$store.state.title},set:function(e){this.$store.commit("updateTitle",e)}},primaryDrawerModel:{get:function(){return this.$store.state.primaryDrawer.model},set:function(e){this.$store.commit("updatePrimaryDrawerModel",e)}},primaryDrawerType:{get:function(){return this.$store.state.primaryDrawer.type},set:function(e){this.$store.commit("updatePrimaryDrawerType",e)}},primaryDrawerClipped:{get:function(){return this.$store.state.primaryDrawer.clipped},set:function(e){this.$store.commit("updatePrimaryDrawerClipped",e)}},primaryDrawerFloating:{get:function(){return this.$store.state.primaryDrawer.floating},set:function(e){this.$store.commit("updatePrimaryDrawerFloating",e)}},primaryDrawerMini:{get:function(){return this.$store.state.primaryDrawer.mini},set:function(e){this.$store.commit("updatePrimaryDrawerMini",e)}},toolbarFlat:{get:function(){return this.$store.state.toolbar.flat},set:function(e){this.$store.commit("updateToolbarFlat",e)}},toolbarDense:{get:function(){return this.$store.state.toolbar.dense},set:function(e){this.$store.commit("updateToolbarDense",e)}},footerInset:{get:function(){return this.$store.state.footer.inset},set:function(e){this.$store.commit("updateFooterInset",e)}},footerFloating:{get:function(){return this.$store.state.footer.floating},set:function(e){this.$store.commit("updateFooterFloating",e)}},primaryDrawerDense:{get:function(){return this.$store.state.primaryDrawer.dense},set:function(e){this.$store.commit("updatePrimaryDrawerDense",e)}}}},l=s,c=(n("034f"),n("2877")),u=n("6544"),p=n.n(u),d=n("7496"),f=n("8336"),m=n("a523"),g=n("549c"),v=n("ce7e"),V=n("0e8f"),b=n("553a"),h=n("132d"),T=n("a722"),y=n("8860"),S=n("ba95"),w=n("c954"),D=n("5d23"),L=n("f774"),_=n("2db4"),C=n("e0c7"),k=n("2677"),I=n("71d9"),$=n("706c"),P=n("2a7f"),x=Object(c["a"])(l,i,a,!1,null,null,null),F=x.exports;p()(x,{VApp:d["a"],VBtn:f["a"],VContainer:m["a"],VContent:g["a"],VDivider:v["a"],VFlex:V["a"],VFooter:b["a"],VIcon:h["a"],VLayout:T["a"],VList:y["a"],VListTile:S["a"],VListTileAvatar:w["a"],VListTileContent:D["a"],VListTileSubTitle:D["b"],VListTileTitle:D["c"],VNavigationDrawer:L["a"],VSnackbar:_["a"],VSubheader:C["a"],VTextField:k["a"],VToolbar:I["a"],VToolbarSideIcon:$["a"],VToolbarTitle:P["a"]});n("d5e8"),n("d1e7");var A=n("8c4f"),B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VCard",{attrs:{color:"transparent",flat:""}},[n("VCardTitle",{attrs:{"primary-title":""}},[e._v("\n    Quick Guide\n  ")]),n("VCardText",[n("VStepper",{model:{value:e.stepperValue,callback:function(t){e.stepperValue=t},expression:"stepperValue"}},[n("VStepperHeader",[n("VStepperStep",{attrs:{step:"1",complete:e.stepperValue>1}},[e._v("\n          Name of step 1\n        ")]),n("VDivider"),n("VStepperStep",{attrs:{step:"2",complete:e.stepperValue>2}},[e._v("\n          Name of step 2\n        ")])],1),n("VStepperItems",[n("VStepperContent",{attrs:{step:"1"}},[n("VCard",{staticClass:"mb-5",attrs:{flat:"",height:"200px"}}),n("VBtn",{attrs:{color:"primary"},nativeOn:{click:function(t){e.stepperValue=2}}},[e._v("\n            Continue\n          ")]),n("VBtn",{attrs:{flat:""}},[e._v("\n            Cancel\n          ")])],1),n("VStepperContent",{attrs:{step:"2"}},[n("VCard",{staticClass:"mb-5",attrs:{flat:"",color:"grey lighten-1",height:"200px"}}),n("VBtn",{attrs:{color:"primary"},nativeOn:{click:function(t){e.stepperValue=3}}},[e._v("\n            Continue\n          ")]),n("VBtn",{attrs:{flat:""}},[e._v("\n            Cancel\n          ")])],1)],1)],1)],1)],1)},q=[],M={name:"Home",components:{},data:function(){return{stepperValue:0,response:"",request:""}},created:function(){},methods:{}},O=M,E=n("b0af"),j=n("99d9"),N=n("12b2"),H=n("7e85"),R=n("e516"),G=n("9c54"),J=n("56a4"),Q=Object(c["a"])(O,B,q,!1,null,null,null),K=Q.exports;p()(Q,{VBtn:f["a"],VCard:E["a"],VCardText:j["b"],VCardTitle:N["a"],VDivider:v["a"],VStepper:H["a"],VStepperContent:R["a"],VStepperHeader:G["a"],VStepperItems:G["b"],VStepperStep:J["a"]}),r["a"].use(A["a"]);var U=new A["a"]({routes:[{path:"/",name:"Root",component:function(){return Promise.all([n.e("monitor~selection~test"),n.e("selection")]).then(n.bind(null,"11dc"))}},{path:"/home",name:"home",component:K},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/interface",name:"interface",component:function(){return n.e("interface").then(n.bind(null,"f397"))}},{path:"/selection",name:"selection",component:function(){return Promise.all([n.e("monitor~selection~test"),n.e("selection")]).then(n.bind(null,"11dc"))}},{path:"/monitor",name:"monitor",component:function(){return Promise.all([n.e("monitor~selection~test"),n.e("controllers~log~monitor"),n.e("log~monitor"),n.e("monitor")]).then(n.bind(null,"a373"))}},{path:"/sequences",name:"sequences",component:function(){return n.e("sequences").then(n.bind(null,"32e5"))}},{path:"/test",name:"test",component:function(){return Promise.all([n.e("monitor~selection~test"),n.e("test")]).then(n.bind(null,"78c1"))}},{path:"/controllers",name:"controllers",component:function(){return Promise.all([n.e("controllers~log~monitor"),n.e("controllers")]).then(n.bind(null,"5be1"))}},{path:"/log",name:"log",component:function(){return Promise.all([n.e("controllers~log~monitor"),n.e("log~monitor"),n.e("log")]).then(n.bind(null,"f836"))}}]}),z=n("2f62");r["a"].use(z["a"]);var W=new z["a"].Store({state:{brokerServerIp:"http://10.251.177.205:8081",connectionStatus:"",search:"",title:"Signal Broker",dark:!0,toolbar:{dense:!1,flat:!0},primaryDrawer:{model:null,type:"temporary",clipped:!1,floating:!1,mini:!1,dense:!0},footer:{inset:!0,floating:!1},requestHistory:[],selectedSignals:[],signalSelectionItems:[],signalDataList:[]},mutations:{updateSignalDataList:function(e,t){e.signalDataList=t},updateSearch:function(e,t){e.search=t},updateSignalSelectionItems:function(e,t){e.signalSelectionItems=t},updateConnectionStatus:function(e,t){e.connectionStatus=t},updateSelectedSignals:function(e,t){e.selectedSignals=t},updateBrokerServerIp:function(e,t){e.brokerServerIp=t},updateRequestHistory:function(e,t){e.requestHistory=t},updateDark:function(e,t){e.dark=t},updateTitle:function(e,t){e.title=t},updateToolbarDense:function(e,t){e.toolbar.dense=t},updateToolbarFlat:function(e,t){e.toolbar.flat=t},updatePrimaryDrawerModel:function(e,t){e.primaryDrawer.model=t},updatePrimaryDrawerType:function(e,t){e.primaryDrawer.type=t},updatePrimaryDrawerClipped:function(e,t){e.primaryDrawer.clipped=t},updatePrimaryDrawerFloating:function(e,t){e.primaryDrawer.floating=t},updatePrimaryDrawerMini:function(e,t){e.primaryDrawer.mini=t},updatePrimaryDrawerDense:function(e,t){e.primaryDrawer.dense=t},updateFooterInset:function(e,t){e.footer.inset=t},updateFooterFloating:function(e,t){e.footer.floating=t}},actions:{}});r["a"].config.productionTip=!1,new r["a"]({router:U,store:W,render:function(e){return e(F)}}).$mount("#app")}});
//# sourceMappingURL=app.b4e4ffc9.js.map