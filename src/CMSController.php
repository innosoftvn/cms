<?php

namespace InnoSoft\CMS;

use App\Http\Controllers\Controller;

class CMSController extends Controller
{   
    public function route($paths = ''){
        $method = strtolower(\Request::method());
        // authentication
        if($paths === '') return redirect (config('cms.backend_prefix') . '/login');
        if(in_array($paths, ['login', 'logout'])){
            return \App::make('\InnoSoft\CMS\AdminAuthController')->{$method.studly_case($paths)}();
        }
        if(!(\Auth::check() && \Auth::user()->login_backend)) abort(404);
        
        // backend space
        $paths = explode("/", $paths);
        $routes = config('block.navi');
        foreach ($routes as $route) {
            if(array_has($route, $paths[0].'.ctrl')){
                $controller = array_get($route, $paths[0].'.ctrl');
                // check has permission
                if( \App::make(config('auth.providers.users.model'))->has_permission(['route'=>$paths[0], 'controller'=>$controller]) ){
                    if(count($paths) === 1){
                        return \App::make($controller)->{$method.'Index'}();
                    }
                    return \App::make($controller)->{$method.studly_case($paths[1])}();
                }
            }
        }
        abort(404);
    }
}