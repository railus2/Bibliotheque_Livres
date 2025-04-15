<?php
    if(extension_loaded('pdo_mysql')) {
       echo 'PDO MySQL extension is loaded';
   } else {
       echo 'PDO MySQL extension is NOT loaded';
   }
?>