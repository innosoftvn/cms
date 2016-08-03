<?php

namespace InnoSoft\CMS;

class DashboardController extends API
{   
    public function __construct() {
        $this->table = 'users';
        $this->view = 'admin.cms.dashboard';
    }
}

