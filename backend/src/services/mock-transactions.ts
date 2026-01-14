import type { Transaction } from "../types/transaction.types";

const debitMerchants = [
  { name: "Whole Foods Market", category: "Groceries" },
  { name: "Trader Joe's", category: "Groceries" },
  { name: "Safeway", category: "Groceries" },
  { name: "Costco", category: "Groceries" },
  { name: "Target", category: "Shopping" },
  { name: "Amazon", category: "Shopping" },
  { name: "Walmart", category: "Shopping" },
  { name: "Best Buy", category: "Electronics" },
  { name: "Apple Store", category: "Electronics" },
  { name: "Netflix", category: "Entertainment" },
  { name: "Spotify", category: "Entertainment" },
  { name: "AMC Theatres", category: "Entertainment" },
  { name: "Shell Gas", category: "Transportation" },
  { name: "Chevron", category: "Transportation" },
  { name: "Uber", category: "Transportation" },
  { name: "Lyft", category: "Transportation" },
  { name: "Starbucks", category: "Dining" },
  { name: "Chipotle", category: "Dining" },
  { name: "McDonald's", category: "Dining" },
  { name: "Olive Garden", category: "Dining" },
  { name: "City Power", category: "Utilities" },
  { name: "Water Company", category: "Utilities" },
  { name: "Comcast", category: "Utilities" },
  { name: "AT&T", category: "Utilities" },
  { name: "CVS Pharmacy", category: "Healthcare" },
  { name: "Walgreens", category: "Healthcare" },
  { name: "Planet Fitness", category: "Health & Fitness" },
  { name: "Home Depot", category: "Home Improvement" },
  { name: "Lowe's", category: "Home Improvement" },
  { name: "Bank ATM", category: "Cash" },
];

const creditMerchants = [
  { name: "Acme Corp", category: "Income" },
  { name: "Tech Solutions Inc", category: "Income" },
  { name: "Freelance Client", category: "Income" },
  { name: "Venmo", category: "Transfer" },
  { name: "PayPal", category: "Transfer" },
  { name: "Zelle", category: "Transfer" },
  { name: "Tax Refund", category: "Income" },
  { name: "Investment Dividend", category: "Income" },
];

const transactionMethods = ["Purchase", "ACH", "ATM", "Wire", "Debit Card"];

const descriptions: Record<string, string[]> = {
  Groceries: [
    "Weekly grocery shopping",
    "Grocery run",
    "Food supplies",
    "Household essentials",
  ],
  Shopping: [
    "Online order",
    "Store purchase",
    "Household items",
    "General merchandise",
  ],
  Electronics: [
    "Tech purchase",
    "Electronics",
    "Gadget purchase",
    "Device accessories",
  ],
  Entertainment: [
    "Streaming subscription",
    "Entertainment",
    "Movie tickets",
    "Music subscription",
  ],
  Transportation: [
    "Fuel purchase",
    "Gas station",
    "Ride service",
    "Transportation",
  ],
  Dining: ["Restaurant meal", "Coffee", "Fast food", "Dining out"],
  Utilities: [
    "Monthly bill",
    "Utility payment",
    "Service charge",
    "Internet bill",
  ],
  Healthcare: ["Pharmacy purchase", "Health supplies", "Prescription", "OTC"],
  "Health & Fitness": [
    "Gym membership",
    "Fitness subscription",
    "Monthly dues",
  ],
  "Home Improvement": [
    "Home supplies",
    "Hardware purchase",
    "Home repair items",
  ],
  Cash: ["ATM withdrawal", "Cash withdrawal"],
  Income: [
    "Salary deposit",
    "Direct deposit",
    "Payroll",
    "Bonus payment",
    "Dividend payment",
  ],
  Transfer: ["Money received", "Payment received", "Transfer from friend"],
};

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateReference(): string {
  const prefix = ["REF", "TXN", "PMT", "ACH"][Math.floor(Math.random() * 4)];
  const number = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, "0");
  return `${prefix}-${number}`;
}

function generateDate(index: number): string {
  const baseDate = new Date("2026-01-14");
  const daysAgo = Math.floor(index / 2) + Math.floor(Math.random() * 3);
  baseDate.setDate(baseDate.getDate() - daysAgo);
  return baseDate.toISOString().slice(0, 10);
}

function generateAmount(category: string): number {
  const ranges: Record<string, [number, number]> = {
    Groceries: [25, 200],
    Shopping: [15, 300],
    Electronics: [50, 1500],
    Entertainment: [10, 100],
    Transportation: [20, 80],
    Dining: [8, 120],
    Utilities: [50, 250],
    Healthcare: [10, 150],
    "Health & Fitness": [20, 60],
    "Home Improvement": [30, 500],
    Cash: [40, 300],
    Income: [2000, 5000],
    Transfer: [20, 500],
  };
  const [min, max] = ranges[category] || [10, 100];
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function generateTransactions(count: number): Transaction[] {
  const transactions: Transaction[] = [];
  const creditRatio = 0.15; // ~15% credit transactions

  const defaultMerchant = { name: "Unknown", category: "Other" };

  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() < creditRatio;
    const merchants = isCredit ? creditMerchants : debitMerchants;
    const merchantIndex = Math.floor(Math.random() * merchants.length);
    const merchantData = merchants[merchantIndex] ?? defaultMerchant;
    const categoryDescriptions = descriptions[merchantData.category] || [
      "Transaction",
    ];
    const description =
      categoryDescriptions[
        Math.floor(Math.random() * categoryDescriptions.length)
      ] || "Transaction";

    transactions.push({
      id: generateUUID(),
      date: generateDate(i),
      amount: generateAmount(merchantData.category),
      merchant: merchantData.name,
      description,
      category: merchantData.category,
      categorySource: "ai",
      transactionType: isCredit ? "credit" : "debit",
      transactionMethod:
        transactionMethods[
          Math.floor(Math.random() * transactionMethods.length)
        ],
      reference: generateReference(),
    });
  }

  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export const MOCK_TRANSACTIONS: Transaction[] = generateTransactions(200);
