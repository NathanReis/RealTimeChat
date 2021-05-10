<?php

use Ratchet\{
    Http\HttpServer,
    Server\IoServer,
    WebSocket\WsServer
};
use Source\Chat;

require_once implode(
    DIRECTORY_SEPARATOR,
    [__DIR__, "..", "vendor", "autoload.php"]
);

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();
