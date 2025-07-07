// utils/faker-data.ts
import { faker } from '@faker-js/faker';

export function generateContactFormData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: faker.lorem.sentence(4),
    message: faker.lorem.paragraph()
  };
}
