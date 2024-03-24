<?php
include_once("../dbconnect.php");

$id = $_POST['id'];
$name = $_POST['name'];
$category = $_POST['cat'];
$quantity = $_POST['stock'];

try {
    $query = "UPDATE product SET product_name = :name, product_category = :category, product_quantity = :quantity
              WHERE product_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':name', $name);
    $statement->bindParam(':category', $category);
    $statement->bindParam(':quantity', $quantity);
    $statement->execute();

    echo json_encode(["res" => "success"]);
} catch(PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
?>
