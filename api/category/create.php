<?php
include("../dbconnect.php");

$name = $_POST['name'];

$query = "INSERT INTO category(category_name) VALUE ('$name')";
$statement = $connection->prepare($query);
$res = $statement->execute();

if ($res) {
    echo json_encode(['res' => 'success']);
} else {
    echo json_encode(['res' => 'error']);
}
