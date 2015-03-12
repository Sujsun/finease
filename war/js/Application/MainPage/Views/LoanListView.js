(function(root) {

	function LoanListView(mvc, options) {

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
				update: updateLoanCard,
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
				dom.addLoanButton = dom.container.querySelector('#add-loan-button');
				dom.removeLoanButton = dom.container.querySelector('#remove-loan-button');
				dom.searchInput = dom.container.querySelector('#list-with-toolbar-search-input');
				dom.$searchInput = $(dom.searchInput);
			}
		}

		function onAddLoanButtonClick(event) {
			events.emit('click:' + 'addLoanButton', this, event);
		}

		function onRemoveLoanButtonClick(event) {
			var checkedLoanCardViews = getCheckedLoanCardViews();
			var selectedLoanModels = [];
			if (Object.keys(checkedLoanCardViews).length) {
				for (var key in checkedLoanCardViews) {
					var checkedLoanCardView = checkedLoanCardViews[key];
					checkedLoanCardView && (selectedLoanModels.push(checkedLoanCardView.getLoanModel()));
				}
			} else {
				var selectedLoanCardView = select();
				selectedLoanCardView && (selectedLoanModels = [selectedLoanCardView.getLoanModel()]);
			}
			events.emit('click:' + 'removeLoanButton', this, event, selectedLoanModels);
		}

		function onSearchInputChange(event) {
			events.emit('change:' + 'searchInput', this, event, dom.searchInput.value);
		}

		function attachEvents() {
			if (dom.container) {
				dom.addLoanButton.addEventListener('click', onAddLoanButtonClick);
				dom.removeLoanButton.addEventListener('click', onRemoveLoanButtonClick);
			}
		}

		function onLoanCardClick(element, event, loanModel) {
			events.emit('click:loanCard', element, event, loanModel);
		}

		function addLoanCard(loanModels) {
			if (!Array.isArray(loanModels)) {
				loanModels = [loanModels];
			}
			for (var index in loanModels) {
				var loanModel = loanModels[index];
				views.loanCardViews || (views.loanCardViews = {});
				mvc.views.loanCardViews = views.loanCardViews;
				var loanCardView = new root.LoanCardView(mvc, {
					loanModel: loanModel,
					listContainer: dom.contactListUl,
				});
				loanCardView.render();
				loanCardView.events.on('click:loanCard', onLoanCardClick);
				views.loanCardViews[loanModel.attr('id')] = loanCardView;
			}
		}

		function removeLoanCard(loanModels) {
			if (!Array.isArray(loanModels)) {
				loanModels = [loanModels];
			}
			for (var index in loanModels) {
				var loanModel = loanModels[index];
				views.loanCardViews || (views.loanCardViews = {});
				var loanCardView = views.loanCardViews[loanModel.attr('id')];
				if (loanCardView) {
					loanCardView.destroy();
				}
				delete views.loanCardViews[loanModel.attr('id')];
			}
		}

		function updateLoanCard(loanModel) {
			var loanCardView = views.loanCardViews[loanModel.attr('id')];
			if (loanCardView) {
				loanCardView.setLoanModel(loanModel);
				loanCardView.render();
			}
		}

		function select(loanModel) {
			if (loanModel) {
				selectedLoanCardView && (selectedLoanCardView.select(false));
				var loanModelId = loanModel.attr('id');
				var loanCardView = views.loanCardViews[loanModelId];
				loanCardView.select(true);
				selectedLoanCardView = loanCardView;
			}
			return selectedLoanCardView;
		}

		function getCheckedLoanCardViews() {
			var checkedLoanCardViews = {};
			for (var key in views.loanCardViews) {
				var loanCardView = views.loanCardViews[key];
				if (loanCardView.check()) {
					checkedLoanCardViews[key] = loanCardView;
				}
			}
			return checkedLoanCardViews;
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