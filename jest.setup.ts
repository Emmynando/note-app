// import "@testing-library/jest-dom/extend-expect";
// import "@testing-library/jest-dom/matchers";
// import "jest-fetch-mock";
// jest.mock("node-fetch", () => require("jest-fetch-mock"));
// jest.fetchMock.enableMocks();

import "@testing-library/jest-dom/matchers";
import "jest-fetch-mock";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();
