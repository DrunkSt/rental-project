<?php

class EnergyEfficiencies extends DB\SQL\Mapper{

	public function __construct(DB\SQL $db) {
	    parent::__construct($db,'energy_efficiency');
	}
	
	public function all() {
	    $this->load();
	    return $this->query;
	}
}