var CandidateDOB = React.createClass(
  {
    getInitialState: function() {
      return {
        Data: [],
        formData: {},
        updateResult: null,
        errorMessage: null,
        isLoaded: false,
        loadedData: 0
      };
    },
    componentDidMount: function() {
      var that = this;
      $.ajax(
        this.props.dataURL,
        {
          dataType: 'json',
          success: function(data) {
            var formData = {
              dob: data.dob,
            };

            // Add parameter values to formData
            Object.assign(formData, data.parameter_values);

            that.setState({
              Data: data,
              isLoaded: true,
              formData: formData
            });
          },
          error: function(data, errorCode, errorMsg) {
            that.setState({
              error: 'An error occurred when loading the form!'
            });
          }
        }
      );
    },
    setFormData: function(formElement, value) {
      var formData = JSON.parse(JSON.stringify(this.state.formData));
      formData[formElement] = value;

      this.setState({
        formData: formData
      });
    },
    render: function() {
      if (!this.state.isLoaded) {
        if (this.state.error !== undefined) {
          return (
            <div className="alert alert-danger text-center">
              <strong>
                {this.state.error}
              </strong>
            </div>
          );
        }

        return (
          <button className="btn-info has-spinner">
            Loading
            <span
              className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
            </span>
          </button>
        );
      }

      var disabled = true;
      var updateButton = null;
      if (loris.userHasPermission('candidate_parameter_edit') && loris.userHasPermission('candidate_dob_edit')) {
        disabled = false;
        updateButton = <ButtonElement label="Update"/>;
      }

      var alertMessage = "";
      var alertClass = "alert text-center hide";
      if (this.state.updateResult) {
        if (this.state.updateResult === "success") {
          alertClass = "alert alert-success text-center";
          alertMessage = "Update Successful!";
        } else if (this.state.updateResult === "error") {
          var errorMessage = this.state.errorMessage;
          alertClass = "alert alert-danger text-center";
          alertMessage = errorMessage ? errorMessage : "Failed to update!";
        }
      }

      return (
        <div className="row">
          <div className={alertClass} role="alert" ref="alert-message">
            {alertMessage}
          </div>
          <FormElement
            name="candidateDOB"
            onSubmit={this.handleSubmit}
            ref="form"
            className="col-md-6">
            <StaticElement
              label="PSCID"
              text={this.state.Data.pscid}
            />
            <StaticElement
              label="DCCID"
              text={this.state.Data.candID}
            />
            <StaticElement
              label="Disclaimer:"
              text="Any changes to the candidate's date of birth requires an administrator to run the fix_candidate_age script."
            />
            <DateElement
              label="Date Of Birth:"
              name="dob"
              value={this.state.formData.dob}
              onUserInput={this.setFormData}
              disabled={disabled}
              required={true}
            />
            {updateButton}
          </FormElement>
        </div>
      );
    },
    /**
     * Handles form submission
     *
     * @param {event} e - Form submission event
     */
    handleSubmit: function(e) {
      e.preventDefault();
      var myFormData = this.state.formData;
      // Set form data and upload the media file
      var self = this;
      var formData = new FormData();
      for (var key in myFormData) {
        if (myFormData.hasOwnProperty(key)) {
          if (myFormData[key]) {
            formData.append(key, myFormData[key]);
          }
        }
      }

      formData.append('tab', this.props.tabName);
      formData.append('candID', this.state.Data.candID);
      $.ajax(
        {
          type: 'POST',
          url: self.props.action,
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          success: function(data) {
            self.setState(
              {
                updateResult: "success"
              }
            );
            self.showAlertMessage();
          },
          error: function(err) {
            if (err.responseText !== "") {
              var errorMessage = JSON.parse(err.responseText).message;
              self.setState(
                {
                  updateResult: "error",
                  errorMessage: errorMessage
                }
              );
              self.showAlertMessage();
            }
          }

        }
      );
    },
    /**
     * Display a success/error alert message after form submission
     */
    showAlertMessage: function() {
      var self = this;
      if (this.refs["alert-message"] === null) {
        return;
      }

      var alertMsg = this.refs["alert-message"];
      $(alertMsg).fadeTo(2000, 500).delay(3000).slideUp(
        500,
        function() {
          self.setState(
            {
              updateResult: null
            }
          );
        }
      );
    }

  }
);
export default CandidateDOB;