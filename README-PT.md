# correios-api-client

Um cliente Node.js para a API dos Correios, que permite fácil integração e gerenciamento de vários serviços dos Correios, como Token, Preço, Prazo, CEP e Rastreamento.

## Instalação

```bash
npm install correios-api-client
```

## Uso

Primeiro, você precisa inicializar o cliente da API com sua configuração.

```javascript
const apiClient = require('correios-api-client');

const configuration = {
    ambiente:  "PRODUCAO",
    idCorreios: "00000000",
    codigoAcesso:  "xxxxxxxxxxxxxx",
    contrato:  "000000000",
}

apiClient.initialize(configuration);
```

### Autenticação

Autentique-se na API dos Correios para receber tokens.

```javascript
const token = await apiClient.Token.autentica();
const tokenCartaoPostagem = await apiClient.Token.autenticaCartaoPostagem();
const tokenContrato = await apiClient.Token.autenticaContrato();
```

### Consulta de CEP

Pesquise um endereço por CEP ou recupere vários endereços.

```javascript
const endereco = await apiClient.Cep.search("85070555");
const enderecos = await apiClient.Cep.searchMany(["85070555", "85070200"]);
```

### Prazo de Entrega

Calcule o prazo de entrega para encomendas nacionais.

```javascript
const prazo = await apiClient.Prazo.nacional("04014", "85070555", "85070200");
```

### Rastreamento

Rastreie pacotes usando o número de rastreamento.

```javascript
const rastro = await apiClient.Rastro.search("LX697446262CN");
```

### Estimativa de Preço

Obtenha o preço estimado para uma entrega de pacote.

```javascript
const consultaPreco = {
    alturaCm: 20,
    cepDestino: "85070555",
    cepOrigem: "85070222",
    comprimentoCm: 20,
    diametroCm: 0,
    tipoObjeto: TiposObjeto.Pacote,
    larguraCm: 20,
    pesoEmGramas: 300,
    codigoProduto: "03220",
    isAvisoRecebimento: false,
    isMaoPropria: false,
    valorDeclarado: 200
};

const preco = await apiClient.Preco.nacional(consultaPreco);
```

## Esquemas

A biblioteca utiliza várias interfaces e enums para representar estruturas de dados.

### Interface Token

```typescript
interface Token {
    readonly ambiente: "PRODUCAO" | "HOMOLOGACAO";
    // ... outras propriedades ...
}
```

### Enum CorreiosAPIs

```typescript
enum CorreiosAPIs {
    Token = 5,
    Preco = 34,
    Prazo = 35,
    Cep = 41,
    Rastro = 87
}
```

### Interface Endereco

```typescript
interface Endereco {
    readonly cep: string;
    // ... outras propriedades ...
}
```

### Interface Prazo

```typescript
interface Prazo {
    public readonly coProduto: string;
    // ... outras propriedades ...
}
```

### Interfaces Rastro e Objeto

```typescript
interface Rastro {
    readonly versao: string;
    // ... outras propriedades ...
}

interface Objeto {
    codObjeto: string;
    // ... outras propriedades ...
}
```

### E Muito Mais...

Para a lista completa de interfaces e suas propriedades, consulte o código-fonte.

## Contribuições

Pull requests e problemas são bem-vindos. Se você encontrar algum bug ou quiser sugerir melhorias, crie um problema.

## Licença

Esta biblioteca é de código aberto e licenciada sob a [Licença MIT](LICENSE).