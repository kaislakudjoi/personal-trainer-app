import { describe, test, expect, beforeEach } from 'vitest';
import { getCustomers, addCustomer, updateCustomer } from './customerApi';

describe("Customer REST API", () => {

    beforeEach(() => {
        resetCustomerDatabase();
    });

    afterEach(() => {
        return resetCustomerDatabase();
    });

    test("fetching all customers", async () => {
        const customers = await getCustomers();
        expect(customers.length).toBeGreaterThan(1);
    });

    test("adding a customer", async () => {
        const newCustomer = {
            firstname: "John",
            lastname: "Doe",
            streetaddress: "123 Main St",
            postcode: "12345",
            city: "Anytown",
            email: "john@doe.com",
            phone: "123-456-7890",
        };

        const added = await addCustomer(newCustomer);

        expect(added).toHaveProperty("firstname", "John");
        expect(added).toHaveProperty("lastname", "Doe");
        expect(added).toHaveProperty("streetaddress", "123 Main St");
        expect(added).toHaveProperty("postcode", "12345");
        expect(added).toHaveProperty("city", "Anytown");
        expect(added).toHaveProperty("email", "john@doe.com")
        expect(added).toHaveProperty("phone", "123-456-7890");
    });

    test("updating a customer", async () => {
        const customers = await getCustomers(); // Fetches the list of customers from the API.
        const customerToUpdate = customers[0]; // Selects the first customer from the list.
    
        const updatedCustomer = {
            ...customerToUpdate, // Copies all properties of the selected customer.
            firstname: "Jane", // Updates the `firstname` property.
            lastname: "Smith", // Updates the `lastname` property.
        };
    
        const updated = await updateCustomer(updatedCustomer); // Sends the updated customer to the API.
    
        // Verifies that the API response contains the updated properties.
        expect(updated).toHaveProperty("firstname", "Jane");
        expect(updated).toHaveProperty("lastname", "Smith");
    });


});

async function resetCustomerDatabase() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
    });
    return response.ok;
}