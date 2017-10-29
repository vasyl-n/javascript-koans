var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var mashroom = function(x){
        return x === "mushrooms"
      }
      var productsICanEat = _(products).filter(function(x){
        return x.containsNuts === false && !_(x.ingredients).any(mashroom)
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(0, 1000)
    sum = sum.reduce(function(s, i){
        if (i % 3 === 0 || i % 5 === 0) {
            s += i;
      }
      return s
    }, 0)    /* try chaining range() and reduce() */


    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount =  _(products).chain()
                            .map(function(x){
                                return x.ingredients
                            }).flatten()
                            .reduce(function(a, x){
                              a[x] = a[x] ? a[x] + 1 : 1;
                              return a
                            }, {})
                            .value()


    /* chain() together map(), flatten() and reduce() */




    expect(ingredientCount['mushrooms']).toBe(2);
  })


  it("should find the largest prime factor of a composite number", function () {
    var largestPrime = function(num){
      for(var i = num - 1; i > 0; i--){
        if(isPrime(i) && num % i == 0){
          return i;
        }
      }
      return 1;
    }

    var isPrime = function(num){
      if(num === 1) return true;
      if(num % 2 === 0 || num % 3 === 0)return false;
      return true;
    }
    expect(largestPrime(21)).toBe(7);


  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestPalindrome = function(){
      var i = 999;
      var prods = [];
      while(i > 100){
        var j = 999;
        while(j > i){
          var prod = i * j;
          if(isPalindrome(prod)){
            prods.push(prod)
          };
          j = j - 1;
        };
        i = i - 1
      }
      return _.max(prods)
    }
    function isPalindrome(num){
      var reverse = num.toString().split('').reverse().join('');
      return num.toString() === reverse
    }

    expect(isPalindrome(12321)).toBe(true)
    expect(isPalindrome(906609)).toBe(true)
    expect(largestPalindrome()).toBe(906609)

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      function smDivisible(){
        num = 20
        while(true){
          var isDivisible = true;
          for(var i = 1; i <= 20; i++){
            if(num % i !== 0){
              isDivisible = false;
            };
          }
          if(isDivisible){
            return num;
          }
          num += 20
        }
      }
      expect(smDivisible()).toBe(232792560)
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {
    function findPrime(){
      var count = 0
      var num = 2
      while(count < 10001){
        if(isPrime(num)){
          if(count === 10000){
            return num
          }
          count += 1;
          num += 1;
          continue;
        }
        num += 1;
      }
    }

  function isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num !== 1;
  }

  expect(findPrime()).toBe(104743)
  });
});






