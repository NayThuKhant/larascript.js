!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.larascript=e():t.larascript=e()}(this,(()=>(()=>{"use strict";var t={d:(e,s)=>{for(var n in s)t.o(s,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:s[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{collect:()=>n});class s{constructor(t){void 0===t||Array.isArray(t)||"object"==typeof t?t instanceof this.constructor?this.items=t.all():this.items=t||[]:this.items=[t]}all(){return this.items}avg(){return this.items.reduce(((t,e)=>t+e),0)/this.items.length}chunk(t){const e=[];for(let s=0;s<this.items.length;s+=t)e.push(this.items.slice(s,s+t));return new s(e)}collapse(){const t=this.items.reduce(((t,e)=>t.concat(e)),[]);return new s(t)}combine(t){const e={};return this.items.forEach(((s,n)=>{e[s]=t[n]})),new s(e)}concat(t){const e=this.items.concat(t);return new s(e)}contains(t){return this.items.includes(t)}count(){return this.items.length}diff(t){const e=this.items.filter((e=>!t.includes(e)));return new s(e)}diffAssoc(t){const e={};return Object.keys(this.items).forEach((s=>{s in t&&t[s]===this.items[s]||(e[s]=this.items[s])})),Object.keys(t).forEach((s=>{s in this.items||(e[s]=t[s])})),new s(e)}diffKeys(t){const e={};return Object.keys(this.items).forEach((s=>{s in t||(e[s]=this.items[s])})),new s(e)}dump(){return console.log(this.items),this}each(t){for(const[e,s]of Object.entries(this.items))t(s,e);return this}every(t){for(const[e,s]of Object.entries(this.items))if(!t(s,e))return!1;return!0}except(t){const e={};for(const[s,n]of Object.entries(this.items))t.includes(s)||(e[s]=n);return new s(e)}filter(t){const e={};for(const[s,n]of Object.entries(this.items))t(n,s)&&(e[s]=n);return new s(e)}first(t){if(t){for(const[e,s]of Object.entries(this.items))if(t(s,e))return s;return null}return this.items[0]||null}firstWhere(t,e,s){const n={"=":(t,e)=>t===e,"!=":(t,e)=>t!==e,">":(t,e)=>t>e,">=":(t,e)=>t>=e,"<":(t,e)=>t<e,"<=":(t,e)=>t<=e}[e]||((t,e)=>t===e);for(const[e,r]of Object.entries(this.items))if(n(r[t],s))return r;return null}flatMap(t){const e=this.items.map(t),n=Array.prototype.concat(...e);return new s(n)}flatten(t=1/0){const e=[];return function t(s,n){if(0!==n&&Array.isArray(s))for(const e of s)t(e,n-1);else e.push(s)}(this.items,t),new s(e)}flip(){const t={};for(const[e,s]of Object.entries(this.items))t[s]=e;return new s(t)}forget(t){return delete this.items[t],this}forPage(t,e){const n=(t-1)*e,r=Object.entries(this.items).slice(n,n+e),i={};for(const[t,e]of r)i[t]=e;return new s(i)}get(t,e=null){return this.items.hasOwnProperty(t)?this.items[t]:e}groupBy(t){const e={};for(const[s,n]of Object.entries(this.items)){const r=t(n,s);e[r]||(e[r]=[]),e[r].push(n)}for(const t in e)e[t]=new s(e[t]);return new s(e)}has(t){return this.items.hasOwnProperty(t)}implode(t,e){let s=Object.values(this.items);return e&&(s=s.map((t=>t[e]))),s.join(t)}intersect(t){const e={};for(const s in this.items)s in t&&this.items[s]===t[s]&&(e[s]=this.items[s]);return new s(e)}isEmpty(){return 0===Object.keys(this.items).length}isNotEmpty(){return!this.isEmpty()}keyBy(t){const e={};for(const s of Object.values(this.items))e[s[t]]=s;return new s(e)}keys(){return new s(Object.keys(this.items))}last(){return this.items[Object.keys(this.items).pop()]}map(t){const e=this.items.map(t);return new s(e)}mapWithKeys(t){let e=Object.keys(this.items),n={};return e.forEach((e=>{let[s,r]=t(this.items[e],e);n[s]=r})),new s(n)}max(t){const e=Object.values(this.items);return 0===e.length?null:t?Math.max(...e.map((e=>e[t]))):Math.max(...e)}median(t){const e=Object.values(this.items);if(0===e.length)return null;t?e.sort(((e,s)=>e[t]-s[t])):e.sort(((t,e)=>t-e));const s=Math.floor(e.length/2);return e.length%2==0?(e[s-1]+e[s])/2:e[s]}merge(t){return new s({...this.items,...t})}mergeRecursive(t){const e=(t,s)=>{Object.keys(s).forEach((n=>{const r=s[n],i=t[n];"object"==typeof r&&null!==r&&"object"==typeof i&&null!==i?e(i,r):t[n]=r}))};return e(this.items,t),new s(this.items)}min(t){const e=Object.values(this.items);return 0===e.length?null:t?Math.min(...e.map((e=>e[t]))):Math.min(...e)}mode(t){const e=Object.values(this.items);if(0===e.length)return null;const s={};for(const n of e){const e=t?n[t]:n;s[e]=(s[e]||0)+1}const n=[];let r=0;for(const[t,e]of Object.entries(s))e>r?(n.length=0,n.push(t),r=e):e===r&&n.push(t);return 1===n.length?n[0]:n}nth(t,e=0){const s=Object.values(this.items);return 0===s.length?null:s[t+e]??null}only(t){const e={};for(const s of t)s in this.items&&(e[s]=this.items[s]);return new s(e)}pad(t,e){const n=Math.max(0,t-Object.keys(this.items).length),r={...this.items};for(let t=0;t<n;t++)r[t+Object.keys(this.items).length]=e;return new s(r)}partition(t){const e=[[],[]];for(const[s,n]of Object.entries(this.items))t(n,s)?e[0].push(n):e[1].push(n);return new s(e)}pipe(t){return t.reduce(((t,e)=>e(t)),this)}pluck(t){return new s(Object.values(this.items).map((e=>e[t])))}pop(){const t={...this.items},e=Object.keys(t),n=e[e.length-1];return delete t[n],[t[n],new s(t)]}prepend(t,e=null){const n={...this.items},r=Object.keys(n);if(null!==e)n[e]=t;else if(0===r.length)n[0]=t;else{const e=r[r.length-1];n[parseInt(e,10)+1]=t}return new s(n)}pull(t){const e={...this.items},n=e[t];return delete e[t],[n,new s(e)]}push(t,e=null){const n={...this.items},r=Object.keys(n);if(null!==e)n[e]=t;else if(0===r.length)n[0]=t;else{const e=r[r.length-1];n[parseInt(e,10)+1]=t}return new s(n)}random(t=null){const e=Object.values(this.items),s=Math.floor(Math.random()*e.length);return null!==t?t.reduce(((t,n)=>(t[n]=e[s][n],t)),{}):e[s]}reduce(t,e=null){const s=Object.values(this.items);let n=null!==e?e:s.shift();for(const e of s)n=t(n,e);return n}reject(t){const e={};for(const[s,n]of Object.entries(this.items))t(n,s)||(e[s]=n);return new s(e)}reverse(){const t=Object.values(this.items).reverse();return new s(t)}search(t,e=!1){const s=Object.values(this.items).findIndex((s=>e?s===t:s==t));return-1!==s?s:null}shift(){const t={...this.items},e=Object.keys(t)[0];return delete t[e],[this.items[e],new s(t)]}shuffle(){const t=Object.values(this.items);for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}const e={};return t.forEach(((t,s)=>{e[s]=t})),new s(e)}slice(t,e=null){const n={...this.items},r=Object.keys(n);t<0&&(t=Math.max(0,r.length+t)),null===e&&(e=r.length-t);const i={};return r.slice(t,t+e).forEach(((t,e)=>{i[e]=n[t]})),new s(i)}sort(t=null){const e=Object.values(this.items);let n=null;n=null===t?e.sort():e.sort(t);const r={};return n.forEach(((t,e)=>{r[e]=t})),new s(r)}sortBy(t,e=null){const n=Object.values(this.items).sort(((s,n)=>(null!==e&&!0===e.natural&&(s=s[t].toLowerCase(),n=n[t].toLowerCase()),s[t]<n[t]?-1:s[t]>n[t]?1:0))),r={};return n.forEach(((t,e)=>{r[e]=t})),new s(r)}splice(t,e=1,n=null){const r={...this.items},i=Object.keys(r);t<0&&(t=Math.max(0,i.length+t));const o={};if(i.slice(t,t+e).forEach(((t,e)=>{o[e]=r[t],delete r[t]})),null!==n){"function"==typeof n&&(n=n(new s(o)).all());let e=t;for(const[t,s]of Object.entries(n))r[e]=s,e++}return[new s(o),new s(r)]}sum(t=null){const e=Object.values(this.items);return null!==t?e.reduce(((e,s)=>e+s[t]),0):e.reduce(((t,e)=>t+e),0)}take(t){const e={...this.items};t<0&&(t=0);const n={};let r=0;for(const[s,i]of Object.entries(e)){if(r>=t)break;n[s]=i,r++}return new s(n)}tap(t){return t(new s(this.items)),this}toArray(){return Object.values(this.items)}toJson(){return JSON.stringify(this.items)}transform(t,e=null){const s={...this.items};let n=e;for(const[e,r]of Object.entries(s))n=t(n,r,e);return n}unique(t=null){const e={...this.items},n={},r=[];for(const[t,s]of Object.entries(e)){let e=s;null!==t&&"object"==typeof s&&s.hasOwnProperty(t)&&(e=s[t]),r.includes(e)||(n[t]=s,r.push(e))}return new s(n)}values(){return new s(Object.values(this.items))}when(t,e){return t?e(new s(this.items)):this}where(t,e,n=null){const r={...this.items};let i={};i=null===n?Object.entries(r).filter((([,t])=>t===e)):Object.entries(r).filter((([,s])=>{switch(e){case"=":return s[t]===n;case"<":return s[t]<n;case"<=":return s[t]<=n;case">":return s[t]>n;case">=":return s[t]>=n;case"!=":return s[t]!==n;default:return!1}}));const o={};return i.forEach((([t,e])=>{o[t]=e})),new s(o)}zip(...t){const e={};for(const[s,n]of Object.entries(this.items)){const r=[n];t.forEach((t=>{r.push(t.get(s,null))})),e[s]=r}return new s(e)}}const n=t=>new s(t);return e})()));