<!DOCTYPE html>

<html lang="en">

<head>

	<!-- Meta Data -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Page Title -->
	<title>Contacts - FinEase</title>

	<!-- CSS -->

	<!-- Library CSS -->
	<link rel="stylesheet" type="text/css" href="../css/Library/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="../css/Library/Bootstrap.css" ></link>
	<link rel="stylesheet" type="text/css" href="../css/Library/Bootstrap-DatePicker.css" ></link>

	<!-- Application CSS -->
	<link rel="stylesheet" type="text/css" href="../css/Application/Test.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/Global.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/MainPage-Global.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/ApplicationShell.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/Header.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/TabContainer.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/SingleColumnList.css">
	<link rel="stylesheet" type="text/css" href="../css/Application/SubTab.css">

	<!-- Scripts -->

	<!-- Library Scripts -->
	<script type="text/javascript" src="../js/Library/JQuery-v1.10.2.js"></script>
	<script type="text/javascript" src="../js/Library/JQuery-AttributeChangeListenerPlugin.js"></script>
	<script type="text/javascript" src="../js/Library/jquery-ui-1.10.3.custom.js"></script>
	<script type="text/javascript" src="../js/Library/Underscore-1.5.2.js"></script>
	<script type="text/javascript" src="../js/Library/Backbone-1.1.0.js"></script>
	<script type="text/javascript" src="../js/Library/Bootstrap-Tooltip.js"></script>
	<script type="text/javascript" src="../js/Library/Bootstrap-PopOver.js"></script>
	<script type="text/javascript" src="../js/Library/Bootstrap.js"></script>
	<script type="text/javascript" src="../js/Library/Bootstrap-ClickOver.js"></script>
	<script type="text/javascript" src="../js/Library/soyutils.js"></script>
	<script type="text/javascript" src="../js/Library/Moment.js"></script>
	<script type="text/javascript" src="../js/Library/Moment-TimeZone.js"></script>
	<!-- <script type="text/javascript" src="../js/Library/Moment-TimeZone-Data.js"></script> -->
	<script type="text/javascript" src="../js/Library/JQueryFloatThread-v1.2.7.js"></script>
	<script type="text/javascript" src="../js/Library/Bootstrap-DatePicker.js"></script>
	<script type="text/javascript" src="../js/Library/XmlStr2Json.js"></script>
	<script type="text/javascript" id="google-map-library" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>

	<!-- Application Properties Scripts -->
	<script type="text/javascript" src="../js/Application/ApplicationProperties.js"></script>

	<script type="text/javascript" src="../js/Application/actions.js"></script>

</head>

<body>

	<div class="container-fluid">

		<!-- Tooltip Wrapper Starts -->
		<div id="tooltip-wrapper" class="tooltip-wrapper">
		</div>		
		<!-- Tooltip Wrapper Ends -->

		<!-- Application Shell Wrapper Starts -->
		<div id="main-overall-wrapper" class="row">
			<div id="main-overall-wrapper-col" class="main-overall-wrapper-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">

				<!-- Application Shell Starts -->
				<div id="application-shell" class="row application-shell">
					<div id="application-shell-col" class="application-shell-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">

						<!-- Header Wrapper Starts -->
						<div id="header-wrapper" class="header-wrapper">

							<!-- Header Starts -->
							<div id="header" class="row header">
								<div id="header-col" class="header-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">

									<!-- NavBar Starts -->
									<div id="finease-navbar" class="finease-navbar navbar" role="navigation">
										<div class="finease-navbar-container-fluid container-fluid">

											<div class="navbar-header">
												<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
													<span class="sr-only">Toggle navigation</span>
													<span class="icon-bar"></span>
													<span class="icon-bar"></span>
													<span class="icon-bar"></span>
												</button>
												<a class="finease-navbar-brand navbar-brand" href="#"><i class="fa fa-inr"></i>inEase</a>
											</div>

											<!-- NavBar Collapse Starts -->
											<div class="navbar-collapse collapse" style="height: 1px;">

												<ul class="finease-nav-tabs nav navbar-nav">
													<li><a id="contact-tab" class="contact-tab active" href="#"><i class="fa fa-users"></i></a></li>
													<li><a id="loan-tab" class="loan-tab" href="#"><i class="fa fa-money"></i></a></li>
												</ul>

												<!-- User Dropdown Starts -->
												<ul class="finease-nav-tabs-right nav navbar-nav navbar-right">
													<li>
														<a id="user-dropdown-a" class="user-dropdown-a btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
															<img id="current-user-pic" class="current-user-pic" src="../images/user-icon.jpg">
														</a>
														<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
															<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
															<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
															<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
															<li role="presentation" class="divider"></li>
															<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
														</ul>
													</li>
												</ul>
												<!-- User Dropdown Ends -->

											</div>
											<!-- NavBar Collapse Ends -->

										</div>
									</div>
									<!-- NavBar Ends -->

								</div>
							</div>
							<!-- Header Ends -->

						</div>
						<!-- Header Wrapper Ends -->

						<!-- Tab Container Wrapper Starts -->
						<div id="tab-container-wrapper" class="tab-container-wrapper">

							<!-- Tab Container Starts -->
							<div id="tab-container" class="tab-container row">
								<div id="tab-container-col" class="tab-container-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">
									
									<div id="tab-container-scroll-wrapper" class= "tab-container-scroll-wrapper">
										<div class="row">

											<!-- First Pane Shell Wrapper Starts -->
											<div id="first-pane-wrapper" class="first-pane-wrapper tab-pane col-lg-3 col-md-3 col-sm-6 col-xs-12 zero-padding">

												<!-- Single Column List Shell Starts  -->
												<div id="single-column-list-shell-container" class="single-column-list-shell-container">
													<div id="single-column-list-shell" class="single-column-list-shell row">
														<div id="single-column-list-shell-col" class="single-column-list-shell-col">

														</div>
													</div>
												</div>
												<!-- Single Column List Shell Ends  -->

											</div>
											<!-- First Pane Shell Wrapper Ends -->

											<!-- Second Pane Shell Wrapper Starts -->
											<div id="second-pane-wrapper" class="second-pane-wrapper tab-pane col-lg-3 col-md-3 col-sm-6 col-xs-12 zero-padding">

												<!-- Single Column List Shell Starts  -->
												<div id="single-column-list-shell-container" class="single-column-list-shell-container">
													<div id="single-column-list-shell" class="single-column-list-shell row">
														<div id="single-column-list-shell-col" class="single-column-list-shell-col">

														</div>
													</div>
												</div>
												<!-- Single Column List Shell Ends  -->

											</div>
											<!-- Second Pane Shell Wrapper Ends -->

											<!-- Third Pane Wrapper Starts -->
											<div id="third-pane-wrapper" class="third-pane-wrapper tab-pane col-lg-6 col-md-6 col-sm-12 col-xs-12 zero-padding">

												<!-- Single Column List Shell Starts  -->
												<div id="single-column-list-shell-container" class="single-column-list-shell-container">

													<div id="sub-tab" class="sub-tab row">
														<div id="sub-tab-col" class="sub-tab-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">

															<div id="sub-tab-nav" class="sub-tab-nav row">
																<div id="sub-tab-nav-col" class="sub-tab-nav-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">
																	<ul class="nav nav-tabs nav-justified" role="tablist">
			  															<li class="active"><a id="loan-sub-tab" class="loan-sub-tab" href="javascript:void(0);">Loan</a></li>
			  															<li><a id="transaction-sub-tab" class="transaction-sub-tab" href="javascript:void(0);">Transaction</a></li>
																	</ul>
																</div>
															</div>

															<div id="sub-tab-content" class="sub-tab-content row">
																<div id="sub-tab-content-col" class="sub-tab-content-col col-lg-12 col-md-12 col-sm-12 col-xs-12 zero-padding">
																	Hello
																</div>
															</div>

														</div>
													</div>
												</div>
												<!-- Single Column List Shell Ends  -->

											</div>
											<!-- Third Pane Wrapper Ends -->

										</div>
									</div>
									
								</div>
							</div>
							<!-- Tab Container Ends -->

						</div>
						<!-- Tab Container Wrapper Ends -->

					</div>
				</div>
				<!-- Application Shell Ends -->

			</div>
		</div>
		<!-- Application Shell Wrapper Ends -->

	</div>

</body>

</html>