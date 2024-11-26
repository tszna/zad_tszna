<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {
    $routes->add('list', '/list')
        ->controller([App\Controller\MainController::class, 'list'])
        ->methods(['GET']);
    
    $routes->add('action', '/action')
        ->controller([App\Controller\MainController::class, 'action'])
        ->methods(['POST']);
};