# correios-api-client

A Node.js client for the Correios API, allowing for easy integration and management of various Correios services such as Token, Price, Deadline, CEP, and Tracking.

## Installation

```bash
npm install correios-api-client
```

## Usage

Firstly, you need to initialize the API client with your configuration.

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

### Authentication

Authenticate with the Correios API to receive tokens.

```javascript
const token = await apiClient.Token.autentica();
const tokenCartaoPostagem = await apiClient.Token.autenticaCartaoPostagem();
const tokenContrato = await apiClient.Token.autenticaContrato();
```

### CEP Lookup

Search for an address by CEP or retrieve multiple addresses.

```javascript
const endereco = await apiClient.Cep.search("85070555");
const enderecos = await apiClient.Cep.searchMany(["85070555", "85070200"]);
```

### Delivery Timeframe

Calculate the delivery timeframe for national packages.

```javascript
const prazo = await apiClient.Prazo.nacional("04014", "85070555", "85070200");
```

### Tracking

Track parcels using the tracking number.

```javascript
const rastro = await apiClient.Rastro.search("LX697446262CN");
```

### Price Estimation

Get the estimated price for a package delivery.

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

## Schemas

The library uses various interfaces and enums to represent data structures.

### Token Interface

```typescript
interface Token {
    readonly ambiente: "PRODUCAO" | "HOMOLOGACAO";
    // ... other properties ...
}
```

### CorreiosAPIs Enum

```typescript
enum CorreiosAPIs {
    Token = 5,
    Preco = 34,
    Prazo = 35,
    Cep = 41,
    Rastro = 87
}
```

### Endereco Interface

```typescript
interface Endereco {
    readonly cep: string;
    // ... other properties ...
}
```

### Prazo Interface

```typescript
interface Prazo {
    public readonly coProduto: string;
    // ... other properties ...
}
```

### Rastro & Objeto Interfaces

```typescript
interface Rastro {
    readonly versao: string;
    // ... other properties ...
}

interface Objeto {
    codObjeto: string;
    // ... other properties ...
}
```

### And More...

For the complete list of interfaces and their properties, please refer to the source code.

## Contributing

Pull requests and issues are welcome. If you encounter any bugs or want to suggest enhancements, please create an issue.

## License

This library is open-sourced and licensed under the [MIT License](LICENSE).

---

I hope this README provides a clear overview of the `correios-api-client` package. Make sure to customize it as per your requirements and add more details where needed.