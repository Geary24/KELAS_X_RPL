<?php 
    class DB {
        public $host = "127.0.0.1";
        private $user = "root";
        private $password = "";
        private $database = "dbrestaurant";

        public function __construct() {
            echo "Function Construct";
        }

        public function selectData() {
            echo "Select Data";
        }

        public function getDatabase() {
            echo $this->database;
        }

        public function tampil() {
            $this->selectData();
        }

        public static function insertData() {
            echo "Static Function";
        }
    }

    DB::insertData();

    $db = new DB;
    echo "<br>";

?>