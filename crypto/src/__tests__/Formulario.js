import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";

import { MONEDAS, CRYPTOS } from "../__mocks__/cryptocurrency";
import axios from "axios";

const mockAxios = axios;
const guardarCriptomonedas = jest.fn();
const guardarMoneda = jest.fn();

test("Testing <Formulario />", async () => {
    try {
        mockAxios.get = jest.fn().mockResolvedValue({
            data: CRYPTOS,
        });

        render(
            <Formulario
                guardarCriptomoneda={guardarCriptomonedas}
                guardarMoneda={guardarMoneda}
            />
        );

        //Verify Currency options
        const currency_select = screen.getByTestId("currency-select");
        expect(currency_select.children.length).toEqual(MONEDAS.length + 1);

        //Get Crypto options

        //Verify Currency options
        const crypto_options = await screen.findAllByTestId("crypto-option");
        expect(crypto_options).toHaveLength(10);
    } catch (error) {
        console.log(error);
    }
});
