(function () {
    angular.module('SecurityApp')
        .controller('vigenereCtrl', vigenereCtrl);

    function vigenereCtrl ($scope) {
        var vm = this;
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        vm.title = "Vigenere Cipher";

        vm.encryptData = {
            input: "",
            keyword: "",
            output: "", 
            error:""
        }

        vm.decryptData = {
            input: "",
            keyword: "",
            output: "", 
            error:""
        }

        vm.encrypt = function (input, keyword) {
            
            //reset output
            var output = '';


            //workaround to display text in uppercase (not relevant to the function itself)
            vm.encryptData.input = input.toUpperCase();

            //chaning the text to Uppercase (the example array uses uppercase letters)
            input = input.toUpperCase();
            
            keyword = keyword.toUpperCase();


            if(keywordIsValid(keyword)){

                vm.encryptData.error = "";
                //default index value to find out which keyword letter to use
                var keyIndex = 0;

                //looping through text
                for (var i = 0; i < input.length; i++) {

                    //finding which shift to use
                    //i = index of the current text letter
                    //the modulus finds out which keyword index should be used. 
                    //if i = 9 and the key length is 2 (keyword = 'OK'), modulus is 1, the letter K should be used . 
                    keyIndex = parseInt(i) % parseInt(keyword.length);

                    //finding the key letter (K in the previous example)
                    var keyLetter = keyword[keyIndex];

                    //the key should be a number which is always > 0
                    //the letter 'A' has index of 0. this is the reson why an 1 should be always added. 
                    var key = alphabet.indexOf(keyLetter) + 1;
                    

                    //if the key is bigger than 26 (size of the alphabet used in array)
                    //loop to the beginning
                    if (key > 25) {
                        key = key - 26;
                    }


                    //Actual shift (same as shift cypher)
                        //finding the letter in alphabet
                        var index = alphabet.indexOf(input[i])
                        //if the input is actual letter (not space for example)
                        if (index >= 0 && key >= 0) {

                            //shift the index
                            var newIndex = index + key;

                            //if there was a shift to the beginning of alphabet
                            if (newIndex > 25) {
                                newIndex = newIndex - 26;
                            }

                            if (newIndex < 0) {
                                newIndex = newIndex + 26;
                            }

                            output += alphabet[newIndex];

                        } else {
                        //if letter index was not found, print the same letter as entered
                            output += input[i];

                        }
                }

            } else {
                output = input;
                vm.encryptData.error = "the Keyword should contain just english alphabet letters";
            }

            vm.encryptData.output = output;
        }


        vm.decrypt = function (input, keyword) {
            //reset output
            var output = '';

            //workaround to display text in uppercase (not relevant to the function itself)
            vm.decryptData.input = input.toUpperCase();

            input = input.toUpperCase();
            keyword = keyword.toUpperCase();

            if(keywordIsValid(keyword)){

                vm.decryptData.error = "";
                
                var keyIndex = 0;

                //looping through text
                for (var i = 0; i < input.length; i++) {
                    //finding which shift to use
                    keyIndex = parseInt(i) % parseInt(keyword.length);

                    //finding the key
                    var keyLetter = keyword[keyIndex];
                    var key = alphabet.indexOf(keyLetter) + 1;

                    if (key > 25) {
                        key = key - 26;
                    }

                    //reversing encryption
                    key = key * (-1);

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
                        //find the new letter
                        output += alphabet[newIndex];
                    } else {
                        //if letter index was not found, print the same letter as entered
                        output += input[i];

                    }
                }

            } else {
                output = input;
                vm.decryptData.error = "the Keyword should contain just english alphabet letters";
            }
            
            vm.decryptData.output = output;
        };  

        //helper function
        var keywordIsValid = function(keyword){
            for (var i = 0; i < keyword.length; i++) {
                //if the character cannot be found in alphabet array, return false. 
                if(alphabet.indexOf(keyword[i]) == -1){
                    return false;
                }
            }
            //if all characters were found, return true
            return true;
        } 

    };

})()



