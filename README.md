# Just A Pickle DApp

A decentralized application built with Next.js, Solana, and MongoDB, featuring a modern UI with Tailwind CSS and DaisyUI. This platform enables permissionless token sales and swaps on the Solana blockchain.

## 🚀 Features

- **Token Sales Platform**

  - Create and manage token sales through an intuitive dashboard
  - Public-facing pages for each token sale
  - Permissionless participation - only requires a Solana wallet
  - Real-time token sale tracking and management

- **Token Swap Platform**

  - Decentralized token swapping functionality
  - Permissionless access with Solana wallet
  - Real-time price feeds and liquidity information

- **Technical Features**
  - Solana blockchain integration
  - Wallet connection support (Phantom, Solflare, etc.)
  - MongoDB database integration
  - Modern UI with Tailwind CSS and DaisyUI
  - TypeScript support
  - Next.js 14 framework

## 📱 Application Overview

### Token Sales Dashboard

The platform provides a comprehensive dashboard for token sale creators to:

- Create new token sales
- Set sale parameters and tokenomics
- Monitor sale progress and participation
- Manage multiple sales simultaneously

### Public Sale Pages

Each token sale has its own public-facing page where:

- Users can view sale details and tokenomics
- Participate in the sale using their Solana wallet
- Track sale progress and remaining tokens
- View historical participation data

### Token Swap Platform

The integrated swap platform allows users to:

- Swap tokens directly on-chain
- View real-time prices and liquidity
- Execute trades permissionlessly
- Access multiple trading pairs

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or remote instance)
- Solana wallet (e.g., Phantom)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd justapickledapp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🏃‍♂️ Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Initialize the database:
   Visit `http://localhost:3000/api/auth/db/tasks/launch` in your browser to create the database locally.

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Blockchain**: Solana
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: Zustand

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Support

For support, please open an issue in the GitHub repository.
