import { describe, test } from "vitest";
import { heroApi } from "./heroe.api";

describe('HeroApi', () => {
    test('should be configure pointing to the testing server', () => {
        console.log(heroApi.defaults.baseURL);
    })
}) 