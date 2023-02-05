import Details from "./Details";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import {describe, test, expect, afterEach, vi} from 'vitest';
import mockCondition from '../mocks/mockCondition.json';

describe("Details", () => {

    afterEach(cleanup);
    afterEach(vi.restoreAllMocks);

    // Este componente es llamado en Clima.jsx, por lo que el test de render se hace en Clima.test.jsx


    // test implicito en el test de abajo y este caso era utilzando el mock de la API en el componente Details.jsx
    //
    // test('should display city current condition', async () => {
    //     render(<Details code={60449} country={"Chile"} city={"Santiago de Chile"} />)
    //     const heading = screen.getByRole('heading', {name: "Current Weather"});
    //     const temperature = screen.getByText(/15.2/i);
    //     const weatherText = screen.getByText(/Soleado/i);
    //     const location = screen.getByText(/Santiago de Chile, Chile/i);

    //     expect(heading).toBeDefined();
    //     expect(temperature).toBeDefined();
    //     expect(weatherText).toBeDefined();
    //     expect(location).toBeDefined();
    // })



    test('should display API data', async () => {
        vi.spyOn(window, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockCondition,
        });

        render(<Details code={60449} country={"Chile"} city={"Santiago de Chile"} />)

        const temperature = await screen.findByText(/15.2/i);
        const weatherText = await screen.findByText(/Soleado/i);
        const location = await screen.findByText(/Santiago de Chile, Chile/i);

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(temperature).toBeDefined();
        expect(weatherText).toBeDefined();
        expect(location).toBeDefined();

    })

    test('should display an error message when the API fails', async () => {
        vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network Error"));

        render(<Details code={60449} country={"Chile"} city={"Santiago de Chile"} />)

        const error = await waitFor(() => screen.getByText(/Network Error/i));

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(error).toBeDefined();
    })

    test('should display a loading message', async () => {
        vi.spyOn(window, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockCondition,
        });

        render(<Details code={60449} country={"Chile"} city={"Santiago de Chile"} />)

        const loading = await screen.findByText(/loading/i);

        expect(loading).toBeDefined();
    })


})