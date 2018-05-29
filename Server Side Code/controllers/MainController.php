<?php
class MainController extends Controller{

	/**
	* Takes care of rendering of browser requests for admin page
	**/


	function render($f3) {
		$f3->set('content','dashboard.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderSettings($f3) {
		$preferences = new Preferences($this->db);
		$f3->set('content','settings.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderInfo($f3) {
        $preferences = new Preferences($this->db);
        $info = $preferences->getValue("info", "");
        $f3->set('default',$info);
		$f3->set('content','info.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderCategories($f3) {
		$f3->set('content','categories.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderAgents($f3) {
		$f3->set('content','agents.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderPropertyTypes($f3) {
		$f3->set('content','propertytypes.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderPropertyEfficiency($f3) {
		$f3->set('content','propertyefficiency.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderPropertyStatus($f3) {
		$f3->set('content','propertystatus.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderPush($f3) {
		$preferences = new Preferences($this->db);
		$f3->set('content','push.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}


	function renderProperties($f3) {
		$f3->set('content','properties.htm');
        $template=new Template;
        echo $template->render('template.htm');
	}
	
}