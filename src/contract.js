import web3 from './web3';

const address = '0xae7343190b327dc994e1b9067012aab4803cb0b6';

const abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "payload",
                "type": "address"
            }
        ],
        "name": "NewPayload",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_personalPayload",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_contactPayload",
                "type": "bytes"
            }
        ],
        "name": "checkHealth",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "myHealthStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "newRegistration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_personalPayload",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_contactPayload",
                "type": "bytes"
            }
        ],
        "name": "registerContact",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_payload",
                "type": "bytes"
            }
        ],
        "name": "registerPayload",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "toggleMyHealth",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

export default new web3.eth.Contract(abi, address);
