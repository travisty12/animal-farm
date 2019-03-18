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
  let i = 0;
  $("#create").click(function() {
    if (farm.food >= 20 * (i + 1)) {
      farm.horseMaker(i);
      farm.food -= (i + 1) * 20;
      $("#hungerBox").append("<span id='horse" + i + "Hunger'></span> ");
      i++;
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
    for (let i = 0; i < farm.hungry.length; i++) {
      if (farm.hungry[i]) {
        console.log(farm.hungry);
        farm.removeAnimal(i);
        i--;
        $("#skull").hide();
      }
    }
  });
});
