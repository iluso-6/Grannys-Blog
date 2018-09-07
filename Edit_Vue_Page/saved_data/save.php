<?php 
  // saving sample text to file (it doesn't include validation!)
  file_put_contents('data.json', $_POST['ref']);
	if ($_POST['auto']==true){
  		echo "auto true";
	}else{
	die('Your changes has been saved');
	}

?>