import { createFactory, useState } from "react";
import uniqid from "uniqid";

export function FormularioHelados(props) {
  const dropDowns = [];

  for (let i = 0; i < props.product.flavours; i++) {
    dropDowns.push(
      <DropDown id={`sabor-${i + 1}`} name={`Sabor ${i + 1}:`} key={uniqid()} />
    );
  }

  const [extras, setExtras] = useState({
    rocklets: { price: 100, isChecked: false },
    conos: { price: 80, count: 0 },
    salsa: { price: 110, type: null },
  });

  let totalPrice = () => {
    let total = props.product.price; //reemplazar por precio de helados

    if (extras.rocklets.isChecked) {
      total += extras.rocklets.price;
    }
    if (extras.conos.count > 0) {
      total += extras.conos.price * extras.conos.count;
    }
    if (extras.salsa.type) {
      total += extras.salsa.price;
    }
    return total;
  };

  return (
    <div id="contenedor-formulario-helados">
      <form
        id="formulario-helados"
        onSubmit={(e) => {
          e.preventDefault();
          ///////////////////////////////////
          //add flavours

          let flavoursArr = [];

          for (let i = 0; i < props.product.flavours; i++) {
            flavoursArr[i] = { required: "", optional: "" };
          }

          const requiredSelects = document.querySelectorAll(".required");
          requiredSelects.forEach((select, index) => {
            flavoursArr[index].required = select.value;
          });

          const optionalSelects = document.querySelectorAll(".optional");
          optionalSelects.forEach((select, index) => {
            flavoursArr[index].optional = select.value;
          });

          ///////////////////////////////////
          //add extras

          ///////////////////////////////////

          const fullProduct = {
            name: props.product.name,
            imgUrl: props.product.imgUrl,
            count: 1,
            extras: extras,
            flavoursArr: flavoursArr,
            price: totalPrice(),
            totalPrice: totalPrice(),
          };

          props.addIceCream(fullProduct);
          props.close();
        }}
      >
        <fieldset className="sabores">{dropDowns}</fieldset>
        <fieldset className="extra">
          <legend>Opcional:</legend>
          <div className="content">
            <label htmlFor="rocklets" className="rocklets">
              <span>Rocklets:</span>
              <input
                type="checkbox"
                name="subscribe"
                value="yes"
                id="rocklets"
                onChange={(e) => {
                  if (e.target.checked) {
                    const copy = { ...extras };
                    copy.rocklets.isChecked = true;
                    setExtras({ ...copy });
                  } else {
                    const copy = { ...extras };
                    copy.rocklets.isChecked = false;
                    setExtras({ ...copy });
                  }
                }}
              />
            </label>
            <div className="salsa">
              <label htmlFor="salsa">Salsa:</label>
              <select
                id="salsa"
                name="salsa"
                onChange={(e) => {
                  const copy = { ...extras };
                  copy.salsa.type = e.target.value;
                  setExtras({ ...copy });
                }}
              >
                <option value="">Eligue una salsa</option>
                <option value="frutilla">Frutilla</option>
                <option value="chocolate">Chocolate</option>
              </select>
            </div>
            <div className="conos">
              <label htmlFor="conos">Conos:</label>
              <div className="count">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("conos");
                    if (input.value > 0) {
                      document.getElementById("conos").value--;
                      const copy = { ...extras };
                      copy.conos.count = input.value;
                      setExtras({ ...copy });
                    }
                  }}
                >
                  -
                </button>
                <input
                  id="conos"
                  type="number"
                  min="1"
                  max="15"
                  step="1"
                  placeholder="0"
                  onChange={(e) => {
                    console.log("onchange");
                    const copy = { ...extras };
                    copy.conos.count = e.target.value;
                    setExtras({ ...copy });
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("conos");
                    input.value++;
                    const copy = { ...extras };
                    copy.conos.count = input.value;
                    setExtras({ ...copy });
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="total-helado">Total: $ {totalPrice()}</div>
        <button type="submit">Aceptar</button>
        <button
          type="button"
          onClick={() => {
            props.close();
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

function DropDown(props) {
  const sabores = ["Frutilla", "Vainilla", "Chocolate", "Mantecol"];

  function updateOptions() {
    const select1 = document.getElementById(`${props.id}`);
    const select2 = document.getElementById(`${props.id}-respaldo`);

    // Enable all options
    for (let i = 0; i < select1.options.length; i++) {
      select1.options[i].disabled = false;
    }
    for (let i = 0; i < select2.options.length; i++) {
      select2.options[i].disabled = false;
    }

    // Disable selected option in other select element
    const selectedOptionValue1 = select1.value;
    const selectedOptionValue2 = select2.value;

    for (let i = 0; i < select1.options.length; i++) {
      if (select1.options[i].value === selectedOptionValue2) {
        select1.options[i].disabled = true;
        break;
      }
    }
    for (let i = 0; i < select2.options.length; i++) {
      if (select2.options[i].value === selectedOptionValue1) {
        select2.options[i].disabled = true;
        break;
      }
    }
  }

  return (
    <fieldset className="sabor">
      <div className="input-container">
        {/* <label htmlFor={`${props.id}`}>{`${props.name}`}</label> */}
        <select
          className="required"
          name={`${props.id}`}
          id={`${props.id}`}
          onChange={updateOptions}
          required
        >
          <option value="">{`${props.name} *`}</option>
          {sabores.map((sabor) => (
            <option value={sabor} key={uniqid()}>
              {sabor}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <select
          className="optional"
          name={`${props.id}-respaldo`}
          id={`${props.id}-respaldo`}
          onChange={updateOptions}
        >
          <option value="">Respaldo / Opcional</option>
          {sabores.map((sabor) => (
            <option value={sabor} key={uniqid()}>
              {`Sino: ${sabor}`}
            </option>
          ))}
          <option value="asd">asd</option>
        </select>
      </div>
    </fieldset>
  );
}
