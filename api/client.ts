
import { DocStatus } from './types/core';
import { PurchaseRequisition } from './types/purchasing';
import { faker } from '@faker-js/faker';

// This is a simplified mock data generator.
// In a real app, this would be replaced by MSW or a real API.

const generateMockPRs = (count: number): PurchaseRequisition[] => {
  return Array.from({ length: count }, (_, i) => {
    const lines = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const qty = faker.number.int({ min: 1, max: 100 });
      const unitPrice = faker.number.int({ min: 10000, max: 1000000 });
      return {
        id: faker.string.uuid(),
        item: {
          id: faker.string.uuid(),
          code: `ITM-${faker.string.alphanumeric(5).toUpperCase()}`,
          name: faker.commerce.productName(),
          uom: 'Unit',
        },
        description: faker.lorem.sentence(),
        qty,
        uom: 'Unit',
        unitPrice,
        total: qty * unitPrice,
        costCenter: {
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            code: `CC-${faker.string.alphanumeric(3).toUpperCase()}`
        }
      };
    });

    const total = lines.reduce((acc, line) => acc + line.total, 0);

    return {
      id: faker.string.uuid(),
      docNo: `PR-2024-${String(i + 1).padStart(5, '0')}`,
      docDate: faker.date.recent({ days: 90 }).toISOString(),
      status: faker.helpers.arrayElement(Object.values(DocStatus)),
      requester: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      department: faker.commerce.department(),
      lines,
      total,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      createdBy: { id: faker.string.uuid(), name: faker.person.fullName(), email: faker.internet.email() },
      updatedBy: { id: faker.string.uuid(), name: faker.person.fullName(), email: faker.internet.email() },
    };
  });
};

const allPRs = generateMockPRs(123);

interface FetchParams {
  page?: number;
  perPage?: number;
  q?: string;
  status?: string;
  sort?: string;
  dir?: 'asc' | 'desc';
}

// Simulates an API call
export const fetchPRs = async ({
  page = 1,
  perPage = 10,
  q = '',
  status = '',
  sort = 'docDate',
  dir = 'desc',
}: FetchParams) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredPRs = allPRs;

  if (q) {
    const searchTerm = q.toLowerCase();
    filteredPRs = filteredPRs.filter(
      (pr) =>
        pr.docNo.toLowerCase().includes(searchTerm) ||
        pr.requester.name.toLowerCase().includes(searchTerm)
    );
  }

  if (status) {
    filteredPRs = filteredPRs.filter((pr) => pr.status === status);
  }
  
  // Sorting
  filteredPRs.sort((a, b) => {
    const aValue = a[sort as keyof PurchaseRequisition];
    const bValue = b[sort as keyof PurchaseRequisition];
    
    if (aValue === undefined || bValue === undefined) return 0;

    let comparison = 0;
    if (aValue > bValue) {
      comparison = 1;
    } else if (aValue < bValue) {
      comparison = -1;
    }

    return dir === 'desc' ? comparison * -1 : comparison;
  });

  const total = filteredPRs.length;
  const totalPages = Math.ceil(total / perPage);
  const data = filteredPRs.slice((page - 1) * perPage, page * perPage);

  return {
    data,
    meta: {
      currentPage: page,
      perPage,
      total,
      totalPages,
    },
  };
};
