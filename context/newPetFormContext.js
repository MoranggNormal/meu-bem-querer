import { createContext, useReducer } from "react";

export const petFormContext = createContext();

export function NewPetFormProvider({ children }) {
 const auth = useFormValues()
 return <petFormContext.Provider value={auth}>{children}</petFormContext.Provider>;
}


const inputValues = {
 petName: '',
 petType: '',
 petRace: '',
 petWeight: '',
 petSize: '',
 petGender: '',
 petAge: '',
 petCity: '',
 petState: '',
 petDescription: '',
 isPetDeficient: false,
 isPetSick: false,
 petImage: '',
};

function reducer(state, action) {
 switch (action.type) {
 case 'petName':
  return {...state, petName: action.value}
 case 'petType':
  return {...state, petType: action.value}
 case 'petRace':
  return {...state, petRace: action.value}
 case 'petWeight':
  return {...state, petWeight: action.value}
 case 'petSize':
  return {...state, petSize: action.value}
 case 'petCity':
  return {...state, petCity: action.value}
 case 'petState':
  return {...state, petState: action.value}
 case 'isPetDeficient':
  return {...state, isPetDeficient: action.value}
 case 'isPetSick':
  return {...state, isPetSick: action.value}
 case 'petGender':
  return {...state, petGender: action.value}
 case 'petAge':
  return {...state, petAge: action.value}
 case 'petDescription':
  return {...state, petDescription: action.value}
 case 'petImage':
  return {...state, petImage: action.value}
 default:
  console.log('oxi');
 }
}

const useFormValues = () => {
    
 const [state, dispatch] = useReducer(reducer, inputValues);


 const handleChange = (type, value) => {
  dispatch({type: type, value: value})
 }

 return {
  state,
  handleChange
 }
}