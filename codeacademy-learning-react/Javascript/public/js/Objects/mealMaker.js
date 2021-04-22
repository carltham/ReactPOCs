const menu = {
  _courses: {
    _appetizers: [],
    _mains: [],
    _desserts: [],
    get appetizers() {},
    set appetizers(dish) {
      _appetizers.push(dish);
    },
    get mains() {},
    set mains(dish) {
      _mains.push(dish);
    },
    get desserts() {},
    set desserts(dish) {
      _desserts.push(dish);
    },
  },
  get courses() {
    return this._courses;
  },
  addDishToCourse(courseName, dishName, dishPrice) {
    const dish = { name: dishName, price: dishPrice };
    this._courses["_" + courseName + "s"].push(dish);
  },
  getRandomDishFromCourse(courseName) {
    if (
      courseName === "appetizer" ||
      courseName === "main" ||
      courseName === "dessert"
    ) {
      const dishes = this._courses["_" + courseName + "s"];
      const index = Math.floor(Math.random() * dishes.length);
      return dishes[index];
    }
  },
  generateRandomMeal() {
    const appetizer = this.getRandomDishFromCourse("appetizer");
    const main = this.getRandomDishFromCourse("main");
    const dessert = this.getRandomDishFromCourse("dessert");
    const totalPrice = appetizer.price + main.price + dessert.price;
    return {
      appetizer: appetizer,
      main: main,
      dessert: dessert,
      totalPrice: totalPrice,
    };
  },
};

menu.addDishToCourse("appetizer", "dish2", 10);
menu.addDishToCourse("appetizer", "dish3", 6);
menu.addDishToCourse("appetizer", "dish9", 9);

menu.addDishToCourse("main", "dish1", 53);
menu.addDishToCourse("main", "dish4", 34);
menu.addDishToCourse("main", "dish5", 55);

menu.addDishToCourse("dessert", "dish6", 23);
menu.addDishToCourse("dessert", "dish7", 14);
menu.addDishToCourse("dessert", "dish8", 10);

console.log(menu.getRandomDishFromCourse("main"));
console.log("");
meal = menu.generateRandomMeal();
console.log("Meal :", meal);
