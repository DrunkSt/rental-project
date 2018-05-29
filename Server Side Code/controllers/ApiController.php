<?php
class ApiController extends Controller{

    function beforeroute(){
    }


	//PROPERTY TYPES API-----------------------------------------------------------------------
	
    function apiDeletePropertyType($f3){
    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('PARAMS.id');
		
		if($id>=0){
			$this->db->begin();
			$this->db->exec('DELETE FROM property_types WHERE id="'.$id.'"');
			$this->db->commit();
		}
	}


	function apiGetPropertyType($f3) {
		$id = $f3->get('PARAMS.id');

		$data = new PropertyTypes($this->db);
		$data->load(array('id = ?',$id));

 
        echo json_encode($data->cast()); 
	}


    function apiGetPropertyTypes($f3) {
		$search = $f3->get('GET.search');


        $data = new PropertyTypes($this->db);
        $filter = array('name LIKE ?', "%".$search."%");
	    $option = array(
	            'order' => 'id ASC'
	    );
        $list = array_map(array($data,'cast'),$data->find($filter,$option));
        echo json_encode($list);            
    }


    function apiAddPropertyType($f3){

    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('POST.id');
		//add or edit to db
		$data = new PropertyTypes($this->db);
		if($id>=0){
			$data->load(array('id = ?',$id));
		}

		$data->name = $f3->get('POST.name');
		$data->save();
	}


	//PROPERTY TYPES API-----------------------------------------------------------------------

    function apiDeletePropertyEfficiency($f3){
    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('PARAMS.id');
		
		if($id>=0){
			$this->db->begin();
			$this->db->exec('DELETE FROM energy_efficiency WHERE id="'.$id.'"');
			$this->db->commit();
		}
	}


	function apiGetPropertyEfficiency($f3) {
		$id = $f3->get('PARAMS.id');

		$data = new EnergyEfficiencies($this->db);
		$data->load(array('id = ?',$id));

 
        echo json_encode($data->cast()); 
	}


    function apiGetPropertyEfficiencies($f3) {
		$search = $f3->get('GET.search');

        $data = new EnergyEfficiencies($this->db);
        $filter = array('name LIKE ?', "%".$search."%");
	    $option = array(
	            'order' => 'id ASC'
	    );
        $list = array_map(array($data,'cast'),$data->find($filter,$option));
        echo json_encode($list);            
    }


    function apiAddPropertyEfficiency($f3){
    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('POST.id');
		//add or edit to db
		$data = new EnergyEfficiencies($this->db);
		if($id>=0){
			$data->load(array('id = ?',$id));
		}

		$data->name = $f3->get('POST.name');
		$data->save();
	}

	//PROPERTY STATUS API-----------------------------------------------------------------------

    function apiDeletePropertyStatus($f3){
    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('PARAMS.id');
		
		if($id>=0){
			$this->db->begin();
			$this->db->exec('DELETE FROM property_status WHERE id="'.$id.'"');
			$this->db->commit();
		}
	}


	function apiGetPropertyStatus($f3) {
		$id = $f3->get('PARAMS.id');

		$data = new PropertyStatus($this->db);
		$data->load(array('id = ?',$id));

 
        echo json_encode($data->cast()); 
	}


    function apiGetPropertyStatuses($f3) {
		$search = $f3->get('GET.search');

        $data = new PropertyStatus($this->db);
        $filter = array('name LIKE ?', "%".$search."%");
	    $option = array(
	            'order' => 'id ASC'
	    );
        $list = array_map(array($data,'cast'),$data->find($filter,$option));
        echo json_encode($list);            
    }


    function apiAddPropertyStatus($f3){

    	$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$id = $f3->get('POST.id');
		//add or edit to db
		$data = new PropertyStatus($this->db);
		if($id>=0){
			$data->load(array('id = ?',$id));
		}

		$data->name = $f3->get('POST.name');
		$data->save();
	}



    //PREFERENCE API-----------------------------------------------------------------------

	function apiSetPreference($f3){

		$this->auth();
    	if($f3->get('DEMO'))
			exit;

		$name = $f3->get('PARAMS.name');
		$value = $f3->get('POST.value');
		//add or edit to db
		$preferences = new Preferences($this->db);
		$preferences->setValue($name,$value);
		$f3->reroute($_SERVER['HTTP_REFERER']);
	}


    function apiGetPreference($f3) {
		$name = $f3->get('PARAMS.name');

        $preferences = new Preferences($this->db);
        $pref = $preferences->getValue($name, "");
        echo $pref;            
    }

  
    //PUSH NOTIFICATION API-----------------------------------------------------------------

    function apiSendPushNotification($f3){

		$this->auth();
    	if($f3->get('DEMO'))
			exit;

    	$title = $f3->get('POST.title');
    	$body = $f3->get('POST.body');

		// API access key from Google API's Console
		$API_ACCESS_KEY =  $f3->get('API_ACCESS_KEY');

		// prep the bundle
		$msg = array
		(
			'body' 	=> $body,
			'title'		=> $title,
			'vibrate'	=> 1,
			'sound'		=> 1
		);
		$fields = array
		(
			'to' 	=>  "/topics/news",
			'notification'			=> $msg
		);
		 
		$headers = array
		(
			'Authorization: key=' . $API_ACCESS_KEY,
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
		$result = curl_exec($ch );
		curl_close( $ch );

		$resultObj=json_decode($result);
		if (isset($resultObj->message_id)) {
		    $this->f3->reroute('/push?result=success');
		}else{
			echo $result;
		}
    }


}

