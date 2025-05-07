import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { getCustomers, addCustomer, updateCustomer } from './customerApi';

// Define a test for the Customer REST API
describe("Customer REST API", () => {

    // Reset the customer database before each test
    beforeEach(() => {
        resetCustomerDatabase();
    });

    // Reset the customer database after each test
    afterEach(() => {
        return resetCustomerDatabase();
    });

    // Test fetching all customers
    test("fetching all customers", async () => {
        const customers = await getCustomers();
        expect(customers.length).toBeGreaterThan(1);
    });

    // Test adding a new customer
    test("adding a customer", async () => {
        // Define a new customer
        const newCustomer = {
            firstname: "John",
            lastname: "Doe",
            streetaddress: "123 Main St",
            postcode: "12345",
            city: "Anytown",
            email: "john@doe.com",
            phone: "123-456-7890",
        };

        // Add a new customer using the API
        const added = await addCustomer(newCustomer);

        // Verify that the API response contains the expected properties
        expect(added).toHaveProperty("firstname", "John");
        expect(added).toHaveProperty("lastname", "Doe");
        expect(added).toHaveProperty("streetaddress", "123 Main St");
        expect(added).toHaveProperty("postcode", "12345");
        expect(added).toHaveProperty("city", "Anytown");
        expect(added).toHaveProperty("email", "john@doe.com")
        expect(added).toHaveProperty("phone", "123-456-7890");
    });

    // Test updating an existing customer
    test("updating a customer", async () => {
        const customers = await getCustomers(); // Fetches the list of customers from the API
        const customerToUpdate = customers[0]; // Selects the first customer from the list

        const updatedCustomer = {
            ...customerToUpdate, // Copy all properties of the selected customer
            firstname: "Jane", // Updates firstname 
            lastname: "Smith", // Updates lastmname 
        };

        // Send the updated customer to the API
        const updated = await updateCustomer(updatedCustomer);

        // Verify that the API response contains the updated properties
        expect(updated).toHaveProperty("firstname", "Jane");
        expect(updated).toHaveProperty("lastname", "Smith");
    });


});

// Function to reset the customer database
async function resetCustomerDatabase() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
    });
    return response.ok;
}