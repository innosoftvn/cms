<?php

namespace InnoSoft\CMS;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{   
    public function getIndex() {
        return view('admin.cms.dashboard');
    }
}

