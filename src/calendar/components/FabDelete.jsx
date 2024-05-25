import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

    const { openDateModal } = useUiStore();
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDeleteNote = () => {
        startDeletingEvent();
    }

    return (
        <button
            onClick={handleDeleteNote}
            className="btn btn-danger fab-danger"
            style={{ display: `${ hasEventSelected ? '' : 'none' }` }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
