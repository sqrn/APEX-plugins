class PasswordGenerator {
    constructor(pJson) {
        this.characters = "";
        this.lowerLetters = "abcdefghijklmnopqrstuvwxyz";
        this.upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.numbers = "1234567890";
        this.special = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";
        this.passwordParameters = {};
        this.setPasswordParams(pJson);
        this.activeParams();
    }
    // functions
    setPasswordParams(pJson)
    {
        this.passwordParameters = {
            "lower": pJson.lower,
            "upper": pJson.upper,
            "numbers": pJson.numbers,
            "special": pJson.special,
            "animate": pJson.animate,
            "length": pJson.length
        };
    }
    ;
    activeParams()
    {
        var defaultCharset = this.lowerLetters + this.upperLetters;
        this.passwordParameters.lower   == "Y" ? this.characters += this.lowerLetters : defaultCharset;
        this.passwordParameters.upper   == "Y" ? this.characters += this.upperLetters : defaultCharset;
        this.passwordParameters.numbers == "Y" ? this.characters += this.numbers : defaultCharset;
        this.passwordParameters.special == "Y" ? this.characters += this.special : defaultCharset;
    }
    ;
    checkPattern(pPassword) 
    {
        var pattern = "";

        this.passwordParameters.lower   == "Y" ? pattern += ".*[a-z]" : ".*[a-z]";
        this.passwordParameters.upper   == "Y" ? pattern += ".*[A-Z]" : ".*[a-z]";
        this.passwordParameters.numbers == "Y" ? pattern += ".*[0-9]" : ".*[a-z]";
        this.passwordParameters.special == "Y" ? pattern += "" : ".*[a-z]";

        var re = new RegExp(pattern);
        // console.log("pattern: " + pattern);
        // console.log( re.test(pPassword) );

        if (re.test(pPassword) == true ) {
            return true;
        } else {
            return false;
        }
    }
    ;

    // static functions
    static passwordGenerator(pObject,pItem) {
        // console.log(pObject.passwordParameters);
        var randomPassword = "";

        // console.log("characters: " + pObject.characters)
        $.each(pItem.affectedElements, function(key,item) {
            for (var i = 0; i < pObject.passwordParameters.length; i++ ) {
                randomPassword += pObject.characters.charAt(Math.floor(Math.floor(Math.random()*pObject.characters.length)));
            }
            // console.log('Password generated: ' + randomPassword);
            if (pObject.checkPattern(randomPassword)) {
                item.value = randomPassword;
            } else {
                PasswordGenerator.passwordGenerator(pObject,pItem);
            }
            
        });            
    }
    ;
};









