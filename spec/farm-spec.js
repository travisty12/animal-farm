import { Animal, Farm } from './../src/farm.js';

describe("Animal", function() {

  let animal = new Animal("Pig", 40);
  beforeEach(function() {
    jasmine.clock().install();
    animal.setHunger();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it("should have hunger level 40", function() {
    expect(animal.hunger).toEqual(40);
  });
  it("Should have hunger level 37 after 3100 milliseconds", function() {
    jasmine.clock().tick(3100);
    expect(animal.hunger).toEqual(37);
  });
  it("Should determine if animals are revolting after 40001 Milliseconds", function() {
    jasmine.clock().tick(40001);
    expect(animal.isRevolting()).toBe(true);
  });
  it("Should add to animal's hunger level when they are fed, after 6001 Milliseconds", function() {
    jasmine.clock().tick(6001);
    const food = animal.feed(1);
    food("Burger");
    expect(animal.hunger).toEqual(-8);
  });
});



describe("Farm", function() {
  let farm = new Farm();
  let chicken = new Animal("Chicken", 10);
  beforeEach(function() {
    jasmine.clock().install();
    farm.addAnimal(chicken);
    chicken.setHunger();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it("Should subtract food from the farm's storage when animals are fed", function() {
    jasmine.clock().tick(6001);
    const food = chicken.feed(5);
    farm.feedAnimal(chicken, food);
    expect(animal.hunger).toEqual(9);
    expect(farm.food).toEqual(5);
  });

});
// describe("animalFed", function() {
//   let farm = new Farm();
//   beforeEach(function() {
//     jasmine.clock().install();
//     let chicken = new Animal("Chicken", 10);
//     farm.addAnimal(chicken);
//     chicken.setHunger();
//   });
//   it("Should subtract food from the farm's storage when animals are fed",function() {
//     jasmine.clock().tick(6001);
//     const food = chicken.feed(5);
//     feedAnimal(farm, chicken, food);
//     expect(animal.hunger).toEqual(9);
//     expect(farm.food).toEqual(5);
//   });
// });
