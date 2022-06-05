<?php
    // header('Content-Type: application/json');
    $servername = "localhost";
    $username = "root";
    $password = "";

    // Creation de connexion 
    $conn = new mysqli($servername, $username, $password);
    // Verification de l'état de la connexion
    if ($conn->connect_error) {
        return ["error" => $conn->connect_error];
        // die("Connection failed: " . $conn->connect_error);
        
        // echo json_encode(["error" => $conn->connect_error]);
    }

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'saveShapes':
               $aResult['success'] = saveShapes($conn, $_POST['arguments']);
               break;
            case 'getShapes':
                $aResult['data'] = loadShapes($conn);
                break;
            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }
    echo json_encode($aResult);exit;

    function saveShapes($conn, $data) {
        // Creation de la base de données
        $sql = "create DATABASE if not exists paint_db;";
        if ($conn->query($sql) == TRUE) {
            $sql = "USE paint_db;";
            $sql1="CREATE TABLE IF NOT EXISTS shape_data (id INT PRIMARY KEY AUTO_INCREMENT, shape_data VARCHAR (99999) );";
            if($conn->query($sql) == TRUE && $conn->query($sql1)) {
                $sql = "INSERT INTO shape_data (shape_data) VALUES ( ? );";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $data);
                
                if($stmt->execute() == TRUE) { 
                    return (["success" => 'true']);
                }
                return (["error" => $conn->error]);
            }
            return (["error" => $conn->error]);
        }
        return["error" => $conn->error];

    }
    function loadShapes($conn) {
        $sql = "USE paint_db;";
        $data = $conn->query($sql);
        if(!$data) return['error' => "No database."];
        $sql = "SELECT shape_data FROM shape_data WHERE id=(SELECT MAX(id) FROM shape_data);";
        $data = $conn->query($sql);
        return $data -> fetch_row()[0];
    }
?>f
