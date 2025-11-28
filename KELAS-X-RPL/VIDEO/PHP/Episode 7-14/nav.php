<nav>
    <ul>
        <li><a href="?menu=home">Home</a></li>
        <li><a href="?menu=contact">Contact</a></li>
        <li><a href="?menu=about">About</a></li>
        <li><a href="?menu=help">Help</a></li>
    </ul>
</nav>

<?php
    if (isset($_GET["menu"])) {
        $menu = $_GET["menu"];
        require_once $menu. ".php";  
    }
?>