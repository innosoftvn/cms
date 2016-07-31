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
            // cms
            __DIR__.'/helpers.php' => base_path('helpers.php'),
            __DIR__.'/views/404.blade.php' => resource_path('views/errors/404.blade.php'),
            
            // public
            __DIR__.'/assets' => public_path('assets/' . $this->name),
            
            // config
            __DIR__.'/cms.php' => config_path('cms.php'),
            __DIR__.'/block.php' => config_path('block.php'),
            
            //views
            __DIR__.'/views/dashboard.blade.php' => resource_path('views/admin/cms/dashboard.blade.php'),
            
            //controllers
            __DIR__.'/DashboardController.php' => app_path('Http/Controllers/cms/dDashboardController.php'),
            
            // langs
            __DIR__.'/lang/vi/app.php' => resource_path('lang/vi/app.php'),
        ]);
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
