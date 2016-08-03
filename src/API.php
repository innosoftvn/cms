<?php

namespace InnoSoft\CMS;

use App\Http\Controllers\Controller;

class API extends Controller
{
    protected $table = null;
    protected $view = null;

    protected function callback_index($data){ return $data; }

    public function getIndex() {
        return view($this->view);
    }
    
    public function postIndex() {
        $M = $this->table;
        $query = is_string($M) ? \DB::table($M)->where('id', '>', 0)->orderBy('id', 'desc') : $M;
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
}
