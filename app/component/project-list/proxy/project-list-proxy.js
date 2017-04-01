projectList.service('ProjectListProxy', [
    '$http',
    '$q',
    ProjectListProxyFn
    ]);

    function ProjectListProxyFn($http, $q) {
        this.http = $http;
        this.q = $q;
        this.serviceUrl = '/kickstarter';
    };

    ProjectListProxyFn.prototype.getProjectList = function () {
        var deferred = this.q.defer();
        return this.http.get(this.serviceUrl);
    };