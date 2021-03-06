import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [dispatch, formValues]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          autoComplete='off'
          className='notes__title-input'
          name='title'
          onChange={handleInputChange}
          placeholder='Some awesome title'
          type='text'
          value={title}
        />
        <textarea
          className='notes__textarea'
          name='body'
          onChange={handleInputChange}
          placeholder='What happened today'
          value={body}
          cols='12'
          rows='10'
        ></textarea>
        {/* <div className='notes__image'> it does not work like that. I had to place the class in the img tag but within a div without classes */}
        {note.url && (
          <div>
            <img className='notes__image' src={note.url} alt='landscape' />
          </div>
        )}
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
