projectList.controller('ProjectListController', [
    '$filter',
    'ProjectListViewModel',
    ProjectListCtrlFn
]);

function ProjectListCtrlFn($filter, ProjectListViewModel){
    this.filter = $filter;
    this.projectListViewModel = ProjectListViewModel;
    this.page = 1;
    this.searchArray = [];
    this.autoCompleteOptions = {};
    this.setSearchArray();
};

ProjectListCtrlFn.prototype.setSearchArray = function () {
    var self = this;
    this.searchArray = _.chain(self.projectListViewModel.projectList).map(function(item) { return item.title}).uniq().value();
    this.setAutoCompleteOptions();
    this.resetDisplayList();
};

ProjectListCtrlFn.prototype.setAutoCompleteOptions = function () {
    var self = this;
    this.autoCompleteOptions = {
        minimumChars: 1,
        dropdownWidth: '50%',
        data: function (term) {
            term = term.toUpperCase();
            var match = _.filter(self.searchArray, function (value) {
                return value.toUpperCase().startsWith(term);
            });
            return match;
        }
    }
};

ProjectListCtrlFn.prototype.resetDisplayList = function () {
    this.projectListViewModel.displayList = angular.copy(this.projectListViewModel.projectList);
    this.budget = false;
    this.year = false;
    this.searchString = '';
    this.page = 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.searchitems = function () {
    var self = this;
    this.projectListViewModel.displayList = this.filter('searchForName')(angular.copy(self.projectListViewModel.projectList), self.searchString);
    this.budget = false;
    this.year = false;
    this.page = 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.sortByBudget = function () {
    var self = this;
    this.projectListViewModel.displayList = this.filter('sortByBudget')(angular.copy(self.projectListViewModel.displayList), self.budget);
    this.page = 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.sortByYear = function () {
    var self = this;
    this.projectListViewModel.displayList = _.sortBy(angular.copy(self.projectListViewModel.displayList), function(item) { return item['end.time']; });
    if(this.year === 'newToOld') {
        this.projectListViewModel.displayList = this.projectListViewModel.displayList.reverse();
    }
    this.page = 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.showPreviousProjectSet = function () {
    this.page = this.page - 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.showNextProjectSet = function () {
    this.page = this.page + 1;
    this.showProjectSet();
};

ProjectListCtrlFn.prototype.showProjectSet = function () {
    var self = this;
    this.projectListViewModel.displayListSet = angular.copy(self.projectListViewModel.displayList.slice((self.page - 1) * 10, self.page * 10));
};
