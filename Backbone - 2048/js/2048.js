$(document).ready(function() {
	var app_2048 = {};
	var score = 0;
	var board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	
	app_2048.AppView = Backbone.View.extend({
		initialize: function() {
			this.addNewTile();
			this.addNewTile();
			this.render();
		},

		events: {
			'click .button-up': 'swipeUp',
			'click .button-left': 'swipeLeft',
			'click .button-right': 'swipeRight',
			'click .button-down': 'swipeDown'
		},

		render: function() {
			if (!this.canBeSwipedUp() && !this.canBeSwipedLeft() && !this.canBeSwipedRight() && !this.canBeSwipedDown()) {
				$('#game-over').html('Game Over!!!');
			}

			for (var i = 0; i < 4; i++) {
				for (var i2 = 0; i2 < 4; i2++) {
					var current_square = $('#position-' + i + '-' + i2);
					current_square.html(board[i][i2]);
					
					if (board[i][i2] == 0) {
						current_square.css('background-color', '#FFFFFF');
					} else if (board[i][i2] == 2) {
						current_square.css('background-color', '#FFFFE0');
					} else if (board[i][i2] == 4) {
						current_square.css('background-color', '#F0E68C');
					} else if (board[i][i2] == 8) {
						current_square.css('background-color', '#FFFF33');
					} else if (board[i][i2] == 16) {
						current_square.css('background-color', '#FFFF00');
					} else if (board[i][i2] == 32) {
						current_square.css('background-color', '#FFD700');
					} else if (board[i][i2] == 64) {
						current_square.css('background-color', '#FFA500');
					} else if (board[i][i2] == 128) {
						current_square.css('background-color', '#FF8C00');
					} else if (board[i][i2] == 256) {
						current_square.css('background-color', '#FF4500');
					} else if (board[i][i2] == 512) {
						current_square.css('background-color', '#FF0000');
					} else if (board[i][i2] == 1024) {
						current_square.css('background-color', '#DC143C');
					} else if (board[i][i2] == 2048) {
						current_square.css('background-color', '#00BFFF');
					} else if (board[i][i2] > 2048) {
						current_square.css('background-color', '#32CD32');
					}
				}
			}

			$('#score').html(score);
		},

		swipeUp: function(e) {
			e.preventDefault();

			if (!this.canBeSwipedUp()) {
				return;
			}

			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						if (board[outer][inner] != 0) {
							var outer_loop_back = outer - 1;
							var moving_tile = board[outer][inner];

							while(outer_loop_back >= 0) {
								if (board[outer_loop_back][inner] == 0) {
									board[outer_loop_back][inner] = board[outer][inner];
									board[outer][inner] = 0;
									outer--;
								} else if (board[outer_loop_back][inner] == moving_tile) {
									score += moving_tile * 2;
									board[outer_loop_back][inner] = board[outer][inner] * 2;
									board[outer][inner] = 0;
									outer--;
								} else {
									break;
								}
								outer_loop_back--;
							}
						}
					}
				}
			}

			this.addNewTile();
			this.render();
		},

		canBeSwipedUp: function() {
			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						if (board[outer][inner] != 0) {
							var outer_loop_back = outer - 1;
							var moving_tile = board[outer][inner];

							while(outer_loop_back >= 0) {
								if (board[outer_loop_back][inner] == 0) {
									return true;
								} else if (board[outer_loop_back][inner] == moving_tile) {
									return true;
								} else {
									break;
								}
								outer_loop_back--;
							}
						}
					}
				}
			}

			return false;
		},

		swipeLeft: function(e) {
			e.preventDefault();

			if (!this.canBeSwipedLeft()) {
				return;
			}

			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						var inner_loop_back = inner - 1;
						var moving_tile = board[outer][inner];

						while(inner_loop_back >= 0) {
							if (board[outer][inner_loop_back] == 0) {
								board[outer][inner_loop_back] = board[outer][inner];
								board[outer][inner] = 0;
								inner--;
							} else if (board[outer][inner_loop_back] == moving_tile) {
								score += moving_tile * 2;
								board[outer][inner_loop_back] = board[outer][inner] * 2;
								board[outer][inner] = 0;
								inner--;
							} else {
								break;
							}
							inner_loop_back--;
						}
					}
				}
			}

			this.addNewTile();
			this.render();
		},

		canBeSwipedLeft: function() {
			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						var inner_loop_back = inner - 1;
						var moving_tile = board[outer][inner];

						while(inner_loop_back >= 0) {
							if (board[outer][inner_loop_back] == 0) {
								return true;
							} else if (board[outer][inner_loop_back] == moving_tile) {
								return true;
							} else {
								break;
							}
							inner_loop_back--;
						}
					}
				}
			}

			return false;
		},

		swipeRight: function(e) {
			e.preventDefault();

			if (!this.canBeSwipedRight()) {
				return;
			}

			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 3; inner >= 0; inner--) {
					if (board[outer][inner] != 0) {
						var inner_loop_back = inner + 1;
						var moving_tile = board[outer][inner];

						while (inner_loop_back < 4) {
							if(board[outer][inner_loop_back] == 0) {
								board[outer][inner_loop_back] = board[outer][inner];
								board[outer][inner] = 0;
								inner++;
							} else if (board[outer][inner_loop_back] == moving_tile) {
								score += moving_tile * 2;
								board[outer][inner_loop_back] = board[outer][inner] * 2;
								board[outer][inner] = 0;
								inner++;
							} else {
								break;
							}

							inner_loop_back++;
						}
					}
				}
			}

			this.addNewTile();
			this.render();
		},

		canBeSwipedRight: function() {
			for (var outer = 0; outer < 4; outer++) {
				for (var inner = 3; inner >= 0; inner--) {
					if (board[outer][inner] != 0) {
						var inner_loop_back = inner + 1;
						var moving_tile = board[outer][inner];

						while (inner_loop_back < 4) {
							if(board[outer][inner_loop_back] == 0) {
								return true;
							} else if (board[outer][inner_loop_back] == moving_tile) {
								return true;
							} else {
								break;
							}

							inner_loop_back++;
						}
					}
				}
			}

			return false;
		},

		swipeDown: function(e) {
			e.preventDefault();

			if (!this.canBeSwipedDown()) {
				return;
			}


			for (var outer = 3; outer >= 0; outer--) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						if (board[outer][inner] != 0) {
							var outer_loop_back = outer + 1;
							var moving_tile = board[outer][inner];

							while(outer_loop_back < 4) {
								if (board[outer_loop_back][inner] == 0) {
									board[outer_loop_back][inner] = board[outer][inner];
									board[outer][inner] = 0;
									outer++;
								} else if (board[outer_loop_back][inner] == moving_tile) {
									score += moving_tile * 2;
									board[outer_loop_back][inner] = board[outer][inner] * 2;
									board[outer][inner] = 0;
									outer++;
								} else {
									break;
								}
								outer_loop_back++;
							}
						}
					}
				}
			}

			this.addNewTile();
			this.render();
		},

		canBeSwipedDown: function() {
			for (var outer = 3; outer >= 0; outer--) {
				for (var inner = 0; inner < 4; inner++) {
					if (board[outer][inner] != 0) {
						if (board[outer][inner] != 0) {
							var outer_loop_back = outer + 1;
							var moving_tile = board[outer][inner];

							while(outer_loop_back < 4) {
								if (board[outer_loop_back][inner] == 0) {
									return true;
								} else if (board[outer_loop_back][inner] == moving_tile) {
									return true;
								} else {
									break;
								}
								outer_loop_back++;
							}
						}
					}
				}
			}

			return false;
		},

		addNewTile: function() {
			var outer = '';
			var inner = '';
			var tile_type = Math.floor(Math.random() * 2);

			while ($.inArray(0, board[outer]) == -1) {
				outer = Math.floor(Math.random() * 4);
			}

			while(typeof(board[outer][inner]) === 'undefined' || board[outer][inner] != 0) {
				inner = Math.floor(Math.random() * 4);
			}

			if (tile_type == 0) {
				board[outer][inner] = 2;
			} else {
				board[outer][inner] = 4;
			}
		}
	});

	app_2048.AppView = new app_2048.AppView({ el: $('#buttons') });
});