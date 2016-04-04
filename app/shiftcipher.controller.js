(function () {
    angular.module('SecurityApp')
        .controller('shiftCipherCtrl', shiftCipherCtrl);

    function shiftCipherCtrl ($scope) {
        var vm = this;
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        
        vm.title = "Shift Cipher";

        vm.encryptData = {
            input: "",
            key: 0,
            output: ""
        }

        vm.decryptData = {
            input: "",
            key: 0,
            output: ""
        }

        vm.encrypt = function (input, key) {

            var output = '';

            //checking validity of the key
            if(!(isNaN(key) || key === undefined)){
                //checking if the key is not out of range of the alphabet size
                if(Math.abs(key) > 25){
                    key = key % 26;
                }
            } else {
                //setting default value
                key = 0;
            }
            

            //workaround to display text in uppercase (not relevant to the function itself)
            vm.encryptData.input = input.toUpperCase();
            
            //chaning the text to Uppercase (the example array uses uppercase letters)
            input = input.toUpperCase();
            
            console.log('input ' + input);

            //looping through text
            for (var i = 0; i < input.length; i++) {

                //finding the letter index in alphabet
                var index = alphabet.indexOf(input[i])

                //if index is found, which also makes sure the input is actual letter (not space for example)
                if (index >= 0) {

                    //shift the index 
                    var newIndex = index + key;

                    //if there was a shift to the beginning of alphabet
                    //correct the index
                    if (newIndex > 25) {
                        newIndex = newIndex - 26;
                    }

                    if (newIndex < 0) {
                        newIndex = newIndex + 26;
                    }

                    //add the newly found letter to the output string
                    output += alphabet[newIndex];

                } else {
                    //if letter index was not found, print the same letter as entered
                    //this indicates that the input was not a character (defined in the array)
                    output += input[i];
                }
            }

            //bind the output string to scope
            vm.encryptData.output = output;
        }


        vm.decrypt = function (input, key) {
            
            //reset output
            var output = '';

            //checking validity of the key
            if(!(isNaN(key) || key === undefined)){
                //checking if the key is not out of range of the alphabet size
                if(Math.abs(key) > 25){
                    key = key % 26;
                }
            } else {
                //setting default value
                key = 0;
            }
            
            //workaround to display text in uppercase (not relevant to the function itself)
            vm.input = input.toUpperCase();

            //chaning the text to Uppercase (the example array uses uppercase letters)
            input = input.toUpperCase();

            //getting the opposite value of the key, to reverse the shift
            key = key * (-1);

            //looping through text
            for (var i = 0; i < input.length; i++) {
                //finding the letter in alphabet
                var index = alphabet.indexOf(input[i]);

                //if it was found
                if (index >= 0) {
                    //shift the index
                    var newIndex = index + key;
                    //if there was a shift to the beginning of alphabet
                    if (newIndex > 25) {
                        newIndex = newIndex - 26;
                    }
                    if (newIndex < 0) {
                        newIndex = newIndex + 26;
                    }

                    //add the newly found letter to the output string
                    output += alphabet[newIndex];
                } else {

                    //if letter index was not found, print the same letter as entered
                    //this indicates that the input was not a character (defined in the array)
                    output += input[i];
                }
            }

            //bind the output string to scope
            vm.decryptData.output = output;
        }
    };

})()