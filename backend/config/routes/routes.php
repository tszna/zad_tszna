<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {
    $routes->add('hello', '/hello')
        ->controller([App\Controller\MainController::class, 'hello'])
        ->methods(['GET']);
    
    $routes->add('action', '/action')
        ->controller([App\Controller\MainController::class, 'action'])
        ->methods(['POST']);
};