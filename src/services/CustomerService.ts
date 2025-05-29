// Example CustomerService for fetching customers and their onboarding status

type Customer = {
  id: string;
  name: string;
  email: string;
  status: string;
  // ...other fields...
};

const customers: Customer[] = [
  { id: '1', name: 'Alice RT', email: 'alice@example.com', status: 'rt_new' },
  { id: '2', name: 'Bob RT', email: 'bob@example.com', status: 'rt_in_progress' },
  { id: '3', name: 'Carol RT', email: 'carol@example.com', status: 'rt_completed' },
];

export function getAllCustomers(): Customer[] {
  return customers;
}
