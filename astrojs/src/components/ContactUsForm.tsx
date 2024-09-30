import { useState } from "react";

// Define the possible statuses for the form submission
interface FormStatus {
    status: "success" | "error" | "fetching"; // Status can be 'success', 'error', or 'fetching'
    message?: string; // Optional message to show in the UI
}

export default function ContactUsForm() {
    // Initialize formStatus state to manage the status and message of the form submission
    const [formStatus, setFormStatus] = useState<FormStatus>({ status: "success" });

    // Handle form submission
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission behavior

        // Explicitly type the form fields to ensure TypeScript understands their structure
        const target = event.target as typeof event.target & {
            name: { value: string };
            mail: { value: string };
            subject: { value: string };
            message: { value: string };
        };

        // Get the base URL from environment variables
        const base_url = import.meta.env.PUBLIC_DRUPAL_BASE_URL;

        // Check if the base URL is defined, and return an error if it's not
        if (!base_url) {
            setFormStatus({
                status: "error",
                message: "Base URL is not set. Please check your environment variables.",
            });
            return; // Stop execution if the base URL is missing
        }

        // Set the form status to 'fetching' while waiting for the response
        setFormStatus({ status: "fetching" });

        try {
            // Send the form data to the server via a POST request
            const response = await fetch(`${base_url}/webform_rest/submit`, {
                method: "POST",
                body: JSON.stringify({
                    webform_id: "contact", // The ID of the webform on the server
                    name: target.name.value, // Name from the form
                    email: target.mail.value, // Email from the form
                    subject: target.subject.value, // Subject from the form
                    message: target.message.value, // Message from the form
                }),
                headers: {
                    "Content-Type": "application/json", // Set the content type to JSON
                },
            });

            // Check if the response was not successful, and return an error if it wasn't
            if (!response.ok) {
                throw new Error("Failed to submit the form"); // Throw an error if the request fails
            }

            // If the submission is successful, update the form status to 'success'
            setFormStatus({
                status: "success",
                message: "Your message has been sent.", // Success message to show the user
            });
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            setFormStatus({
                status: "error",
                message: "An error occurred. Please try again.", // Error message to show the user
            });
        }
    }

    return (
        <div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
                {/* Display form status message if available */}
                {formStatus?.message && (
                    <p
                        className={`py-3 px-4 border 
                        ${formStatus?.status === "success" ? 'border-link bg-link/10 text-link' : ''}
                        ${formStatus?.status === "error" ? 'border-error bg-error/10 text-error' : ''}
                    `}
                    >
                        {formStatus.message}
                    </p>
                )}

                {/* Name input field */}
                <div className="grid gap-2">
                    <label htmlFor="name" className="font-semibold text-text">
                        Your Name <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        maxLength={255}
                        required
                        className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
                    />
                </div>

                {/* Email input field */}
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

                {/* Subject input field */}
                <div className="grid gap-2">
                    <label htmlFor="subject" className="font-semibold text-text">
                        Subject <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        maxLength={255}
                        required
                        className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:border-gray"
                    />
                </div>

                {/* Message textarea field */}
                <div className="grid gap-2">
                    <label htmlFor="message" className="font-semibold text-text">
                        Message <span className="text-sm text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        className="h-48 px-2 py-3 border-2 border-gray focus:ring-0 focus:outline-dotted focus:outline-offset-2 focus:border-gray focus:outline-link"
                    ></textarea>
                </div>

                {/* Submit button */}
                <div>
                    <input
                        type="submit"
                        className="px-6 py-3 font-serif text-xl text-white transition-colors border-2 rounded-sm cursor-pointer bg-link hover:bg-white hover:text-black border-link"
                        disabled={formStatus?.status === "fetching"} // Disable button while fetching
                        value={
                            formStatus?.status === "fetching"
                                ? "Please wait" // Change button text while fetching
                                : "Send Message" // Default button text
                        }
                    />
                </div>
            </form>
        </div>
    );
}
