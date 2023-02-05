import Weather from "./Weather";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {describe, test, expect, afterEach, vi} from 'vitest'
import mockSearch from "../mocks/mockSearch.json";

describe("Weather", () => {

    afterEach(cleanup);
    afterEach(vi.restoreAllMocks);

    

    test('should render correctly', () => {
        const isRendered = render(<Weather/>);
        expect(isRendered).toBeTruthy();
    })

    test('should show "Weather App" tittle all the time', () => {
        render(
        <Weather />)
        expect(screen.getByText("Weather App")).toBeDefined();
    })

    test('should render the form elements', () => {
        render(<Weather/>)
        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        expect(input).toBeDefined();
        expect(button).toBeDefined();

    })

    // Test implicito en el test de abajo y este caso era utilzando el mock de la API en el componente Clima.jsx
    //
    // test('should search a city', async () => {
    //     render(<Clima/>)
    //     const input = screen.getByRole('textbox', {name: "search input"});
    //     const button = screen.getByRole('button', {name: /search/i});

    //     fireEvent.change(input, {target: {value: 'Santiago'}});
    //     fireEvent.click(button);

    //     const city = await screen.findByText(/Santiago de Chile/i);

    //     expect(city).toBeDefined();
    // })

    test('should display a list of 10 cities from the API when it search "Santiago"', async () => {
        vi.spyOn(window, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockSearch,
        })

        render(<Weather/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findAllByRole("listitem")).toHaveLength(10);

    })

    test('should display an error message when has a network error', async () => {
        vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network error"));
        
        render(<Weather/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        const error = await waitFor(() => screen.getByText(/Network Error/i));

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(error).toBeDefined();
    })

    test('should render the details component when a city is clicked', async () => {
        vi.spyOn(window, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockSearch,
        })

        render(<Weather/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        const city = await screen.findByText(/Santiago de Chile/i);
        fireEvent.click(city);

        expect(screen.getByText(/Current Weather/i)).toBeDefined();
        
    })

    test('should display a loading message when the API is fetching', async () => {
        vi.spyOn(window, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockSearch,
        })

        render(<Weather/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        const loading = await screen.findByText(/loading/i);

        expect(loading).toBeDefined();
    })


});