import { faker } from "@faker-js/faker";

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: [],
    code: faker.lorem.word(),
    stock: faker.number.int(),
    category: faker.commerce.department(),
  };
};
