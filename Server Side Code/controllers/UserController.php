<?php
class UserController extends Controller{

    /**
    * Render login page
    **/
    function render(){
        if(isset($_SESSION['user'])){
            $this->f3->reroute('/');
            exit;
        }

        $template=new Template;
        echo $template->render('login.htm');
    }

    function beforeroute(){
    }

    /**
    * Set username and password
    **/
    function setUser($f3){
        if($f3->get('DEMO'))
            exit;

        //get data from form
        $username = $_SESSION['user'];
        $newusername = $this->f3->get('POST.newusername');
        $newpassword = $this->f3->get('POST.newpassword');
        $confirmpassword = $this->f3->get('POST.confirmpassword');
        $password = $this->f3->get('POST.password');

        //check that confirm password is ok
        if($newpassword != $confirmpassword){
        	 $this->f3->reroute('/settings?error=wrong_confirm_pass');
        }

        //load user by username
        $user = new User($this->db);
        $user->getByName($username);
        if($user->dry()) {
            $this->f3->reroute('/login');
        }

        //verify old password
        if(password_verify($password, $user->password)) {
            //change pasword and username
        	$user->username = $newusername;
        	$user->password = password_hash($newpassword, PASSWORD_DEFAULT);
        	$user->save();
            $_SESSION['user']= $newusername; 
        	$this->f3->reroute('/settings');
        } else {
        	$this->f3->reroute('/settings?error=wrong_pass');

        }

	}


    /**
    * Authenticate password and username
    **/
    function authenticate() {

        $username = $this->f3->get('POST.username');
        $password = $this->f3->get('POST.password');

        $user = new User($this->db);
        $user->getByName($username);

        if($user->dry()) {
            $this->f3->reroute('/login');
        }

        if(password_verify($password, $user->password)) {
            $_SESSION['user']= $user->username; 
            $this->f3->reroute('/');
        } else {
        	$this->f3->reroute('/login');

        }
    }


    /**
    * Logout from system
    **/
    function logout(){
         if(isset($_SESSION['user']))
            unset($_SESSION['user']);  
    	 $this->f3->reroute('/login');
    }
}