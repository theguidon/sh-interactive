import React from "react"
import styled from "styled-components"

const ContactUsSection = styled.section`
  display: flex;
  min-height: 60vh;

  .content-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f8ff;
    flex: 1;
    padding-left: 6%;
    padding-right: 6%;

    h2 {
      font-size: 36px;
      line-height: 1.2;
      font-family: "Tiempos Text", serif;
    }
  }

  .form-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #cfd3e0;
    padding: 48px 6.6%;
    flex: 1;

    > input,
    textarea {
      max-width: 564px;
      width: 100%;
      font-family: inherit;
      font-size: 14px;
      padding: 8px 12px;
    }

    > textarea {
      resize: none;
      margin-bottom: 24px;
    }

    > input:first-of-type {
      margin-bottom: 16px;
    }

    label {
      font-family: "Tiempos Text", serif;
      font-size: 18px;
      margin-bottom: 8px;
    }

    > button {
      align-self: flex-start;
      color: #f6f7f9;
      background-color: #001533;
      border: 0;
      padding: 16px 60px;
      font-family: "Tiempos Text", serif;
      font-size: 18px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;

    .content-panel {
      background-color: #cfd3e0;

      padding-left: 6.6%;
      padding-top: 24px;

      justify-content: flex-start;
      h2 {
        max-width: auto;
      }
    }
  }
`

export default function ContactUs() {
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  function submitForm(e) {
    e.preventDefault()

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSdU37o4XaEgmodHuePSkrR15bK1U_ipVr2MMXYil2aQaviY8w/formResponse?entry.627012164=${email}&entry.29846093=${message}`

    typeof window !== "undefined" && window.open(url, "_blank")
    setEmail("")
    setMessage("")
  }

  return (
    <ContactUsSection>
      <div className="content-panel">
        <h2>Have questions, leads, or suggestions?</h2>
      </div>

      <form
        action="/"
        method="POST"
        className="form-panel"
        onSubmit={submitForm}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name=""
          id="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="message">Question</label>
        <textarea
          name=""
          id="message"
          cols="30"
          rows="10"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </ContactUsSection>
  )
}
