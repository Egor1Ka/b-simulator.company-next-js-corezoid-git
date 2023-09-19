import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../UI/Button';
import style from './Header.module.scss';
import logo from '../../../../public/logo.svg';

function Header() {
  const router = useRouter();

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        <div className={style.logoWrapper}>
          <Link href="/">
            <Image
              src={logo}
              alt="simulator"
              height="23"
            />
          </Link>
        </div>

        <div className={style.linkGroup}>
          <ul>
            <li className={cn({
              [style.active]: router.asPath === '/',
            })}
            >
              <Link href="/" passHref>Home</Link>
            </li>
            <li className={cn({
              [style.active]: router.asPath === '/read',
            })}
            >
              <Link href="/read" passHref>Read</Link>
            </li>
            <li className={cn({
              [style.active]: router.asPath === '/get',
            })}
            >
              <Link href="/get" passHref>Get</Link>
            </li>
            <li className={cn({
              [style.active]: router.asPath === '/contact',
            })}
            >
              <Link href="/contact" passHref>Contact</Link>
            </li>
          </ul>
        </div>

        <div className={style.loginGroup}>
          <Button type="outlined">Login</Button>
          <Button>Create Actor</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
