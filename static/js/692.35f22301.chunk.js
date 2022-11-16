"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[692],{70692:function(e,r,o){o.r(r),o.d(r,{default:function(){return de}});var t=o(70885),n=o(72791),a=o(57689),i=o(11087),l=o(63366),s=o(87462),c=o(28182),d=o(94419),u=o(60277),p=o(85513),m=o(49853),h=o(86039),f=o(21217),g=o(75878);function x(e){return(0,f.Z)("MuiAppBar",e)}(0,g.Z)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);var v=o(80184),b=["className","color","enableColorOnDark","position"],Z=function(e,r){return"".concat(null==e?void 0:e.replace(")",""),", ").concat(r,")")},k=(0,u.ZP)(h.Z,{name:"MuiAppBar",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,r["position".concat((0,m.Z)(o.position))],r["color".concat((0,m.Z)(o.color))]]}})((function(e){var r=e.theme,o=e.ownerState,t="light"===r.palette.mode?r.palette.grey[100]:r.palette.grey[900];return(0,s.Z)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===o.position&&{position:"fixed",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===o.position&&{position:"absolute",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===o.position&&{position:"sticky",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0},"static"===o.position&&{position:"static"},"relative"===o.position&&{position:"relative"},!r.vars&&(0,s.Z)({},"default"===o.color&&{backgroundColor:t,color:r.palette.getContrastText(t)},o.color&&"default"!==o.color&&"inherit"!==o.color&&"transparent"!==o.color&&{backgroundColor:r.palette[o.color].main,color:r.palette[o.color].contrastText},"inherit"===o.color&&{color:"inherit"},"dark"===r.palette.mode&&!o.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===o.color&&(0,s.Z)({backgroundColor:"transparent",color:"inherit"},"dark"===r.palette.mode&&{backgroundImage:"none"})),r.vars&&(0,s.Z)({},"default"===o.color&&{"--AppBar-background":o.enableColorOnDark?r.vars.palette.AppBar.defaultBg:Z(r.vars.palette.AppBar.darkBg,r.vars.palette.AppBar.defaultBg),"--AppBar-color":o.enableColorOnDark?r.vars.palette.text.primary:Z(r.vars.palette.AppBar.darkColor,r.vars.palette.text.primary)},o.color&&!o.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":o.enableColorOnDark?r.vars.palette[o.color].main:Z(r.vars.palette.AppBar.darkBg,r.vars.palette[o.color].main),"--AppBar-color":o.enableColorOnDark?r.vars.palette[o.color].contrastText:Z(r.vars.palette.AppBar.darkColor,r.vars.palette[o.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:"inherit"===o.color?"inherit":"var(--AppBar-color)"},"transparent"===o.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))})),w=n.forwardRef((function(e,r){var o=(0,p.Z)({props:e,name:"MuiAppBar"}),t=o.className,n=o.color,a=void 0===n?"primary":n,i=o.enableColorOnDark,u=void 0!==i&&i,h=o.position,f=void 0===h?"fixed":h,g=(0,l.Z)(o,b),Z=(0,s.Z)({},o,{color:a,position:f,enableColorOnDark:u}),w=function(e){var r=e.color,o=e.position,t=e.classes,n={root:["root","color".concat((0,m.Z)(r)),"position".concat((0,m.Z)(o))]};return(0,d.Z)(n,x,t)}(Z);return(0,v.jsx)(k,(0,s.Z)({square:!0,component:"header",ownerState:Z,elevation:4,className:(0,c.default)(w.root,t,"fixed"===f&&"mui-fixed"),ref:r},g))})),C=o(53842),S=o(60104),y=o(78519),j=o(30418),A=["className","component"];var R=o(55902),z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.defaultTheme,o=e.defaultClassName,t=void 0===o?"MuiBox-root":o,a=e.generateClassName,i=e.styleFunctionSx,d=void 0===i?S.Z:i,u=(0,C.ZP)("div",{shouldForwardProp:function(e){return"theme"!==e&&"sx"!==e&&"as"!==e}})(d),p=n.forwardRef((function(e,o){var n=(0,j.Z)(r),i=(0,y.Z)(e),d=i.className,p=i.component,m=void 0===p?"div":p,h=(0,l.Z)(i,A);return(0,v.jsx)(u,(0,s.Z)({as:m,ref:o,className:(0,c.default)(d,a?a(t):t),theme:n},h))}));return p}({defaultTheme:(0,o(97360).Z)(),defaultClassName:"MuiBox-root",generateClassName:R.Z.generate}),B=z,M=o(43788),I=o(75196),D=o(62812),N=o(78277),W=o(98008),O=o(4942),P=o(27312),F=o(86083),G=(0,o(44046).ZP)(),T=o(52173),E=["className","component","disableGutters","fixed","maxWidth","classes"],L=(0,T.Z)(),H=G("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,r["maxWidth".concat((0,P.Z)(String(o.maxWidth)))],o.fixed&&r.fixed,o.disableGutters&&r.disableGutters]}}),V=function(e){return(0,F.Z)({props:e,name:"MuiContainer",defaultTheme:L})},q=function(e,r){var o=e.classes,t=e.fixed,n=e.disableGutters,a=e.maxWidth,i={root:["root",a&&"maxWidth".concat((0,P.Z)(String(a))),t&&"fixed",n&&"disableGutters"]};return(0,d.Z)(i,(function(e){return(0,f.Z)(r,e)}),o)};var J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.createStyledComponent,o=void 0===r?H:r,t=e.useThemeProps,a=void 0===t?V:t,i=e.componentName,d=void 0===i?"MuiContainer":i,u=o((function(e){var r=e.theme,o=e.ownerState;return(0,s.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!o.disableGutters&&(0,O.Z)({paddingLeft:r.spacing(2),paddingRight:r.spacing(2)},r.breakpoints.up("sm"),{paddingLeft:r.spacing(3),paddingRight:r.spacing(3)}))}),(function(e){var r=e.theme;return e.ownerState.fixed&&Object.keys(r.breakpoints.values).reduce((function(e,o){var t=o,n=r.breakpoints.values[t];return 0!==n&&(e[r.breakpoints.up(t)]={maxWidth:"".concat(n).concat(r.breakpoints.unit)}),e}),{})}),(function(e){var r=e.theme,o=e.ownerState;return(0,s.Z)({},"xs"===o.maxWidth&&(0,O.Z)({},r.breakpoints.up("xs"),{maxWidth:Math.max(r.breakpoints.values.xs,444)}),o.maxWidth&&"xs"!==o.maxWidth&&(0,O.Z)({},r.breakpoints.up(o.maxWidth),{maxWidth:"".concat(r.breakpoints.values[o.maxWidth]).concat(r.breakpoints.unit)}))})),p=n.forwardRef((function(e,r){var o=a(e),t=o.className,n=o.component,i=void 0===n?"div":n,p=o.disableGutters,m=void 0!==p&&p,h=o.fixed,f=void 0!==h&&h,g=o.maxWidth,x=void 0===g?"lg":g,b=(0,l.Z)(o,E),Z=(0,s.Z)({},o,{component:i,disableGutters:m,fixed:f,maxWidth:x}),k=q(Z,d);return(0,v.jsx)(u,(0,s.Z)({as:i,ownerState:Z,className:(0,c.default)(k.root,t),ref:r},b))}));return p}({createStyledComponent:(0,u.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,r["maxWidth".concat((0,m.Z)(String(o.maxWidth)))],o.fixed&&r.fixed,o.disableGutters&&r.disableGutters]}}),useThemeProps:function(e){return(0,p.Z)({props:e,name:"MuiContainer"})}}),_=J,K=(0,o(81245).Z)((0,v.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function $(e){return(0,f.Z)("MuiAvatar",e)}(0,g.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var Q=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],U=(0,u.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,r){var o=e.ownerState;return[r.root,r[o.variant],o.colorDefault&&r.colorDefault]}})((function(e){var r=e.theme,o=e.ownerState;return(0,s.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:r.typography.fontFamily,fontSize:r.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===o.variant&&{borderRadius:(r.vars||r).shape.borderRadius},"square"===o.variant&&{borderRadius:0},o.colorDefault&&(0,s.Z)({color:(r.vars||r).palette.background.default},r.vars?{backgroundColor:r.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===r.palette.mode?r.palette.grey[400]:r.palette.grey[600]}))})),X=(0,u.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,r){return r.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Y=(0,u.ZP)(K,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,r){return r.fallback}})({width:"75%",height:"75%"});var ee,re,oe=n.forwardRef((function(e,r){var o=(0,p.Z)({props:e,name:"MuiAvatar"}),a=o.alt,i=o.children,u=o.className,m=o.component,h=void 0===m?"div":m,f=o.imgProps,g=o.sizes,x=o.src,b=o.srcSet,Z=o.variant,k=void 0===Z?"circular":Z,w=(0,l.Z)(o,Q),C=null,S=function(e){var r=e.crossOrigin,o=e.referrerPolicy,a=e.src,i=e.srcSet,l=n.useState(!1),s=(0,t.Z)(l,2),c=s[0],d=s[1];return n.useEffect((function(){if(a||i){d(!1);var e=!0,t=new Image;return t.onload=function(){e&&d("loaded")},t.onerror=function(){e&&d("error")},t.crossOrigin=r,t.referrerPolicy=o,t.src=a,i&&(t.srcset=i),function(){e=!1}}}),[r,o,a,i]),c}((0,s.Z)({},f,{src:x,srcSet:b})),y=x||b,j=y&&"error"!==S,A=(0,s.Z)({},o,{colorDefault:!j,component:h,variant:k}),R=function(e){var r=e.classes,o={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,d.Z)(o,$,r)}(A);return C=j?(0,v.jsx)(X,(0,s.Z)({alt:a,src:x,srcSet:b,sizes:g,ownerState:A,className:R.img},f)):null!=i?i:y&&a?a[0]:(0,v.jsx)(Y,{className:R.fallback}),(0,v.jsx)(U,(0,s.Z)({as:h,ownerState:A,className:(0,c.default)(R.root,u),ref:r},w,{children:C}))})),te=o(93835),ne=(0,o(70478).Z)({parentContainer:{marginBottom:.13*window.innerHeight,width:.98*window.innerWidth},appBar:{},toolbar:{justifyContent:"space-between",maxWidth:"1272px",width:"100%",margin:"0 auto",display:"flex",alignItems:"center",padding:"0px !important",boxSizing:"border-box",minHeight:"54px",fontFamily:'"Roboto" ,sans-serif'},menu:{maxWidth:"1272px",width:"100%",margin:"0 auto",display:"flex",alignItems:"center",cursor:"pointer"},headerLogo:{height:"2rem",width:"10rem"},headerMenu:(ee={textDecoration:"none",borderRadius:"inherit",backgroundColor:"transparent",padding:"18px ",color:"black",boxShadow:"none",fontSize:"19px",fontFamily:"Roboto",fontWeight:500,letterSpacing:"0.5px"},(0,O.Z)(ee,"borderRadius",12),(0,O.Z)(ee,"marginLeft",5),(0,O.Z)(ee,"marginRight",5),(0,O.Z)(ee,"&:hover",{backgroundColor:"#E0E0E0",boxShadow:"none"}),ee),highlightedMenu:(re={backgroundColor:"#E0E0E0",textDecoration:"none",borderRadius:"inherit",padding:"18px ",color:"black",boxShadow:"none",fontSize:"19px",fontFamily:"Roboto",fontWeight:500},(0,O.Z)(re,"borderRadius",12),(0,O.Z)(re,"marginLeft",5),(0,O.Z)(re,"marginRight",5),(0,O.Z)(re,"letterSpacing","0.5px"),(0,O.Z)(re,"&:hover",{backgroundColor:"#E0E0E0",boxShadow:"none"}),re),avatar:{width:"36px",height:"36px",backgroundColor:"#2A61AD !important",fontSize:"14px",color:"#FFFFFF !important","@media (max-width:640px)":{width:"26px",height:"26px"}}}),ae=o(59434),ie=o(13719),le=o(57832),se=o(8047),ce=o(85172),de=function(e){var r=(0,a.s0)(),o=(0,a.TH)(),l=ne(),s=e.publicHeader,c=n.useState(null),d=(0,t.Z)(c,2),u=d[0],p=d[1],m=n.useState(null),h=(0,t.Z)(m,2),f=h[0],g=h[1],x=n.useState(null),b=(0,t.Z)(x,2),Z=b[0],k=b[1],C=(0,ae.v9)((function(e){return e.userLoginDetails.data}));n.useEffect((function(){console.log("userData --- ",C)}),[C]);var S=function(e){return o.pathname===e},y=s?[]:[{name:"View Glossary",onClick:function(){return A("/view-glossary")},id:"/view-glossary",isActive:function(){return S("/view-glossary")}},{name:"Add Glossary",onClick:function(){return A("/add-glossary")},id:"/add-glossary",isActive:function(){return S("/add-glossary")}}],j=[{id:"Codebase",name:"Codebase",onclick:function(){return window.open("https://github.com/AI4Bharat/Indic-Glossary-Explorer")}},{id:"Tutorial",name:"Tutorial",onclick:function(){return window.open("https://github.com/AI4Bharat/Indic-Glossary-Explorer/wiki")}},{id:"Introduction Video",name:"Introduction Video",onclick:function(){return window.open("#")}},{id:"API Specs",name:"API Specs",onclick:function(){return window.open("https://app.swaggerhub.com/apis/ai4bharat-iitm/indic-glossary-explorer/1.0.0")}}],A=function(e){F(),r(e)},R=function(){localStorage.clear(),G(),r("/user/login")},z=function(e){k(e.currentTarget)},O=function(){k(null)},P=function(e){g(e.currentTarget)},F=function(){p(null)},G=function(){g(null)};return(0,v.jsx)(w,{position:"fixed",sx:{backgroundImage:"linear-gradient(to right, rgb(241, 241, 241), rgb(255, 255, 255))"},children:(0,v.jsx)(_,{maxWidth:"xl",children:(0,v.jsxs)(M.Z,{className:l.toolbar,children:[(0,v.jsxs)(B,{sx:{display:{xs:"none",md:"flex"},alignItems:"center"},children:[(0,v.jsx)("img",{src:"ai4bharat1.png",width:"50rem",height:"50rem"}),(0,v.jsx)(D.Z,{variant:"h5",sx:{color:"#000000",marginLeft:2},children:(0,ie.I)("label.appName")})]}),(0,v.jsxs)(B,{sx:{flexGrow:1,display:{xs:"flex",md:"none"}},children:[(0,v.jsx)(I.Z,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){p(e.currentTarget)},sx:{color:"#000000"},children:(0,v.jsx)(W.Z,{})}),(0,v.jsx)("img",{src:"ai4bharat1.png",width:"50rem",height:"50rem"}),(0,v.jsx)(N.Z,{id:"menu-appbar",anchorEl:u,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:Boolean(u),onClose:F,sx:{display:{xs:"block",md:"none"}},children:null===y||void 0===y?void 0:y.map((function(e){return(0,v.jsx)(te.Z,{onClick:function(){return e.onClick()},children:(0,v.jsx)(D.Z,{textAlign:"center",children:e.name})},e.name)}))})]}),(0,v.jsx)(B,{sx:{flexGrow:1,placeContent:"center",display:{xs:"none",md:"flex"}},children:null===y||void 0===y?void 0:y.map((function(e){return(0,v.jsx)(i.OL,{hidden:e.hidden,to:e.id,className:function(e){return e.isActive?l.highlightedMenu:l.headerMenu},activeClassName:l.highlightedMenu,children:e.name},e.name)}))}),(0,v.jsxs)(B,{sx:{flexGrow:0},children:[(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(le.Z,{label:"Help",onClick:z,sx:{borderRadius:2,padding:3,fontSize:"1rem",marginRight:2},size:"large","aria-controls":Z?"account-menu":void 0,"aria-haspopup":"true","aria-expanded":Z?"true":void 0}),(0,v.jsx)(N.Z,{id:"menu-appbar",anchorEl:Z,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:Boolean(Z),onClose:O,sx:{},children:(0,v.jsx)(se.ZP,{sx:{padding:.5},children:j.map((function(e,r){return(0,v.jsx)(I.Z,{onClick:function(){return(0,e.onclick)(),void O()},sx:{p:1,width:"100%",justifyContent:"start"},children:(0,v.jsx)(D.Z,{variant:"button",sx:{marginLeft:1},children:e.name})},e.id)}))})})]}),function(){return console.log("publicHeader --- ",s),s?(0,v.jsx)(le.Z,{label:"Login",onClick:function(){return r("/user/login")},sx:{borderRadius:2,padding:3,fontSize:"1rem"},size:"large"}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(I.Z,{onClick:P,size:"large",sx:{borderRadius:2,padding:1},"aria-controls":f?"account-menu":void 0,"aria-haspopup":"true","aria-expanded":f?"true":void 0,children:[(0,v.jsx)(oe,{sx:{},children:null===(e=JSON.parse(localStorage.getItem("userDetails")))||void 0===e||null===(o=e.username)||void 0===o?void 0:o.split("")[0]}),(0,v.jsx)(D.Z,{variant:"body1",sx:{marginLeft:1,marginRight:1,color:"rgb(39, 30, 79)"},children:null===(t=JSON.parse(localStorage.getItem("userDetails")))||void 0===t?void 0:t.username}),(0,v.jsx)(ce.Z,{})]}),(0,v.jsx)(N.Z,{id:"menu-appbar",anchorEl:f,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:Boolean(f),onClose:G,sx:{},children:(0,v.jsx)(se.ZP,{sx:{padding:.5},children:(0,v.jsx)(I.Z,{onClick:R,sx:{p:1,width:"100%",justifyContent:"start"},children:(0,v.jsx)(D.Z,{variant:"button",sx:{marginLeft:1},children:"Logout"})})})})]});var e,o,t}()]})]})})})}},85172:function(e,r,o){var t=o(64836);r.Z=void 0;var n=t(o(45649)),a=o(80184),i=(0,n.default)((0,a.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");r.Z=i},98008:function(e,r,o){var t=o(64836);r.Z=void 0;var n=t(o(45649)),a=o(80184),i=(0,n.default)((0,a.jsx)("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");r.Z=i}}]);
//# sourceMappingURL=692.35f22301.chunk.js.map