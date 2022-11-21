import React from "react";
import {render} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Table from "./Table";
const axios = jest.genMockFromModule('axios');
// import MockAdapter from 'axios-mock-adapter';
// const mockAdapter = new MockAdapter(axios.create());

// mock data
const url = "https://mocks"
const data = [
    {
        id: 1,
        title: "title 1",
        body: "body 2"
    },
    {
        id: 2,
        title: "title 2",
        body: "body 2"
    },
    {
        id: 3,
        title: "title 3",
        body: "body 3"
    }
]

describe("LoadTable test", () => {
    let wrapper;

    // clear all mocks
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders with loading", () => {
        wrapper = render(<Table />);
        expect(wrapper.find("h1").first().text()).toBe("Loading...");
    });

    test("loads table", async (object, method) => {
        // mock axios promise
        await act(async () => {
            await axios.get.mockResolvedValueOnce(() => {data: data});
            wrapper = render(<Table />);
        });

        // check the render output
        wrapper.update();

        await expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts");

        await expect(axios.get).toHaveBeenCalledTimes(1);
    });
});