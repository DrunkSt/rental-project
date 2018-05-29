<?php
class PublicController extends Controller{

    function beforeroute(){
    }

    /*
    * Render a single property page
    */
    function renderSingleItem($f3) {
        $itemModel = new ItemModel($this->db, "properties");
        $id =$f3->get('PARAMS.id');
        $item = $itemModel->getById($f3, $id);

        if(!$itemModel->dry()){
            $images = json_decode($item["image"]);
            if(count($images)>0 ){
                $item["firstimage"]  =$images[0];
            }else{
                $item["firstimage"] ="";
            }
            $f3->set('item',$item);
            $f3->set('content','singleitem.htm');
            $f3->set('meta','metatags.htm');
            $template=new Template;
            echo $template->render('publictemplate.htm');
        }else{
            $f3->set('textcontent','No Property Found');
            $template=new Template;
            echo $template->render('404.htm');
        }
        

    }



    
}