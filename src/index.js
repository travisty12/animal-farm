import $ from 'jquery';
import './sass/styles.scss';
import { Animal, Farm } from './farm.js';


$(document).ready(function() {
  let farm = new Farm();
  $("#start").click(function() {
    $("#intro").fadeOut();
    setTimeout(function() {
      $("#game").fadeIn();
      let starving = false;
      setInterval(function() {
        farm.food += farm.foodRate;
        farm.truffles += farm.trufflesRate;
        farm.eggs += farm.eggsRate;
        farm.wool += farm.woolRate;
        farm.checkHunger();
        starving = farm.checkFood(starving);
        $("#foodPile").text(farm.food);
        $("#foodRate").text(farm.foodRate);
        $("#truffles").text(farm.truffles);
        $("#trufflesRate").text(farm.trufflesRate);
        $("#eggs").text(farm.eggs);
        $("#eggsRate").text(farm.eggsRate);
        $("#wool").text(farm.wool);
        $("#woolRate").text(farm.woolRate);

        if (farm.horses[0]) {
          for (let i = 0; i < farm.horses.length; i++) {
            if(farm.horses[i].isHungry()) {
              $("#horse" + i + "Hunger").css("color", "red");
            } else {
              $("#horse" + i + "Hunger").css("color", "black");
            }
            $("#horse" + i + "Hunger").text(`${farm.horses[i].hunger}`);
          }
          $("#horseNum").text(farm.horses.length);
        }
        $("#pigNum").text(farm.pigs.length);
        $("#chickenNum").text(farm.chickens.length);
        $("#sheepsNum").text(farm.sheeps.length);
      }, 1000);
    }, 400);
  });
  $("#collect").click(function() {
    farm.food++;
  });
  let z = 0;
  $("#create").click(function() {
    if (farm.food >= (20 + (20 * z))) {
      farm.horseMaker(z, 50);
      farm.food -= (20 + (20 * z));
      $("#hungerHolder").append("<span id='horse" + z + "Hunger'></span> ");
      z++;
    }
  });
  let w = 0;
  $("#newPig").click(function() {
    if (farm.food >= 1 * (w + 1)) {
      farm.pigMaker(w, 10);
      farm.food -= (w + 1) * 1;
      w++;
    }
  });
  let c = 0;
  $("#newChicken").click(function() {
    if (farm.food >= 1 * (c + 1)) {
      farm.chickenMaker(c, 10);
      farm.food -= (c + 1) * 1;
      c++;
    }
  });
  let d = 0;
  $("#newSheeps").click(function() {
    if (farm.food >= 1 * (d + 1)) {
      farm.sheepMaker(d, 10);
      farm.food -= (d + 1) * 1;
      d++;
    }
  });
  $("#feed").click(function() {
    if (farm.horses[0] && farm.food >= 5 * farm.horses.length) {
      for (let j = 0; j < farm.horses.length; j++) {
        $(".output").text(farm.feedAnimal("Horse" + j, "carrot", 5));
        // $(".horseCollect").text(farm.collectFood("Horse" + j, "carrote", 10))
      }
      $(".output").append(`You used ${5*farm.horses.length} food to feed your horses</p>`);
    }
  });
  $("#skull").click(function() {
    for (let j = farm.horses.length - 1; j >= 0; j--) {
      if (farm.hungry[j]) {
        farm.removeAnimal(j);
        z--;
        $("#skull").hide();
      }
    }
    $("#hungerHolder").html("");
    let newHunger = [];
    for (let y = farm.horses.length - 1; y >= 0; y--) {
      let hunger = farm.horses[y].hunger;
      newHunger[y] = hunger;
    }
    for (let x = farm.horses.length - 1; x >= 0; x--) {
      $("#hungerHolder").append("<span id='horse" + x + "Hunger'></span> ");

      farm.removeAnimal(farm.horses[x]);
      farm.foodRate = 0;

    }
    for(var a  = 0; a < newHunger.length; a++) {
      farm.horseMaker(a, newHunger[a]);
      var b;
      farm.hungry[a] = b;
    }
  });
});
