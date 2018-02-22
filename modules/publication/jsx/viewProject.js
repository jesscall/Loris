class ViewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      isLoaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormData = this.setFormData.bind(this);
    this.createMenuFilterLinks = this.createMenuFilterLinks.bind(this);
    this.createVOIElements = this.createVOIElements.bind(this);
    this.createStaticComponents = this.createStaticComponents.bind(this);
    this.createEditableComponents = this.createEditableComponents.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = this.state.formData;
    // make sure title is unique
    /*let existingTitles = this.state.Data.titles;
    if (existingTitles.indexOf(formData.title) > -1) {
      swal("Publication title already exists!", "", "error");
      return;
    }*/

    let formObj = new FormData();
    for (let key in formData) {
      if (formData[key] !== "") {
        var formVal;
        if (Array.isArray(formData[key])) {
          formVal = JSON.stringify(formData[key]);
        } else {
          formVal = formData[key];
        }
        formObj.append(key, formVal);
      }
    }

    $.ajax({
      type: 'POST',
      url: this.props.action,
      data: formObj,
      cache: false,
      contentType: false,
      processData: false,
      success: function() {
        swal("Edit Successful!", "", "success");
      }.bind(this),
      error: function(jqXHR, textStatus) {
        console.error(textStatus);
      }
    });
  }

  setFormData(formElement, value) {
    let formData = this.state.formData;
    formData[formElement] = value;
    this.setState({
      formData: formData
    });
  }

  componentDidMount() {
    var self = this;
    $.ajax(this.props.DataURL, {
      dataType: 'json',
      success: function(data) {
        console.log(data);
        // format VoIs to be Tags renderable
        let voiFields = [];
        for (let inst in data.voi) {
          if (data.voi[inst].IsFullSet) {
            voiFields.push(inst + '_AllFields');
          } else {
            voiFields.concat(data.voi.inst.Fields);
          }
        }
        let formData = {
          title: data.title,
          description: data.description,
          leadInvestigator: data.leadInvestigator,
          leadInvestigatorEmail: data.leadInvestigatorEmail,
          status: data.status,
          voiFields: voiFields
        };
        self.setState({
          formData: formData,
          statusOpts: data.statusOpts,
          userCanEdit: data.userCanEdit,
          allVOIs: data.allVOIs,
          uploadTypes: data.uploadTypes,
          // keep VoIs and keywords separate from formData initially
          voi: data.voi,
          keywords: data.keywords,
          isLoaded: true
        });
      },
      error: function(error, errorCode, errorMsg) {
        console.error(error, errorCode, errorMsg);
        self.setState({
          error: 'An error occurred when loading the form!'
        });
      }
    });
  }

  createMenuFilterLinks(stringArr, filterVar) {
    var links = [];
    stringArr.forEach(
      function (value) {
        links.push(
          <span>
            <a
              href={loris.BaseURL + "/publication/?"+filterVar+"="+value}
            >
              {value}
            </a>
            ; &nbsp;
          </span>
        );
      }
    );

    return links;
  }

  createVOIElements(vois) {
    var result = [];
    console.log('in func');
    Object.keys(vois).forEach(
      function(v) {
        console.log(v);
        var links = this.createMenuFilterLinks(vois[v]['Fields'], 'voi');
        result.push(
          <div>
            <h4 data-toggle="collapse" data-target={"#voi" + v}>
              {v} &nbsp;
              <span className="glyphicon glyphicon-chevron-down"/>
            </h4>
            <div id={"voi" + v} className="collapse">
            {links}
            </div>
          </div>
        );
      }.bind(this)
    );

    return result;
  }

  createStaticComponents() {
    if (this.state.formData.keywords) {
      var keywordLinks = this.createMenuFilterLinks(
        this.state.formData.keywords,
        'keywords'
      );
    }

    if (this.state.voi) {
      var voiLinks = this.createVOIElements(this.state.voi);
    }
    return (
      <div>
        <StaticElement
          name="leadInvestigator"
          label="Lead Investigator"
          ref="leadInvestigator"
          text={this.state.formData.leadInvestigator}
        />
        <StaticElement
         name="leadInvestigatorEmail"
         label="Lead Investigator Email"
         ref="leadInvestigatorEmail"
         text={this.state.formData.leadInvestigatorEmail}
        />
        <StaticElement
          name="variablesOfInterest"
          label="Variables of Interest"
          ref="variablesOfInterest"
          text={voiLinks}
        />
        <StaticElement
          name="keywords"
          label="Keywords"
          ref="keywords"
          text={keywordLinks}
        />
        <StaticElement
          name="description"
          label="Description"
          ref="description"
          text={this.state.formData.description}
        />
      </div>
   );
  }


  addListItem(formElement, value, pendingValKey) {
    let formData = this.state.formData;
    let listItems = formData[formElement] || [];
    listItems.push(value);
    formData[formElement] = listItems;
    formData[pendingValKey] = null;
    this.setState({
      formData: formData
    });
  }

  removeListItem(formElement, value) {
    let formData = this.state.formData;
    let listItems = formData[formElement];
    let index = listItems.indexOf(value);

    if (index > -1) {
      listItems.splice(index, 1);

      formData[formElement] = listItems;
      this.setState({
        formData: formData
      });
    }
  }

  createEditableComponents() {
    // build testNames array
    let testNames = [];
    let allVOIs = this.state.allVOIs;
    allVOIs.forEach(
      function (v) {
        if (testNames[v.SourceFrom]) {
          return;
        }
        testNames[v.SourceFrom] = v.SourceFrom;
      }
    );
    testNames.sort();

    // Set test fields to all fields by default
    let testFields = allVOIs.map(v => v.Name);
    testFields.sort();

    // if an instrument has been selected, then populate the fields
    // selection with fields only relevant to the selected instrument
    let inst = this.state.formData.voiInst;
    if (inst) {
      testFields = [];
      testFields[inst+'_AllFields'] = inst + '_AllFields';
      allVOIs.forEach(function(v){
        if (v.SourceFrom === inst) {
          testFields[v.Name] = v.Name;
        }
      });
    }
    return (
      <div>
        <TextareaElement
          name="description"
          label="Description"
          onUserInput={this.setFormData}
          required={true}
          value={this.state.formData.description}
        />
        <TextboxElement
          name="leadInvestigator"
          label="Lead Investigator"
          onUserInput={this.setFormData}
          required={true}
          value={this.state.formData.leadInvestigator}
        />
        <TextboxElement
          name="leadInvestigatorEmail"
          label="Lead Investigator Email"
          onUserInput={this.setFormData}
          required={true}
          value={this.state.formData.leadInvestigatorEmail}
        />
        <div className="row form-group">
          <label className="col-sm-3 control-label"/>
          <div className="col-sm-9">
            <p className="form-control-static">
              <strong>
                Variables of Interest
              </strong>
            </p>
          </div>
        </div>
        <SelectElement
          name="voiInst"
          label="Instrument"
          id="voiInst"
          onUserInput={this.setFormData}
          required={false}
          value={this.state.formData.voiInst}
          options={testNames}
        />
        <TagsElement
          name="voiFields"
          label="Instrument Fields"
          id="voiFields"
          onUserInput={this.setFormData}
          onUserAdd={this.addListItem}
          onUserRemove={this.removeListItem}
          required={false}
          value={this.state.formData.pendingItemVF}
          options={testFields}
          pendingValKey="pendingItemVF"
          items={this.state.formData.voiFields}
          btnLabel="Add Variable of Interest"
        />
      </div>
    );
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <button className="btn-info has-spinner">
          Loading
          <span
            className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
          </span>
        </button>
      );
    }


    // make approval status selectable and supply textbox in case
    // of proposal rejection
    let statusElement, rejectReason;
    if (loris.userHasPermission('publication_approve')) {
     statusElement = <SelectElement
        name="status"
        label="Status"
        id="status"
        value={this.state.formData.status}
        onUserInput={this.setFormData}
        required={true}
        options={this.state.statusOpts}
        emptyOption={false}
      />;

      if (this.state.formData.status === 'Rejected') {
        rejectReason = <TextboxElement
          name="rejectReason"
          label="Reason for rejection"
          value={this.state.formData.status}
          onUserInput={this.setFormData}
          required={true}
        />;
      }
    } else {
      const statClassMap = {
        'Pending': 'text-warning',
        'Approved': 'text-success',
        'Rejected': 'text-danger'
      };
      let s = this.state.formData.status;
      let statusText =(
        <span className={statClassMap[s]}>
          <strong>{s}</strong>
        </span>
      );
      statusElement = <StaticElement
        label="Status"
        text={statusText}
      />;
    }


    let formElements;
    if (this.state.userCanEdit) {
      formElements = this.createEditableComponents();
    } else {
      formElements = this.createStaticComponents();
    }

    // only display submit button if user has approval permission
    // or user can edit
    let submitBtn;
    if (loris.userHasPermission('publication_approve') || this.state.userCanEdit) {
      submitBtn = <ButtonElement
        name="Submit"
      />;
    }
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <FormElement
            name="viewProject"
            onSubmit={this.handleSubmit}
            ref="form"
          >
            <div className="row">
              <div className="col-md-3"/>
              <h3 className="col-md-9">
                {this.state.formData.title}
              </h3>
            </div>
            {statusElement}
            {rejectReason}
            {formElements}
            {submitBtn}
          </FormElement>
        </div>
      </div>
    );
  }
}

export default ViewProject;