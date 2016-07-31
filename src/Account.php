<?php

namespace InnoSoft\CMS;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Account extends Authenticatable
{
    protected static $info = null;
    
    protected $fillable = [
        'account_info', 
        'account_info_id', 
        'username', 
        'password', 
        'remember_token',
        'active', 
        'last_login',
        'login_backend',
        'login_frontend',
        'protected',
        'anonymous',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public static function get_info()
    {
        if(self::$info === null){
            self::$info = \DB::table(\Auth::user()->account_info)->where('id', \Auth::user()->account_info_id)->first();
        }
        return self::$info;
    }
}
