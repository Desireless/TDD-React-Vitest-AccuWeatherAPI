import Clima from "./Clima";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {describe, test, expect, afterEach, vitest, beforeEach, beforeAll, vi} from 'vitest'
import mockSearch from "../mocks/mockSearch.json";

describe("Weather", () => {

    afterEach(cleanup);
    afterEach(vi.restoreAllMocks);

    

    test('should render correctly', () => {
        const isRendered = render(<Clima/>);
        expect(isRendered).toBeTruthy();
    })

    test('should show "Weather App" tittle all the time', () => {
        render(
        <Clima />)
        expect(screen.getByText("Weather App")).toBeDefined();
    })

    test('should render the form elements', () => {
        render(<Clima/>)
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

        render(<Clima/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(await screen.findAllByRole("listitem")).toHaveLength(10);

    })

    test('should display an error message when has a network error', async () => {
        vi.spyOn(window, "fetch").mockRejectedValueOnce(new Error("Network error"));
        
        render(<Clima/>);

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

        render(<Clima/>);

        const input = screen.getByRole('textbox', {name: "search input"});
        const button = screen.getByRole('button', {name: /search/i});

        fireEvent.change(input, {target: {value: 'Santiago'}});
        fireEvent.click(button);

        const city = await screen.findByText(/Santiago de Chile/i);
        fireEvent.click(city);

        expect(screen.getByText(/Current Weather/i)).toBeDefined();
        
    })


});