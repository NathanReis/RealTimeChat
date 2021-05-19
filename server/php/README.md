# Back-end

## Implementação com PHP

Foi utilizada a dependência externa [Ratchet](http://socketo.me/) v0.4 para criação do servidor com Web Sockets assim como manipulação das conexões.

### Ambiente de desenvolvimento

- [PHP](https://www.php.net/) v8.0
- [Visual Studio Code](https://code.visualstudio.com/)
- [Composer](https://getcomposer.org/) v2.0

### Práticas de desenvolvimento

- [PSR-1](https://www.php-fig.org/psr/psr-1/) e [PSR-12](https://www.php-fig.org/psr/psr-12/) para estilo de código
- [PSR-4](https://www.php-fig.org/psr/psr-4/) para autoload através do Composer

### Colocando em uso (Desenvolvimento)

```bash
git clone https://github.com/NathanReis/RealTimeChat.git

cd RealTimeChat/server/php

php composer.phar install

php public/index.php

```
