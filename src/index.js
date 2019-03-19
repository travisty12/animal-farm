import $ from 'jquery';
import './sass/styles.scss';
import { Animal, Farm } from './farm.js';


$(document).ready(function() {
  let farm = new Farm();
  $("#start").click(function() {
    $("#intro").fadeOut();
    setTimeout(function() {
      $("#game").fadeIn();
      setInterval(function() {
        farm.food += farm.foodRate;
        farm.checkHunger();
        $("#foodPile").text(farm.food);
        $("#foodRate").text(farm.foodRate);
        if (farm.animal[0]) {
          for (let i = 0; i < farm.animal.length; i++) {
            if(farm.animal[i].isHungry()) {
              $("#horse" + i + "Hunger").css("color", "red");
            } else {
              $("#horse" + i + "Hunger").css("color", "black");
            }
            $("#horseNum").text(farm.animal.length);
            $("#horse" + i + "Hunger").text(`${farm.animal[i].hunger}`);
          }
        }
      }, 1000);
    }, 400);
  });
  $("#collect").click(function() {
    farm.food++;
  });
  let z = 0;
  $("#create").click(function() {
    if (farm.food >= 1 * (z + 1)) {
      farm.horseMaker(z, 10);
      farm.food -= (z + 1) * 1;
      $("#hungerHolder").append("<span id='horse" + z + "Hunger'></span> ");
      z++;
    }
  });
  $("#feed").click(function() {
    if (farm.animal[0] && farm.food >= 5 * farm.animal.length) {
      for (let j = 0; j < farm.animal.length; j++) {
        $(".output").text(farm.feedAnimal("Horse" + j, "carrot", 5));
        // $(".horseCollect").text(farm.collectFood("Horse" + j, "carrote", 10))
      }
      $(".output").append(`You used ${5*farm.animal.length} food to feed your horses</p>`);
    }
  });
  $("#skull").click(function() {
    for (let j = farm.animal.length - 1; j >= 0; j--) {
      if (farm.hungry[j]) {
        farm.removeAnimal(j);
        z--;
        $("#skull").hide();
      }
    }
    $("#hungerHolder").html("");
    let newHunger = [];
    for (let y = farm.animal.length - 1; y >= 0; y--) {
      let hunger = farm.animal[y].hunger;
      newHunger[y] = hunger;
      console.log(hunger);
    }
    for (let x = farm.animal.length - 1; x >= 0; x--) {
      $("#hungerHolder").append("<span id='horse" + x + "Hunger'></span> ");

      farm.removeAnimal(farm.animal[x]);
      farm.foodRate = 0;

    }
    for(var a  = 0; a < newHunger.length; a++) {
      farm.horseMaker(a, newHunger[a]);
      var b;
      farm.hungry[a] = b;
    }
  });
});
