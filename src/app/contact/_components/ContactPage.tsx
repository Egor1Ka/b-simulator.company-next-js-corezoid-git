'use client';

import classNames from 'classnames';
import { useState } from 'react';
import Image from 'next/image';
import emailSubscribeRequest from '@/API/emailSubscribeRequest';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import ContactCard from '@/components/chunks/ContactCard';
import SuccessNotifyModal from '@/components/chunks/SuccessNotifyModal';
import TextUnderlied from '@/components/chunks/TextUnderlied';
import isEmailValid from '@/helpers/regularExpressions/isEmailValid';
import useTranslate from '@/hooks/useTranslate';
import imageWorkshop from '../../../../public/images/workshop.png';
import SertificateIcon from '../../../../public/icons/sertificateIcon.svg';
import BookIcon from '../../../../public/icons/book.svg';
import DemoIcon from '../../../../public/icons/demo.svg';
import PresentationIcon from '../../../../public/icons/presentation.svg';
import styles from '../ContactPage.module.scss';

const contactUsCDU = process.env.NEXT_PUBLIC_CONTAT_US_SDU_LINK;

const ContactPage = () => {
  const { t } = useTranslate();
  const [emailDemo, setEmailDemo] = useState('');
  const [emaiDemolError, setEmailDemoError] = useState<null | string>(null);
  const [hasEnteredInvalidEmaiDemolOnce, setDemoOnce] = useState(true);

  const [emailPresentation, setEmailPresentation] = useState('');
  const [emailErrorPresentation, setEmailErrorPresentation] = useState<null | string>(null);
  const [hasEnteredInvalidPresentationlOnce, setPresentationlOnce] = useState(true);

  const [isModalOpenGetPresentation, setIsModalGetPresentation] = useState(false);
  const [isModalOpenRequestDemo, setIsModalRequestDemo] = useState(false);

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const getPresentationModalHandler = () => setIsModalGetPresentation((prev) => !prev);
  const requestDemoModalHandler = () => setIsModalRequestDemo((prev) => !prev);

  const handleChangeEmailPresentation = (value: string) => {
    if (value.length === 0) {
      setEmailErrorPresentation(null);
    } else if (!hasEnteredInvalidPresentationlOnce && !isEmailValid(value)) {
      setEmailErrorPresentation('Invalid email address');
    } else {
      setEmailErrorPresentation(null);
    }
    setEmailPresentation(value);
  };

  const handleSendEmailClickPresentation = async () => {
    if (!emailPresentation) {
      setEmailErrorPresentation('Email is required');
    } else if (!isEmailValid(emailPresentation)) {
      setEmailErrorPresentation('Invalid email address');
      setPresentationlOnce(false);
    } else if (!emailErrorPresentation) {
      try {
        await emailSubscribeRequest(emailPresentation, 'GET_Presentation');
        setEmailPresentation('');
        setPresentationlOnce(true);
        setIsModalGetPresentation(true);
      } catch (error) {
        setEmailErrorPresentation('Sorry try again later');
      }
    }
  };

  const handleChangeEmailDemo = (value: string) => {
    if (value.length === 0) {
      setEmailDemoError(null);
    } else if (!hasEnteredInvalidEmaiDemolOnce && !isEmailValid(value)) {
      setEmailDemoError('Invalid email address');
    } else {
      setEmailDemoError(null);
    }
    setEmailDemo(value);
  };

  const handleSendEmailClickDemo = async () => {
    if (!emailDemo) {
      setEmailDemoError('Email is required');
    } else if (!isEmailValid(emailDemo)) {
      setEmailDemoError('Invalid email address');
      setDemoOnce(false);
    } else if (!emaiDemolError) {
      try {
        await emailSubscribeRequest(emailDemo, 'GET_Demo');
        setEmailDemo('');
        setDemoOnce(true);
        setIsModalRequestDemo(true);
      } catch (error) {
        setEmailDemoError('Sorry try again later');
      }
    }
  };

  const handleIframeLoad = () => {
    setTimeout(() => setIframeLoaded(true), 500);
  };

  const containerClasses = classNames({
    [styles.contactUsIframeContainer]: true,
    [styles.loaded]: iframeLoaded,
  });
  return (
    <div className={styles.main}>
      <div className={`${styles.container} contact`}>
        <SuccessNotifyModal
          visible={isModalOpenGetPresentation}
          onClose={getPresentationModalHandler}
          title="Thank you for reaching out to us!"
          description=" Your submission has been received and we'll reply as soon as possible."
        />
        <SuccessNotifyModal
          visible={isModalOpenRequestDemo}
          onClose={requestDemoModalHandler}
          title="Thank you for reaching out to us!"
          description=" Your submission has been received and we'll reply as soon as possible."
        />
        <h1 className={`${styles.contactTitle}`}>
          {t('contact.contact')}
          {' '}
          <TextUnderlied>{t('contact.us')}</TextUnderlied>
          {' '}
        </h1>
        <section className={styles.contactUs}>
          <div className={styles.contactUsInfo}>
            <h2 className={styles.contactUsTitle}>{t('contact.contactUs__title')}</h2>
            <p className={styles.contactUsDescription}>{t('contact.contactUs__description')}</p>
          </div>
          <div className={containerClasses}>
            <iframe
              onLoad={handleIframeLoad}
              title="Script"
              src={contactUsCDU}
              className={styles.contactUsIframe}
            />
          </div>
        </section>
        <section className={styles.workshopSection}>
          <div className={styles.workshopImageSection}>
            <div className={styles.workshopImageContainer}>
              <Image alt="workshop" src={imageWorkshop} className={styles.workshopImage} />
              <div className={styles.workshopImageDescription}>
                The Curse of Frankenstein (1957) movie still
              </div>
            </div>
          </div>
          <div className={styles.workshopInfoContainer}>
            <h2 className={styles.workshopInfoTitle}>
              <TextUnderlied>
                <p>{t('contact.workshop__title')}</p>
              </TextUnderlied>
              <br />
              {t('contact.workshop__сase')}
            </h2>
            <div>
              <span className={styles.workshopInfoDetails}>
                {' '}
                {t('contact.workshop__participants')}
                {' '}
              </span>
              <span className={styles.workshopInfoDetails}>{t('contact.workshop__price')}</span>
            </div>
            <p className={styles.workshopInfoTrainingProgram}>
              {t('contact.workshop__training__program')}
            </p>
            <p className={styles.workshopInfoDescription}>{t('contact.workshop__description')}</p>
            <div className={styles.workshopInfoButtonContainer}>
              <Button
                styleClass={styles.workshopInfoButton}
                type="secondary"
                link={process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_LINK}
              >
                Book workshop
              </Button>
            </div>
          </div>
        </section>
        <section className={styles.knowledgeCardContainer}>
          <ContactCard
            icon={<SertificateIcon />}
            title="Certification"
            options={['Junior', 'Middle', 'Senior']}
            type="active"
            styleClass={styles.card1}
            description="Junior Test: 20 min <br /> Middle Test: 6 hours <br /> Senior Test: 12 hours"
            button={(
              <Button
                styleClass={styles.knowledgeCardButton}
                type="secondary"
                link={process.env.COREZOID_CERTIFICATION_LINK}
              >
                Request Certification
              </Button>
            )}
          />
          <ContactCard
            icon={<BookIcon />}
            title="Knowledge Sharing Night"
            type="active"
            styleClass={styles.card2}
            description="<strong>Duration:</strong> 2 hours <br /><strong>Participants:</strong> ≥ 2"
            button={(
              <Button
                type="secondary"
                styleClass={styles.knowledgeCardButton}
                link={process.env.NEXT_PUBLIC_CALENDLY_SHARING_NIGH_LINK}
              >
                Book Night
              </Button>
            )}
          />
          <ContactCard
            icon={<PresentationIcon />}
            styleClass={styles.card3}
            title="Get your presentation "
            type="active"
            description="Discover more about Simulator.Company."
            input={(
              <Input
                placeholder="Email"
                type="email"
                value={emailPresentation}
                onChange={handleChangeEmailPresentation}
                error={emailErrorPresentation}
              />
            )}
            button={(
              <Button
                type="secondary"
                link=""
                styleClass={styles.knowledgeCardButton}
                onClick={handleSendEmailClickPresentation}
              >
                Get presentation
              </Button>
            )}
          />
          <ContactCard
            icon={<DemoIcon />}
            styleClass={styles.card4}
            title="Request a Demo"
            type="active"
            description="See our product in action. Discover how our solution can transform your business"
            input={(
              <Input
                placeholder="Email"
                type="email"
                value={emailDemo}
                onChange={handleChangeEmailDemo}
                error={emaiDemolError}
              />
            )}
            button={(
              <Button
                type="secondary"
                link=""
                styleClass={styles.knowledgeCardButton}
                onClick={handleSendEmailClickDemo}
              >
                Request Demo
              </Button>
            )}
          />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
