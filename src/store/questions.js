import { create } from 'zustand'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

export const useQuestionsStore = create(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit) => {
          const res = await fetch('http://localhost:5173/data.json')
          const json = await res.json()
          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },
        selectAnswer: (questionId, answerIndex) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]

          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

          if (isCorrectUserAnswer) confetti()

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          }

          set({ questions: newQuestions })
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()
          const nextQuestion = currentQuestion + 1
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        goPrevQuestion: () => {
          const { currentQuestion } = get()
          const prevQuestion = currentQuestion - 1
          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion })
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] })
        }
      }
    },
    {
      name: 'questions'
    }
  )
)
