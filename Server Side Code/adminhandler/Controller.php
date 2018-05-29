<?php
/**
* ModalMaker Version 1.1
**/
class Controller {

	protected $f3;
    protected $db;

	function beforeroute(){
		if(!isset($_SESSION['user'])){
            $this->f3->reroute('/login');
            exit;
        }
	}

	function afterroute(){
	}

	function __construct() {
		
		$f3=Base::instance();
		$this->f3=$f3;

	    $db=new DB\SQL(
	        $f3->get('devdb'),
	        $f3->get('devdbusername'),
	        $f3->get('devdbpassword'),
	        array( \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION )
	    );

	    $this->db=$db;
	}

	/**
    * Check for Authorization
    **/
    function auth(){
        if(!isset($_SESSION['user'])){
            $this->f3->reroute('/login');
            exit;
        }
    }

    function isAdmin(){
        return isset($_SESSION['user']);
    }
}