import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  
  const handleClickNote = () => {
    setActiveEvent({
      // _id: new Date().getTime(),
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(),1),
      bgColor: '#fafafa',
      user: {
        _id: '987',
        name: 'Caleb Hernandez'
      }
    });
    openDateModal();
  }

  return (
    <button 
      onClick={handleClickNote}
      className="btn btn-primary fab">
        <i className="fas fa-plus"></i>
    </button>
  )
}
