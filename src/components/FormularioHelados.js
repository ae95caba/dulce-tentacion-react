import { createFactory, useEffect, useState, useRef } from "react";

export function FormularioHelados(props) {
  //checks how many dropDowns are
  // every dropDown will be this : { index: index, value: value }
  const [dropDowns, setDropDowns] = useState([]);
  const [extras, setExtras] = useState({
    rocklets: { price: 100, isChecked: false },
    conos: { price: 80, count: 0 },
    salsa: { price: 110, type: null },
  });

  //creates dropDowns representations on state for each flavour avaliable to choose
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < props.product.flavours; i++) {
      arr.push({ index: i, value: undefined });
    }
    setDropDowns(arr);
  }, []);

  //switches the body overflow property
  useEffect(() => {
    // Code to run on mount
    document.body.style.overflow = "hidden";
    return () => {
      // Code to run on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  ///////////read from localStorage
  useEffect(() => {
    const myObjectString = localStorage.getItem("myObject");
    const myObjectParsed = JSON.parse(myObjectString);
    console.log(myObjectParsed); // Output: { name: "John", age: 30 }
  }, []);

  //////////write to localStorage
  useEffect(() => {
    const myObject = { name: "John", age: 30 };
    // Storing an object in local storage
    localStorage.setItem("myObject", JSON.stringify(myObject));
  }, [dropDowns]);

  let totalPrice = () => {
    let total = props.product?.price; //reemplazar por precio de helados

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

  //adds a dropDown
  function addFlavour() {
    const copy = [...dropDowns];
    copy.push({ index: dropDowns.length, value: null });
    setDropDowns(copy);
  }

  //onClose, remove fadein class (OPTIONAL), add fadeout clasee, set onAnimationend : Close

  const formRef = useRef(null);
  function handleAnimationEnd() {
    console.log("Animation ended");
    props.close();
  }

  function animateAndClose() {
    formRef.current.addEventListener("animationend", handleAnimationEnd);

    formRef.current.classList.add("animate__fadeOutLeft");
  }

  useEffect(() => {
    const currentRef = formRef.current;
    return () => {
      currentRef.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  //////////////////////////////////////

  return (
    <form
      id="formulario-helados"
      ref={formRef}
      className="animate__animated animate__fadeInLeft"
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
      <fieldset className="sabores">
        <legend>Podes elegir hasta {props.product?.flavours} sabores</legend>
        {dropDowns.map((dropDown, index) => (
          <DropDown
            flavours={props.flavours}
            dropDowns={dropDowns}
            setDropDowns={setDropDowns}
            name={`Sabor ${index + 1}`}
            key={`${index}-${dropDown}`}
            index={index}
          />
        ))}
        {dropDowns.length < props.product?.flavours ? (
          <div
            className="add-flavour"
            onClick={() => {
              addFlavour();
            }}
          >
            <p>
              AGREGAR <span>+</span>
            </p>
          </div>
        ) : null}
      </fieldset>
      <fieldset className="extra">
        <legend
          className="dropdown-button animate__animated animate__pulse animate__infinite animate__slower"
          onClick={() => {
            const content = document.querySelector(".extra-content");
            content.style.display === "none"
              ? (content.style.display = "grid")
              : (content.style.display = "none");
          }}
        >
          Adicionales <img src="/img/arrow-down.svg" />
        </legend>
        <div className="extra-content" style={{ display: "none" }}>
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
                  // extras = { ...copy };
                } else {
                  const copy = { ...extras };
                  copy.rocklets.isChecked = false;
                  setExtras({ ...copy });
                  // extras = { ...copy };
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
                //extras = { ...copy };
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
              <div
                className="decrease"
                onClick={() => {
                  const input = document.getElementById("conos");
                  if (input.value > 0) {
                    document.getElementById("conos").value--;
                    const copy = { ...extras };
                    copy.conos.count = input.value;
                    setExtras({ ...copy });
                    // extras = { ...copy };
                  }
                }}
              >
                -
              </div>
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
                  // extras = { ...copy };
                }}
              />
              <div
                className="increase"
                onClick={() => {
                  const input = document.getElementById("conos");
                  input.value++;
                  const copy = { ...extras };
                  copy.conos.count = input.value;
                  setExtras({ ...copy });
                  // extras = { ...copy };
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <div className="total-helado">Total: $ {totalPrice()}</div>
      <div className="buttons-container">
        <button
          type="submit"
          className="binary-buttons neon-red animate__animated animate__pulse animate__infinite animate__slower"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => {
            /*  props.close(); */
            animateAndClose();
          }}
        >
          Atras
        </button>
      </div>
      <img
        className="close"
        src="/img/return.svg"
        alt="return"
        onClick={() => {
          /*  props.close(); */
          animateAndClose();
        }}
      />
    </form>
  );
}

function DropDown(props) {
  function isValueSelected(value) {
    let result = false;
    props.dropDowns.forEach((dropDown) => {
      if (dropDown.value === value) {
        result = true;
      }
    });
    return result;
  }

  return (
    <fieldset className="sabor">
      <div className="input-container">
        <select
          className="required"
          name={props.name}
          //the value has to come from state because, the onChange triggers a re-render so the value resets
          //it reseted because the options key was uniqid() so it was diferent every re-render
          /*  value={props.dropDowns[props.index].value} */
          onChange={(e) => {
            //updates the dropDown representation in the state
            const copy = [...props.dropDowns];
            copy[props.index].value = e.target.value;
            props.setDropDowns(copy);
          }}
          required
        >
          <option value="">Elegi un sabor</option>
          {props.flavours?.map((sabor, index) => (
            <option
              value={sabor}
              key={`${index}-option`}
              disabled={isValueSelected(sabor)}
            >
              {sabor}
            </option>
          ))}
        </select>
        {props.index !== 0 ? (
          <span
            onClick={() => {
              const copy = [...props.dropDowns];
              copy.splice(props.index, 1);
              props.setDropDowns(copy);
            }}
          >
            X
          </span>
        ) : (
          <span style={{ opacity: "0.4" }}>X</span>
        )}
      </div>
    </fieldset>
  );
}
