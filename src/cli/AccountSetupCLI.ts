import readline from 'readline';

export class AccountSetupCLI {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => resolve(answer));
    });
  }

  async gatherAccountInfo(): Promise<{ userId: string; name: string; email: string }> {
    console.log('Please provide the following information to create an account:');
    const userId = process.env.USER_ID || ''; // Pull userId from environment variables
    if (!userId) {
      throw new Error('USER_ID environment variable is not set.');
    }
    const name = await this.prompt('Name: ');
    const email = await this.prompt('Email: ');
    return { userId, name, email };
  }

  async gatherWalletInfo(): Promise<{ userId: string }> {
    console.log('Please provide the following information to create a wallet:');
    const userId = process.env.USER_ID || ''; // Pull userId from environment variables
    if (!userId) {
      throw new Error('USER_ID environment variable is not set.');
    }
    return { userId };
  }

  async gatherTransactionInfo(): Promise<{ fromWallet: string; toWallet: string; amount: number }> {
    console.log('Please provide the following information to create a transaction:');
    const fromWallet = await this.prompt('From Wallet ID: ');
    const toWallet = await this.prompt('To Wallet ID: ');
    const amount = parseFloat(await this.prompt('Amount (in cents): '));
    return { fromWallet, toWallet, amount };
  }

  close(): void {
    this.rl.close();
  }
}
