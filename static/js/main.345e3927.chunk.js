(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(5),l=(a(14),a(16),function(e){var t=e.title,a=void 0===t?void 0:t,n=e.children,c=void 0===n?void 0:n,l=e.fluid,o=void 0!==l&&l;return r.a.createElement("div",{className:"my-5 container".concat(o?"-fluid":"")},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},a&&r.a.createElement("h2",{className:"mb-4"},a),c)))}),o=a(1);function i(e){var t=e.batchSize,a=void 0===t?50:t,c=e.renderInterval,l=void 0===c?100:c,i=e.children,u=void 0===i?void 0:i,s=Object(n.useState)(0),m=Object(o.a)(s,2),d=m[0],f=m[1];return Object(n.useEffect)(function(){var e=null;if(u&&u.length){var t=0,n=u.length;!function r(){e=null,t+=a,t=Math.min(n,t),f(t),t<n&&(e=setTimeout(r,l))}()}return function(){e&&clearTimeout(e)}},[u,a,l]),u&&u.length?r.a.createElement(r.a.Fragment,null,u.slice(0,d)):r.a.createElement(r.a.Fragment,null,u)}function u(e){var t=e.headers,a=e.children;return"string"===typeof t&&(t=t.split(",")),r.a.createElement("table",{className:"table table-striped"},t&&r.a.createElement("thead",{className:"text-nowrap"},r.a.createElement("tr",null,t.map(function(e){return r.a.createElement("th",{key:e},e)}))),r.a.createElement("tbody",null,a))}function s(e){var t=e.className,a=void 0===t?"":t,c=e.type,l=void 0===c?"info":c,i=e.container,u=void 0===i?r.a.Fragment:i,s=e.stateName,m=void 0===s?"":s,d=e.children,f=void 0===d?void 0:d,v="alertState_".concat(m),p=Object(n.useState)(function(){return m&&!!localStorage.getItem(v)}),h=Object(o.a)(p,2),E=h[0],b=h[1];if(Object(n.useEffect)(function(){m&&E&&localStorage.setItem(v,"true")},[E,m,v]),E)return null;var g=u;return r.a.createElement(g,null,r.a.createElement("div",{className:"alert alert-".concat(l," alert-dismissible fade show ").concat(a),role:"alert"},f,r.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:function(e){e.preventDefault(),b(!0)}},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))))}function m(e){var t=e.items,a=void 0===t?[]:t,c=e.checkedItems,l=void 0===c?[]:c,i=e.groupKey,u=void 0===i?"default":i,s=e.onChange,m=void 0===s?function(e){}:s,d=Object(n.useState)(function(){return new Set(l.map(function(e){return e.key}))}),f=Object(o.a)(d,2),v=f[0],p=f[1],h=function(e,t){if((!t||!v.has(e))&&(t||v.has(e))){var n=new Set(v);t?n.add(e):n.delete(e),p(n),m(a.filter(function(e){return n.has(e.key)}))}};return r.a.createElement(r.a.Fragment,null,a.map(function(e){return r.a.createElement("div",{className:"form-check form-check-inline",key:e.key},r.a.createElement("input",{className:"form-check-input",type:"checkbox",id:"CG_".concat(u,"_").concat(e.key),value:e.key,checked:v.has(e.key),onChange:function(t){return h(e.key,t.target.checked)}}),r.a.createElement("label",{className:"form-check-label",htmlFor:"CG_".concat(u,"_").concat(e.key)},e.label))}))}var d,f=a(2),v=a.n(f),p=a(3),h=a.n(p),E=a(6),b="https://d2ek5tscv4zquv.cloudfront.net/",g="\u521d\u58eb\u6770\u8c6a\u5723\u9b42";!function(e){e[e["\u738b\u5ea7"]=16]="\u738b\u5ea7",e[e["\u7389"]=12]="\u7389"}(d||(d={}));var y=12e4;function k(){return(k=Object(E.a)(h.a.mark(function e(t){var a,n,r,c,l,o,i,u;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=v()(t).format("YYMMDD"),n=v()(t).isSame(v()(),"day"),r="gameRecord".concat(n?"Today":a),c=(new Date).getTime(),l=parseInt(sessionStorage.lastUpdateTimestamp||"0",10),n&&c>l+y&&(sessionStorage.removeItem(r),sessionStorage.setItem("lastUpdateTimestamp",c.toString())),!sessionStorage[r]){e.next=9;break}return e.abrupt("return",Promise.resolve(JSON.parse(sessionStorage[r])));case 9:return e.prev=9,e.next=12,fetch("".concat(b,"records/").concat(a,".json?t=").concat(r));case 12:return o=e.sent,e.t0=Object,e.next=16,o.json();case 16:e.t1=e.sent,(i=e.t0.values.call(e.t0,e.t1)).sort(function(e,t){return t.endTime-e.endTime}),u=JSON.stringify(i);try{sessionStorage.setItem(r,u)}catch(s){sessionStorage.clear(),sessionStorage.setItem(r,u)}return e.abrupt("return",i);case 24:return e.prev=24,e.t2=e.catch(9),e.abrupt("return",[]);case 27:case"end":return e.stop()}},e,null,[[9,24]])}))).apply(this,arguments)}function j(e){var t=e;return t._cachedEventTargetReducer||(t._cachedEventTargetReducer=function(t){return e(t.currentTarget)}),t._cachedEventTargetReducer}function O(e){var t=e.initialDate,a=void 0===t?void 0:t,c=e.onChange,l=void 0===c?function(e){}:c,i=e.className,u=void 0===i?"":i,s=e.min,m=void 0===s?void 0:s,d=e.max,f=void 0===d?v()():d,p=Object(n.useReducer)(function(e,t){return v()(t.value,"YYYY-MM-DD").toDate()},a||new Date),h=Object(o.a)(p,2),E=h[0],b=h[1];return Object(n.useEffect)(function(){return l(E)},[E,l]),r.a.createElement("input",{className:u,type:"date",value:v()(E).format("YYYY-MM-DD"),min:m?v()(m).format("YYYY-MM-DD"):void 0,max:f?v()(f).format("YYYY-MM-DD"):void 0,onChange:j(b)})}var S=function(e){var t=e.title,a=void 0===t?"":t,n=e.children,c=void 0===n?void 0:n;return r.a.createElement("div",{className:"form-group row"},r.a.createElement("label",{className:"col-sm-2 col-form-label"},a),r.a.createElement("div",{className:"col-sm-10"},c))},N=a(7),w=function(e){var t,a=e.player,n=a.nickname,c=a.level,l=a.score,o=a.accountId,i=e.game.uuid,u=e.isTop;return r.a.createElement("div",{className:"player ".concat(u&&"font-weight-bold")},r.a.createElement("a",{href:"https://www.majsoul.com/1/?paipu=".concat(i,"_a").concat((t=o,1358437+(7*t+1117113^86216345))),target:"_blank"},"[",function(e){var t=e%1e4,a=Math.floor(t/100),n=t%100,r=g[a-1];return a===g.length?r:r+n}(c),"] ",n," ",void 0!==l&&"[".concat(l,"]")))},D=function(e){var t=e.game,a=Math.max.apply(Math,Object(N.a)(t.players.map(function(e){return e.score})));return r.a.createElement("tr",null,r.a.createElement("td",null,d[t.modeId]),r.a.createElement("td",null,r.a.createElement("div",{className:"row no-gutters"},t.players.map(function(e){return r.a.createElement("div",{key:e.accountId,className:"col-6 pr-1"},r.a.createElement(w,{game:t,player:e,isTop:e.score===a}))}))),r.a.createElement("td",null,v.a.unix(t.startTime).format("HH:mm")),r.a.createElement("td",null,v.a.unix(t.endTime).format("HH:mm")))},Y=Object.keys(d).filter(function(e){return"string"!==typeof d[e]}).map(function(e){return{key:String(d[e]),label:e}}),I=function(e){return new Set(e.map(function(e){return e.key}))};function M(e){var t=e.initialDate,a=void 0===t?void 0:t,c=Object(n.useState)(function(){return a||new Date}),l=Object(o.a)(c,1);a=l[0];var s=Object(n.useState)(!0),d=Object(o.a)(s,2),f=d[0],v=d[1],p=Object(n.useState)([]),h=Object(o.a)(p,2),E=h[0],b=h[1],g=Object(n.useState)(a),y=Object(o.a)(g,2),N=y[0],w=y[1],M=Object(n.useReducer)(function(e,t){return t.value.trim().toLowerCase()},""),T=Object(o.a)(M,2),x=T[0],C=T[1],_=Object(n.useReducer)(function(e,t){return I(t)},null,function(){return I(Y)}),F=Object(o.a)(_,2),R=F[0],H=F[1];Object(n.useEffect)(function(){var e=!1;return b([]),v(!0),function(e){return k.apply(this,arguments)}(N).then(function(t){e||(b(t),v(!1))}),function(){e=!0}},[N]);var J=Object(n.useMemo)(function(){return E.filter(function(e){return!!R.has(e.modeId.toString())&&!(x&&!e.players.some(function(e){return e.nickname.toLowerCase().indexOf(x)>-1}))})},[E,R,x]),P=Object(n.useMemo)(function(){return J.map(function(e){return r.a.createElement(D,{key:e.uuid,game:e})})},[J]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,{title:"\u65e5\u671f"},r.a.createElement(O,{min:"2019-08-23",className:"form-control",initialDate:a,onChange:w})),r.a.createElement(S,{title:"\u67e5\u627e\u73a9\u5bb6"},r.a.createElement("input",{type:"text",className:"form-control",onChange:j(C)})),r.a.createElement(S,null,r.a.createElement(m,{items:Y,checkedItems:Y,onChange:H})),r.a.createElement(u,{headers:"\u7b49\u7ea7,\u73a9\u5bb6,\u5f00\u59cb,\u7ed3\u675f"},r.a.createElement(i,null,P)),f&&r.a.createElement("p",{className:"text-center"},"\u52a0\u8f7d\u4e2d..."))}var T=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,null,r.a.createElement("h1",null,"\u96c0\u9b42\u724c\u8c31\u5c4b")),r.a.createElement(s,{container:l,stateName:"topNote"},r.a.createElement("h4",null,"\u8bf4\u660e"),r.a.createElement("ul",null,r.a.createElement("li",null,"\u672c\u9875\u9762\u7531\u7b2c\u4e09\u65b9\u7ef4\u62a4\uff0c\u4e0e\u96c0\u9b42\u5b98\u65b9\u65e0\u5173"),r.a.createElement("li",null,"\u8bb0\u5f55\u5305\u542b\u96c0\u9b42\u56fd\u670d\u56db\u4eba\u534a\u5e84\u6bb5\u4f4d\u6218\u7389\u4e4b\u95f4\u53ca\u738b\u5ea7\u4e4b\u95f4\u7684\u724c\u8c31"),r.a.createElement("li",null,"\u6b63\u5e38\u60c5\u51b5\u4e0b\u5168\u90e8\u5bf9\u5c40\u90fd\u4f1a\u88ab\u8bb0\u5f55\uff0c\u4f46\u4e0d\u6392\u9664\u56e0\u7f51\u7edc\u95ee\u9898\u9057\u6f0f\u90e8\u5206\u5bf9\u5c40\u7684\u60c5\u51b5"),r.a.createElement("li",null,"\u9875\u9762\u4e0d\u662f\u5b9e\u65f6\u66f4\u65b0\uff0c\u5bf9\u5c40\u4e00\u822c\u4f1a\u5728\u7ed3\u675f\u540e\u4e8c\u5341\u5206\u949f\u5185\u51fa\u73b0"),r.a.createElement("li",null,"\u5982\u6709\u95ee\u9898\u6216\u5efa\u8bae\uff0c\u8bf7\u6233 ",r.a.createElement("a",{href:"mailto:i@sapika.ch"},"SAPikachu (i@sapika.ch)")," \u6216"," ",r.a.createElement("a",{href:"https://github.com/SAPikachu/amae-koromo/"},"\u63d0\u4ea4 Issue")))),r.a.createElement(l,null,r.a.createElement(M,null)))},x=document.getElementById("root");Object(c.render)(n.createElement(T,null),x)},8:function(e,t,a){e.exports=a(21)}},[[8,2,1]]]);
//# sourceMappingURL=main.345e3927.chunk.js.map