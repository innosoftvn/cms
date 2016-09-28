<?php

namespace InnoSoft\CMS;

use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    protected function login_data()
    {
        return [
            'username'       => trim(\Request::get('username')),
            'password'       => \Request::get('password'),
            'active'         => 1,
            'login_frontend' => 1
        ];
    }
            
    function postLogin() 
    {
        if(config('cms.recaptcha') != ''){
            $recaptcha = new \ReCaptcha\ReCaptcha(config('cms.recaptcha'));
            $resp      = $recaptcha->verify(\Request::get('responseCaptcha'), \Request::ip());
            if (!$resp->isSuccess()) {
                return ['status' => 'error', 'message' => $resp->getErrorCodes()];
            }
        }
        $rules = [
            'username' => 'required',
            'password' => 'required'
        ];
        $login_data = $this->login_data();
        $validation = \Validator::make(\Request::all(), $rules);
        if ($validation->passes()) {
            if (\Auth::attempt($login_data, \Request::get('remember-me'))) {
                \App::make(config('auth.providers.users.model'))->where('id', \Auth::user()->id)->update(['last_login'=>date("Y-m-d H:i:s", time())]);
                return ['status'=>'success', 'message'=>trans('cms::auth.login_success_msg')];
            }
        }
        return ['status'=>'error', 'message'=>trans('cms::auth.login_error_msg')];
    }

    function postLogout()
    {
        \Auth::logout();
        return ['status'=>'success', 'message'=>trans('cms::auth.logout_success_msg')];
    }
}