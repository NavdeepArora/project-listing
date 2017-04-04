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