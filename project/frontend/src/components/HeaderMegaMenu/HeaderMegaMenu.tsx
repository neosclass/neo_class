import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { useNavigate } from "react-router-dom";


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const navigate = useNavigate()

  const registerForm = () => {
      navigate("/auth/register");
  }
  const loginForm = () => {
      navigate("/auth/login");
  }

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Главная
            </a>
            <a href="/users/add/course" className={classes.link}>
              Найти курс
            </a>
            <a href="/courses/create" className={classes.link}>
              Создать курс
            </a>
            <a href="/courses" className={classes.link}>
              Мои курсы
            </a>
            <a href="/users/profile" className={classes.link}>
              Аккаунт
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default" onClick={loginForm}>Войти</Button>
            <Button onClick={registerForm}>Зарегистрироваться</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
              Главная
            </a>
            <a href="/users/add/course" className={classes.link}>
              Найти курс
            </a>
            <a href="/courses/create" className={classes.link}>
              Создать курс
            </a>
            <a href="/courses" className={classes.link}>
              Мои курсы
            </a>
            <a href="/users/profile'" className={classes.link}>
              Аккаунт
            </a>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={loginForm}>Войти</Button>
            <Button onClick={registerForm}>Зарегистрироваться</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}