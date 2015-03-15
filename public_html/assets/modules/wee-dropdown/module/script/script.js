// Dropdown 1.0.0 (weepower.com)
// Licensed under Apache 2 (http://www.apache.org/licenses/LICENSE-2.0)
// DO NOT MODIFY THIS FILE

/* global $$ */

Wee.fn.make('dropdown', {
	init: function(obj) {
		var conf = Wee.$extend({
			listLength: 5
		}, obj);

		this.conf = conf;

		Wee.events.on({
			'ref:weeDropdown': {
				init: function(e, el) {
					var $$select = $$(el),
						$$options = $$select.children('option'),
						$$dropdown = Wee.$parseHTML('<div class="wee-dropdown selector" data-ref="weeDropdownUI"></div>', true),
						$$valueContainer = Wee.$parseHTML('<div class="wee-dropdown__value selection" data-ref="weeDropdownAnswer"><i class="icon-toggle"></i></div>', true),
						$$value = Wee.$parseHTML('<span class="selection-label data-ref="weeDropdownAnswerText"></span>', true),
						$$menu = Wee.$parseHTML('<ul class="wee-dropdown__menu options"></ul>', true),
						scope = this;

					// Push select options into list
					Wee.$each($$options, function(el) {
						var $$el = $$(el),
							text = $$el.text(),
							val = $$el.val(),
							$$li = Wee.$parseHTML('<li class="options-item" data-val="' + val + '">' +
								'<span class="options-item__text">' + text + '</span>' +
								'</li>', true);

						// Add data-ref if configured
						if (obj.dataRef) {
							$$li.data('ref', obj.dataRef);
						}

						// Add custom data value
						if (obj.dataSet) {
							$$li.data(obj.dataSet, $$el.data(obj.dataSet));
						}

						// Update dropdown selection
						if ($$el.attr('selected') === 'selected') {
							$$li.hide();
							$$value.text(text);
						}

						$$li.on('click', function(e, el) {
							var $$el = $$(el),
								val = $$el.data('val'),
								$$dropdown = $$el.parents('ref:weeDropdownUI');

							$$el.hide().siblings().show();

							$$value.text($$el.text());
							$$value.data('val', $$el.data('val'));
							scope.close($$dropdown);

							// Set select value
							$$select.val(val);

							if (scope.conf.onChange) {
								scope.conf.onChange(val, $$el, scope.conf.onChangeScope, $$value);
							}
						});

						$$menu.append($$li);
					});

					if ($$value.html() === '') {
						var $$first = $$menu.children().first();

						$$first.hide();
						$$value.text($$first.text());
					}

					// Toggle menu on value/document click
					$$valueContainer.on('click', function(e, el) {
						if (! $$(el).data('disabled')) { // TODO: this is custom for totturf
							var $$el = $$(el).data('ref') === 'weeDropdownUI' ?
								$$(el) :
								$$(el).parents('ref:weeDropdownUI');

							if ($$el.hasClass('is-active')) {
								scope.close($$el);
							} else {
								// Reset body click event
								Wee.$get('document', $$(Wee._doc), true).off();

								scope.open($$el);

								$$menu.on({
									click: function(e) {
										e.stopPropagation();
									}
								});

								setTimeout(function() {
									Wee.$get('document', $$(Wee._doc), true).on({
										click: function() {
											Wee.$exec('dropdown:close');
										}
									}, {
										scope: this
									});
								}, 50);
							}
						}
					});

					// Append elements to the DOM before the select
					$$valueContainer.prepend($$value);
					$$dropdown.append($$valueContainer).append($$menu);
					$$select.hide().before($$dropdown);
					Wee.$setRef();

					// Optional custom function
					if (obj.callback) {
						obj.callback($$dropdown);
					}
				}
			}
		}, {
			scope: this
		});
	},
	open: function($$dropdown) {
		// Close any dropdowns already open
		var $$openMenus = $$('ref:weeDropdownUI').filter(function(i, el) {
			return $$(el).hasClass('is-active');
		});

		$$openMenus.removeClass('is-active');
		$$openMenus.css('z-index', '0');

		$$dropdown.css('z-index', '100');
		$$dropdown.addClass('is-active');
	},
	close: function($$dropdown) {
		// Check for active menus if none is passed as argument
		if (! $$dropdown) {
			$$dropdown = $$('ref:weeDropdownUI').filter(function(i, el) {
				return $$(el).hasClass('is-active');
			});
		}

		$$dropdown.removeClass('is-active');
		$$dropdown.css('z-index', '0');
		Wee.$get('document', $$(Wee._doc), true).off();
	}
});