// Fetch all trainings from the API
export async function getTrainings() {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
    // Throw an error if the response is not ok
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Return trainings
    const trainings = data._embedded.trainings;
 
    // For each training, fetch related customer data and add it to the training object   
    const trainingsWithCustomer = await Promise.all(
        trainings.map(async (training) => {
            const customerUrl = training._links.customer.href;
    
            try {
                const customerResponse = await fetch(customerUrl);
                if (!customerResponse.ok) throw new Error();
    
                const customerWrapper = await customerResponse.json();
                const customer =
                    customerWrapper._embedded?.customers?.[0] || customerWrapper;
    
                const customerName =
                    customer?.firstname && customer?.lastname
                        ? `${customer.firstname} ${customer.lastname}`
                        : 'Unknown';
    
                
                return {
                    ...training,
                    customerName,
                };
            } catch (err) {
                // Throw an error if the customer data cannot be fetched
                console.error('Error with customer data', err);
                return {
                    ...training,
                    customerName: 'Unknown',
                };
            }
        })
    );
    // Return the trainings with customer data
    return trainingsWithCustomer;
}
 
// Add new training to the API
export async function addTraining(training) {
    // Send POST request to add a new training
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(training),
    });
 
    // Throw an error if the response is not ok
    if (!response.ok) {
        throw new Error(`Failed to add training: ${response.status}`);
    }
 
    // Parse the JSON response
    const data = await response.json();
    // Return the created training
    return data;
}
 


