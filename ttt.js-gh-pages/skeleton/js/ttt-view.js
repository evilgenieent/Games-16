(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    // only select current cell
    // then call makeMove on that cell
    var that = this;
    $(".cell").on("click", function(event) {
      var $currentCell = $(event.currentTarget);
      that.makeMove($currentCell);
    })
  };

  View.prototype.makeMove = function ($cell) {
    // callback should set class to clicked (white bg + show current Player's symbol)
    if ($cell.hasClass("clicked")) {
      alert("Invalid move")
    } else {
      $cell.addClass("clicked");
      var cellId = $cell.data("id");
      var currentPlayer = this.game.currentPlayer;
      $cell.text(currentPlayer);
      $cell.addClass(currentPlayer);
      this.game.playMove(cellId);
      if (this.game.isOver() && this.game.winner() !== null) {
        alert("Player " + currentPlayer + " has won");
        $(".cell").addClass("clicked")
        $(".cell").off("click");
      } else if (this.game.isOver()) {
        alert("Tie!");
        $(".cell").off("click");
      }
    }
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < 3; i++) {
      var row = $("<div class='row'></div>");
      for (var j = 0; j < 3; j++) {
        var cell = $("<div class='cell'></div>");
        cell.data("id", [i, j]);
        row.append(cell);
      }

      this.$el.append(row);
    }


  };
})();
