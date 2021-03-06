(function(root) {

	function LoanCardView(mvc, options) {

		var self = this;

		options || (options = {});

		var isRendered = false;

		var dom = {};

		dom.listContainer = options.listContainer;

		var loanModel = options.loanModel;

		var events = new root.Events();

		function init() {
			return {
				events: events,
				render: render,
				destroy: destroy,
				select: select,
				check: check,
				setLoanModel: setLoanModel,
				getLoanModel: getLoanModel,
			};
		}


		function render() {

			var params = {
				id: 'A' + loanModel.attr('id'),
				label: loanModel.attr('label') ? loanModel.attr('label') : 'No Label',
				phoneNumber: 'No phone',
			};
			var previousSiblingNode;
			if(isRendered) {
				previousSiblingNode = dom.container.previousElementSibling;
				root.DOMUtil.remove( dom.container );
				params.isSelected = select();
			}
			dom.loanCardTemplate || (dom.loanCardTemplate = window.document.querySelector('#loan-card-template'));
			var templateGeneratedString = root.DOMUtil.runMustache( dom.loanCardTemplate, params );
			if( dom.listContainer ) {
				if(previousSiblingNode) {
					previousSiblingNode.insertAdjacentHTML( 'afterend', templateGeneratedString );
				} else {
					dom.listContainer.insertAdjacentHTML( 'afterbegin', templateGeneratedString );
				}
				findElements();
				attachEvents();
				isRendered = true;
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

		function findElements() {
			dom.container = dom.listContainer.querySelector('#A' + loanModel.attr('id') + '.loan-card');
			if (dom.container) {
				dom.selectCheckBox = dom.container.querySelector('#loan-card-select input');
			}
		}

		function onLoanCardClick(event) {
			events.emit('click:' + 'loanCard', this, event, loanModel);
		}

		function attachEvents() {
			if (dom.container) {
				dom.container.addEventListener('click', onLoanCardClick);
			}
		}

		function select(select) {
			if (typeof(select) === 'boolean') {
				if (select) {
					root.DOMUtil.addClass(dom.container, 'active');
				} else {
					root.DOMUtil.removeClass(dom.container, 'active');
				}
			}
			return root.DOMUtil.hasClass(dom.container, 'active');
		}

		function check(checkFlag) {
			if (typeof(checkFlag) === 'boolean') {
				root.DOMUtil.attr(dom.selectCheckBox, 'checked', checkFlag);
			}
			return root.DOMUtil.attr(dom.selectCheckBox, 'checked');
		}

		function setLoanModel(loanModelArg) {
			loanModel = loanModelArg;
			return loanModel;
		}

		function getLoanModel() {
			return loanModel;
		}

		return init.apply(this, arguments);

	}

	root['LoanCardView'] = LoanCardView;

})(window);