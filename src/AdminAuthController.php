<?php

namespace InnoSoft\CMS;

class AdminAuthController extends AuthController
{
    protected function login_data()
    {
        return [
            'username'      => trim(\Request::get('username')),
            'password'      => \Request::get('password'),
            'active'        => 1,
            'login_backend' => 1
        ];
    }
   
    public function getLogin()
    {
        if(\Auth::check() && \Auth::user()->login_backend) return redirect (config('cms.backend_prefix') . '/dashboard');
        return view(config('cms.backend_login'));
    }
    
    function getLogout()
    {
        \Auth::logout();
        return redirect(config('cms.backend_prefix') . '/login');
    }
}

