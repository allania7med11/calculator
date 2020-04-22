
const stati = {
    data:() => ({
        mode: "standard",
        standard :[
            ["(",")","arrow-left","arrow-right"],
            ["7", "8", "9","backspace","AC"],
            ["4", "5", "6", "*", "/"],
            ["1", "2", "3", "+", "-"],
            ["0", ".", "pi","="]
        ],
        scientific:[
            ["e", "ln", "log", "!", "^", "Mod"],
            ["sin", "cos", "tan", "sinh", "cosh", "tanh"],
            ["asin", "acos", "atan", "asinh", "acosh", "atanh"]
        ]
      
    }),
    computed: {
        full() {
            if ( this.mode== "standard"){
                return this.standard
            } else if(this.mode== "scientific"){
               return [...this.scientific,...this.standard]
            }
        }
    }
  }
  export { stati }