<?php
	define("URI_BASE",'http://api.untappd.com/v2');
	define("API_KEY",'a3e0a9bc4a91cf420bfb31d06b325e26');
	define("AUTH_USER",'maxbeatty');
	define("AUTH_PASS",'beerme');
	$upHash = AUTH_USER . ':' . md5(AUTH_PASS);

	// API Method
	$method = "user";
	
	// Arguments for method
	$args['key'] = API_KEY;
	$args['user'] = $_POST['user'];
	
	$lastRequestUri = URI_BASE . '/' . $method . '?' . http_build_query($args);

	// Set curl options and execute the request
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $lastRequestUri);
    curl_setopt($ch, CURLOPT_USERPWD, $upHash);  
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $lastRawResponse = curl_exec($ch);
    curl_close($ch);
    
    // return JSON to jQuery
    echo $lastRawResponse;
?>