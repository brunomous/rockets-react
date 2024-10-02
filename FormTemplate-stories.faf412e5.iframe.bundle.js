"use strict";(self.webpackChunkroot=self.webpackChunkroot||[]).push([[483],{"./stories/FormTemplate.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomCardStyles:()=>CustomCardStyles,CustomContainerStyles:()=>CustomContainerStyles,CustomStyledTitleAndSubtitle:()=>CustomStyledTitleAndSubtitle,Default:()=>Default,WithChildrenComponents:()=>WithChildrenComponents,WithIcon:()=>WithIcon,WithTitleAndSubtitle:()=>WithTitleAndSubtitle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/react-material-ui/dist/index.js"),_assets_rockets_svg__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/assets/rockets.svg");const __WEBPACK_DEFAULT_EXPORT__={component:_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__.FormTemplate,tags:["autodocs"],args:{},argTypes:{title:{control:{type:"text"}},subtitle:{control:{type:"text"}}},render:args=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__.FormTemplate,args,args.children?args.children:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__.SimpleForm,{form:{fields:{name:{type:"string",title:"Name"},email:{type:"email",title:"Email"}}}}))},Default={args:{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:_assets_rockets_svg__WEBPACK_IMPORTED_MODULE_2__,alt:"rockets",width:60,height:60}),title:"User Form",subtitle:"Please enter user's details"}},WithTitleAndSubtitle={args:{title:"Form Title",subtitle:"Form Subtitle"}},WithIcon={args:{subtitle:"Form Template With Icon",icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:_assets_rockets_svg__WEBPACK_IMPORTED_MODULE_2__,alt:"rockets",width:60,height:60})}},CustomStyledTitleAndSubtitle={args:{title:"Custom Styled Title",subtitle:"Custom Styled Subtitle",titleTextProps:{color:"primary.main",variant:"h4",gutterBottom:!0},subtitleTextProps:{color:"secondary.main",variant:"subtitle1"}}},CustomContainerStyles={args:{title:"Custom Container",subtitle:"This container has custom styles",containerProps:{sx:{backgroundColor:"#f0f0f0",borderRadius:"8px",padding:"40px"}}}},CustomCardStyles={args:{title:"Custom Card",subtitle:"This card has custom styles",cardProps:{sx:{backgroundColor:"#ffe9e9",boxShadow:"0 0 10px rgba(0,0,0,0.1)"}}}},WithChildrenComponents={args:{title:"Login",children:react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__.TextField,{name:"email",label:"Email",type:"email"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_concepta_react_material_ui__WEBPACK_IMPORTED_MODULE_1__.TextField,{name:"password",label:"Password",type:"password"}))}},__namedExportsOrder=["Default","WithTitleAndSubtitle","WithIcon","CustomStyledTitleAndSubtitle","CustomContainerStyles","CustomCardStyles","WithChildrenComponents"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    icon: <img src={rockets} alt="rockets" width={60} height={60} />,\n    title: \'User Form\',\n    subtitle: "Please enter user\'s details"\n  }\n}',...Default.parameters?.docs?.source}}},WithTitleAndSubtitle.parameters={...WithTitleAndSubtitle.parameters,docs:{...WithTitleAndSubtitle.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Form Title',\n    subtitle: 'Form Subtitle'\n  }\n}",...WithTitleAndSubtitle.parameters?.docs?.source}}},WithIcon.parameters={...WithIcon.parameters,docs:{...WithIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    subtitle: 'Form Template With Icon',\n    icon: <img src={rockets} alt=\"rockets\" width={60} height={60} />\n  }\n}",...WithIcon.parameters?.docs?.source}}},CustomStyledTitleAndSubtitle.parameters={...CustomStyledTitleAndSubtitle.parameters,docs:{...CustomStyledTitleAndSubtitle.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Custom Styled Title',\n    subtitle: 'Custom Styled Subtitle',\n    titleTextProps: {\n      color: 'primary.main',\n      variant: 'h4',\n      gutterBottom: true\n    },\n    subtitleTextProps: {\n      color: 'secondary.main',\n      variant: 'subtitle1'\n    }\n  }\n}",...CustomStyledTitleAndSubtitle.parameters?.docs?.source}}},CustomContainerStyles.parameters={...CustomContainerStyles.parameters,docs:{...CustomContainerStyles.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Custom Container',\n    subtitle: 'This container has custom styles',\n    containerProps: {\n      sx: {\n        backgroundColor: '#f0f0f0',\n        borderRadius: '8px',\n        padding: '40px'\n      }\n    }\n  }\n}",...CustomContainerStyles.parameters?.docs?.source}}},CustomCardStyles.parameters={...CustomCardStyles.parameters,docs:{...CustomCardStyles.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Custom Card',\n    subtitle: 'This card has custom styles',\n    cardProps: {\n      sx: {\n        backgroundColor: '#ffe9e9',\n        boxShadow: '0 0 10px rgba(0,0,0,0.1)'\n      }\n    }\n  }\n}",...CustomCardStyles.parameters?.docs?.source}}},WithChildrenComponents.parameters={...WithChildrenComponents.parameters,docs:{...WithChildrenComponents.parameters?.docs,source:{originalSource:'{\n  args: {\n    title: \'Login\',\n    children: <>\n        <TextField name="email" label="Email" type="email" />\n        <TextField name="password" label="Password" type="password" />\n      </>\n  }\n}',...WithChildrenComponents.parameters?.docs?.source}}}},"./stories/assets/rockets.svg":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__.p+"static/media/rockets.69f8fe5c.svg"}}]);