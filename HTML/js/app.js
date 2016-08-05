/**
  You must include the dependency on 'ngMaterial' 
**/
angular.module('MyApp', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'ngStorage', 'ui.router', 'md.data.table'])

/**
Here's the calling order:
(1) app.config()
(2) app.run()
(3) directive's compile functions (if they are found in the dom)
(4) app.controller()
(5) directive's link functions (again, if found)
**/

.config(function ($stateProvider, $urlRouterProvider) {
    /**
    Setting up the States by using angular UI routes
    **/

    $urlRouterProvider.otherwise('/');

    $stateProvider
    // ROOT STATES for header and sidebar ========================================
        .state('root', {
        url: '',
        abstract: true,
        views: {
            'side': {
                templateUrl: 'view/templates/side.html',
                /*controller: 'HeaderCtrl'*/
            },
            'header': {
                templateUrl: 'view/templates/header.html',
                /*controller: 'FooterCtrl'*/
            }
        }
    })

    // LOGIN STATE ========================================
    .state('root.login', {
        url: '/login',
        views: {
            'content@': {
                templateUrl: 'view/login.html'
            }
        }
    })

    // HOME STATE ========================================
    .state('root.home', {
        url: '/',
        views: {
            'content@': {
                templateUrl: 'view/home.html'
            }
        }
    })

    // NEWS STATE =================================
    .state('root.news', {
            url: '/news',
            views: {
                'content@': {
                    templateUrl: 'view/news.html'
                }
            }

        })
        // NEWS DETAIL STATE =================================
        .state('root.news.detail', {
            url: '/detail',
            views: {
                'content@': {
                    templateUrl: 'view/news-detail.html'
                }
            }

        })
        // FLAG DETAIL STATE =================================
        .state('root.flag', {
            url: '/flag',
            views: {
                'content@': {
                    templateUrl: 'view/flag.html'
                }
            }

        })
        // SHIP DETAIL STATE =================================
        .state('root.ship', {
            url: '/ship',
            views: {
                'content@': {
                    templateUrl: 'view/ship.html'
                }
            }

        })
        // CONVENTION DETAIL STATE =================================
        .state('root.convention', {
            url: '/convention',
            views: {
                'content@': {
                    templateUrl: 'view/convention.html'
                }
            }

        });

})

/**
    Setting Angular Material's color themes
**/

.config(function ($mdThemingProvider) {
        var bvPrimary = {
            '50': '#ff3065',
            '100': '#ff1752',
            '200': '#fc0041',
            '300': '#e3003a',
            '400': '#c90034',
            '500': '#b0002d',
            '600': '#960026',
            '700': '#7d0020',
            '800': '#630019',
            '900': '#4a0013',
            'A100': '#ff4a78',
            'A200': '#ff638b',
            'A400': '#ff7d9e',
            'A700': '#30000c',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        };
        $mdThemingProvider.definePalette('bvPrimary', bvPrimary);

        var bvAccent = {
            '50': '#000000',
            '100': '#000000',
            '200': '#000000',
            '300': '#000000',
            '400': '#000000',
            '500': '#000000',
            '600': '#0d0d0d',
            '700': '#1a1a1a',
            '800': '#262626',
            '900': '#333333',
            'A100': '#0d0d0d',
            'A200': '#000000',
            'A400': '#000000',
            'A700': '#404040',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        };
        $mdThemingProvider.definePalette('bvAccent', bvAccent);


        $mdThemingProvider.theme('default')
            .primaryPalette('bvPrimary')
            .accentPalette('bvAccent')
    })
    .run(function ($state, $rootScope) {
        console.log('Yaahoo! This is fist aplication')
        $rootScope.$state = $state;
    })

.controller('SwitchDemoCtrl', function ($scope) {
        $scope.data = {
            cb1: true
        };
    })
    .controller('BasicDemoCtrl', function DemoCtrl($mdDialog) {
        var originatorEv;
        this.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }
    })
    .controller('AppCtrl', function ($scope, $localStorage) {
        if (typeof $localStorage.expendSideNavPanel === 'undefined') {
            $localStorage.expendSideNavPanel = true;
        }
        $scope.expendSideNavPanel = $localStorage.expendSideNavPanel;
        $scope.openSideNavPanel = function () {
            $localStorage.expendSideNavPanel = !$localStorage.expendSideNavPanel;
            $scope.expendSideNavPanel = $localStorage.expendSideNavPanel;
        };
    //Data for nav
    $scope.currentNavItem = 'page1';
    //Data for message
    var imagePath = 'img/60.jpeg';
    $scope.messages = [
      {
        face : imagePath,
        what: 'Brunch this Sunday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Monday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Tuesday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Wednesday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Thursday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Friday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this Saturday?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }
    ];
    
    })

.controller('newsController', ['$mdEditDialog', '$q', '$scope', '$timeout', function ($mdEditDialog, $q, $scope, $timeout) {
        'use strict';

        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        $scope.desserts = {
            "count": 10,
            "data": [
                {
                    "active": true,
                    "date": "27/7/2016",
                    "title": "	FRANCE - NAIROBI INTERNATIONAL CONVENTION ON THE REMOVAL OF WRECKS, 2007 ",
                    "summary": "Ratification by France of Nairobi Convention - delegation to BV",
                    "type": "Type1",
                    "comment": "OK"
                        },
                {
                    "active": false,
                    "date": "29/7/2016",
                    "title": "	IMO MSC 96 confirms IACS Members Class Rules meet GBS",
                    "summary": "It is IMO MSC 96 confirms IACS Members Class Rules meet GBS",
                    "type": "Type2",
                    "comment": "Can move ahead"
                        },
                {
                    "active": true,
                    "date": "15/4/2016",
                    "title": "REPUBLIC OF SRI LANKA - MERCHANT SHIPPING SECRETARIAT - CIRCULAR MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                    "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                    "type": "Type3",
                    "comment": "Varified"
                        },
                {
                    "active": true,
                    "date": "29/7/2016",
                    "title": "Bulk Carrier Safety",
                    "summary": "The Safety, Energy, Environment & Research section (Services Department - M&O Division) prepared the IMO information paper on 'Update on the safety level of bulk carriers and comparison with predictions', MSC 96/INF.6.",
                    "type": "Type2",
                    "comment": "Varified"
                        },
                {
                    "active": false,
                    "date": "28/3/2016",
                    "title": "REPUBLIC OF SRI LANKA - MERCHANT SHIPPING SECRETARIAT - CIRCULAR MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                    "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                    "type": "Type3",
                    "comment": "Varified"
                        },
                {
                    "active": true,
                    "date": "29/2/2016",
                    "title": "Republic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security Exercise",
                    "summary": "Republic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security ExerciseRepublic of Sri Lanka - Merchant Shipping Secretariat - Circular MSN 10/2016 - Annual Company Security Exercise",
                    "type": "Type2",
                    "comment": "Varified"
                        },
                {
                    "active": true,
                    "date": "3/8/2016",
                    "title": "FRANCE - NAIROBI INTERNATIONAL CONVENTION ON THE REMOVAL OF WRECKS, 2007 ",
                    "summary": "Republic of Sri Lanka Circular MSN 07/2016 - Port State Control Detention of a Sri Lankan Flagged Ships",
                    "type": "Other",
                    "comment": "Varified"
                        },
                {
                    "active": false,
                    "date": "26/7/2016",
                    "title": "Bulk 	IMO MSC 96 confirms IACS Members Class Rules meet GBS ",
                    "summary": "Test IMO MSC 96 confirms IACS Members Class Rules meet GBS,	IMO MSC 96 confirms IACS Members Class Rules meet GBS ",
                    "type": "Type2",
                    "comment": "Varified"
                        }

                    ]
        };

        $scope.editComment = function (event, dessert) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    if (input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if (input.$modelValue === 'Bernie Sanders') {
                        return dessert.comment = 'FEEL THE BERN!'
                    }
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a comment',
                validators: {
                    'md-maxlength': 30
                }
            };

            var promise;

            if ($scope.options.largeEditDialog) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.getTypes = function () {
            return ['Type1', 'Type2', 'Type3', 'Type4', 'Other'];
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
        }

        $scope.logItem = function (item) {
            console.log(item.name, 'was selected');
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };

        // for search
        var self = this;
        $scope.readonly = false;
        // Lists of Search convention, flag and ship type
        $scope.conventionNames = [];
        $scope.roConventionNames = angular.copy($scope.conventionNames);
        $scope.editableConventionNames = angular.copy($scope.conventionNames);

        $scope.flagNames = [];
        $scope.roFlagNames = angular.copy($scope.flagNames);
        $scope.editableFlagNames = angular.copy($scope.FlagNames);

        $scope.shipNames = [];
        $scope.roShipNames = angular.copy($scope.shipNames);
        $scope.editableShipNames = angular.copy($scope.shipNames);
}])
    .controller('newsDetailCtrl', function ($scope, $element) {
        $scope.conventions = ['GENERAL', 'Electricity', 'EU DIRECTIVE 2005/33/EC Sulphr content of marine fuel', 'IBC Code', 'MARPOL Annex I Oil Pollution', 'MARPOL Annex VI Air Pollution'];
        $scope.searchConvention;
        $scope.clearSearchConventionTerm = function () {
            $scope.searchConvention = '';
        };

        $scope.flags = ['Algeria', 'ALL EU FLAGS', 'ALL FLAGS', 'Bahamas', 'Dominica', 'Man Isle Of Man'];
        $scope.searchFlag;
        $scope.clearSearchFlagTerm = function () {
            $scope.searchFlag = '';
        };

        $scope.ships = ['ALL TYPES', 'Bulk Carriers', 'Cargo Ships', 'Chemical Tankers', 'Fishing Vessels', 'RO-RO Passenger Ships'];
        $scope.searchShip;
        $scope.clearSearchShipTerm = function () {
            $scope.searchShip = '';
        };


        $element.find('input').on('keydown', function (ev) {
            ev.stopPropagation();
        });
    });