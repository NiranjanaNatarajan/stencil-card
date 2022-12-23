import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true,
})
export class MyCard {
  @Prop({ mutable: true }) userName: string = 'Aruna';
  @State() APIData: string = 'starting value';
  @State() showEmployeeTab = false;
  @State() showEducationTab = false;
  @State() myEducationUsers: string;
  @State() myEmployeeUsers: string;

  componentDidLoad() {
    this.APIData = 'load';
  }

  getEducationUserFromAPI() {
    this.myEducationUsers = 'Bachelor of Engineering (BE) - Electronics and Communications Engineering (ECE)';
  }

  getEmployeeUserFromAPI() {
    this.myEmployeeUsers = 'Aspire Systems India Private Limited';
  }

  fetchMyDataFromAPI(contentType: string) {
    if (contentType == 'education') {
      this.getEducationUserFromAPI();
    } else {
      this.getEmployeeUserFromAPI();
    }
  }

  onContentChange(content: string) {
    if (content == 'employeetab') {
      this.showEmployeeTab = true;
      this.showEducationTab = false;
    } else if (content == 'educationtab') {
      this.showEducationTab = true;
      this.showEmployeeTab = false;
    } else {
      this.showEmployeeTab = false;
      this.showEducationTab = false;
    }
  }

  onUserInput(event: Event) {
    this.userName = (event.target as HTMLInputElement).value;
  }

  @Listen('searchWorldNameSelected', { target: 'body' })
  searchWorldNameSelectedHandler(event: CustomEvent<string>) {
    alert("called");
    this.userName = event.detail;
  }

  render() {
    let employeeContent = (
      <div>
        <div class="card-custom" id="employee-div">
          Hello,  Employee's Details of <strong>{this.userName} </strong><br></br><br></br> Details : <span><strong>{this.myEmployeeUsers}</strong></span> <br></br> <br></br>
          <button class="btn-employee small-btn" onClick={this.fetchMyDataFromAPI.bind(this, 'employee')}>Get Employee Details</button> <br></br>
        </div>
      </div>
    );

    let educationContent = (
      <div>
        <div class="card-custom" id="education-div">
          Hello,  Education's Details of <strong>{this.userName}</strong>
          <br></br> <br></br>
          Details : <span><strong>{this.myEducationUsers}</strong></span><br />
          <br></br>
          <button class="btn-education small-btn" onClick={this.fetchMyDataFromAPI.bind(this, 'education')}>Get Education Details</button> <br></br>
          <br></br>
        </div>
      </div>
    );

    let contentToDisplay = '';
    if (this.showEmployeeTab) {
      contentToDisplay = employeeContent;
    } else if (this.showEducationTab) {
      contentToDisplay = educationContent;
    }

    let mainContent = (
      <div class="my-card-wrapper">
        <h1>Hi, I am {this.userName}</h1>

        <h5>Details : <span hidden>- {this.APIData}</span></h5>
        <button class="btn-education" onClick={this.onContentChange.bind(this, 'educationtab')}>
          Education
        </button>
        <button class="btn-employee" onClick={this.onContentChange.bind(this, 'employeetab')}>
          Employee
        </button>

        {contentToDisplay}
        <h></h>
        <h3>User Name</h3>

        <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.userName}></input>

      </div>

    );
    return mainContent;
  }
}
