<?php
include 'dbconn.php';

$data = array("name","email","type","score");
$data_length = count($data);


if(isset($_REQUEST['type'])){
	$type = isset($_REQUEST['type']) == 1 ? $_REQUEST['type'] : '';
	$reverse = isset($_REQUEST['reverse']) == 1 ? $_REQUEST['reverse'] : '';
	$limit = isset($_REQUEST['limit']) == 10 ? $_REQUEST['limit'] : '';
	$order = $reverse == 'true' ? 'ASC' : 'DESC';
	
	$result = mysqli_query($conn, "SELECT * FROM $table WHERE type = '$type' ORDER by score ".$order.", date ASC LIMIT ".$limit);
	$category = mysqli_query($conn, "SELECT * FROM $table GROUP BY type ORDER BY type ASC");

	if($result){
		$top_data_category = '';
		if($category){
			$category_length = mysqli_num_rows($category); 
			$categorydata = array("type");
			$categorydata_length = count($categorydata);

			for($i = 0; $i < $category_length; $i++)
			{
				$row = mysqli_fetch_assoc($category);
				$comma = ',';
				if($i == ($category_length-1)){
					$comma = '';	
				}
				
				$table_val = '';
				for($c = 0; $c < $categorydata_length; $c++){
					$commaInner = ',';
					if($c == ($categorydata_length-1)){
						$commaInner = '';	
					}
					$table_val .= '"'.$categorydata[$c].'":"'.$row[$categorydata[$c]].'"'.$commaInner;
				}
				$top_data_category .= '{ '.$table_val.' }'.$comma;
			}
		}

		$result_length = mysqli_num_rows($result); 
		$top_data = '';
		for($i = 0; $i < $result_length; $i++)
		{
			$row = mysqli_fetch_assoc($result);
			$comma = ',';
			if($i == ($result_length-1)){
				$comma = '';	
			}
			
			$table_val = '';
			for($c = 0; $c < $data_length; $c++){
				$commaInner = ',';
				if($c == ($data_length-1)){
					$commaInner = '';	
				}
				$table_val .= '"'.$data[$c].'":"'.$row[$data[$c]].'"'.$commaInner;
			}
			$top_data .= '{ '.$table_val.' }'.$comma;
		}
		echo '{"status":true, "datas":['.$top_data.'], "category":['.$top_data_category.']}';
	}else{
		echo '{"status":false, "error":0}';	
	}
}else{
	echo '{"status":false}';	
}

// Close connection
mysqli_close($conn);
?>