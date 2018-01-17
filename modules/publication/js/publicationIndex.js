!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_FilterForm=__webpack_require__(13),_FilterForm2=_interopRequireDefault(_FilterForm),_Tabs=__webpack_require__(9),_uploadForm=__webpack_require__(25),_uploadForm2=_interopRequireDefault(_uploadForm),_columnFormatter=__webpack_require__(26),_columnFormatter2=_interopRequireDefault(_columnFormatter),PublicationIndex=function(_React$Component){function PublicationIndex(props){_classCallCheck(this,PublicationIndex);var _this=_possibleConstructorReturn(this,(PublicationIndex.__proto__||Object.getPrototypeOf(PublicationIndex)).call(this,props));return loris.hiddenHeaders=["Description","Keywords","Variables Of Interest","Publication ID"],_this.state={isLoaded:!1,filter:{}},_this.fetchData=_this.fetchData.bind(_this),_this.updateFilter=_this.updateFilter.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this}return _inherits(PublicationIndex,_React$Component),_createClass(PublicationIndex,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){$.ajax(this.props.DataURL,{method:"GET",dataType:"json",success:function(data){this.setState({Data:data,isLoaded:!0})}.bind(this),error:function(_error){console.error(_error)}})}},{key:"updateFilter",value:function(filter){this.setState({filter:filter})}},{key:"resetFilters",value:function(){this.refs.publicationsFilter.clearFilter()}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var tabList=[{id:"browse",label:"Browse"},{id:"propose",label:"Propose a Project"}];return React.createElement(_Tabs.Tabs,{tabs:tabList,defaultTab:"browse",updateURL:!0},React.createElement(_Tabs.TabPane,{TabId:tabList[0].id},React.createElement(_FilterForm2.default,{Module:"publication",name:"publications_filter",id:"publications_filter_form",ref:"publicationsFilter",columns:3,formElements:this.state.Data.form,onUpdate:this.updateFilter,filter:this.state.filter},React.createElement("br",null),React.createElement(ButtonElement,{label:"Clear Filters",type:"reset",onUserInput:this.resetFilters})),React.createElement(StaticDataTable,{Data:this.state.Data.Data,Headers:this.state.Data.Headers,Filter:this.state.filter,getFormattedCell:_columnFormatter2.default})),React.createElement(_Tabs.TabPane,{TabId:tabList[1].id},React.createElement(_uploadForm2.default,{DataURL:loris.BaseURL+"/publication/ajax/FileUpload.php?action=getData",action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=upload"})))}}]),PublicationIndex}(React.Component);$(function(){var publicationIndex=React.createElement("div",{className:"page-publications"},React.createElement(PublicationIndex,{DataURL:loris.BaseURL+"/publication/?format=json"}));ReactDOM.render(publicationIndex,document.getElementById("lorisworkspace"))})},2:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:{height:this.props.height}},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%"},exports.default=Panel},9:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Tabs=function(_React$Component){function Tabs(props){_classCallCheck(this,Tabs);var _this=_possibleConstructorReturn(this,(Tabs.__proto__||Object.getPrototypeOf(Tabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this.props.updateURL&&hash?activeTab=hash.substr(1):_this.props.defaultTab?activeTab=_this.props.defaultTab:_this.props.tabs.length>0&&(activeTab=_this.props.tabs[0].id),_this.state={activeTab:activeTab},_this.handleClick=_this.handleClick.bind(_this),_this.getTabs=_this.getTabs.bind(_this),_this.getTabPanes=_this.getTabPanes.bind(_this),_this}return _inherits(Tabs,_React$Component),_createClass(Tabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("ul",{className:"nav nav-tabs",role:"tablist",style:tabStyle},tabs),React.createElement("div",{className:"tab-content"},tabPanes))}}]),Tabs}(React.Component);Tabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},Tabs.defaultProps={onTabChange:function(){},updateURL:!1};var TabPane=function(_React$Component2){function TabPane(){return _classCallCheck(this,TabPane),_possibleConstructorReturn(this,(TabPane.__proto__||Object.getPrototypeOf(TabPane)).apply(this,arguments))}return _inherits(TabPane,_React$Component2),_createClass(TabPane,[{key:"render",value:function(){var classList="tab-pane",title=void 0;return this.props.TabId===this.props.activeTab&&(classList+=" active"),this.props.Title&&(title=React.createElement("h1",null,this.props.Title)),React.createElement("div",{role:"tabpanel",className:classList,id:this.props.TabId},title,this.props.children)}}]),TabPane}(React.Component);TabPane.propTypes={TabId:React.PropTypes.string.isRequired,Title:React.PropTypes.string,activeTab:React.PropTypes.string},exports.Tabs=Tabs,exports.TabPane=TabPane},13:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),FilterForm=function(_React$Component){function FilterForm(props){_classCallCheck(this,FilterForm);var _this=_possibleConstructorReturn(this,(FilterForm.__proto__||Object.getPrototypeOf(FilterForm)).call(this,props));return _this.clearFilter=_this.clearFilter.bind(_this),_this.getFormChildren=_this.getFormChildren.bind(_this),_this.setFilter=_this.setFilter.bind(_this),_this.onElementUpdate=_this.onElementUpdate.bind(_this),_this.queryString=QueryString.get(),_this}return _inherits(FilterForm,_React$Component),_createClass(FilterForm,[{key:"componentDidMount",value:function(){var filter={},queryString=this.queryString;Object.keys(queryString).forEach(function(key){var filterKey="candidateID"===key?"candID":key;filter[filterKey]={value:queryString[key],exactMatch:!1}}),this.props.onUpdate(filter)}},{key:"clearFilter",value:function(){this.queryString=QueryString.clear(this.props.Module),this.props.onUpdate({})}},{key:"getFormChildren",value:function(){var formChildren=[];return React.Children.forEach(this.props.children,function(child,key){if(React.isValidElement(child)&&"function"==typeof child.type&&child.props.onUserInput){var callbackFunc=child.props.onUserInput,callbackName=callbackFunc.name,elementName=child.type.displayName,queryFieldName="candID"===child.props.name?"candidateID":child.props.name,filterValue=this.queryString[queryFieldName];"onUserInput"===callbackName&&(callbackFunc="ButtonElement"===elementName&&"reset"===child.props.type?this.clearFilter:this.onElementUpdate.bind(null,elementName)),formChildren.push(React.cloneElement(child,{onUserInput:callbackFunc,value:filterValue?filterValue:"",key:key})),this.setFilter(elementName,child.props.name,filterValue)}else formChildren.push(React.cloneElement(child,{key:key}))}.bind(this)),formChildren}},{key:"setFilter",value:function(type,key,value){var filter={};return this.props.filter&&(filter=JSON.parse(JSON.stringify(this.props.filter))),key&&value?(filter[key]={},filter[key].value=value,filter[key].exactMatch="SelectElement"===type):filter&&key&&""===value&&delete filter[key],filter}},{key:"onElementUpdate",value:function(type,fieldName,fieldValue){if("string"==typeof fieldName&&"string"==typeof fieldValue){var queryFieldName="candID"===fieldName?"candidateID":fieldName;this.queryString=QueryString.set(this.queryString,queryFieldName,fieldValue);var filter=this.setFilter(type,fieldName,fieldValue);this.props.onUpdate(filter)}}},{key:"render",value:function(){var formChildren=this.getFormChildren(),formElements=this.props.formElements;return formElements&&Object.keys(formElements).forEach(function(fieldName){var queryFieldName="candID"===fieldName?"candidateID":fieldName;formElements[fieldName].onUserInput=this.onElementUpdate.bind(null,fieldName),formElements[fieldName].value=this.queryString[queryFieldName]}.bind(this)),React.createElement(_Panel2.default,{id:this.props.id,height:this.props.height,title:this.props.title},React.createElement(FormElement,this.props,formChildren))}}]),FilterForm}(React.Component);FilterForm.defaultProps={id:"selection-filter",height:"100%",title:"Selection Filter",onUpdate:function(){console.warn("onUpdate() callback is not set!")}},FilterForm.propTypes={Module:React.PropTypes.string.isRequired,filter:React.PropTypes.object.isRequired,id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,onUpdate:React.PropTypes.func},exports.default=FilterForm},25:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),PublicationUploadForm=function(_React$Component){function PublicationUploadForm(props){_classCallCheck(this,PublicationUploadForm);var _this=_possibleConstructorReturn(this,(PublicationUploadForm.__proto__||Object.getPrototypeOf(PublicationUploadForm)).call(this,props));return _this.state={Data:{},formData:{},numVOIGroups:1,uploadResult:null,errorMessage:null,isLoaded:!1,loadedData:0,uploadProgress:-1},_this.setFormData=_this.setFormData.bind(_this),_this.handleSubmit=_this.handleSubmit.bind(_this),_this.addListItem=_this.addListItem.bind(_this),_this.removeListItem=_this.removeListItem.bind(_this),_this.addVOIGroups=_this.addVOIGroups.bind(_this),_this}return _inherits(PublicationUploadForm,_React$Component),_createClass(PublicationUploadForm,[{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data),self.setState({Data:data,isLoaded:!0})},error:function(data,errorCode,errorMsg){console.error(data,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"addVOIGroups",value:function(){var currCount=this.state.numVOIGroups;currCount++,this.setState({numVOIGroups:currCount})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,existingTitles=this.state.Data.titles;if(existingTitles.indexOf(formData.title)>-1)return void swal("Publication title already exists!","","error");var formObj=new FormData;for(var key in formData)if(""!==formData[key]){var formVal;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,success:function(){this.setState({formData:{}}),swal("Submission Successful!","","success")}.bind(this),error:function(jqXHR,textStatus){console.log(textStatus)}})}},{key:"render",value:function(){if(void 0!==this.state.error)return React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error));if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var testNames=[];this.state.Data.varsOfInterest.forEach(function(v){testNames[v.SourceFrom]||(testNames[v.SourceFrom]=v.SourceFrom)}),testNames.sort();var testFields=this.state.Data.varsOfInterest.map(function(v){return v.Name});testFields.sort();for(var voiFields=[],i=1;i<=this.state.numVOIGroups;i++){var inst=this.state.formData["voiInst_"+i];inst&&(testFields=[],this.state.Data.varsOfInterest.forEach(function(v){v.SourceFrom===inst&&(testFields[v.SourceField]=v.SourceField)})),voiFields.push(React.createElement("div",null,React.createElement(SelectElement,{name:"voiInst_"+i,label:"Instrument",ref:"voiInst_"+i,id:"voiInst_"+i,onUserInput:this.setFormData,required:!0,value:this.state.formData["voiInst_"+i],options:testNames}),React.createElement(ListElement,{name:"voiFields_"+i,label:"Instrument Fields",ref:"voiFields_"+i,id:"voiFields_"+i,onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!0,value:this.state.formData["pendingItemVF_"+i],options:testFields,pendingValKey:"pendingItemVF_",items:this.state.formData["voiFields_"+i]})))}return React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-8 col-lg-7"},React.createElement(FormElement,{name:"publicationUpload",fileUpload:!0,onSubmit:this.handleSubmit,ref:"form"},React.createElement("h3",null,"Propose a new project"),React.createElement("br",null),React.createElement(TextboxElement,{name:"title",label:"Title",onUserInput:this.setFormData,ref:"title",required:!0,value:this.state.formData.title}),React.createElement(TextareaElement,{name:"description",label:"Description",onUserInput:this.setFormData,ref:"description",required:!0,value:this.state.formData.description}),React.createElement(TextboxElement,{name:"leadInvestigator",label:"Lead Investigator",onUserInput:this.setFormData,ref:"leadInvestigator",required:!0,value:this.state.formData.leadInvestigator}),React.createElement(TextboxElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",onUserInput:this.setFormData,ref:"leadInvestigatorEmail",required:!0,value:this.state.formData.leadInvestigatorEmail}),React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label"}),React.createElement("div",{className:"col-sm-9"},React.createElement("p",{className:"form-control-static"},React.createElement("strong",null,"Variables of Interest",React.createElement("span",{className:"text-danger"},"*"))))),voiFields,React.createElement(ButtonElement,{label:"Add Instrument",type:"button",onUserInput:this.addVOIFields}),React.createElement(ListElement,{name:"keywords",label:"Keywords",ref:"keywords",id:"keywords",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!1,allowDupl:!1,value:this.state.formData.pendingKWItem,pendingValKey:"pendingKWItem",items:this.state.formData.keywords}),React.createElement(FileElement,{name:"file",id:"publicationUploadEl",onUserInput:this.setFormData,ref:"file",label:"Publication",required:!1,value:this.state.formData.file}),React.createElement(ButtonElement,{label:"Propose Project"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-9 col-sm-offset-3"})))))}}]),PublicationUploadForm}(React.Component);exports.default=PublicationUploadForm},26:function(module,exports){"use strict";function formatColumn(column,cell,rowData,rowHeaders){if(loris.hiddenHeaders.indexOf(column)>-1)return null;var row={};rowHeaders.forEach(function(header,index){row[header]=rowData[index]},this);var classes=[];if("Title"===column){var pubID=row["Publication ID"],viewURL=loris.BaseURL+"/publications/view_project?id="+pubID;return React.createElement("td",null,React.createElement("a",{href:viewURL},cell))}return React.createElement("td",{className:classes},cell)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=formatColumn}});
//# sourceMappingURL=publicationIndex.js.map