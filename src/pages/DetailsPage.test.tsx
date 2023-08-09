import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { Provider } from 'react-redux'; // Assuming you're using Redux for the store
import DetailsPage from './DetailsPage';
import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../store/reducers/locationsReducer';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ index: 0 })
}));

test('renders location details, weather details, and temp details tables', async () => {
    // Mock data for Redux state
    const mockState = {
        locations: [
            {
                name: 'England, United Kingdom',
                lat: 52.5310214,
                lon: -1.2649062
            }
        ],
    };
    const store = configureStore({
        reducer: locationsReducer, // Your root reducer
        preloadedState: mockState,
    });
    
    // Render the DetailsPage component with the mock state and router
    render(
        <Provider store={store}>
            <MemoryRouter >
                <DetailsPage />
            </MemoryRouter>
        </Provider>
    );

    // Use queries to assert the presence of specific elements
    waitFor(()=>{
    const locationTable = screen.getByTestId('location-details-table'); // Use data-testid to identify the table
    const weatherTable = screen.getByTestId('weather-details-table');
    const tempTable = screen.getByTestId('temp-details-table');

    // Assert that the tables are in the document 
    expect(locationTable).toBeInTheDocument();
    expect(weatherTable).toBeInTheDocument();
    expect(tempTable).toBeInTheDocument();
    });
    // const tables = await screen.findAllByRole('table');
    // expect(tables).not.toHaveLength(0);
});
