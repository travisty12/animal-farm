import $ from 'jquery';

export class Animal {
  constructor(name, hunger) {
    this.name = name;
    this.hunger = hunger;
  }
  setHunger() {
    setInterval(() => {
      this.hunger--;
    }, 1000);
  }
  isHungry() {
    let isHungry = false;
    if(this.hunger < 5) {
      isHungry = true;
    }
    return isHungry;
  }
  isRevolting() {
    if (this.hunger > 0) {
      return false;
    } else {
      return true;
    }
  }
  feed(amount) {
    let that = this;
    return function(food) {
      that.hunger += amount;
      return `The horse ate the ${food}! ${amount} hunger is restored.`;
    };
  }
}

export class Farm {
  constructor() {
    this.animal = [];
    this.food = 10;
    this.foodRate = 0;
    this.hungry = [];
  }
  animalFed(amount) {
    this.food -= amount;
  }
  removeSpan(nth) {
    $("span:nth-child(" + nth + ")");
  }
  addAnimal(animal) {
    this.animal.push(animal);
  }
  removeAnimal(i) {
    this.animal.splice(i, 1);
    this.food +=10;
  }
  randomEvent() {
    let randomNumber = Math.Floor(Math.random() * 100);
    if(randomNumber >= 90) {
      return true;
    } else {
      return false;
    }
  }
  findAnimal(animal) {
    let length = this.animal.length;
    for(let i = 0; i < length; i++) {
      if (this.animal[i].name == animal) {
        return this.animal[i];
      }
    }
  }
  feedAnimal(animals, food, amount) {
    let animal = this.findAnimal(animals);
    let feeder = animal.feed(amount);
    this.food -= amount;
    return (feeder(food));
  }
  horseMaker(i) {
    let horse = new Animal("Horse" + i, 10);
    this.addAnimal(horse);
    this.animal[i].setHunger();
    this.foodRate += 2;
  }

  checkHunger() {
    for (let i = 0; i < this.animal.length; i++) {
      if (this.animal[i].hunger == 0) {
        if (!this.hungry[i]) {
          this.foodRate -= 3;
          this.hungry[i] = true;
          $("#skull").show();
        }
        this.animal[i].hunger += 1;
      } else {
        if (this.hungry[i]) {
          this.foodRate += 3;
          this.hungry[i] = false;
        }
      }
    }
  }
}
