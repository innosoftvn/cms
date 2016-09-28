<?php

namespace InnoSoft\CMS;

use Illuminate\Support\ServiceProvider;

class CMSServiceProvider extends ServiceProvider
{
    protected $name = 'cms';
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/views', $this->name);
        $this->loadTranslationsFrom(__DIR__.'/lang', $this->name);
        
        $this->publishes([
//            // cms
//            __DIR__.'/helpers.php' => base_path('helpers.php'),
//            __DIR__.'/views/404.blade.php' => resource_path('views/errors/404.blade.php'),
//            
            // public
//            __DIR__.'/assets/css' => resource_path('assets/css'),
//            __DIR__.'/assets/js' => resource_path('assets/js'),
            __DIR__.'/assets/js/app-init.min.js' => public_path('assets/js/app-init.min.js'),
            __DIR__.'/assets/app.js' => public_path('assets/js/app.js'),
            __DIR__.'/assets/app.css' => public_path('assets/css/app.css'),
            __DIR__.'/assets/fonts' => public_path('assets/fonts'),
            __DIR__.'/assets/images' => public_path('assets/images'),
//            
//            // config
//            __DIR__.'/cms.php' => config_path('cms.php'),
//            __DIR__.'/block.php' => config_path('block.php'),
//            
//            //views
//            __DIR__.'/views/dashboard.blade.php' => resource_path('views/admin/pages/dashboard.blade.php'),
//            
//            //controllers
//            __DIR__.'/DashboardController.php' => app_path('Http/Controllers/Admin/DashboardController.php'),
//            
//            // langs
//            __DIR__.'/lang/vi/app.php' => resource_path('lang/vi/app.php'),
//            __DIR__.'/lang/vi/validation.php' => resource_path('lang/vi/validation.php'),
//            // langs
//            __DIR__.'/lang/en/app.php' => resource_path('lang/en/app.php'),
//            __DIR__.'/lang/en/validation.php' => resource_path('lang/en/validation.php')
        ], 'cms');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        
    }
}
