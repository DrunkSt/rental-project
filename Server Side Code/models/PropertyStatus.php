<?php

class PropertyStatus extends DB\SQL\Mapper{

	public function __construct(DB\SQL $db) {
	    parent::__construct($db,'property_status');
	}
	
	public function all() {
	    $this->load();
	    return $this->query;
	}
}