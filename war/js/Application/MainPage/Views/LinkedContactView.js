(function(root) {

	function LinkedContactView(options) {

		var self = this;

		options || (options = {});

		var isRendered = false;

		var linkedContactDOMId = root.MathUtil.randomId();

		var buttonClickMode = options.buttonClickMode || 'add';

		var dom = {};

		var isErrorHighlighted = false;

		dom.listContainer = options.listContainer;

		var events = new root.Events();

		var contactModel;

		function init() {
			var objectToReturn = {
				events: events,
				render: render,
				destroy: destroy,
				isRendered: isRendered,
				setButtonClickMode: setButtonClickMode,
				getDOMId: getDOMId,
				setContact: setContact,
				getContact: getContact,
			};
			self = objectToReturn;
			return objectToReturn;
		}

		function render() {
			if (!isRendered) {
				var params = {};
				if(contactModel) {
					params = contactModel.toJSON();
					params.fullName = contactModel.getFullName();
				}
				(!params.id) && (params.id = linkedContactDOMId);
				dom.phoneNumberTemplate || (dom.phoneNumberTemplate = window.document.querySelector('#loan-details-linked-contact-template'));
				var templateGeneratedString = root.DOMUtil.runMustache(dom.phoneNumberTemplate, params);
				if (dom.listContainer) {
					dom.listContainer.insertAdjacentHTML('beforeend', templateGeneratedString);
					findElements();
					attachEvents();
					setButtonClickMode(buttonClickMode);
					isRendered = true;
				}
			}
		}

		function destroy() {
			if (isRendered) {
				root.DOMUtil.remove(dom.container);
				isRendered = false;
			}
			self = undefined;
			return isRendered;
		}

		function setContact(contactModelArg) {
			contactModel = contactModelArg;
			if (dom.linkedContactInput) {
				return root.DOMUtil.attr(dom.linkedContactInput, 'value', contactModel.getFullName());
			}
		}

		function getContact() {
			return contactModel;
		}

		function setButtonClickMode(buttonClickModeArg) {
			switch (buttonClickModeArg) {
				case 'add':
					buttonClickMode = buttonClickModeArg;
					root.DOMUtil.attr(dom.addRemoveLinkedContactButton, 'id', buttonClickMode + '-phone-number-button');
					root.DOMUtil.addClass(dom.addRemoveLinkedContactIcon, 'fa-plus');
					root.DOMUtil.removeClass(dom.addRemoveLinkedContactIcon, 'fa-minus');
					break;
				case 'remove':
					buttonClickMode = buttonClickModeArg;
					root.DOMUtil.attr(dom.addRemoveLinkedContactButton, 'id', buttonClickMode + '-phone-number-button');
					root.DOMUtil.addClass(dom.addRemoveLinkedContactIcon, 'fa-minus');
					root.DOMUtil.removeClass(dom.addRemoveLinkedContactIcon, 'fa-plus');
					break;
				default:
					console.error('PhoneNumberView :: Given unknown buttonClickMode. buttonClickMode : ', buttonClickMode);
			}
		}

		function findElements() {
			if (dom.listContainer) {
				dom.container = dom.listContainer.querySelector('#' + linkedContactDOMId);
				if (dom.container) {
					dom.addRemoveLinkedContactDiv = dom.container.querySelector('#add-remove-linked-contact-div');
					dom.addRemoveLinkedContactButton = dom.addRemoveLinkedContactDiv.querySelector('button');
					dom.addRemoveLinkedContactIcon = dom.addRemoveLinkedContactDiv.querySelector('i');
					dom.linkedContactInput = dom.container.querySelector('#linked-contact-search-input');
					dom.$linkedContactInput = root.$(dom.linkedContactInput);
				}
			}
		}

		function getDOMId() {
			return linkedContactDOMId;
		}

		function highlightError(highlight) {
			if (typeof(highlight) == 'boolean') {
				if (highlight) {
					if (!isErrorHighlighted) {
						root.DOMUtil.addClass(dom.linkedContactInput, 'highlight-red');
						isErrorHighlighted = true;
					}
				} else {
					if (isErrorHighlighted) {
						root.DOMUtil.removeClass(dom.linkedContactInput, 'highlight-red');
						isErrorHighlighted = false;
					}
				}
			}
			return isErrorHighlighted;
		}

		function onAddRemoveButtonClick(event) {
			if (getContact() || buttonClickMode === 'remove') {
				events.emit('click:' + buttonClickMode + 'LinkedContact', self);
				highlightError(false);
			} else {
				highlightError(true);
			}
		}

		function attachEvents() {
			if (dom.listContainer) {
				root.DOMUtil.event(dom.addRemoveLinkedContactButton, 'click', onAddRemoveButtonClick);
				mvc.deferreds.ContactsDeferred.done(function() {
					setSearchSource(mvc.data.ContactsSearchSource);
				});
			}
		}

		function setSearchSource(source) {
			dom.$linkedContactInput.typeahead({
				// hint: true,
				display: 'fullName',
				source: {
					data: source,
				},
				emptyInputAfterSelection: true,
				callback: {
					onClick: function(inputDOM, selectedAnchor, selectedObject, event) {
						contactModel = new root.ContactModel(selectedObject);
					}
				}
			});
		}

		return init.apply(self, arguments);
	};

	root['LinkedContactView'] = LinkedContactView;

})(window);