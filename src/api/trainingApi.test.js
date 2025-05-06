import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { getTrainings, addTraining } from './trainingApi';

// Define a test for the training REST API
describe("Training REST API", () => {

    // Reset the training database before each test
    beforeEach(() => {
        return resetTrainingDatabase()
    });
    // Reset the training database after each test
    afterEach(() => {
        return resetTrainingDatabase()
    });

    // Test fetching all trainings
    test("fetching all trainings", async () => {
        const trainings = await getTrainings();
        expect(trainings.length).toBeGreaterThan(0);
        expect(trainings[0]).toHaveProperty("customerName");
    });

    // Test adding a new training
    test("adding a training", async () => {
        // Define a new training
        const newTraining = {
            duration: 60,
            activity: "Test Activity"
        };

        // Add a new training using the API
        const added = await addTraining(newTraining);

        // Verify that the API response contains the expected properties
        expect(added).toHaveProperty("activity", "Test Activity");
        expect(added).toHaveProperty("duration", 60);
    });


});


async function resetTrainingDatabase() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
    });
    return response.ok;
}