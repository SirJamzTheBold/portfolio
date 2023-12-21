$(document).ready(function() {
	var app_suduko = {};
	app_suduko.AppView = Backbone.View.extend({
		el: $('#suduko-container'),

		events: {
			'click #solve-puzzle': 'solvePuzzle',
			'click #clear-puzzle': 'clearPuzzle'
		},

		squares: [
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],

			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],

			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
		],

		squares_revert: [
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],

			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],

			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
		],

		row_certainties: [
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]]
		],

		col_certainties: [
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]],
			[[],[],[]]
		],

		use_certainties: false,

		old_squares: JSON.stringify(this.squares),

		/**
		 * Utility Function
		 * Checks to see if item is in a given array.
		 *
		 * @var needle The item you're looking for.
		 * @var haystack The array you're looking in.
		 */
		inArray: function(needle, haystack) {
			if (Array.isArray(haystack)) {
				return haystack.indexOf(needle);
			} else if (haystack == needle) {
				return 1;
			} else {
				return -1;
			}
		},

		/**
		 * Clears the puzzle's inputs.
		 *
		 * @see squares
		 * @see squares_revert
		 */
		clearPuzzle: function() {
			$('.square input').each(function() {
				$(this).val('');
			});

			this.squares = this.squares_revert;
		},

		/**
		 * Solves whatever puzzle is entered into the suduko box.
		 *
		 * @see loadSquares()
		 * @see analyzeSpace()
		 * @see analyzeSquare()
		 * @see squares
		 * @see old_squares
		 * @see use_certainties
		 */
		solvePuzzle: function() {
			this.loadSquares();

			var keep_going = true;

			while (keep_going) {
				//Loop through the grid, analyze every space.
				for (var i = 0; i < 9; i++) {
					for (var i2 = 0; i2 < 9; i2++) {
						this.analyzeSpace(i, i2);
					}
				}

				this.loadSquares();

				//If nothing can be updated above build and test the row/col certainties.
				if (JSON.stringify(this.squares) == this.old_squares) {
					for (var i = 0; i < 9; i++) {
						this.analyzeSquare(i);
					}
					this.use_certainties = true;

					for (var i = 0; i < 9; i++) {
						for (var i2 = 0; i2 < 9; i2++) {
							this.analyzeSpace(i, i2);
						}
					}
				}

				this.loadSquares();

				//If nothing can be updated above, stop to prevent an infinte loop.
				if (JSON.stringify(this.squares) == this.old_squares) {
					keep_going = false;
				}

				//Set current squares as old_squares
				this.old_squares = JSON.stringify(this.squares);
			}
		},

		/**
		 * Loads all the squares values into an array.
		 *
		 * @see squares
		 */
		loadSquares: function() {
			var outer_count = 0,
				inner_count = 0,
				squares_temp = this.squares;

			$('.square input').each(function() {
				if (this.value) {
					squares_temp[outer_count][inner_count] = parseInt(this.value);
				}

				inner_count++;

				if (inner_count >= 9) {
					inner_count = 0;
					outer_count++;
				}

				this.squares = squares_temp;
			});
		},

		/*
		 * Reads the specified row and returns an array of all the spaces within.
		 *
		 * @var row The row you are reading (0-8).
		 * @see squares
		 */
		readRow: function(row) {
			var outer_count = 0,
				inner_count = 0,
				temp_array = [],
				return_array = [];

			if (row < 3) {
				outer_count = 0;
			} else if (row >= 3 && row < 6) {
				outer_count = 3;
			} else {
				outer_count = 6;
			}

			if (row % 3 == 0) {
				inner_count = 0;
			} else if (row % 3 == 1) {
				inner_count = 3;
			} else if (row % 3 == 2) {
				inner_count = 6;
			}

			temp_array = [
				this.squares[outer_count][inner_count],
				this.squares[outer_count][inner_count + 1],
				this.squares[outer_count][inner_count + 2],
				this.squares[outer_count + 1][inner_count],
				this.squares[outer_count + 1][inner_count + 1],
				this.squares[outer_count + 1][inner_count + 2],
				this.squares[outer_count + 2][inner_count],
				this.squares[outer_count + 2][inner_count + 1],
				this.squares[outer_count + 2][inner_count + 2]
			];

			for (var i = 0; i < temp_array.length; i++) {
				if (temp_array[i] != 0) {
					return_array.push(temp_array[i]);
				}
			}

			return return_array;
		},

		/*
		 * Reads the specified col and returns an array of all the spaces within.
		 *
		 * @var col The col you are reading (0-8).
		 * @see squares
		 */
		readCol: function(col) {
			var outer_count = 0,
				inner_count = 0,
				temp_array = [],
				return_array = [];

			if (col < 3) {
				outer_count = 0;
			} else if (col >= 3 && col < 6) {
				outer_count = 1;
			} else {
				outer_count = 2;
			}

			inner_count = col;

			if (col < 3) {
				inner_count = col;
			} else if (col < 6) {
				inner_count = col - 3;
			} else {
				inner_count = col - 6;
			}

			temp_array = [
				this.squares[outer_count][inner_count],
				this.squares[outer_count][inner_count + 3],
				this.squares[outer_count][inner_count + 6],
				this.squares[outer_count + 3][inner_count],
				this.squares[outer_count + 3][inner_count + 3],
				this.squares[outer_count + 3][inner_count + 6],
				this.squares[outer_count + 6][inner_count],
				this.squares[outer_count + 6][inner_count + 3],
				this.squares[outer_count + 6][inner_count + 6]
			];

			for (var i = 0; i < temp_array.length; i++) {
				if (temp_array[i] != 0) {
					return_array.push(temp_array[i]);
				}
			}

			return return_array;
		},

		/*
		 * Reads a specified Square and returns all the spaces contained within.
		 *
		 * @var square The square you are reading (0-8)
		 * @see square
		 */
		readSquare: function(square) {
			var temp_array = [];
			var return_array = [];

			for (var i = 0; i < 9; i++) {
				temp_array.push(this.squares[square][i]);
			}

			for (var i = 0; i < temp_array.length; i++) {
				if (temp_array[i] != 0) {
					return_array.push(temp_array[i]);
				}
			}

			return return_array;
		},

		/*
		 * Removes a possibility from the list.
		 *
		 * @var possible The array of possibilities
		 * @var test_value The value you're removing
		 */
		removePossibility: function(possible, test_value) {
			var position = possible.indexOf(test_value);
			if (position != -1) {
				possible.splice(position, 1);
			}

			return possible
		},

		/*
		 * Analyzes a given square and updates the col/row certainties.
		 * 
		 * @var square The square being analyzed (0-8)
		 * @see row_certainties
		 * @see inArray()
		 * @see readSquare()
		 *
		 */
		analyzeSquare: function(square) {
			//Reset current col/row certainties.
			this.row_certainties[square] = [[],[],[]];
			this.col_certainties[square] = [[],[],[]];

			//Get the current square values.
			var square_values = this.readSquare(square);

			if (square_values.length == 9) {
				for (var i = 0; i < 9; i++) {
					//If this number is already solved, don't bother.
					if (i == square_values[0] || i == square_values[1] || i == square_values[2] ||
						i == square_values[3] || i == square_values[4] || i == square_values[5] ||
						i == square_values[6] || i == square_values[7] || i == square_values[8]) {
						continue;
					}

					if ((this.inArray(i, square_values[0]) != -1 
						|| this.inArray(i, square_values[1]) != -1 
						|| this.inArray(i, square_values[2]) != -1)
						&& this.inArray(i, square_values[3]) == -1
						&& this.inArray(i, square_values[4]) == -1
						&& this.inArray(i, square_values[5]) == -1
						&& this.inArray(i, square_values[6]) == -1
						&& this.inArray(i, square_values[7]) == -1
						&& this.inArray(i, square_values[8]) == -1) {

						if (this.inArray(i, this.row_certainties[square][0]) == -1) {
							this.row_certainties[square][0].push(i);
						}
					}

					if ((this.inArray(i, square_values[3]) != -1 
						|| this.inArray(i, square_values[4]) != -1 
						|| this.inArray(i, square_values[5]) != -1)
						&& this.inArray(i, square_values[0]) == -1
						&& this.inArray(i, square_values[1]) == -1
						&& this.inArray(i, square_values[2]) == -1
						&& this.inArray(i, square_values[6]) == -1
						&& this.inArray(i, square_values[7]) == -1
						&& this.inArray(i, square_values[8]) == -1) {

						if (this.inArray(i, this.row_certainties[square][1]) == -1) {
							this.row_certainties[square][1].push(i);
						}
					}

					if ((this.inArray(i, square_values[6]) != -1 
						|| this.inArray(i, square_values[7]) != -1 
						|| this.inArray(i, square_values[8]) != -1)
						&& this.inArray(i, square_values[0]) == -1
						&& this.inArray(i, square_values[1]) == -1
						&& this.inArray(i, square_values[2]) == -1
						&& this.inArray(i, square_values[3]) == -1
						&& this.inArray(i, square_values[4]) == -1
						&& this.inArray(i, square_values[5]) == -1) {

						if (this.inArray(i, this.row_certainties[square][2]) == -1) {
							this.row_certainties[square][2].push(i);
						}
					}

					if ((this.inArray(i, square_values[0]) != -1 
						|| this.inArray(i, square_values[3]) != -1 
						|| this.inArray(i, square_values[6]) != -1)
						&& this.inArray(i, square_values[1]) == -1
						&& this.inArray(i, square_values[4]) == -1
						&& this.inArray(i, square_values[7]) == -1
						&& this.inArray(i, square_values[2]) == -1
						&& this.inArray(i, square_values[5]) == -1
						&& this.inArray(i, square_values[8]) == -1) {

						if (this.inArray(i, this.col_certainties[square][0]) == -1) {
							this.col_certainties[square][0].push(i);
						}
					}

					if ((this.inArray(i, square_values[1]) != -1 
						|| this.inArray(i, square_values[4]) != -1 
						|| this.inArray(i, square_values[7]) != -1)
						&& this.inArray(i, square_values[0]) == -1
						&& this.inArray(i, square_values[3]) == -1
						&& this.inArray(i, square_values[6]) == -1
						&& this.inArray(i, square_values[2]) == -1
						&& this.inArray(i, square_values[5]) == -1
						&& this.inArray(i, square_values[8]) == -1) {

						if (this.inArray(i, this.col_certainties[square][1]) == -1) {
							this.col_certainties[square][1].push(i);
						}
					}

					if ((this.inArray(i, square_values[2]) != -1 
						|| this.inArray(i, square_values[5]) != -1 
						|| this.inArray(i, square_values[8]) != -1)
						&& this.inArray(i, square_values[0]) == -1
						&& this.inArray(i, square_values[3]) == -1
						&& this.inArray(i, square_values[6]) == -1
						&& this.inArray(i, square_values[1]) == -1
						&& this.inArray(i, square_values[4]) == -1
						&& this.inArray(i, square_values[7]) == -1) {

						if (this.inArray(i, this.col_certainties[square][2]) == -1) {
							this.col_certainties[square][2].push(i);
						}
					}
				}
			}
		},

		/**
		 * Anayzes a certain space based on it's row/col/square. Remove possibilities based on that.
		 *
		 * @var category_values The other values in the row/col/square.
		 * @var current_position The space's position in the row/col/square.
		 * @var square The space's position (0-8)
		 * @var space The square's position (0-8)
		 * @var possible All the possible values of the space.
		 * @see squares
		 * @see removePossibility()
		 */
		analyzeSpaceByCategory: function(category_values, current_position, square, space, possible) {
			var unused_values = [1,2,3,4,5,6,7,8,9],
				unqiue_values = [],
				duplicates = {};

			for (var i = 0; i < category_values.length; i++) {
				if (i == current_position) {
					continue;
				}

				//Remove values that have been used from the unused values array.
				if (category_values.length == 9) {
					if (typeof category_values[i].length === 'undefined') {
						unused_values = this.removePossibility(unused_values, category_values[i]);
					} else {
						for (var i2 = 0; i2 < category_values[i].length; i2++) {
							unused_values = this.removePossibility(unused_values, category_values[i][i2]);
						}
					}
				}

				//Keep track of the duplicates.
				if (category_values[i].length > 1) {
					var duplicate_value = category_values[i].toString();

					if (unqiue_values.indexOf(duplicate_value) == -1) {
						unqiue_values.push(duplicate_value);
					} else if (!(duplicate_value in duplicates)) {
						duplicates[duplicate_value] = {
							value_array: category_values[i],
							occurances: 2, 
							value_length: category_values[i].length
						}
					} else {
						duplicates[duplicate_value].value_length = duplicates[duplicate_value].value_length + 1;
					}
				}

				possible = this.removePossibility(possible, category_values[i]);

				//Remove duplicates from the possibilities.
				for (var key in duplicates) {
					if (duplicates[key].occurances >= duplicates[key].value_length) {
						for (var i2 = 0; i2 < duplicates[key].value_length; i2++) {
							possible = this.removePossibility(possible, duplicates[key].value_array[i2]);
						}
					}
				}
			}

			//If there is a single unused number in the space set it to that. 
			if (category_values.length == 9) {
				if (unused_values.length == 1) {
					possible = unused_values;
					this.squares[square][space] = unused_values[0];
					$('#square' + square + 'space' + space).val(unused_values[0]);
				}
			}
		},

		/**
		 * Analyzes a single space on the grid.
		 *
		 * @var square The square being checked (0-8)
		 * @var space The space being checked (0-8)
		 * @see analyzeSpaceByCategory()
		 * @see readSquare()
		 * @see readRow()
		 * @see readCol()
		 * @see removePossibility()
		 * @see squares
		 * @see use_certainties
		 * @see row_certainties
		 * @see col_certainties
		 */
		analyzeSpace: function(square, space) {
			var current_space = this.squares[square][space],
				current_row_position = 0,
				current_col_position = 0,
				current_square_position = space,
				possible = [],
				row = 0,
				col = 0;

			if (!Array.isArray(current_space)) {
				possible = [1,2,3,4,5,6,7,8,9];
			} else {
				possible = current_space;
			}

			//Get the current position, so we don't compare the current square against itself by mistake.
			if (square % 3 == 0) {
				if (space % 3 == 0) {
					current_row_position = 0;
				} else if (space % 3 == 1) {
					current_row_position = 1;
				} else {
					current_row_position = 2;
				}
			} else if (square % 3 == 1) {
				if (space % 3 == 0) {
					current_row_position = 3;
				} else if (space % 3 == 1) {
					current_row_position = 4;
				} else {
					current_row_position = 5;
				}
			} else {
				if (space % 3 == 0) {
					current_row_position = 6;
				} else if (space % 3 == 1) {
					current_row_position = 7;
				} else {
					current_row_position = 8;
				}
			}

			if (square < 3) {
				if (space < 3) {
					current_col_position = 0;
				} else if (space >= 3 && space < 6) {
					current_col_position = 1;
				} else {
					current_col_position = 2;
				}
			} else if (square >= 3 && square < 6) {
				if (space < 3) {
					current_col_position = 3;
				} else if (space >= 3 && space < 6) {
					current_col_position = 4;
				} else {
					current_col_position = 5;
				}
			} else {
				if (space < 3) {
					current_col_position = 6;
				} else if (space >= 3 && space < 6) {
					current_col_position = 7;
				} else {
					current_col_position = 8;
				}
			}

			if (current_space == 0 || Array.isArray(current_space)) {
				//Load in Square values, remove values already represented in the Square from the list of possibilities.
				this.analyzeSpaceByCategory(this.readSquare(square), current_square_position, square, space, possible);

				//Figure out which row to load, based on the current space.
				if (square < 3) {
					row += 0;
				} else if (square >= 3 && square < 6) {
					row += 3;
				} else {
					row += 6;
				}

				if (space < 3) {
					row += 0;
				} else if (space >= 3 && space < 6) {
					row += 1;
				} else {
					row += 2;
				}

				this.analyzeSpaceByCategory(this.readRow(row), current_row_position, square, space, possible);

				if (square % 3 == 0) {
					col += 0;
				} else if (square % 3 == 1) {
					col += 3;
				} else {
					col += 6;
				}

				if (space % 3 == 0) {
					col += 0;
				} else if (space % 3 == 1) {
					col += 1;
				} else {
					col += 2;
				}

				this.analyzeSpaceByCategory(this.readCol(col), current_col_position, square, space, possible);

				//Factor in the col and row certainties.
				if (this.use_certainties) {
					for (var i = 0; i < this.row_certainties.length; i++) { 
						if (square == i) {
							continue;
						}

						if ((square == 0 || square == 1 || square == 2) && i != 0 && i != 1 && i != 2) {
							continue;
						}

						if ((square == 3 || square == 4 || square == 5) && i != 3 && i != 4 && i != 5) {
							continue;
						}

						if ((square == 6 || square == 7 || square == 8) && i != 6 && i != 7 && i != 8) {
							continue;
						}

						for (var i2 = 0; i2 < this.row_certainties[i].length; i2++) {
							if ((space == 0 || space == 1 || space == 2) && i2 != 0 ) {
								continue;
							}

							if ((space == 3 || space == 4 || space == 5) && i2 != 1 ) {
								continue;
							}

							if ((space == 6 || space == 7 || space == 8) && i2 != 2 ) {
								continue;
							}

							for (var i3 = 0; i3 < this.row_certainties[i][i2].length; i3++) {
								if (possible.indexOf(this.row_certainties[i][i2][i3]) != -1) {
									possible = this.removePossibility(possible, this.row_certainties[i][i2][i3]);
									this.use_certainties = false;
								} 
							}
						}
					}

					for (var i = 0; i < this.col_certainties.length; i++) {
						if (square == i) {
							continue;
						}

						if ((square == 0 || square == 3 || square == 6) && i != 0 && i != 3 && i != 6) {
							continue;
						}

						if ((square == 1 || square == 4 || square == 7) && i != 1 && i != 4 && i != 7) {
							continue;
						}

						if ((square == 2 || square == 5 || square == 8) && i != 2 && i != 5 && i != 8) {
							continue;
						}

						for (var i2 = 0; i2 < this.col_certainties[i].length; i2++) {
							if ((space == 0 || space == 3 || space == 6) && i2 != 0 ) {
								continue;
							}

							if ((space == 1 || space == 4 || space == 7) && i2 != 1 ) {
								continue;
							}

							if ((space == 2 || space == 5 || space == 8) && i2 != 2 ) {
								continue;
							}

							for (var i3 = 0; i3 < this.col_certainties[i][i2].length; i3++) {
								if (possible.indexOf(this.col_certainties[i][i2][i3]) != -1) {
									possible = this.removePossibility(possible, this.col_certainties[i][i2][i3]);
									this.use_certainties = false;
								} 
							}
						}
					}
				}

				if (possible.length == 1) {
					this.squares[square][space] = possible[0];
					$('#square' + square + 'space' + space).val(possible[0]);
				} else {
					this.squares[square][space] = possible;
				}
			}
		}
	});

	app_suduko.AppView = new app_suduko.AppView({});
});