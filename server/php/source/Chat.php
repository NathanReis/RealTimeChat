<?php

namespace Source;

use Ratchet\{
    ConnectionInterface,
    MessageComponentInterface
};

class Chat implements MessageComponentInterface
{
    protected \SplObjectStorage $connections;

    public function __construct()
    {
        $this->connections = new \SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $connection)
    { 
        $this->connections->attach($connection);

        echo "Nova conexão: {$connection->resourceId}" . PHP_EOL;
    }

    public function onClose(ConnectionInterface $connection)
    {
        $this->connections->detach($connection);

        echo "Conexão encerrada: {$connection->resourceId}" . PHP_EOL;
    }

    public function onError(ConnectionInterface $connection, \Exception $error)
    {
        $connection->close();

        echo "Erro: {$error->getMessage()}" . PHP_EOL;
        echo "Para conexão: {$connection->resourceId}" . PHP_EOL;
    }

    public function onMessage(ConnectionInterface $senderConnection, $message)
    {
        foreach ($this->connections as $connection) {
            if ($connection !== $senderConnection) {
                $connection->send($message);
            }
        }
    }
}
