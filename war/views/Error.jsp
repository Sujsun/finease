<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  

<!DOCTYPE html>
<html>
	<head>
		<title>Oops! - Finease</title>
	</head>
	<body>
		<h1>Ooops! Something went wrong.</h1>
		
		<c:if test="${showDebugDetails}">
			<div style="font-weight: bold">Failed URL: ${url}</div></br>
			<div style="font-weight: bold">Exception:  ${exception.message}</div>
		    <c:forEach items="${exception.stackTrace}" var="ste">
		    	<div>${ste}</div> 
			</c:forEach>
		</c:if>
		
	</body>
</html>