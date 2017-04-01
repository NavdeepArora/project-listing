projectList.service('ProjectListService', [
    'ProjectListProxy',
    ProjectListServiceFn
    ]);

    function ProjectListServiceFn(ProjectListProxy) {
        this.projectListProxy = ProjectListProxy;
    };

    ProjectListServiceFn.prototype.getProjectList = function () {
    	return this.projectListProxy.getProjectList();
    };