(function(root) {

	function LoanListView(options) {

		var self = this;

		options || (options = {});

		var isRendered = false;

		var dom = {};

		dom.listContainer = options.listContainer;

		var events = new root.Events();

		var views = {};

		var selectedLoanCardView = undefined;

		function init() {
			render();
			return {
				events: events,
				add: addLoanCard,
				remove: removeLoanCard,
				select: select,
				setSearchSource: setSearchSource,
			};
		}


		function render() {
			findElements();
			attachEvents();
			isRendered = true;
			return isRendered;
		}

		function destroy() {
			if (isRendered) {
				root.DOMUtil.remove(dom.container);
				isRendered = false;
			}
			self = undefined;
			return isRendered;
		}

		function findElements() {
			dom.wrapper = window.document.querySelector('#loan-list-wrapper');
			dom.container = dom.wrapper.querySelector('#loan-list');
			if (dom.container) {
				dom.contactListUl = dom.container.querySelector('#list-with-toolbar-list-ul');
				dom.addContactButton = dom.container.querySelector('#add-loan-button');
				dom.removeContactButton = dom.container.querySelector('#remove-loan-button');
				dom.searchInput = dom.container.querySelector('#list-with-toolbar-search-input');
				dom.$searchInput = $(dom.searchInput);
			}
		}

		function onAddLoanButtonClick(event) {
			events.emit('click:' + 'addContactButton', this, event);
		}

		function onRemoveLoanButtonClick(event) {
			var checkedContactCardViews = getCheckedContactCardViews();
			var selectedContactModels = [];
			if (Object.keys(checkedContactCardViews).length) {
				for (var key in checkedContactCardViews) {
					var checkedContactCardView = checkedContactCardViews[key];
					checkedContactCardView && (selectedContactModels.push(checkedContactCardView.getContactModel()));
				}
			} else {
				var selectedContactCardView = select();
				selectedContactCardView && (selectedContactModels = [selectedContactCardView.getContactModel()]);
			}
			events.emit('click:' + 'removeContactButton', this, event, selectedContactModels);
		}

		function onSearchInputChange(event) {
			events.emit('change:' + 'searchInput', this, event, dom.searchInput.value);
		}

		function attachEvents() {
			if (dom.container) {
				dom.addContactButton.addEventListener('click', onAddLoanButtonClick);
				dom.removeContactButton.addEventListener('click', onRemoveLoanButtonClick);
			}
		}

		function onLoanCardClick(element, event, contactModel) {
			events.emit('click:contactCard', element, event, contactModel);
		}

		function addLoanCard(contactModels) {
			if (!Array.isArray(contactModels)) {
				contactModels = [contactModels];
			}
			for (var index in contactModels) {
				var contactModel = contactModels[index];
				views.contactCardViews || (views.contactCardViews = {});
				var contactCardView = new root.ContactCardView(mvc, {
					contactModel: contactModel,
					listContainer: dom.contactListUl,
				});
				contactCardView.render();
				contactCardView.events.on('click:contactCard', onLoanCardClick);
				views.contactCardViews[contactModel.attr('id')] = contactCardView;
			}
		}

		function removeLoanCard(contactModels) {
			if (!Array.isArray(contactModels)) {
				contactModels = [contactModels];
			}
			for (var index in contactModels) {
				var contactModel = contactModels[index];
				views.contactCardViews || (views.contactCardViews = {});
				var contactCardView = views.contactCardViews[contactModel.attr('id')];
				if (contactCardView) {
					contactCardView.destroy();
				}
				delete views.contactCardViews[contactModel.attr('id')];
			}
		}

		function select(contactModel) {
			if (contactModel) {
				selectedContactCardView && (selectedContactCardView.select(false));
				var contactModelId = contactModel.attr('id');
				var contactCardView = views.contactCardViews[contactModelId];
				contactCardView.select(true);
				selectedContactCardView = contactCardView;
			}
			return selectedContactCardView;
		}

		function getCheckedLoanCardViews() {
			var checkedContactCardViews = {};
			for (var key in views.contactCardViews) {
				var contactCardView = views.contactCardViews[key];
				if (contactCardView.check()) {
					checkedContactCardViews[key] = contactCardView;
				}
			}
			return checkedContactCardViews;
		}

		function setSearchSource(source, updater) {
			dom.$searchInput.typeahead({
				name: 'Contacts',
				displayKey: 'value',
				source: source,
				updater: updater,
			});
		}

		return init.apply(this, arguments);

	}

	root['LoanListView'] = LoanListView;

})(window);