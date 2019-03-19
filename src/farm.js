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
    if(this.hunger <= 5) {
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
  feed(amount, animal) {
    let that = this;
    return function(food) {
      that.hunger += amount;
      return `The ${animal} ate the ${food}! ${amount} hunger is restored.`;
    };
  }
}

export class Farm {
  constructor() {
    this.horses = [];
    this.pigs = [];
    this.chickens = [];
    this.sheeps = [];
    this.food = 10;
    this.foodRate = 0;
    this.hungry = [];
    this.hungryChicken = [];
    this.hungrySheep = 0;
    this.truffles = 0;
    this.trufflesRate = 0;
    this.eggs = 0;
    this.eggsRate = 0;
    this.woolRate = 0;
    this.wool = 0;
  }
  animalFed(amount) {
    this.food -= amount;
  }
  addAnimal(animal) {
    this.horses.push(animal);
  }
  addPig(animal) {
    this.pigs.push(animal);
  }
  addChicken(animal) {
    this.chickens.push(animal);
  }
  addSheep(animal) {
    this.sheeps.push(animal);
  }
  removeAnimal(i) {
    this.horses.splice(i, 1);
    this.hungry.splice(i, 1);
    this.food +=10;
    this.foodRate += 1;
  }
  removePig() {
    this.pigs.splice(0, 1);
    this.food +=10;
    this.foodRate += 3;
  }
  removeChicken() {
    this.chickens.splice(0, 1);
    this.food +=10;
    this.foodRate += 1;

  }
  removeSheep() {
    this.sheeps.splice(0, 1);
    this.food +=10;
    this.foodRate += 2;

  }

  randomEvent() {
    let randomNumber = Math.Floor(Math.random() * 100);
    if(randomNumber >= 90) {
      return true;
    } else {
      return false;
    }
  }

  findHorse(animal) {
    let length = this.horses.length;
    for(let i = 0; i < length; i++) {
      if (this.horses[i].name == animal) {
        return this.horses[i];
      }
    }
  }
  findPig(animal) {
    let length = this.pigs.length;
    for(let i = 0; i < length; i++) {
      if (this.pigs[i].name == animal) {
        return this.pigs[i];
      }
    }
  }
  findChicken(animal) {
    let length = this.chickens.length;
    for(let i = 0; i < length; i++) {
      if (this.chickens[i].name == animal) {
        return this.chickens[i];
      }
    }
  }

  findSheep(animal) {
    let length = this.sheeps.length;
    for(let i = 0; i < length; i++) {
      if (this.sheeps[i].name == animal) {
        return this.sheeps[i];
      }
    }
  }
  feedAnimal(animals, food, amount) {
    let animal = this.findHorse(animals);
    let feeder = animal.feed(amount, "Horse");
    this.food -= amount;
    return (feeder(food));
  }

  feedPig(animals, food, amount) {
    let animal = this.findPig(animals);
    let feeder = animal.feed(amount, "Pig");
    this.food -= amount;
    return (feeder(food));
  }
  feedChicken(animals, food, amount) {
    let animal = this.findChicken(animals);
    let feeder = animal.feed(amount, "Chicken");
    this.food -= amount;
    return (feeder(food));
  }

  feedSheep(animals, food, amount) {
    let animal = this.findSheep(animals);
    let feeder = animal.feed(amount, "Sheep");
    this.food -= amount;
    return (feeder(food));
  }


  horseMaker(i, hunger) {
    let horse = new Animal("Horse" + i, hunger);
    this.addAnimal(horse);
    this.horses[i].setHunger();
    this.foodRate += 2;
  }

  pigMaker(i, hunger) {
    let pig = new Animal("Pig" + i, hunger);
    this.addPig(pig);
    this.foodRate -= 3;
    this.trufflesRate += 1;
  }
  chickenMaker(i, hunger) {
    let chicken = new Animal("Chicken" + i, hunger);
    this.addChicken(chicken);
    this.foodRate -= 1;
    this.eggsRate += 1;
  }

  sheepMaker(i, hunger) {
    let sheep = new Animal("Sheep" + i, hunger);
    this.addSheep(sheep);
    this.foodRate -= 2;
    this.woolRate += 1;
  }

  checkFood(starving) {
    if (this.food <= 0) {
      this.food = 0;
      if (!starving) {
        console.log(starving);
        if (this.pigs[0]) {
          if (this.chickens[0]) {
            this.eggsRate *= -2;
          }
          if (this.sheeps[0]) {
            this.woolRate *= -2;
          }
          if (!(this.sheeps[0] || this.chickens[0])) {
            this.trufflesRate *= -1;
          }
        } else {
          if (this.chickens[0]) {
            this.eggsRate *= -1;
          }
          if (this.sheeps[0]) {
            this.woolRate *= -1;
          }
        }

        starving = true;
      }
      if (this.eggs <= 0) {
        if (this.chickens[0]) {
          this.removeChicken();
          this.eggsRate = 0;

        }
      }
      if (this.wool <= 0) {
        if (this.sheeps[0]) {
          this.removeSheep();
          this.woolRate = 0;

        }
      }
      if (!(this.chickens[0] || this.sheeps[0]) && this.pigs[0] && this.truffles <= 0) {
        this.removePig();
        this.trufflesRate = 0;
      }
    } else {
      if (starving) {
        if (this.pigs[0]) {
          if (this.chickens[0]) {
            this.eggsRate /= -2;
          }
          if (this.sheeps[0]) {
            this.woolRate /= -2;
          }
        } else {
          if (this.chickens[0]) {
            this.eggsRate *= -1;
          }
          if (this.sheeps[0]) {
            this.woolRate *= -1;
          }
        }
        starving = false;
      }
    }
    return starving;
  }

  checkHunger() {
    let anyHungry;
    for (let i = 0; i < this.horses.length; i++) {
      if (this.horses[i].hunger == 0) {
        anyHungry = true;
        if (!this.hungry[i]) {
          // console.log(this.hungry)
          this.foodRate -= 3;
          this.hungry[i] = true;
          $("#skull").show();

        }
        this.horses[i].hunger += 1;
      } else {
        if (this.hungry[i]) {
          this.foodRate += 3;
          this.hungry[i] = false;

        }
      }
    }
    if(anyHungry != true) {
      $("#skull").hide();
    }
  }
}
