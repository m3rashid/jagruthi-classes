import {
  Burger,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  Paper,
  Transition,
} from '@mantine/core'
import React from 'react'
import { useRouter } from 'next/router'
import { Moon, Sun } from 'tabler-icons-react'

interface IProps {
  colorScheme: any
  toggleColorScheme: () => void
}

export const HEADER_HEIGHT = 70
export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  iconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 28,
    marginLeft: theme.spacing.xs,
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === 'dark' ? theme.black : theme.colors.blue[2],
  },
}))

const TopHeader: React.FC<IProps> = ({ colorScheme, toggleColorScheme }) => {
  const router = useRouter()
  const { classes } = useStyles()
  const Icon = colorScheme === 'dark' ? Sun : Moon

  const ThemeChanger = () => (
    <Group position="center" my="xl">
      <Center className={classes.iconWrapper} aria-label="Toggle theme">
        <Icon onClick={() => toggleColorScheme()} />
      </Center>
    </Group>
  )

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size="lg" className={classes.header}>
        <ThemeChanger />
      </Container>
    </Header>
  )
}

export default TopHeader
