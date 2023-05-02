import { Stack, Typography } from '@mui/material'
import QuestionLogo from './QuestionLogo'

export function Header() {
  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
      <QuestionLogo />
      <Typography variant="h2" component="h1">
        Quiz
      </Typography>
    </Stack>
  )
}
