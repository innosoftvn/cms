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
        if(\Auth::check() && \Auth::user()->login_backend) return redirect ('admin/dashboard');
        return view('cms::login');
    }
    
    function getLogout()
    {
        \Auth::logout();
        return redirect('admin/login');
    }
}

