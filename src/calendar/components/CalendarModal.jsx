import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2'
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
export const CalendarModal = () => {

  
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onCloseModal = () => closeDateModal();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  const onInputChanged = ({ target: { value, name } }) => {
    setFormValues(form => ({
      ...form,
      [name]: value
    }));
  }

  const onDateChanged = (date, type) => {
    setFormValues(form => ({
      ...form,
      [type]: date
    }));
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end,formValues.start);
    if(isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Error en fechas',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
    if(formValues.title.length <= 0) return; 
    console.log("formValues ", formValues);
    await startSavingEvent(formValues);
    onCloseModal();
    setFormSubmitted(false);
  }

  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return formValues.title.length > 0 
    ? ''
    : 'is-invalid';

  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if(activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);
  

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal" //estilos del modal
      overlayClassName="modal-fondo" //fondo del modal
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
          <DatePicker
            showTimeSelect
            selected={formValues.start}
            onChange={(date) => onDateChanged(date, 'start')}
            className='form-control'
            dateFormat="Pp"
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">

          <label>Fecha y hora fin</label>
          <DatePicker
            showTimeSelect
            minDate={ formValues.start }
            selected={formValues.end}
            onChange={(date) => onDateChanged(date, 'end')}
            className='form-control'
            dateFormat="Pp"
            locale="es"
            timeCaption="Hora"
          />
          {/* <input className="form-control" placeholder="Fecha inicio" /> */}
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            onChange={onInputChanged}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            // type="text"
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
