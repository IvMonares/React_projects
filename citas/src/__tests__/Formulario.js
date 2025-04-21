import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test("<Formulario> Load form and verify everything is correct", () => {
    render(<Formulario crearCita={crearCita} />);
    // const wrapper.debug();

    //Heading
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H2");
    expect(title.tagName).not.toBe("H1");
    expect(title.textContent).toBe("Crear Cita");

    //Submit Button
    const btn_submit = screen.getByTestId("btn-submit");
    expect(btn_submit).toBeInTheDocument();
    expect(btn_submit.tagName).toBe("BUTTON");
    expect(btn_submit.tagName).not.toBe("INPUT");
    expect(btn_submit.textContent).toBe("Agregar Cita");
});

test("<Formulario> Validation", () => {
    render(<Formulario crearCita={crearCita} />);

    // Click submit
    const btn_submit = screen.getByTestId("btn-submit");
    fireEvent.click(btn_submit);

    //Verify alert is pressent.
    let alert = screen.queryByTestId("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.tagName).toBe("P");
    expect(alert.tagName).not.toBe("DIV");
    expect(alert.textContent).toBe("Todos los campos son obligatorios");

    // Inputs
    const input_mascota = screen.getByTestId("mascota");
    const input_propietario = screen.getByTestId("propietario");
    const input_fecha = screen.getByTestId("fecha");
    const input_hora = screen.getByTestId("hora");
    const input_sintomas = screen.getByTestId("sintomas");

    //Edit inputs
    userEvent.type(input_mascota, "Mascota");
    userEvent.type(input_propietario, "Propietario");
    userEvent.type(input_fecha, "2020-12-21");
    userEvent.type(input_hora, "12:15");
    userEvent.type(input_sintomas, "Sintomas");

    //Submit form
    fireEvent.click(btn_submit);

    //Verify alert is not present
    alert = screen.queryByTestId("alert");
    expect(alert).not.toBeInTheDocument();

    //Verify appointment was made
    expect(crearCita).toHaveBeenCalledTimes(1);

    //Verify inputs were cleared
    expect(input_mascota.value).toBe("");
    expect(input_propietario.value).toBe("");
    expect(input_fecha.value).toBe("");
    expect(input_hora.value).toBe("");
    expect(input_sintomas.value).toBe("");
});
