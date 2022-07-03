import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Container,
} from '@mantine/core'
import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useNotifications } from '@mantine/notifications'

import PageWrapper from 'components/pageWrapper'
import { CircleCheck, Error404 } from 'tabler-icons-react'

const Auth: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = React.useState(false)
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const { showNotification, updateNotification } = useNotifications()

  React.useEffect(() => {
    if (session) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const handleLogin = async () => {
    setLoading(true)
    showNotification({
      id: 'login',
      title: 'Login in progress',
      message: 'Please wait while we log you in',
      loading: true,
      autoClose: 5000,
      disallowClose: false,
    })
    const values = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }
    if (!values.username || !values.password) {
      updateNotification('login', {
        title: 'Login Failed',
        message: 'Please enter a username and password',
        icon: <Error404 />,
        color: 'red',
        autoClose: 5000,
        disallowClose: false,
      })
      return
    }

    try {
      await signIn('credentials', {
        ...values,
        callbackUrl: '/',
        redirect: false,
      })
      updateNotification('login', {
        color: 'green',
        title: 'Login Successful',
        message: 'You have been logged in',
        icon: <CircleCheck />,
        autoClose: 5000,
        disallowClose: false,
      })
      setLoading(false)
    } catch (err: any) {
      updateNotification('login', {
        title: 'Login Failed',
        message: 'Please use the correct Credentials and try again',
        icon: <Error404 />,
        color: 'red',
        autoClose: 5000,
        disallowClose: false,
      })
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Container size={420} my={40}>
        <Title
          order={2}
          align="center"
          sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 })}
        >
          Login as Admin Credentials to continue
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title
            order={2}
            align="center"
            mb={20}
            sx={(theme) => ({ fontFamily: theme.fontFamily })}
          >
            Login Here
          </Title>

          <TextInput
            id="username"
            label="Username"
            placeholder="username"
            ref={usernameRef}
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Your password"
            required
            ref={passwordRef}
            mt="md"
          />

          <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
            Login
          </Button>
        </Paper>
      </Container>
    </PageWrapper>
  )
}

export default Auth
