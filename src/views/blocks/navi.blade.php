<ul class="nav nav-pills nav-stacked app-navi nano-content">
    @foreach(config('block.navi') as $key=>$val)
    @if ($key!=='')<li class="header">{{ trans('app.'.$key) }}</li>@endif
        @foreach($val as $alias=>$route)
        <li class="{{ $alias==uri() ? 'active':'' }}">
            <a href="{{ $alias }}"><span class="{{ $route['icon'] }}"></span> <span Class="item-label">{{ trans('app.'.$alias) }}</span></a>
        </li>
        @endforeach
    @endforeach
</ul>