<?php

class PropertyTypes extends DB\SQL\Mapper{

	public function __construct(DB\SQL $db) {
	    parent::__construct($db,'property_types');
	}
	
	public function all() {
	    $this->load();
	    return $this->query;
	}
}