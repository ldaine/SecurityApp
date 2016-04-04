(function () {
    angular.module('SecurityApp')
        .controller('gcdCtrl', gcdCtrl);

    function gcdCtrl ($scope) {
        var vm = this;
        vm.title = "GCD";

        vm.gcd = {
            inputNumber1: 0,
            inputNumber2: 0,
            outputNumber: 0
        };

        vm.calculateGCD = function(number1, number2){
            var output = GCD(number1, number2)
            console.log(output);

            vm.gcd.outputNumber = output;
        };

        function GCD(a, b)
        {
            var r;
            while (b > 0)
            {
                r = a % b; //this means (modulo) in both c# and javascript.

                a = b;

                b = r;
            }

            return a;
        }

    };

})()