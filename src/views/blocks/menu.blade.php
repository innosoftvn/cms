<nav class="navbar navbar-inverse navbar-fixed-top app-menu">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand visible-xs" onclick="$('.app-main').toggleClass('open'); $('#nav-hamburger-icon').toggleClass('open');">
                <div id="nav-hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
            <img class="navbar-brand app-logo" src="{{ url('assets/cms/images/logo-small.png') }}">
            <a class="navbar-brand app-title" href="dashboard">{{ trans('app.title') }}</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-menu">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="glyphicon glyphicon-user"></span> {{ \InnoSoft\CMS\Account::get_info()->fullname }} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        
                        <li class="divider"></li>
                        <li>
                            <a href="logout">
                                <span class="glyphicon glyphicon-log-out"></span> {{ trans('cms::auth.logout') }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
