$(window.document).ready(function() {
	var windowHeight = $(window).height();
	/*
	$( 'div#main-overall-wrapper' ).height( windowHeight );
	$( 'div#application-shell' ).height( windowHeight );
	*/

	/* Tooltip Events Starts */
	$('#contact-tab').tooltip({
		title: 'Contact',
		trigger: 'hover focus',
		placement: 'bottom',
		container: "#tooltip-wrapper"
	});
	$('#loan-tab').tooltip({
		title: 'Loan',
		trigger: 'hover focus',
		placement: 'bottom',
		container: "#tooltip-wrapper"
	});
	/* Tooltip Events Ends */

	/* Dropdown Events Starts */
	/*
	$('ul.finease-nav-tabs-right #user-dropdown-a').click(function (){
            dropDownFixPosition($('ul.finease-nav-tabs-right #user-dropdown-a'),$('ul.finease-nav-tabs-right .dropdown-menu'));
        });
	function dropDownFixPosition(button,dropdown){
      	var dropDownTop = button.offset().top + button.outerHeight();
        dropdown.css('top', dropDownTop + "px");
        dropdown.css('left', ( button.offset().left - 102 ) + "px");
	}
	*/
	/* Dropdown Events Starts */

	window.elem = window.elem || {};
	var viewPort;

	var navTabAnchors = $('.finease-nav-tabs a');
	elem.subTabNavAnchor = $('div.sub-tab ul.nav-tabs li a');
	elem.contactSubTabNavLi = $('#contact-tab-content div.sub-tab ul.nav-tabs li');
	elem.contactSubTabContent = $('#contact-tab-content div.sub-tab div.sub-tab-content-col');
	elem.loanSubTabNavLi = $('#loan-tab-content div.sub-tab ul.nav-tabs li');
	elem.loanSubTabContent = $('#loan-tab-content div.sub-tab div.sub-tab-content-col');


	var swap = true;

	// navTabAnchors.click( function( event ) { navTabAnchors.removeClass( 'active' ); $( this ).addClass( 'active' ); } );
	elem.contactSubTabNavLi.click(function(event) {
		elem.contactSubTabNavLi.removeClass('active');
		$(this).addClass('active');
		if (swap) {
			// elem.contactSubTabContent.html('Hi!');
			swap = false;
		} else {
			// elem.contactSubTabContent.html('Hello!');
			swap = true;
		}
	});

	elem.loanSubTabNavLi.click(function(event) {
		elem.loanSubTabNavLi.removeClass('active');
		$(this).addClass('active');
		if (swap) {
			// elem.contactSubTabContent.html('Hi!');
			swap = false;
		} else {
			// elem.contactSubTabContent.html('Hello!');
			swap = true;
		}
	});

	/* Find Elements Starts */
	var $tabContainer = $('#tab-container-col');
	var $tabScrollContainer = $('div#tab-container-scroll-wrapper');
	var $window = $(window);
	var $header = $('#header');
	var $finEaseNavBar = $('#finease-navbar .navbar-collapse');
	var $dropdownMenu = $('.finease-nav-tabs-right li');
	var $applicationShell = $('div.application-shell');
	var $tabPane = $('div.tab-pane');
	var $firstPane = $('div#first-pane-wrapper');
	var $secondPane = $('div#second-pane-wrapper');
	var $thirdPane = $('div#third-pane-wrapper');
	/* Find Elements Starts */
	elem.singleColumnListContainer = $('.single-column-list-shell-container');
	elem.singleColumnListCol = $('.single-column-list-shell-col');
	elem.subTabContent = $('div#sub-tab-content-col');
	elem.firstPaneSearchInput = $('input#list-with-toolbar-search-input');
	elem.listPaneContentList = $('#list-with-toolbar-list ul');
	elem.contactCard = $('li.contact-card');
	elem.contactCardSelect = $('.contact-card-select input');
	elem.contactSelectAll = $('#contact-tab-content #list-with-toolbar-menu-select-all input');
	elem.contactDetailsContainerCol = $('div.contact-details-container-col');
	elem.loanDetailsContainerCol = $('div.loan-details-container-col');
	elem.intervalDropdownButtonText = $('#interval-dropdown button#interval-dropdown-button text');
	elem.intervalDropdownOptions = $('#interval-dropdown ul li a');
	elem.loanSelectAllCheckbox = $('#loan-tab-content #list-with-toolbar-menu-select-all input');
	var tabContainerHeight = 0;

	var onDivResize = function(event) {
		// console.log( 'Inside onDivResize().' );
		var windowHeight = $window.height();
		tabContainerHeight = windowHeight - $header.height();

		// $tabContainer.animate( { height: tabContainerHeight + 'px' }, { duration: 70 } );
		elem.singleColumnListCol.height(tabContainerHeight - (40 /* SingleColumnPadding */ + 2 /* Border */ ));
		elem.listPaneContentList.height((tabContainerHeight - 115) + 'px');
	};
	var onWindowResize = function(event) {
		// console.log( 'Inside onWindowResize().' );
		var windowHeight = $window.height();
		tabContainerHeight = windowHeight - $header.height();

		$applicationShell.height(windowHeight);
		/* $tabPane.height( tabContainerHeight + 'px' ); */
		$finEaseNavBar.css({
			'max-height': tabContainerHeight
		});

		$tabScrollContainer.height(tabContainerHeight + 'px');
		$tabContainer.height(tabContainerHeight + 'px');
		var tabColumnHeight = tabContainerHeight - (40 /* SingleColumnPadding */ + 0 /* Border */ );
		elem.singleColumnListCol.height(tabColumnHeight + 'px');

		var subTabHeight = 0;
		viewPort = $.findViewPort();
		if (viewPort == 'xs') {
			subTabHeight = tabColumnHeight - (90 + 2);
		} else {
			subTabHeight = tabColumnHeight - (40 + 3);
		}
		elem.subTabContent.height(subTabHeight + 'px');

		elem.listPaneContentList.height((tabContainerHeight - 116) + 'px');
		/*
									$( '#first-pane-wrapper' ).hide();
									$( '#second-pane-wrapper' ).hide();
								*/
		var detailsContainerHeight = (tabContainerHeight - 101) + 'px';
		elem.contactDetailsContainerCol.height(detailsContainerHeight);
		elem.loanDetailsContainerCol.height(detailsContainerHeight);

	};

	var scrollToPane = function(paneIndex) {
		var paneRow = paneIndex - 1;
		if (viewPort == 'xs') {
			paneRow = paneIndex - 1;
		} else if (viewPort == 'sm') {
			if (paneRow < 2) {
				paneRow = 0;
			} else {
				paneRow = 1;
			}
		} else
			paneRow = 0;
		$tabScrollContainer.animate({
			scrollTop: (tabContainerHeight * paneRow) + 'px'
		}, 500);
	};

	elem.contactCard.onLongPress(function(event) {
		console.error('Long Pressed!');
	});

	elem.contactCardSelect.bind('click', function(event) {
		// console.error('Clicked! ');
	});

	elem.contactSelectAll.bind('click', function() {
		// console.error(elem.contactSelectAll[0].checked);
		elem.contactCardSelect = $('.contact-card-select input');
		if (elem.contactSelectAll[0].checked) {
			elem.contactCardSelect.prop('checked', true);
		} else {
			elem.contactCardSelect.prop('checked', false);
		}
	});

	elem.loanSelectAllCheckbox.bind('click', function() {
		// console.error(elem.contactSelectAll[0].checked);
		elem.loanCardSelect = $('.loan-card-select input');
		if (elem.loanSelectAllCheckbox[0].checked) {
			elem.loanCardSelect.prop('checked', true);
		} else {
			elem.loanCardSelect.prop('checked', false);
		}
	});

	elem.intervalDropdownOptions.bind( 'click', function(event) {
		elem.intervalDropdownButtonText.html($(this).html());
		elem.intervalDropdownButtonText.attr( 'id', $(this).attr( 'id' ) );
	} );

	window.scrollToPane = scrollToPane;
	onWindowResize();
	$window.resize(onWindowResize);
	$finEaseNavBar.attrchange({
		callback: onDivResize
	});
	$dropdownMenu.attrchange({
		callback: onDivResize
	});

	// elem.firstPaneSearchInput.typeahead({
	// 	source: ['Sundarasan', 'Suresh', 'Abraham', 'Dunston']
	// });

	window.onWindowResize = onWindowResize;
});