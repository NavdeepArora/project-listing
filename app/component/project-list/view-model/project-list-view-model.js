
projectList.service('ProjectListViewModel', [
    ProjectListViewModelFn
]);

function ProjectListViewModelFn(){
    this.projectList = '';
    this.displayList = '';
    this.displayListSet = '';
    this.showTemplate = false;
};
