(function () {
    angular.module('SecurityApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl ($scope) {
        var vm = this;
        vm.title = "MAin";
    }

})()