<?php
header('Access-Control-Allow-Origin: *'); //Permite acesso de todas as origens
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//Permite acesso dos métodos GET, POST, PUT, DELETE
//PUT é utilizado para fazer um UPDATE no banco
//DELETE é utilizado para deletar algo do banco
header('Access-Control-Allow-Headers: Content-Type'); //Permite com que qualquer header consiga acessar o sistema
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
}
include 'conexao.php';
//inclui os dados de conexão com o bd no sistema abaixo

//Rota para obter todos os livros
//Utilizando o GET
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM carros");
    $stmt -> execute();
    $carros = $stmt ->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($carros);
    //converter dados em json
}
//-------------------------------------------------
//Rota para inserir livros
//Utilizando o POST
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $anofabricacao = $_POST['anofabricacao'];
    $preco = $_POST['preco'];
    
    $stmt = $conn->prepare("INSERT INTO carros (marca, modelo, anofabricacao, preco) VALUES (:marca, :modelo, :anofabricacao, :preco)");
    $stmt->bindParam(':marca', $marca);
    $stmt->bindParam(':modelo', $modelo);
    $stmt->bindParam(':anofabricacao', $anofabricacao);
    $stmt->bindParam(':preco', $preco);

    if($stmt->execute()){
        echo "carros agendada com sucesso!!";
    }else{
        echo "Erro ao agendadar carros";
    }
}

// Rota para atualizar um carro existente
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    // Convertendo dados recebidos em string
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novo_marca = isset($_PUT['marca']) ? $_PUT['marca'] : null;
    $novo_modelo = isset($_PUT['modelo']) ? $_PUT['modelo'] : null;
    $novo_anofabricacao = isset($_PUT['anofabricacao']) ? $_PUT['anofabricacao'] : null;
    $novo_preco = isset($_PUT['preco']) ? $_PUT['preco'] : null;

    // Verifica se o valor de 'marca' não é nulo
    if ($novo_marca !== null) {
        $stmt = $conn->prepare("UPDATE carros SET marca = :marca, modelo = :modelo, anofabricacao = :anofabricacao, preco = :preco WHERE idcarro = :idcarro");
        $stmt->bindParam(':marca', $novo_marca);
        $stmt->bindParam(':modelo', $novo_modelo);
        $stmt->bindParam(':anofabricacao', $novo_anofabricacao);
        $stmt->bindParam(':preco', $novo_preco);
        $stmt->bindParam(':idcarro', $id);

        if ($stmt->execute()) {
            echo "Carro atualizado com sucesso!";
        } else {
            echo "Erro ao atualizar o carro :(";
        }
    } else {
        echo "O campo 'marca' não pode ser nulo.";
    }
}

//rota para deletar uma carros exister
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM carros WHERE idcarro = :idcarro");
    $stmt->bindParam(':idcarro', $id);
    if($stmt->execute()){
        echo "carros excluida com sucesso!!";
    } else {
        echo "erro ao excluir carros";
    }
}
?>
