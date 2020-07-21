"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t,n=require("atom");(e=n)&&"object"==typeof e&&"default"in e&&e.default;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function a(e,t,n,a){return new(n||(n=Promise))((function(o,i){function r(e){try{c(a.next(e))}catch(e){i(e)}}function u(e){try{c(a.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,u)}c((a=a.apply(e,t||[])).next())}))}function o(e,t){var n,a,o,i,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,a&&(o=2&i[0]?a.return:i[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,i[1])).done)return o;switch(a=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return r.label++,{value:i[1],done:!1};case 5:r.label++,a=i[1],i=[0];continue;case 7:i=r.ops.pop(),r.trys.pop();continue;default:if(!(o=r.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){r=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){r.label=i[1];break}if(6===i[0]&&r.label<o[1]){r.label=o[1],o=i;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(i);break}o[2]&&r.ops.pop(),r.trys.pop();continue}i=t.call(e,r)}catch(e){i=[6,e],a=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}exports.activate=function(e){t=new n.CompositeDisposable,function(){return a(this,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return(e=["atom-ide-markdown-service","atom-ide-datatip","atom-ide-signature-help","atom-ide-hyperclick","atom-ide-definitions","atom-ide-outline","linter","linter-ui-default","intentions"]).some((function(e){return!atom.packages.isPackageLoaded(e)}))?[4,Promise.resolve().then((function(){return require("./index-f03d5ba3.js")})).then((function(e){return e.index})).then((function(t){(0,t.install)("atom-ide-base",!1),e.filter((function(e){return!atom.packages.isPackageLoaded(e)})).forEach((function(e){atom.notifications.addInfo("Enabling package "+e+' that is needed for "atom-ide-base"'),atom.packages.enablePackage(e)}))}))]:[3,2];case 1:t.sent(),t.label=2;case 2:return[2]}}))}))}().then((function(){}))},exports.deactivate=function(){t&&t.dispose(),t=null};
//# sourceMappingURL=main.js.map
