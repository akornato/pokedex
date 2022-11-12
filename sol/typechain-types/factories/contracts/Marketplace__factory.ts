/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Marketplace,
  MarketplaceInterface,
} from "../../contracts/Marketplace";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sellerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sellerAddress",
        type: "address",
      },
    ],
    name: "ItemCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sellerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemListed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getListing",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
        ],
        internalType: "struct Marketplace.Listing",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "NFTAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506111e1806100206000396000f3fe60806040526004361061003f5760003560e01c806388700d1c1461004457806389bfd38f146100815780639f37092a146100aa578063b2ddee06146100c6575b600080fd5b34801561005057600080fd5b5061006b60048036038101906100669190610d36565b6100ef565b6040516100789190610dc3565b60405180910390f35b34801561008d57600080fd5b506100a860048036038101906100a39190610dde565b6101b9565b005b6100c460048036038101906100bf9190610d36565b6104c6565b005b3480156100d257600080fd5b506100ed60048036038101906100e89190610d36565b610943565b005b6100f7610c6d565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000838152602001908152602001600020604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905092915050565b8282338073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16636352211e846040518263ffffffff1660e01b815260040161020c9190610e40565b602060405180830381865afa158015610229573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024d9190610e70565b73ffffffffffffffffffffffffffffffffffffffff16146102a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029a90610efa565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1663081812fc876040518263ffffffff1660e01b81526004016102f39190610e40565b602060405180830381865afa158015610310573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103349190610e70565b73ffffffffffffffffffffffffffffffffffffffff161461038a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038190610f66565b60405180910390fd5b60405180604001604052808581526020013373ffffffffffffffffffffffffffffffffffffffff168152506000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008781526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050503373ffffffffffffffffffffffffffffffffffffffff16858773ffffffffffffffffffffffffffffffffffffffff167fb29a3c5d9c9eb8230bd277c54293a0a15e98cd5592a3e0d470fe9ce59fed54f1876040516104b69190610e40565b60405180910390a4505050505050565b8181600073ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036105a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a090610fd2565b60405180910390fd5b60008060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000858152602001908152602001600020604051806040016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050348160000151146106ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a490611064565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000808201600090556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550506000808673ffffffffffffffffffffffffffffffffffffffff16632a55205a8785600001516040518363ffffffff1660e01b8152600401610770929190611084565b6040805180830381865afa15801561078c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b091906110c2565b8092508193505050826020015173ffffffffffffffffffffffffffffffffffffffff166108fc8285600001516107e69190611131565b9081150290604051600060405180830381858888f19350505050158015610811573d6000803e3d6000fd5b508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610858573d6000803e3d6000fd5b508673ffffffffffffffffffffffffffffffffffffffff166342842e0e846020015133896040518463ffffffff1660e01b815260040161089a93929190611174565b600060405180830381600087803b1580156108b457600080fd5b505af11580156108c8573d6000803e3d6000fd5b50505050826020015173ffffffffffffffffffffffffffffffffffffffff16868873ffffffffffffffffffffffffffffffffffffffff167f3e54435e36ae559863863c86ae49ae6974ff464d5ccf01c2aae2254c9131b1a686600001516040516109329190610e40565b60405180910390a450505050505050565b8181338073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16636352211e846040518263ffffffff1660e01b81526004016109969190610e40565b602060405180830381865afa1580156109b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d79190610e70565b73ffffffffffffffffffffffffffffffffffffffff1614610a2d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2490610efa565b60405180910390fd5b8484600073ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610b10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0790610fd2565b60405180910390fd5b60008060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008881526020019081526020016000206000808201600090556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550508073ffffffffffffffffffffffffffffffffffffffff16878973ffffffffffffffffffffffffffffffffffffffff167fae853d44a3ea3a7fbfb13f965e42d1b6be86290588f4f7e8e496111152e8ecb460405160405180910390a45050505050505050565b604051806040016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ccd82610ca2565b9050919050565b610cdd81610cc2565b8114610ce857600080fd5b50565b600081359050610cfa81610cd4565b92915050565b6000819050919050565b610d1381610d00565b8114610d1e57600080fd5b50565b600081359050610d3081610d0a565b92915050565b60008060408385031215610d4d57610d4c610c9d565b5b6000610d5b85828601610ceb565b9250506020610d6c85828601610d21565b9150509250929050565b610d7f81610d00565b82525050565b610d8e81610cc2565b82525050565b604082016000820151610daa6000850182610d76565b506020820151610dbd6020850182610d85565b50505050565b6000604082019050610dd86000830184610d94565b92915050565b600080600060608486031215610df757610df6610c9d565b5b6000610e0586828701610ceb565b9350506020610e1686828701610d21565b9250506040610e2786828701610d21565b9150509250925092565b610e3a81610d00565b82525050565b6000602082019050610e556000830184610e31565b92915050565b600081519050610e6a81610cd4565b92915050565b600060208284031215610e8657610e85610c9d565b5b6000610e9484828501610e5b565b91505092915050565b600082825260208201905092915050565b7f53656e646572206973206e6f74204e4654206f776e6572000000000000000000600082015250565b6000610ee4601783610e9d565b9150610eef82610eae565b602082019050919050565b60006020820190508181036000830152610f1381610ed7565b9050919050565b7f4e6f7420617070726f76656420666f72206d61726b6574706c61636500000000600082015250565b6000610f50601c83610e9d565b9150610f5b82610f1a565b602082019050919050565b60006020820190508181036000830152610f7f81610f43565b9050919050565b7f4e4654206e6f74206c6973746564000000000000000000000000000000000000600082015250565b6000610fbc600e83610e9d565b9150610fc782610f86565b602082019050919050565b60006020820190508181036000830152610feb81610faf565b9050919050565b7f56616c75652073656e7420697320646966666572656e7420746f206c6973746560008201527f64206974656d2070726963652e00000000000000000000000000000000000000602082015250565b600061104e602d83610e9d565b915061105982610ff2565b604082019050919050565b6000602082019050818103600083015261107d81611041565b9050919050565b60006040820190506110996000830185610e31565b6110a66020830184610e31565b9392505050565b6000815190506110bc81610d0a565b92915050565b600080604083850312156110d9576110d8610c9d565b5b60006110e785828601610e5b565b92505060206110f8858286016110ad565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061113c82610d00565b915061114783610d00565b925082820390508181111561115f5761115e611102565b5b92915050565b61116e81610cc2565b82525050565b60006060820190506111896000830186611165565b6111966020830185611165565b6111a36040830184610e31565b94935050505056fea264697066735822122002454d7061b247a33bd58a51119534a44958a5488e97e6d2dc0705c2f5e3a7c364736f6c63430008110033";

type MarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Marketplace__factory extends ContractFactory {
  constructor(...args: MarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Marketplace> {
    return super.deploy(overrides || {}) as Promise<Marketplace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  override connect(signer: Signer): Marketplace__factory {
    return super.connect(signer) as Marketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new utils.Interface(_abi) as MarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}
