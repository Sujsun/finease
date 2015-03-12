(function(root) {

	var LoanTabController = function(mvc) {

		var self = this;

		var views = {};

		var contactSearchMap = {};

		function init() {
			createViews();
			attachEvents();
			getLoanAndShowInView();
		}

		function createViews() {
			views.loanListView = new root.LoanListView(mvc);
			views.loanDetailsView = new root.LoanDetailsView(mvc);
			mvc.views.loanDetailsView = views.loanDetailsView;
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

			views.loanDetailsView.events.on('click:saveButton', onLoanDetailsViewSaveButtonClick);
		}

		function onLoanCardClick(element, event, loanModel) {
			views.loanListView.select(loanModel);
			views.loanDetailsView.setLoan(loanModel);
		}

		function onAddLoanButtonClick() {
			var emptyLoanModel = new root.Model({
				id: String(new Date().getTime()),
			});
			views.loanDetailsView.setLoan(emptyLoanModel);
			views.loanListView.add(emptyLoanModel);
			views.loanListView.select(emptyLoanModel);
		}

		function onRemoveLoanButtonClick(element, event, loanModels) {
			views.loanListView.remove(loanModels);
			var loanDetailsViewModel = views.loanDetailsView.getLoan();
			for (var index in loanModels) {
				var loanModel = loanModels[index];
				if (loanDetailsViewModel && loanDetailsViewModel.attr('id') === loanModel.attr('id')) {
					views.loanDetailsView.reset();
					break;
				}
			}
		}

		function onLoanDetailsViewSaveButtonClick(loanModel) {
			loanModel.attr('subAccountId', mvc.models.sessionModel.attr('subAccount').id);
			return mvc.services.loanService.put(loanModel)
				.done(function(loanModel) {
					console.error('Created Loan Successfully! --> ', loanModel.toJSON());
					views.loanListView.update(loanModel);
					views.loanDetailsView.setLoan(loanModel);
					// alert('Created Contact Successfully!');
				})
				.fail(function() {
					mvc.views.notify.error('Loan creation failed!');
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

		function selectLoan(loanModel) {
			views.loanListView.select(loanModel);
			views.loanDetailsView.setLoan(loanModel);
		}

		function getLoanAndShowInView() {
			var deferred = new dfrd.Deferred();
			mvc.services.sessionService.get('sessionModel')
				.done(function(sessionModel) {
					var subAccount = sessionModel.attr('subAccount');
					mvc.services.loanService.getBySubAccountId(subAccount.id)
						.done(function(loanModels) {
							// getSearchSource(loanModels);
							mvc.deferreds.LoansDeferred.resolve(loanModels);
							// Rendering the contact views
							for (var index in loanModels) {
								var loanModel = loanModels[index];
								views.loanListView.add(loanModel);
							}
							// Selecting the first contact
							if (loanModels && loanModels.length > 0) {
								var loanModelToSelect = loanModels[loanModels.length - 1];
								selectLoan(loanModelToSelect);
							}
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

		init.apply(self, arguments);

	};

	root['LoanTabController'] = LoanTabController;
})(window);