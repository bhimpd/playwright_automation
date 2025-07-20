import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

const filePath = "./tmp/user_details.json";

export interface UserDetails {
  name: string;
  email: string;
  password: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  address: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  };
  createdAt: string;
}

export function saveUserDetails(details: Omit<UserDetails, "createdAt">): void {
  const dir = dirname(filePath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const fullDetails: UserDetails = {
    ...details,
    createdAt: new Date().toISOString(),
  };

  writeFileSync(filePath, JSON.stringify(fullDetails, null, 2));
}

export function getUserDetails(): UserDetails {
  if (existsSync(filePath)) {
    const fileData = readFileSync(filePath, "utf-8").trim();
    return JSON.parse(fileData);
  } else {
    throw new Error("User details file does not exist. Run the registration test first.");
  }
}
