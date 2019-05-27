(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["diagnostics~monitor~test"],{"03b2":function(t,i,e){var s=e("e8c7");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("8beec3be",s,!0,{sourceMap:!1,shadowMode:!1})},"2e29":function(t,i,e){var s=e("8021");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("360304ae",s,!0,{sourceMap:!1,shadowMode:!1})},"43a6":function(t,i,e){"use strict";e("94a7"),e("60d0");var s=e("c37a"),r=e("5e28"),n=e("94ab");i["a"]=s["a"].extend({name:"v-radio-group",mixins:[r["a"],Object(n["b"])("radio")],model:{prop:"value",event:"change"},provide:function(){return{radio:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},mandatory:{type:Boolean,default:!0},name:String,row:Boolean,value:{default:null}},data:function(){return{internalTabIndex:-1,radios:[]}},computed:{classes:function(){return{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},watch:{hasError:"setErrorState",internalValue:"setActiveRadio"},mounted:function(){this.setErrorState(this.hasError),this.setActiveRadio()},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{role:"radiogroup"}},s["a"].options.methods.genDefaultSlot.call(this))},onRadioChange:function(t){this.disabled||(this.hasInput=!0,this.internalValue=t,this.setActiveRadio(),this.$nextTick(this.validate))},onRadioBlur:function(t){t.relatedTarget&&t.relatedTarget.classList.contains("v-radio")||(this.hasInput=!0,this.$emit("blur",t))},register:function(t){t.isActive=this.valueComparator(this.internalValue,t.value),t.$on("change",this.onRadioChange),t.$on("blur",this.onRadioBlur),this.radios.push(t)},setErrorState:function(t){for(var i=this.radios.length;--i>=0;)this.radios[i].parentError=t},setActiveRadio:function(){for(var t=this.radios.length;--t>=0;){var i=this.radios[t];i.isActive=this.valueComparator(this.internalValue,i.value)}},unregister:function(t){t.$off("change",this.onRadioChange),t.$off("blur",this.onRadioBlur);var i=this.radios.findIndex(function(i){return i===t});i>-1&&this.radios.splice(i,1)}}})},"569a":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".v-input--radio-group__input{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.v-input--radio-group--column .v-input--radio-group__input>.v-label{padding-bottom:8px}.v-input--radio-group--row .v-input--radio-group__input>.v-label{padding-right:8px}.v-input--radio-group--row .v-input--radio-group__input{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child){margin-bottom:8px}.v-input--radio-group--column .v-input--radio-group__input{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}",""])},"60d0":function(t,i,e){var s=e("569a");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("59efdbfe",s,!0,{sourceMap:!1,shadowMode:!1})},"67b6":function(t,i,e){"use strict";e("a14d");var s=e("9d26"),r=e("ba87"),n=e("b64a"),a=e("ad54"),o=e("6a18"),l=e("5368"),u=e("94ab"),h=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t};function c(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}i["a"]={name:"v-radio",mixins:[n["a"],a["a"],Object(u["a"])("radio","v-radio","v-radio-group"),o["a"]],inheritAttrs:!1,props:{color:{type:String,default:"accent"},disabled:Boolean,label:String,onIcon:{type:String,default:"$vuetify.icons.radioOn"},offIcon:{type:String,default:"$vuetify.icons.radioOff"},readonly:Boolean,value:null},data:function(){return{isActive:!1,isFocused:!1,parentError:!1}},computed:{computedData:function(){return this.setTextColor(!this.parentError&&this.isActive&&this.color,{staticClass:"v-radio",class:h({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses)})},computedColor:function(){return this.isActive?this.color:this.radio.validationState||!1},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},hasState:function(){return this.isActive||!!this.radio.validationState},isDisabled:function(){return this.disabled||!!this.radio.disabled},isReadonly:function(){return this.readonly||!!this.radio.readonly}},mounted:function(){this.radio.register(this)},beforeDestroy:function(){this.radio.unregister(this)},methods:{genInput:function(){for(var t,i=arguments.length,e=Array(i),s=0;s<i;s++)e[s]=arguments[s];return(t=l["a"].options.methods.genInput).call.apply(t,[this].concat(c(e)))},genLabel:function(){return this.$createElement(r["a"],{on:{click:this.onChange},attrs:{for:this.id},props:{color:this.radio.validationState||"",dark:this.dark,focused:this.hasState,light:this.light}},this.$slots.label||this.label)},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("radio",h({name:this.radio.name||!!this.radio._uid&&"v-radio-"+this.radio._uid,value:this.value},this.$attrs)),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(s["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isDisabled||this.isActive&&this.radio.mandatory||this.$emit("change",this.value)},onKeydown:function(){}},render:function(t){return t("div",this.computedData,[this.genRadio(),this.genLabel()])}}},8021:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".theme--light.v-input--switch__thumb{color:#fafafa}.theme--light.v-input--switch__track{color:rgba(0,0,0,.38)}.theme--light.v-input--switch.v-input--is-disabled .v-input--switch__thumb{color:#bdbdbd!important}.theme--light.v-input--switch.v-input--is-disabled .v-input--switch__track{color:rgba(0,0,0,.12)!important}.theme--dark.v-input--switch__thumb{color:#bdbdbd}.theme--dark.v-input--switch__track{color:hsla(0,0%,100%,.3)}.theme--dark.v-input--switch.v-input--is-disabled .v-input--switch__thumb{color:#424242!important}.theme--dark.v-input--switch.v-input--is-disabled .v-input--switch__track{color:hsla(0,0%,100%,.1)!important}.application--is-rtl .v-input--switch .v-input--selection-controls__ripple{left:auto;right:-14px}.application--is-rtl .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.application--is-rtl .v-input--switch.v-input--is-dirty .v-input--switch__thumb{-webkit-transform:translate(-16px);transform:translate(-16px)}.v-input--switch__thumb,.v-input--switch__track{background-color:currentColor;pointer-events:none;-webkit-transition:inherit;transition:inherit}.v-input--switch__track{border-radius:8px;height:14px;left:2px;opacity:.6;position:absolute;right:2px;top:calc(50% - 7px)}.v-input--switch__thumb{border-radius:50%;top:calc(50% - 10px);height:20px;position:relative;width:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-input--switch .v-input--selection-controls__input{width:38px}.v-input--switch .v-input--selection-controls__ripple{left:-14px;top:calc(50% - 24px)}.v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,.v-input--switch.v-input--is-dirty .v-input--switch__thumb{-webkit-transform:translate(16px);transform:translate(16px)}",""])},"97e5":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".theme--light.v-radio--is-disabled label{color:rgba(0,0,0,.38)}.theme--light.v-radio--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-radio--is-disabled label{color:hsla(0,0%,100%,.5)}.theme--dark.v-radio--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.v-radio{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;height:auto;margin-right:16px;outline:none}.v-radio--is-disabled{pointer-events:none}",""])},a14d:function(t,i,e){var s=e("97e5");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var r=e("499e").default;r("275a7f3e",s,!0,{sourceMap:!1,shadowMode:!1})},b73d:function(t,i,e){"use strict";e("94a7"),e("2e29");var s=e("5368"),r=e("c341"),n=e("0789"),a=e("490a"),o=e("80d2"),l=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t};i["a"]={name:"v-switch",directives:{Touch:r["a"]},mixins:[s["a"]],props:{loading:{type:[Boolean,String],default:!1}},computed:{classes:function(){return{"v-input--selection-controls v-input--switch":!0}},switchData:function(){return this.setTextColor(this.loading?void 0:this.computedColor,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",this.$attrs),this.genRipple(this.setTextColor(this.computedColor,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",l({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",l({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(n["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(a["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===o["s"].left&&this.isActive||t.keyCode===o["s"].right&&!this.isActive)&&this.onChange()}}}},ba0d:function(t,i,e){"use strict";e("03b2");var s=e("0789"),r=e("c37a"),n=e("c584"),a=e("80d2"),o=e("d9bd"),l=e("7dd3"),u=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t};i["a"]=r["a"].extend({name:"v-slider",directives:{ClickOutside:n["a"]},mixins:[l["a"]],props:{alwaysDirty:Boolean,inverseLabel:Boolean,label:String,min:{type:[Number,String],default:0},max:{type:[Number,String],default:100},step:{type:[Number,String],default:1},ticks:{type:[Boolean,String],default:!1,validator:function(t){return"boolean"===typeof t||"always"===t}},tickLabels:{type:Array,default:function(){return[]}},tickSize:{type:[Number,String],default:1},thumbColor:{type:String,default:null},thumbLabel:{type:[Boolean,String],default:null,validator:function(t){return"boolean"===typeof t||"always"===t}},thumbSize:{type:[Number,String],default:32},trackColor:{type:String,default:null},value:[Number,String]},data:function(t){return{app:{},isActive:!1,keyPressed:0,lazyValue:"undefined"!==typeof t.value?t.value:Number(t.min),oldValue:null}},computed:{classes:function(){return{"v-input--slider":!0,"v-input--slider--ticks":this.showTicks,"v-input--slider--inverse-label":this.inverseLabel,"v-input--slider--ticks-labels":this.tickLabels.length>0,"v-input--slider--thumb-label":this.thumbLabel||this.$scopedSlots.thumbLabel}},showTicks:function(){return this.tickLabels.length>0||!this.disabled&&this.stepNumeric&&!!this.ticks},showThumbLabel:function(){return!this.disabled&&(!!this.thumbLabel||""===this.thumbLabel||this.$scopedSlots["thumb-label"])},computedColor:function(){return this.disabled?null:this.validationState||this.color||"primary"},computedTrackColor:function(){return this.disabled?null:this.trackColor||null},computedThumbColor:function(){return this.disabled||!this.isDirty?null:this.validationState||this.thumbColor||this.color||"primary"},internalValue:{get:function(){return this.lazyValue},set:function(t){var i=this.min,e=this.max,s=this.roundValue(Math.min(Math.max(t,i),e));s!==this.lazyValue&&(this.lazyValue=s,this.$emit("input",s),this.validate())}},stepNumeric:function(){return this.step>0?parseFloat(this.step):0},trackFillStyles:function(){var t=this.$vuetify.rtl?"auto":0,i=this.$vuetify.rtl?0:"auto",e=this.inputWidth+"%";return this.disabled&&(e="calc("+this.inputWidth+"% - 8px)"),{transition:this.trackTransition,left:t,right:i,width:e}},trackPadding:function(){return this.isActive||this.inputWidth>0||this.disabled?0:7},trackStyles:function(){var t=this.disabled?"calc("+this.inputWidth+"% + 8px)":this.trackPadding+"px",i=this.$vuetify.rtl?"auto":t,e=this.$vuetify.rtl?t:"auto",s=this.disabled?"calc("+(100-this.inputWidth)+"% - 8px)":"100%";return{transition:this.trackTransition,left:i,right:e,width:s}},tickStyles:function(){var t=Number(this.tickSize);return{"border-width":t+"px","border-radius":t>1?"50%":null,transform:t>1?"translateX(-"+t+"px) translateY(-"+(t-1)+"px)":null}},trackTransition:function(){return this.keyPressed>=2?"none":""},numTicks:function(){return Math.ceil((this.max-this.min)/this.stepNumeric)},inputWidth:function(){return(this.roundValue(this.internalValue)-this.min)/(this.max-this.min)*100},isDirty:function(){return this.internalValue>this.min||this.alwaysDirty}},watch:{min:function(t){t>this.internalValue&&this.$emit("input",parseFloat(t))},max:function(t){t<this.internalValue&&this.$emit("input",parseFloat(t))},value:function(t){this.internalValue=t}},mounted:function(){this.app=document.querySelector("[data-app]")||Object(o["c"])("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot:function(){var t=[this.genLabel()],i=this.genSlider();return this.inverseLabel?t.unshift(i):t.push(i),t.push(this.genProgress()),t},genListeners:function(){return{blur:this.onBlur,click:this.onSliderClick,focus:this.onFocus,keydown:this.onKeyDown,keyup:this.onKeyUp}},genInput:function(){return this.$createElement("input",{attrs:u({"aria-label":this.label,name:this.name,role:"slider",tabindex:this.disabled?-1:this.$attrs.tabindex,value:this.internalValue,readonly:!0,"aria-readonly":String(this.readonly),"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue},this.$attrs),on:this.genListeners(),ref:"input"})},genSlider:function(){return this.$createElement("div",{staticClass:"v-slider",class:{"v-slider--is-active":this.isActive},directives:[{name:"click-outside",value:this.onBlur}]},this.genChildren())},genChildren:function(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isFocused||this.isActive,this.onThumbMouseDown)]},genSteps:function(){var t=this;if(!this.step||!this.showTicks)return null;var i=Object(a["g"])(this.numTicks+1).map(function(i){var e=[];return t.tickLabels[i]&&e.push(t.$createElement("span",t.tickLabels[i])),t.$createElement("span",{key:i,staticClass:"v-slider__ticks",class:{"v-slider__ticks--always-show":"always"===t.ticks||t.tickLabels.length>0},style:u({},t.tickStyles,{left:i*(100/t.numTicks)+"%"})},e)});return this.$createElement("div",{staticClass:"v-slider__ticks-container"},i)},genThumb:function(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},genThumbContainer:function(t,i,e,s){var r=[this.genThumb()],n=this.getLabel(t);return this.showThumbLabel&&r.push(this.genThumbLabel(n)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--is-active":e,"v-slider__thumb-container--show-label":this.showThumbLabel},style:{transition:this.trackTransition,left:(this.$vuetify.rtl?100-i:i)+"%"},on:{touchstart:s,mousedown:s}}),r)},genThumbLabel:function(t){var i=Object(a["e"])(this.thumbSize);return this.$createElement(s["e"],{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label__container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:i,width:i}}),[t])])])},genTrackContainer:function(){var t=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track__container",ref:"track"},t)},getLabel:function(t){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:t}):this.$createElement("span",t)},onBlur:function(t){2!==this.keyPressed&&(this.isActive=!1,this.isFocused=!1,this.$emit("blur",t))},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onThumbMouseDown:function(t){this.oldValue=this.internalValue,this.keyPressed=2;var i={passive:!0};this.isActive=!0,this.isFocused=!1,"touches"in t?(this.app.addEventListener("touchmove",this.onMouseMove,i),Object(a["a"])(this.app,"touchend",this.onSliderMouseUp)):(this.app.addEventListener("mousemove",this.onMouseMove,i),Object(a["a"])(this.app,"mouseup",this.onSliderMouseUp)),this.$emit("start",this.internalValue)},onSliderMouseUp:function(){this.keyPressed=0;var t={passive:!0};this.isActive=!1,this.isFocused=!1,this.app.removeEventListener("touchmove",this.onMouseMove,t),this.app.removeEventListener("mousemove",this.onMouseMove,t),this.$emit("end",this.internalValue),Object(a["j"])(this.oldValue,this.internalValue)||this.$emit("change",this.internalValue)},onMouseMove:function(t){var i=this.parseMouseMove(t),e=i.value,s=i.isInsideTrack;s&&this.setInternalValue(e)},onKeyDown:function(t){if(!this.disabled&&!this.readonly){var i=this.parseKeyDown(t);null!=i&&(this.setInternalValue(i),this.$emit("change",i))}},onKeyUp:function(){this.keyPressed=0},onSliderClick:function(t){this.isFocused=!0,this.onMouseMove(t),this.$emit("change",this.internalValue)},parseMouseMove:function(t){var i=this.$refs.track.getBoundingClientRect(),e=i.left,s=i.width,r="touches"in t?t.touches[0].clientX:t.clientX,n=Math.min(Math.max((r-e)/s,0),1)||0;this.$vuetify.rtl&&(n=1-n);var a=r>=e-8&&r<=e+s+8,o=parseFloat(this.min)+n*(this.max-this.min);return{value:o,isInsideTrack:a}},parseKeyDown:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.internalValue;if(!this.disabled){var e=a["s"].pageup,s=a["s"].pagedown,r=a["s"].end,n=a["s"].home,o=a["s"].left,l=a["s"].right,u=a["s"].down,h=a["s"].up;if([e,s,r,n,o,l,u,h].includes(t.keyCode)){t.preventDefault();var c=this.stepNumeric||1,d=(this.max-this.min)/c;if([o,l,u,h].includes(t.keyCode)){this.keyPressed+=1;var p=this.$vuetify.rtl?[o,h]:[l,h],v=p.includes(t.keyCode)?1:-1,b=t.shiftKey?3:t.ctrlKey?2:1;i+=v*c*b}else if(t.keyCode===n)i=parseFloat(this.min);else if(t.keyCode===r)i=parseFloat(this.max);else{var m=t.keyCode===s?1:-1;i-=m*c*(d>100?d/10:10)}return i}}},roundValue:function(t){if(!this.stepNumeric)return t;var i=this.step.toString().trim(),e=i.indexOf(".")>-1?i.length-i.indexOf(".")-1:0,s=this.min%this.stepNumeric,r=Math.round((t-s)/this.stepNumeric)*this.stepNumeric+s;return parseFloat(Math.max(Math.min(r,this.max),this.min).toFixed(e))},setInternalValue:function(t){this.internalValue=t}}})},e8c7:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'.theme--light.v-input--slider .v-slider__track,.theme--light.v-input--slider .v-slider__track-fill{background:rgba(0,0,0,.26)}.theme--light.v-input--slider .v-slider__track__container:after{border:1px solid rgba(0,0,0,.87)}.theme--light.v-input--slider .v-slider__ticks{border-color:rgba(0,0,0,.87);color:rgba(0,0,0,.54)}.theme--light.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label{background:rgba(0,0,0,.26)}.theme--light.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb{border:3px solid rgba(0,0,0,.26)}.theme--light.v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb{border:3px solid rgba(0,0,0,.38)}.theme--light.v-input--slider.v-input--is-disabled .v-slider__thumb{border:5px solid rgba(0,0,0,.26)}.theme--light.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{background:rgba(0,0,0,.26)}.theme--light.v-input--slider.v-input--slider--is-active .v-slider__track{background:rgba(0,0,0,.38)}.theme--dark.v-input--slider .v-slider__track,.theme--dark.v-input--slider .v-slider__track-fill{background:hsla(0,0%,100%,.2)}.theme--dark.v-input--slider .v-slider__track__container:after{border:1px solid #fff}.theme--dark.v-input--slider .v-slider__ticks{border-color:#fff;color:hsla(0,0%,100%,.7)}.theme--dark.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb-label{background:hsla(0,0%,100%,.2)}.theme--dark.v-input--slider:not(.v-input--is-dirty) .v-slider__thumb{border:3px solid hsla(0,0%,100%,.2)}.theme--dark.v-input--slider:not(.v-input--is-dirty).v-input--slider--is-active .v-slider__thumb{border:3px solid hsla(0,0%,100%,.3)}.theme--dark.v-input--slider.v-input--is-disabled .v-slider__thumb{border:5px solid hsla(0,0%,100%,.2)}.theme--dark.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{background:hsla(0,0%,100%,.2)}.theme--dark.v-input--slider.v-input--slider--is-active .v-slider__track{background:hsla(0,0%,100%,.3)}.application--is-rtl .v-input--slider .v-label{margin-left:16px;margin-right:0}.v-input--slider{margin-top:16px}.v-input--slider.v-input--is-focused .v-slider__thumb-container--is-active:not(.v-slider__thumb-container--show-label):before{opacity:.2;-webkit-transform:scale(1);transform:scale(1)}.v-input--slider.v-input--is-focused .v-slider__track{-webkit-transition:none;transition:none}.v-input--slider.v-input--is-focused.v-input--slider--ticks .v-slider .v-slider__tick,.v-input--slider.v-input--is-focused.v-input--slider--ticks .v-slider__track__container:after,.v-input--slider.v-input--slider--ticks .v-slider__ticks.v-slider__ticks--always-show{opacity:1}.v-input--slider.v-input--slider--ticks-labels .v-input__slot{margin-bottom:16px}.v-input--slider.v-input--is-readonly .v-input__control{pointer-events:none}.v-input--slider.v-input--is-disabled .v-slider__thumb{-webkit-transform:translateY(-50%) scale(.45);transform:translateY(-50%) scale(.45)}.v-input--slider.v-input--is-disabled.v-input--is-dirty .v-slider__thumb{border:0 solid transparent}.v-input--slider .v-input__slot>:first-child:not(:only-child){margin-right:16px}.v-slider{cursor:default;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;height:32px;-webkit-box-flex:1;-ms-flex:1;flex:1;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider input{cursor:default;opacity:0;padding:0;width:100%}.v-slider__track__container{height:2px;left:0;overflow:hidden;pointer-events:none;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:100%}.v-slider__track__container:after{content:"";position:absolute;right:0;top:0;height:2px;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1);width:2px;opacity:0}.v-slider__thumb,.v-slider__ticks,.v-slider__track{position:absolute;top:0}.v-slider__track{-webkit-transform-origin:right;transform-origin:right;overflow:hidden}.v-slider__track,.v-slider__track-fill{height:2px;left:0;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1);width:100%}.v-slider__track-fill{position:absolute;-webkit-transform-origin:left;transform-origin:left}.v-slider__ticks-container{position:absolute;left:0;height:2px;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.v-slider__ticks{opacity:0;border-style:solid;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1)}.v-slider__ticks>span{position:absolute;top:8px;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider__ticks:first-child>span{-webkit-transform:translateX(0);transform:translateX(0)}.v-slider__ticks:last-child>span{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.v-slider:not(.v-input--is-dirty) .v-slider__ticks:first-child{border-color:transparent}.v-slider__thumb-container{top:50%}.v-slider__thumb-container,.v-slider__thumb-container:before{position:absolute;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1)}.v-slider__thumb-container:before{content:"";color:inherit;border-radius:50%;background:currentColor;height:32px;left:-16px;opacity:0;overflow:hidden;pointer-events:none;top:-16px;-webkit-transform:scale(.2);transform:scale(.2);width:32px;will-change:transform,opacity}.v-slider__thumb{width:24px;height:24px;left:-12px;top:50%;border-radius:50%;background:transparent;-webkit-transition:.3s cubic-bezier(.25,.8,.5,1);transition:.3s cubic-bezier(.25,.8,.5,1);-webkit-transform:translateY(-50%) scale(.6);transform:translateY(-50%) scale(.6);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider--is-active .v-slider__thumb-container--is-active .v-slider__thumb{-webkit-transform:translateY(-50%) scale(1);transform:translateY(-50%) scale(1)}.v-slider--is-active .v-slider__thumb-container--is-active.v-slider__thumb-container--show-label .v-slider__thumb{-webkit-transform:translateY(-50%) scale(0);transform:translateY(-50%) scale(0)}.v-slider--is-active .v-slider__ticks-container .v-slider__ticks{opacity:1}.v-slider__thumb-label__container{top:0}.v-slider__thumb-label,.v-slider__thumb-label__container{position:absolute;left:0;-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.v-slider__thumb-label{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:12px;color:#fff;width:32px;height:32px;border-radius:50% 50% 0;bottom:100%;-webkit-transform:translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg);transform:translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-slider__thumb-label>*{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.v-slider__track,.v-slider__track-fill{position:absolute}',""])}}]);