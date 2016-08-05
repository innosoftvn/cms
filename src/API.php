<?php

namespace InnoSoft\CMS;

use App\Http\Controllers\Controller;

class API extends Controller
{
    protected $M = null;
    protected $view = null;
    protected $validator_msg = [];

    protected function prepare_index(){
        return $this->M->where('id', '>', 0);
    }
    
    protected function prepare_add(){
        // handle before insert data
    }
    
    protected function prepare_update(){
        // handle before update data
    }
    
    protected function prepare_delete($ids){
        return $ids;
    }
    
    protected function callback_index($data){ 
        return $data; 
    }
    
    protected function callback_add($data){ 
        return $data;
    }

    public function getIndex() {
        return view($this->view);
    }
    
    public function postIndex() {
        $query = $this->prepare_index();
        if (\Request::has('search'))
            $query->where(function($query)
            {
                $search = \Request::get('search');
                $query->whereRaw('*', 'like', '%'.$search.'%');
            });
        if(\Request::has('filters')){
            $query->where(function($query)
            {
                $filters = \Request::get('filters');
                foreach ($filters as $filter){
                    $query->orWhere($filter['key'], '=', $filter['value']);
                }
            });
        }
        if(\Request::has('sort')){
            $query->orderBy(\Request::get('sort'), \Request::get('order')==1 ? 'asc':'desc');
        }
        $result['total'] = $query->count();
        $query->skip((\Request::get('pagenum', 1)-1)*\Request::get('pagesize', 10));
        $query->take(\Request::get('pagesize', 10));
        $result['rows']  = $query->get();
        return $this->callback_index($result);
    }
    
    public function postAdd(){
        $this->prepare_add();
        $validator = \Validator::make(\Request::all(), $this->M->rules, $this->validator_msg);
        if ($validator->fails()) return ['status'=>'error', 'message'=> implode('<br>', $validator->errors()->all())];
        try {
            $model = $this->M->create(\Request::all());
        } catch (\Exception $e) {
            return ['status'=>'error', 'message'=>trans('cms::cms.create_error_msg'), 'info'=>$e->getMessage()];
        }
        $this->callback_add($model);
        return ['status'=>'success', 'message'=>trans('cms::cms.create_success_msg')];
    }
    
    public function postUpdate(){
        try {
            $this->prepare_update();
            $r = $this->M->findOrFail(\Request::get('id'));
            $validator = \Validator::make(\Request::all(), $this->M->rules);
            $validator->setAttributeNames( $this->validator_msg ); 
            if ($validator->fails()) return ['status'=>'error', 'message'=> implode('<br>', $validator->errors()->all())];
            $r->update(\Request::all());
        } catch(\Exception $e) {
            return ['status'=>'error', 'message'=>trans('cms::cms.update_error_msg'), 'info'=>$e->getMessage()];
        }
        return ['status' => 'success', 'message' => trans('cms::cms.update_success_msg')];
    }
    
    public function postDelete(){
        try {
            $ids = json_decode(\Request::get('ids'));
            $this->prepare_delete($ids);
            $this->M->destroy( $ids );
        } catch(\Exception $e) {
            return [ 'status' => 'error', 'message'=> trans('cms::cms.delete_error_msg'), 'info'=>$e->getMessage()];
        }
        return ['status' => 'success', 'message' => trans('cms::cms.delete_success_msg', ["delNum"=>count($ids)])];
    }
}
