<?php
/*
 * SweetPea Form Process
 * Version: 1.0
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 1.0.0
 *  Init Build
 *
 */
	
	/* 
	Settings. This is where you can set your own information.
	----------------------------------------------------------*/
	$email_to = "admin@yourdomain.com";
	$email_from = "admin@yourdomain.com";
	$email_subject = "You have a new form submission!";
	
	/* NO NEED TO EDIT BELOW HERE
	----------------------------------------*/
	// Store Form Data
	$fields = $_POST;
	$email_message = "See form details below.\n\n";
	
	// Sanitize Data
	function clean_string($string) {
    	$bad = array("content-type","bcc:","to:","cc:","href");
    	return str_replace($bad,"",$string);
	}
	
	// Build Email Content
	foreach( $fields as $key=>$field ){
		$email_message .=  $key.": ".clean_string($field)."\n\n";
	}
		
	// Sending Email
	$headers = 'From: '.$email_from."\r\n".
	'Reply-To: '.$email_from."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	@mail($email_to, $email_subject, $email_message, $headers);
	
	/* For Ajax - Default Usage
	--------------------------------------*/
	die("Success!");
	
	/* For NON AJAX USAGE
	-------------------------------------*/
	// header('Location: http://www.yourdomain.com/thank-you');
?>