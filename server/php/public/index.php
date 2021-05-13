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

$PORT = 8080;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    $PORT
);

echo "Server is running on port {$PORT}!" . PHP_EOL;

$server->run();
