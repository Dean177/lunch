import { UpdatedPersonChoice } from '../../shared/constants/actionTypes/lunchActionTypes'

export default function updatedPersonChoice(personChoice) {
  return { type: UpdatedPersonChoice, payload: personChoice }
}
