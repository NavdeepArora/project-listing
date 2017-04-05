projectList.controller('ProjectListController', [
    '$filter',
    'ProjectListViewModel',
    'ProjectListService',
    ProjectListCtrlFn
]);

function ProjectListCtrlFn($filter, ProjectListViewModel, ProjectListService){
    this.filter = $filter;
    this.projectListViewModel = ProjectListViewModel;
    this.projectListService = ProjectListService;
};

ProjectListCtrlFn.prototype.searchitems = function () {
    var self = this;
    this.projectListViewModel.displayList = this.filter('searchForName')(angular.copy(self.projectListViewModel.projectList), self.searchString);
    this.projectListViewModel.budget = false;
    this.projectListViewModel.year = false;
    this.projectListViewModel.page = 1;
    this.projectListService.showProjectSet();
};

ProjectListCtrlFn.prototype.sortByBudget = function () {
    var self = this;
    this.projectListViewModel.displayList = this.filter('sortByBudget')(angular.copy(self.projectListViewModel.displayList), self.projectListViewModel.budget);
    this.projectListViewModel.page = 1;
    this.projectListService.showProjectSet();
};

ProjectListCtrlFn.prototype.sortByYear = function () {
    var self = this;
    this.projectListViewModel.displayList = _.sortBy(angular.copy(self.projectListViewModel.displayList), function(item) { return item['end.time']; });
    if(this.projectListViewModel.year === 'newToOld') {
        this.projectListViewModel.displayList = this.projectListViewModel.displayList.reverse();
    }
    this.projectListViewModel.page = 1;
    this.projectListService.showProjectSet();
};

ProjectListCtrlFn.prototype.showPreviousProjectSet = function () {
    this.projectListViewModel.page = this.projectListViewModel.page - 1;
    this.projectListService.showProjectSet();
};

ProjectListCtrlFn.prototype.showNextProjectSet = function () {
    this.projectListViewModel.page = this.projectListViewModel.page + 1;
    this.projectListService.showProjectSet();
};
