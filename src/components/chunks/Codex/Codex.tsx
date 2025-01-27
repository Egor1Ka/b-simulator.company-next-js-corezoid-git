'use client';

import Image from 'next/image';
import Button from '@/components/UI/Button';
import img from '../../../../public/book.png';
import style from './Codex.module.scss';

const Codex: React.FC = () => {
  const goToLearnMore = () => {
    const newWindow = window.open('https://control.events', '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <div className={style.codexContainer}>
      <div className={style.containerGroup}>
        <div className={style.imgBlock}>
          <Image
            priority
            src={img}
            alt="book"
          />
        </div>
        <div className={style.contentBlock}>
          <h4>
            Codex of Actors:
            {' '}
            <br />
            The EmergencE(Y) Thinkbook
          </h4>
          <p>
            Alexander Vityaz
          </p>
          <Button onClick={goToLearnMore}>Learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default Codex;
