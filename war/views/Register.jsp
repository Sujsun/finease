<!DOCTYPE html>
<html>
	<head>
		<title>Register - Finease</title>
	</head>
	<body>
		<h1>Register Page</h1>
		<form>
			<table>
				<tbody>
					<tr>
						<td>Email</td>
						<td><input type="email" name="login" id="login"></input></td>
					</tr>
					<tr>
						<td>Password</td>
						<td><input type="password" name="password" id="password"></input></td>
					</tr>
					<tr>
						<td>First Name</td>
						<td><input type="text" name="firstName" id="first-name"></input></td>
					</tr>
					<tr>
						<td>Middle Name</td>
						<td><input type="text" name="middleName" id="middle-name"></input></td>
					</tr>
					<tr>
						<td>Last Name</td>
						<td><input type="text" name="lastName" id="last-name"></input></td>
					</tr>
					<tr>
						<td>Landline</td>
						<td><input type="number" name="landline" id="landline"></input></td>
					</tr>
					<tr>
						<td>Mobile</td>
						<td><input type="number" name="mobile" id="mobile"></input></td>
					</tr>
					
					<tr colspan="2">
						<td>Address</td>
					</tr>
					<tr>
						<td>House Number</td>
						<td><input type="text" name="houseNumber" id="house-number"></input></td>
						<td>Address Line 1</td>
						<td><input type="text" name="addressLine1" id="address-line-1"></input></td>
					</tr>
					<tr>
						<td>Address Line 2</td>
						<td><input type="text" name="addressLine2" id="address-line-2"></input></td>
					</tr>
					<tr>
						<td>Landmark</td>
						<td><input type="text" name="landmark" id="landmark"></input></td>
					</tr>
					<tr>
						<td>District</td>
						<td><input type="text" name="district" id="district"></input></td>
					</tr>
					<tr>
						<td>State</td>
						<td><input type="text" name="state" id="state"></input></td>
					</tr>
					<tr>
						<td>Country</td>
						<td><input type="text" name="country" id="country"></input></td>
						<td>Pincode</td>
						<td><input type="number" name="pincode" id="pincode"></input></td>
					</tr>
					
					<tr colspan="2">
						<td><a href="javascript:void(0);" id="register-submit">Register</a></input></td>
					</tr>
					
				</tbody>
			</table>
		</form>
		
		<!-- Scripts - Starts -->
		<script type="text/javascript" src="../js/Library/Deferred.js"></script>
		<script type="text/javascript" src="../js/Application/Util/ConverterUtil.js"></script>
		<script type="text/javascript" src="../js/Application/Util/AJAXUtil.js"></script>
		<script type="text/javascript" src="../js/Application/Util/ValidatorUtil.js"></script>
		<script type="text/javascript" src="../js/Application/RegistrationPage/Registration.js"></script>

		<!-- Scripts - Ends -->
		
	</body>
</html>