<?php

namespace InnoSoft\CMS;

class DashboardController extends API
{   
    public function __construct() {
        $this->M = new Account();
        $this->view = 'admin.cms.dashboard';
        $this->validator_msg = [];
    }
}

