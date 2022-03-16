import {useContext} from 'react'
import {petFormContext} from '../context/newPetFormContext'

export default function useNewPetForm() {
 return useContext(petFormContext);
};
   