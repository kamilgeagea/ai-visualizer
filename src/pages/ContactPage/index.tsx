import "./ContactPage.scss";
import ContactPageBackground from '../../assets/contact-bg.png';
import GithubIcon from '../../assets/github-icon.png';
import GmailIcon from '../../assets/gmail-icon.png';
import LinkedInIcon from '../../assets/linkedin-icon.png';

import { useContext, ChangeEvent } from 'react';

import { ContactContext } from '../../state';

import { Background, Button, TextField, Alert } from '../../components';

const socials: { key: string; icon: string; to: string }[] = [
  { key: 'LinkedIn', icon: LinkedInIcon, to: 'https://www.linkedin.com/in/kamilgeagea/' },
  { key: 'Github', icon: GithubIcon, to: 'https://github.com/kamilgeagea/' },
  { key: 'Gmail', icon: GmailIcon, to: 'mailto:kamilgeagea8199@@gmail.com' }
];

/**
 * Contact Page
 */

const ContactPage = () => {
  const {
    state: { email, subject, description, loading, error, success },
    setContactEmail,
    setContactSubject,
    setContactDescription,
    submitContactRequest,
    removeContactError,
    removeContactSuccess
  } = useContext(ContactContext);

  return (
    <div className="contact">
      <Background src={ContactPageBackground} />
      { error && <Alert type="error" message={error} onDismiss={removeContactError} /> }
      { success && <Alert type="success" message={success} onDismiss={removeContactSuccess} /> }
      <div className="contact__contact-form">
        <div className="contact__contact-form__title">Contact</div>
        <TextField
          className="contact__contact-form__textfield"
          label="Email"
          placeholder="example@aivisualizer.com"
          name="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContactEmail({ email: e.target.value })}
          disabled={loading}
        />
        <TextField
          className="contact__contact-form__textfield"
          label="Subject"
          placeholder="Report Bug, Suggestion, Request..."
          name="subject"
          value={subject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContactSubject({ subject: e.target.value })}
          disabled={loading}
        />
        <TextField
          className="contact__contact-form__textfield"
          label="Description"
          placeholder="Describe your request"
          name="description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContactDescription({ description: e.target.value })}
          disabled={loading}
          tag="textarea"
        />
        <div className="contact__contact-form__buttons">
          <div className="contact__contact-form__buttons__socials">
            <div className="contact__contact-form__buttons__socials__layout">
              {socials.map(({ key, icon, to }) => (
                <a
                  key={key}
                  href={to}
                  className="contact__contact-form__buttons__socials__layout__social"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    className={`contact__contact-form__buttons__socials__layout__social__image${key === 'Gmail' ? '__gmail' : ''}`}
                    src={icon}
                    alt={key}
                  />
                </a>
              ))}
            </div>
          </div>
          <Button
            title="Submit"
            disabled={loading}
            onClick={() => submitContactRequest({ email, subject, description })}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;