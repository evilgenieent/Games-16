(function(){
  var Hanoi = window.Hanoi = window.Hanoi || {};

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers($el);
    this.render();
    this.clickTower();
  }

  View.prototype.setupTowers = function ($el) {
    for (var i = 0; i < 3; i++) {
      var $pile = $("<div class='pile'></div>");
      $pile.addClass("" + i);
      for (var j = 0; j < 3; j++) {
        var $disc = $("<div class='disc'></div>");
        $pile.append($disc);
      }
      $el.append($pile);
    }
  };

  View.prototype.render = function () {
    var towers = this.game.towers;
    towers.forEach(function (tower, towerIndex) {
      tower.forEach(function (disc, discIndex) {
        var discNum = 3 - discIndex;
        var className = "." + towerIndex + " :nth-child(" + discNum + ")"
        $(className).addClass("" + disc);
      })
    })
  }

  View.prototype.clickTower = function () {
    var that = this;
    var pileNum = -1;
    var $firstCol = null
    $(".pile").on("click", function (event) {
      if (pileNum === -1) {
        pileNum = $(event.currentTarget).attr('class').slice(5);
        $firstCol = $(event.currentTarget)
        $firstCol.toggleClass("selected");
      } else {
        var destination = $(event.currentTarget).attr('class').slice(5);
        if (!that.game.move(pileNum, destination)) {
          alert("Invalid move!");
        } else {
          that.game.move(pileNum, destination);
          discHelper(pileNum);
          pileNum = -1;
          destination = -1;
          that.render();
          if (that.game.isWon()) {
            alert("Congratulations!");
            $(".pile").off("click");
          }
        }
        $firstCol.toggleClass("selected");
      }
    })
  };

  var discHelper = function (pileNum) {
    var classNum = "." + pileNum
    var $changeClass = []

    var children = $(classNum).children()
    for (var i = 0; i < children.length; i++) {
      if ($(children[i]).attr('class').length > 4) {
        $changeClass.push($(children[i]));
      }
    }
    $changeClass[0].removeClass($changeClass[0].attr('class'));
    $changeClass[0].addClass("disc");
  }
})();
