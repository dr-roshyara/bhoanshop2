import{l as c,S as i,R as _,x as d,_ as f,f as p,w as n,j as a,o as h,a as t,b as m,e as g,t as x}from"./index.217e1c37.js";const b={setup(){return{store:c()}},methods:{getStore(){console.log(this.store)}},components:{SubmitButton:i,RouterLink:_,AuthLayout:d}},y=t("div",null,"test",-1),k={class:"flex flex-col justify-center items-center"},v={class:"px-2 py-4 bg-lime-50 w-96 font-bold rounded-lg hover:bg-indigo-300"};function S(r,o,B,e,R,$){const u=a("router-link"),l=a("auth-layout");return h(),p(l,null,{default:n(()=>{var s;return[y,t("div",k,[t("button",{onClick:o[0]||(o[0]=w=>e.store.logout())},"Logout"),t("p",v,[m(u,{to:"/restaurant"},{default:n(()=>[g("Register your Restaurant ")]),_:1})]),t("h1",null,"Dashboard of "+x((s=e.store.authUser)==null?void 0:s.name),1)])]}),_:1})}const D=f(b,[["render",S]]);export{D as default};