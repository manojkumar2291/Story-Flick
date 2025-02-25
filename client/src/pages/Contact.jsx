import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'

import { containerAnim, animation, button, inputAnim } from '../animations/contact'

const Contact = () => {
	const formRef = useRef(null)
	const [isSending, setIsSending] = useState(false)

	const sendEmail = e => {
		setIsSending(true)
		e.preventDefault()

		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICEID,
				process.env.REACT_APP_TEMPLATEID,
				formRef.current,
				process.env.REACT_APP_USERID
			)
			.then(
				result => {
					setIsSending(false)
					e.target.reset()
					toast.success('Email send Successful! 👍', {
						position: 'bottom-center',
						className: 'toast',
					})
				},
				error => {
					setIsSending(false)
					toast.error('Email send failed! 😢', { position: 'bottom-center', className: 'toast' })
				}
			)
	}

	useEffect(() => {
		containerAnim('Info')
		containerAnim('Form')
		animation()
		button()
		inputAnim()
	}, [])

	return (
		<section className="contact">
			<Toaster />
			<div className="container">
				<div className="contact-info contactInfo">
					<div>
						<h2>Contact Info</h2>
						<ul className="info">
							<li className="infolist__user">
								<span>
									<i className="fas fa-user"></i>
								</span>
								<span>Podapati Manoj Kumar</span>
							</li>
							<li className="infolist__email">
								<span>
									<i className="fas fa-envelope"></i>
								</span>
								<span>podapatimanoj22@gmail.com</span>
							</li>
							<li className="infolist__phone">
								<span>
									<i className="fas fa-phone"></i>
								</span>
								<span>+91 7032548453</span>
							</li>
							<li className="infolist__location">
								<span>
									<i className="fas fa-map-marker-alt"></i>
								</span>
								<span>
								 	1-16, Kakutur, <br />
									Nellore,Andhra Pradesh <br />
									Nekunampuram- 523113.
								</span>
							</li>
						</ul>
					</div>
					<ul className="sci">
						
						<li>
							<a href="https://instagram.com/manoj_kumar_2291" target="_blank" rel="noreferrer">
								<i className="fab fa-instagram-square"></i>
							</a>
						</li>
						
						<li>
							<a
								href="https://www.linkedin.com/in/podapati-manoj-kumar-2718a1249/"
								target="_blank"
								rel="noreferrer"
							>
								<i className="fab fa-linkedin"></i>
							</a>
						</li>
						<li>
							<a href="https://github.com/manojkumar2291" target="_blank" rel="noreferrer">
								<i className="fab fa-github-square"></i>
							</a>
						</li>
					</ul>
				</div>
				<form className="contactForm" ref={formRef} onSubmit={sendEmail}>
					<h2>Send a message</h2>
					<div className="formBox">
						<div className="inputBox w50 fname">
							<input type="text" name="fname" required />
							<span>First name</span>
						</div>
						<div className="inputBox w50 lname">
							<input type="text" name="lname" required />
							<span>Last name</span>
						</div>
						<div className="inputBox w50 email">
							<input type="email" name="email" required />
							<span>Email Address</span>
						</div>
						<div className="inputBox w50 phone">
							<input type="number" maxLength="10" name="number" required />
							<span>Phone Number</span>
						</div>
						<div className="inputBox w100 message">
							<textarea type="text" name="message" maxLength="150" required></textarea>
							<span>Write your message here...</span>
						</div>
						<div className="inputBox w100 btn-submit">
							{isSending ? (
								<button type="submit">
									Sending...<i className="fas fa-paper-plane"></i>
								</button>
							) : (
								<button type="submit">
									Send<i className="fas fa-paper-plane"></i>
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Contact
