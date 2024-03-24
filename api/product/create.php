<?php
include("../dbconnect.php");

$name = $_POST['name'];
$cat = $_POST['cat'];
$quan = $_POST['quan'];

$file = $_FILES['img'];
//$temp = $file['tmp_name'];

$filename = time() . '_' . basename($_FILES["img"]["name"]);
$target_file = '../../uploads/' . $filename;
move_uploaded_file($_FILES["img"]["tmp_name"], $target_file);

$target_file = str_replace("../../", "", $target_file);

$query = "INSERT INTO product (product_name, product_category, product_quantity, product_image)
          VALUES ('$name', '$cat', '$quan', '$target_file')";
$statement = $connection->prepare($query);
$res = $statement->execute();

if ($res) {
    echo json_encode(['res' => 'success']);
} else {
    echo json_encode(['res' => 'error']);
}

?>
