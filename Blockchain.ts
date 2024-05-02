import * as crypto from 'crypto';

class Block {
  public index: number;
  public timestamp: number;
  public data: any;
  public previousHash: string;
  public hash: string;

  constructor(index: number, timestamp: number, data: any, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).digest('hex');
  }
}

class Blockchain {
  public chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Example of using
const myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, Date.now(), { weather: 'Sunny' }));
myBlockchain.addBlock(new Block(2, Date.now(), { weather: 'Cloudy' }));

console.log('Blockchain is valid:', myBlockchain.isChainValid());
console.log(JSON.stringify(myBlockchain, null, 2));

export { Blockchain, Block };
