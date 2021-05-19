# Front-end

## Implementação estática

Foi utilizada a dependência externa [Bootstrap](https://getbootstrap.com/) v5.0 para estilização da página.

A conexão com o servidor para uso dos Web Sockets foi feita através do objeto [WebSocket](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSocket).

### Colocando em uso (Desenvolvimento)

```bash
git clone https://github.com/NathanReis/RealTimeChat.git

cd RealTimeChat/web

```

Abra o arquivo index.html no navegador de sua preferência.

### Utilizando back-end PHP

1. Na função "connectWebSocket", utilizar a string "ws://localhost:8080" como parâmetro no momento de instânciar o objeto WebSocket.

### Utilizando back-end NodeJs

1. Na função "connectWebSocket", utilizar a string "ws://localhost:8080" como parâmetro no momento de instânciar o objeto WebSocket.

### Utilizando back-end Java

1. Na função "connectWebSocket", utilizar a string "ws://localhost:8080/java/realtimechat" como parâmetro no momento de instânciar o objeto WebSocket.
