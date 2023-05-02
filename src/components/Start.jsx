import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export function Start() {
  const fetchQuestions = useQuestionsStore((store) => store.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(5)
  }
  return (
    <>
      <Button onClick={handleClick} variant="contained">
        Empezar
      </Button>
    </>
  )
}
