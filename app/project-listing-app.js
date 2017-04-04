var gieomProjectListingApp = angular.module('gieom-project-listing', ['ui.router', 'project-list']);

gieomProjectListingApp.config([
    '$urlRouterProvider',
    '$stateProvider',
    function ( $urlRouterProvider, $stateProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('gpl-web', {
            abstract: true,
            views: {
                '': {
                    templateUrl: "/component/gpl-web.html"
                }
            }
        });

        $stateProvider.state('gpl-web.projectListing', {
            url:'/project-listing',
            views: {
                'content@gpl-web': {
                    templateUrl: '/component/project-list/assets/project-list.html',
                    controller: 'ProjectListController',
                    controllerAs: 'PLC'
                }
            },
            resolve: {
                ProjectListData: ['ProjectListService', 'ProjectListViewModel', function (ProjectListService, ProjectListViewModel) {
                    ProjectListService.getProjectList().then (function (response) {
                        ProjectListViewModel.projectList = response.data;
                        ProjectListViewModel.showTemplate = true;
                        ProjectListService.addDomainToUrl();
                    });
                }]
            }
        });

}]).run(['$state', function($state){
    $state.go('gpl-web.projectListing');
}]);

angular.element(document).ready(function (){
    'use strict';
    angular.bootstrap(document.getElementById('plapp'), [gieomProjectListingApp.name])
});