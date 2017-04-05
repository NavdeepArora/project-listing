projectList.service('ProjectListService', [
    'ProjectListProxy',
    'ProjectListViewModel',
    ProjectListServiceFn
    ]);

    function ProjectListServiceFn(ProjectListProxy, ProjectListViewModel) {
        this.projectListProxy = ProjectListProxy;
        this.projectListViewModel = ProjectListViewModel;
    };

    ProjectListServiceFn.prototype.getProjectList = function () {
    	return this.projectListProxy.getProjectList();
    };

    ProjectListServiceFn.prototype.addDomainToUrl = function () {
        angular.forEach(this.projectListViewModel.projectList, function(item){
            if(item.url){
                item.url = 'https://www.kickstarter.com/' + item.url;
            }
        });
    };

    ProjectListServiceFn.prototype.setSearchArray = function () {
        var self = this;
        this.projectListViewModel.searchArray = _.chain(self.projectListViewModel.projectList).map(function(item) { return item.title}).uniq().value();
        this.setAutoCompleteOptions();
        this.resetDisplayList();
    };

    ProjectListServiceFn.prototype.setAutoCompleteOptions = function () {
        var self = this;
        this.projectListViewModel.autoCompleteOptions = {
            minimumChars: 1,
            dropdownWidth: '50%',
            data: function (term) {
                term = term.toUpperCase();
                var match = _.filter(self.projectListViewModel.searchArray, function (value) {
                    return value.toUpperCase().startsWith(term);
                });
                return match;
            }
        }
    };

    ProjectListServiceFn.prototype.resetDisplayList = function () {
        this.projectListViewModel.displayList = angular.copy(this.projectListViewModel.projectList);
        this.projectListViewModel.budget = false;
        this.projectListViewModel.year = false;
        this.projectListViewModel.searchString = '';
        this.projectListViewModel.page = 1;
        this.showProjectSet();
    };

    ProjectListServiceFn.prototype.showProjectSet = function () {
        var self = this;
        this.projectListViewModel.displayListSet = angular.copy(self.projectListViewModel.displayList.slice((self.projectListViewModel.page - 1) * 10, self.projectListViewModel.page * 10));
    };