<?php
class PropertyController extends ItemController{
	public $tablename = "properties";
	public $filter_valid_columns  = array( 'id','accepted','name', 'address', 'description', 'county', 'city', 'zipcode','area', 'bathrooms', 'bedrooms','rentprice', 'saleprice', 'gpslat', 'gpslng', 'status', 'type', 'energy', 'rooms', 'yearbuilt');

	//make Available for everyone, not just admin
	function beforeroute(){
    }


	function getById($f3) {
		$item = $this->getByIdFromParameters();
		$item['category'] = json_encode($this->getRelationTableFromDb("properties_categories", "property_id", "category_id", $item['id']));
        echo json_encode($item); 
	}


	function getMultiple($f3) {
		//get pagination parameters
		$limit = $f3->get('PARAMS.limit');
		$pos = $f3->get('PARAMS.pos');	

		//accepted or not accepted
		$accepted = $f3->get('GET.accepted');
		if($accepted=="")
			$accepted="1";
		if($accepted==null)
			$accepted="1";
	    $local_filter = array('accepted' => $accepted);


		//categories
		if( isset( $_GET[ 'category' ] ) ){
			$category_id = $f3->get('GET.category');
			$ids = $this->getRelationTableFromDb("properties_categories", "category_id", "property_id", $category_id);
			$local_filter['id'] = $ids;
		}

		//filter
		$filter = $this->getFilterFromParameters("name", $local_filter);
		//print_r( $filter);

		//pagination and order
 		$option = array(
	            'order' => 'id ASC',
	            'limit' => $limit,
	            'offset' => $pos
	    );
	
        $item = new ItemModel($this->db, $this->tablename);
        $item->getMultiple($filter, $option);
    }


	function getTop($f3) {
		$limit = $f3->get('PARAMS.limit');
		$top = $f3->get('PARAMS.top');


        $item = new ItemModel($this->db, $this->tablename);
        $filter = array('id>=0');
	    $option = array(
	            'order' => $top.' DESC',
	            'limit' => $limit,
	            'offset' => $pos
	    );

        $list = array_map(array($item,'cast'), $item->find($filter,$option));
	 	echo  json_encode($list);            
    }


	function add($f3){
	    $accepted=$this->isAdmin();
     	if($f3->get('POST.accepted')=="0")
     		 $accepted=0;

		$item = new ItemModel($this->db, $this->tablename);
		$item->loadIfIdAvailable($f3, "id");
        $item->accepted = $accepted;
        $item->read($f3, 'name', 'address', 'description', 'county', 'city', 'zipcode','area', 'bathrooms', 'bedrooms','rentprice', 'saleprice', 'gpslat', 'gpslng', 'status', 'type', 'energy', 'rooms', 'yearbuilt', 'ownername','tel', 'email');
        $item->readImage($f3, "image", true, 600, 300);
        $item->save();
        $this->getRelationTableFromPost("category","properties_categories", "property_id", "category_id", $item->id);

	}


	function delete($f3){
		$this->auth();
		$item = new ItemModel($this->db, $this->tablename);
		$item->deleteById($this->db,  $f3->get('PARAMS.id'));
	}


    function viewed($f3) {
     	$item = new ItemModel($this->db, $this->tablename);
        $item->incrementById($f3, 'viewed');
        echo "1";          
    }


    function shared($f3) {
        $item = new ItemModel($this->db, $this->tablename);
        $item->incrementById($f3, 'shared');
        echo "1";           
    }
    

    function favorited($f3) {
        $item = new ItemModel($this->db, $this->tablename);
        $item->incrementById($f3, 'favorited');
        echo "1";           
    }
}