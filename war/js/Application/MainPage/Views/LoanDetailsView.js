(function(root) {

	function LoanDetailsView(mvc, options) {

		var self = this;

		options = options || {};

		var dom = {};

		dom.container = options.container || window.document.body;

		var views = {};

		var loanModel = undefined;

		var isValueChangedInViewBoolean = false;

		var events = new root.Events();

		function init() {
			findElements();
			attachEvents();
			setLoan();
			return {
				events: events,
				setLoan: setLoan,
				getLoan: getLoan,
				reset: reset,
			};
		}

		function findElements() {
			if (dom.container) {
				dom.loanDetailsHeader = dom.container.querySelector('#loan-details-header-name-col');
				dom.saveLoanButton = dom.container.querySelector('#save-loan-button');
				dom.loanFieldInputs = dom.container.querySelectorAll('input.loan-field-input');
				dom.linkedContactList = dom.container.querySelector('ul#linked-contact-list');
			}
		}

		function setLoan(loanModelArg) {
			loanModel = loanModelArg || new root.Model();
			setLoanInView();
		}

		function getLoan() {
			var loan = {};
			loan.linkedContacts = getLinkedContactIds();
			return new root.Model(loan);
		}

		function reset() {
			setContact(null);
		}

		function setLoanInView() {
			if (loanModel) {
				root.DOMUtil.attr(dom.loanDetailsHeader, 'innerHTML', loanModel.attr('name'));
				if(loanModel.attr('linkedContacts') && loanModel.attr('linkedContacts').length > 0) {
				} else {
					addLinkedContactView();
				}
			}
		}

		function setContactInCreateLoginModal() {
			if (contactModel) {
				var contactNameWithInitials = contactModel.getNameWithInitials();
				root.DOMUtil.attr(dom.loginFor, 'value', (contactNameWithInitials != '' ? contactNameWithInitials : 'No Name'));
				root.DOMUtil.attr(dom.username, 'value', contactModel.attr('primaryEmail') || '');
				root.DOMUtil.attr(dom.password, 'value', '');
			}
		}

		function getSecondaryEmailAddresses() {
			var returnSecondayEmailArray = [];
			if (views.secondaryEmailViews) {
				for (var key in views.secondaryEmailViews) {
					var secondayEmailView = views.secondaryEmailViews[key];
					var email = secondayEmailView.getEmail();
					if (email) {
						returnSecondayEmailArray.push(email);
					}
				}
			}
			return returnSecondayEmailArray;
		}

		function getPhoneNumbers() {
			var returnPhoneNumberArray = [];
			if (views.phoneNumberViews) {
				for (var key in views.phoneNumberViews) {
					var phoneNumberView = views.phoneNumberViews[key];
					var phoneNumber = phoneNumberView.getPhoneNumber();
					if (phoneNumber) {
						returnPhoneNumberArray.push(phoneNumber);
					}
				}
			}
			return returnPhoneNumberArray;
		}

		function getAddresses() {
			var returnAddressArray = [];
			if (views.addressViews) {
				for (var key in views.addressViews) {
					var addressView = views.addressViews[key];
					var address = addressView.getAddress();
					if (address) {
						returnAddressArray.push(address);
					}
				}
			}
			return returnAddressArray;
		}

		function addSecondayEmailView(email) {
			views.secondaryEmailViews || (views.secondaryEmailViews = {});
			if (views.previousSecondaryEmailView) {
				views.previousSecondaryEmailView.setButtonClickMode('remove');
			}
			var secondaryEmailView = new root.EmailView({
				listContainer: dom.secondaryEmailList,
				buttonClickMode: 'add',
			});
			secondaryEmailView.render();
			if (email) {
				secondaryEmailView.setEmail(email);
			}
			secondaryEmailView.events.on('click:addEmail', function(secondaryEmailView) {
				addSecondayEmailView();
			});
			secondaryEmailView.events.on('click:removeEmail', function(secondaryEmailView) {
				removeSecondaryEmailView(secondaryEmailView);
			});
			views.secondaryEmailViews[secondaryEmailView.getDOMId()] = secondaryEmailView;
			views.previousSecondaryEmailView = secondaryEmailView;
		}

		function removeSecondaryEmailView(secondaryEmailView) {
			secondaryEmailView.destroy();
			var secondaryEmailViewDOMId = secondaryEmailView.getDOMId();
			if (views.secondaryEmailViews[secondaryEmailViewDOMId]) {
				delete views.secondaryEmailViews[secondaryEmailViewDOMId];
			}
		}

		function removeAllSecodaryEmailViews() {
			if (views.secondaryEmailViews) {
				for (var key in views.secondaryEmailViews) {
					removeSecondaryEmailView(views.secondaryEmailViews[key]);
				}
				views.previousSecondaryEmailView = undefined;
			}
		}

		function addSecondaryEmailViews(secondayEmailArray) {
			if (secondayEmailArray && secondayEmailArray.length > 0) {
				for (var index in secondayEmailArray) {
					var email = secondayEmailArray[index];
					addSecondayEmailView(email);
				}
			} else {
				addSecondayEmailView();
			}
		}

		function addLinkedContactView(linkedContactModel) {
			views.linkedContactViews || (views.linkedContactViews = {});
			if (views.previousLinkedContactView) {
				views.previousLinkedContactView.setButtonClickMode('remove');
			}
			var linkedContactView = new root.LinkedContactView({
				listContainer: dom.linkedContactList,
				buttonClickMode: 'add',
			});
			linkedContactView.render();
			if (linkedContactModel) {
			 	linkedContactView.setLinkedContactModel(linkedContactModel);
			}
			linkedContactView.events.on('click:addLinkedContact', function(linkedContactView) {
				addLinkedContactView();
			});
			linkedContactView.events.on('click:removeLinkedContact', function(linkedContactView) {
				removeLinkedContactView(linkedContactView);
			});
			views.linkedContactViews[linkedContactView.getDOMId()] = linkedContactView;
			views.previousLinkedContactView = linkedContactView;
		}

		function removeLinkedContactView(linkedContactView) {
			linkedContactView.destroy();
			var linkedContactViewDOMId = linkedContactView.getDOMId();
			if (views.linkedContactViews[linkedContactViewDOMId]) {
				delete views.linkedContactViews[linkedContactViewDOMId];
			}
		}

		function getLinkedContactIds() {
			var linkedContactIds = [];
			var linkedContactModels = getLinkedContacts();
			for(var index in linkedContactModels) {
				linkedContactIds.push(linkedContactModels[index].attr('id'));
			}
			return linkedContactIds;
		}

		function getLinkedContacts() {
			var contactModels = [];
			for(var key in views.linkedContactViews) {
				var linkedContactView = views.linkedContactViews[key];
				contactModels.push(linkedContactView.getContact());
			}
			return contactModels;
		}

		function addPhoneNumberViews(phoneNumberArray) {
			if (phoneNumberArray && phoneNumberArray.length > 0) {
				for (var index in phoneNumberArray) {
					var phoneNumber = phoneNumberArray[index];
					addPhoneNumberView(phoneNumber);
				}
			} else {
				addPhoneNumberView();
			}
		}

		function removeAllPhoneNumberViews() {
			if (views.phoneNumberViews) {
				for (var key in views.phoneNumberViews) {
					removePhoneNumberView(views.phoneNumberViews[key]);
				}
				views.previousPhoneNumberView = undefined;
			}
		}

		function addAddressView(address) {
			views.addressViews || (views.addressViews = {});
			if (views.previousAddressView) {
				views.previousAddressView.setButtonClickMode('remove');
			}
			var addressView = new root.AddressView({
				listContainer: dom.addressList,
				buttonClickMode: 'add',
			});
			addressView.render();
			if (address) {
				addressView.setAddress(address);
			}
			addressView.events.on('click:addAddress', function(addressView) {
				addAddressView();
			});
			addressView.events.on('click:removeAddress', function(addressView) {
				removeAddressView(addressView);
			});
			views.addressViews[addressView.getDOMId()] = addressView;
			window.previousAddressView = addressView;
			views.previousAddressView = addressView;
		}

		function removeAddressView(addressView) {
			addressView.destroy();
			var addressViewDOMId = addressView.getDOMId();
			if (views.addressViews[addressViewDOMId]) {
				delete views.addressViews[addressViewDOMId];
			}
		}

		function addAddressViews(addressArray) {
			if (addressArray && addressArray.length > 0) {
				for (var index in addressArray) {
					var address = addressArray[index];
					addAddressView(address);
				}
			} else {
				addAddressView();
			}
		}

		function removeAllAddressViews() {
			if (views.addressViews) {
				for (var key in views.addressViews) {
					removeAddressView(views.addressViews[key]);
				}
				views.previousAddressView = undefined;
			}
		}

		function showSaveButton(show) {
			root.DOMUtil.style(dom.contactDetailsHeader, 'paddingRight', (show ? (85 + 'px') : (50 + 'px')));
			root.DOMUtil.show(dom.saveContactButton, show);
		}

		function showCreateLoginModal() {
			setContactInCreateLoginModal();
			root.$(dom.createLoginModal).modal('show');
		}

		function isValueChangedInView(isValueChangedInViewBooleanArg) {
			if (typeof(isValueChangedInViewBooleanArg) == 'boolean') {
				if (isValueChangedInViewBooleanArg != isValueChangedInViewBoolean) {
					isValueChangedInViewBoolean = isValueChangedInViewBooleanArg;
					showSaveButton(isValueChangedInViewBoolean);
				}
			}
			return isValueChangedInViewBoolean;
		}

		function onSaveButtonClick(event) {
			isValueChangedInView(false);
			events.emit('click:' + 'saveButton', getContact());
		}

		function onCreateLoginClick(event) {
			showCreateLoginModal();
		}

		function onValueChangedInView() {
			isValueChangedInView(true);
		}

		function attachEventsToFindChangeInView() {
			for (var index = 0; index < dom.loanFieldInputs.length; index++) {
				root.DOMUtil.event(dom.loanFieldInputs[index], 'input', onValueChangedInView);
			}
		}

		function attachEvents() {
			root.DOMUtil.event(dom.saveContactButton, 'click', onSaveButtonClick);
			root.DOMUtil.event(dom.createLoginDropdownMenuButtom, 'click', onCreateLoginClick);
			attachEventsToFindChangeInView();
		}

		return init.apply(self, arguments);

	};

	root['LoanDetailsView'] = LoanDetailsView;

})(window);