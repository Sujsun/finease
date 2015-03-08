(function(root) {

	var LoanTabController = function(mvc) {

		var self = this;

		var views = {};

		var contactSearchMap = {};

		function init() {
			createViews();
			attachEvents();
		}

		function createViews() {
			views.loanListView = new root.LoanListView(mvc);
			views.loanDetailsView = new root.LoanDetailsView(mvc);
		}

		function attachEvents() {
			attachViewEvents();
			attachRouteEvents();
		}

		function attachRouteEvents() {
			// var routePathMap		= 	{
			// 								'' 										: 	onRootRoute,
			// 								'contact'	 	 						: 	onContactRoute,
			// 								'contact/:contactId' 	 				: 	onContactIdRoute,
			// 							};
			// root.routie( routePathMap );
		}

		function attachViewEvents() {
			views.loanListView.events.on('click:addLoanButton', onAddLoanButtonClick);
			views.loanListView.events.on('click:removeLoanButton', onRemoveLoanButtonClick);
			views.loanListView.events.on('click:loanCard', onLoanCardClick);
			views.loanListView.events.on('change:searchInput', onLoanSearchInputChange);

			// views.loanDetailsView.events.on('click:saveButton', onContactDetailsViewSaveButtonClick);
		}

		function onLoanCardClick(element, event, contactModel) {
			views.loanListView.select(contactModel);
			views.loanDetailsView.setLoan(contactModel);
		}

		function onAddLoanButtonClick() {
			var emptyContactModel = new root.ContactModel({
				id: String(new Date().getTime()),
			});
			views.contactDetailsView.setContact(emptyContactModel);
			views.contactListView.add(emptyContactModel);
			views.contactListView.select(emptyContactModel);
		}

		function onRemoveLoanButtonClick(element, event, contactModels) {
			views.contactListView.remove(contactModels);
		}

		function onLoanDetailsViewSaveButtonClick(contactModel) {
			contactModel.attr('subAccountId', mvc.models.sessionModel.attr('subAccount').id);
			return mvc.services.contactService.put(contactModel)
				.done(function(contactModel) {
					console.error('Created Contact Successfully! --> ', contactModel.toJSON());
					alert('Created Contact Successfully!');
				})
				.fail(function() {
					console.error('Failed to create contact.');
				});
		}

		function onLoanSearchInputChange() {}

		function searchSource() {
			var contactModels = mvc.services.contactService.getAll();
			var contactNameArray = [];
			for (var key in contactModels) {
				var contactModel = contactModels[key];
				var fullName = contactModel.getFullName();
				contactSearchMap[fullName] = contactModel;
				contactNameArray.push(fullName);
			}
			return contactNameArray;
		}

		function searchUpdater(displayName) {
			var selectedContactModel = contactSearchMap[displayName];
			selectContact(selectedContactModel);
			return displayName;
		}

		function selectLoan(contactModel) {
			views.contactListView.select(contactModel);
			views.contactDetailsView.setContact(contactModel);
		}

		// Get all contacts under the subAccount and show in the view
		function getContacts() {
			mvc.services.sessionService.get('sessionModel')
				.done(function(sessionModel) {
					var subAccount = sessionModel.attr('subAccount');
					mvc.services.contactService.getBySubAccountId(subAccount.id)
						.done(function(contactModels) {
							var contactNames = [];
							for (var index in contactModels) {
								var contactModel = contactModels[index];
								views.contactListView.add(contactModel);
								contactNames.push(contactModel.getFullName());
							}
							if (contactModels && contactModels.length > 0) {
								var contactModelToSelect = contactModels[contactModels.length - 1];
								selectLoan(contactModelToSelect);
							}
							views.contactListView.setSearchSource(searchSource, searchUpdater);
						})
						.fail(function(status, statusText, xmlHttp) {
							mvc.views.notify.error(['<div style="font-size: 13px; font-weight: bold;">' + statusText + '</div>', /*'<div style="font-size: 11px;">' + statusText + '</div>', */ '<div style="font-size: 11px;">Click to reload</div>'], {
								click: function() {
									window.location.reload();
								},
								overlayBlock: true,
							});
						});
				})
				.fail(function() {
					mvc.views.notify.error(['<div style="font-size: 13px; font-weight: bold;">' + statusText + '</div>', /*'<div style="font-size: 11px;">' + statusText + '</div>', */ '<div style="font-size: 11px;">Click to reload</div>'], {
						click: function() {
							window.location.reload();
						},
						overlayBlock: true,
					});
				});
		}

		window.v = views;

		init.apply(self, arguments);

	};

	root['LoanTabController'] = LoanTabController;
})(window);