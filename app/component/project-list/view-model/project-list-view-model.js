
projectList.service('ProjectListViewModel', [
    ProjectListViewModelFn
]);

function ProjectListViewModelFn(){
    this.projectList = '';
    this.displayList = '';
    this.displayListSet = '';
    this.showTemplate = false;
    this.searchArray = [];
    this.autoCompleteOptions = {};
    this.page = 1;
    this.budget = false;
    this.year = false;
    this.searchString = '';
};
