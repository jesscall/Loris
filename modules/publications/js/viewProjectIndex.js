!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _viewProject=__webpack_require__(27),_viewProject2=_interopRequireDefault(_viewProject),args=QueryString.get(document.currentScript.src);$(function(){var viewProject=React.createElement("div",{className:"page-edit-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-7"},React.createElement(_viewProject2.default,{DataURL:loris.BaseURL+"/publications/ajax/FileUpload.php?action=getProjectData&id="+args.id}))));ReactDOM.render(viewProject,document.getElementById("lorisworkspace"))})},27:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),ViewProject=function(_React$Component){function ViewProject(props){_classCallCheck(this,ViewProject);var _this=_possibleConstructorReturn(this,(ViewProject.__proto__||Object.getPrototypeOf(ViewProject)).call(this,props));return _this.state={formData:{},isLoaded:!1},_this.handleSubmit=_this.handleSubmit.bind(_this),_this}return _inherits(ViewProject,_React$Component),_createClass(ViewProject,[{key:"handleSubmit",value:function(){}},{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data);var formData={title:data.title,description:data.description,leadInvestigator:data.leadInvestigator,leadInvestigatorEmail:data.leadInvestigatorEmail,status:data.status};self.setState({formData:formData,isLoaded:!0})},error:function(_error,errorCode,errorMsg){console.error(_error,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"render",value:function(){return this.state.isLoaded?React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-8 col-lg-7"},React.createElement(FormElement,{name:"viewProject",onSubmit:this.handleSubmit,ref:"form"},React.createElement("h3",null,this.state.formData.title),React.createElement("br",null),React.createElement(StaticElement,{name:"status",label:"Status",ref:"status",text:this.state.formData.status}),React.createElement(StaticElement,{name:"leadInvestigator",label:"Lead Investigator",ref:"leadInvestigator",text:this.state.formData.leadInvestigator}),React.createElement(StaticElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",ref:"leadInvestigatorEmail",text:this.state.formData.leadInvestigatorEmail}),React.createElement(StaticElement,{name:"variablesOfInterest",label:"Variables of Interest",ref:"variablesOfInterest",text:"VOI"}),React.createElement(StaticElement,{name:"keywords",label:"Keywords",ref:"keywords",text:"k"}),React.createElement(StaticElement,{name:"description",label:"Description",ref:"description",text:this.state.formData.description})))):React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}))}}]),ViewProject}(React.Component);exports.default=ViewProject}});
//# sourceMappingURL=viewProjectIndex.js.map