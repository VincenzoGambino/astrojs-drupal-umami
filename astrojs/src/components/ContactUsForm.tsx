import {useState} from "react";
interface FormStatus {
    status: "success" | "error" | "fetching"
    message?: string
}
export default function ContactUsForm() {

    const [formStatus, setFormStatus] = useState<FormStatus>({status: "success"});

    async function handleSubmit(event:any) {
        event.preventDefault()

        const base_url = import.meta.env.DRUPAL_BASE_URL;
        setFormStatus({ status: "fetching" });
        const response = await fetch(
            `${base_url}/webform_rest/submit`,
            {
                method: "POST",
                body: JSON.stringify({
                    webform_id: "contact",
                    name: event.target.name.value,
                    email: event.target.mail.value,
                    subject:event.target.subject.value,
                    message: event.target.message.value
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (!response.ok) {
            return setFormStatus({
                status: "error",
                message: "An error occured. Please try again.",
            })
        }

        return setFormStatus({
            status: "success",
            message: "Your message has been sent.",
        })
    }

    return (
        <div>
            <form
                className={"grid gap-4"}
                onSubmit={handleSubmit}
            >
                {formStatus?.message && (
                    <p className={
                        `py-3 px-4 border 
                        ${formStatus?.status === "success" ? 'border-link bg-link/10 text-link' : ''}
                        ${formStatus?.status === "error" ? 'border-error bg-error/10 text-error': ''}
                        `
                    }
                    >
                        {formStatus.message}
                    </p>
                )}
                <div className="grid gap-2">
                    <label htmlFor="name" className="font-semibold text-text">
                        Your Name <span
                        className="text-sm text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        maxLength={255}
                        required
                        className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="mail" className="font-semibold text-text">
                        Your email address
                        <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        maxLength={255}
                        required
                        className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:ring-0 focus:border-gray"
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="subject"
                           className="font-semibold text-text">
                        Subject <span
                        className="text-sm text-red-500">*</span>
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        maxLength={255}
                        required
                        className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:border-gray"
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="message"
                           className="font-semibold text-text">
                        Message <span
                        className="text-sm text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        className="h-48 px-2 py-3 border-2 border-gray focus:ring-0 focus:outline-dotted focus:outline-offset-2 focus:border-gray focus:outline-link"
                    ></textarea>
                </div>
                <div>
                    <input
                        type="submit"
                        className="px-6 py-3 font-serif text-xl text-white transition-colors border-2 rounded-sm cursor-pointer bg-link hover:bg-white hover:text-black border-link"
                        disabled={formStatus?.status === "fetching"}
                        value={
                            formStatus?.status === "fetching"
                                ? "Please wait"
                                : "Send Message"
                        }
                    />
                </div>
            </form>
        </div>
    )
}