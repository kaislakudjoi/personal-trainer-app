// Fetch all customers from the API
export async function getCustomers() {
    // Send GET request to fetch customer data
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
    // Throw an error if the response is not ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Return the list of customers
    return data._embedded.customers;
}

// Add new customer to the API
export async function addCustomer(customer) {
    // Send POST request to add a new customer
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    // Throw an error if the response is not ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Return the created customer
    return data;
};

// Update existing customer in the API
export async function updateCustomer(customer) {
    // Send PUT request to update the customer
    const response = await fetch(customer._links.self.href, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    // Throw an error if the response is not ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Return the updated customer
    return data;
};




