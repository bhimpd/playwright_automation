import { expect } from "@playwright/test";

export function validateProduct(product: any, index: number): void {
    try {
      expect(product).toHaveProperty("id");
      expect(Number.isInteger(product.id)).toBe(true);
      expect(product.id).toBeGreaterThan(0);
  
      expect(product).toHaveProperty("name");
      expect(typeof product.name).toBe("string");
      expect(product.name.trim().length).toBeGreaterThan(0);
  
      expect(product).toHaveProperty("price");
      expect(typeof product.price).toBe("string");
      expect(product.price.trim().length).toBeGreaterThan(0);
  
      expect(product).toHaveProperty("brand");
      expect(typeof product.brand).toBe("string");
      expect(product.brand.trim().length).toBeGreaterThan(0);
  
      expect(product).toHaveProperty("category");
      expect(typeof product.category).toBe("object");
  
      expect(product.category).toHaveProperty("usertype");
      expect(typeof product.category.usertype).toBe("object");
  
      expect(product.category.usertype).toHaveProperty("usertype");
      expect(typeof product.category.usertype.usertype).toBe("string");
      expect(product.category.usertype.usertype.trim().length).toBeGreaterThan(0);
  
      expect(product.category).toHaveProperty("category");
      expect(typeof product.category.category).toBe("string");
      expect(product.category.category.trim().length).toBeGreaterThan(0);
      
    } catch (err) {
      throw new Error(
        `Validation failed at index ${index}:\n${JSON.stringify(product, null, 2)}\nError: ${err}`
      );
    }
  }
  