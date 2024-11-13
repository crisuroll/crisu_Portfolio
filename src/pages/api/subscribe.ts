// src/pages/api/subscribe.ts
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Create reusable transporter with environment variables
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_APP_PASSWORD
    },
    // Only enable these in development
    ...(import.meta.env.DEV ? {
        logger: true,
        debug: true
    } : {})
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.json();
        const { email, name = 'Anonymous' } = formData;

        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Please provide a valid email address'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Verify connection configuration before sending
        await transporter.verify();

        // Send email with enhanced template
        await transporter.sendMail({
            from: `"Portfolio Website" <${import.meta.env.EMAIL_USER}>`,
            to: 'cristina.cg9@hotmail.com',
            subject: '🎉 New Newsletter Subscription',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333; text-align: center;">New Newsletter Subscriber!</h1>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
                        <p><strong>Subscriber Email:</strong> ${email}</p>
                        ${name !== 'Anonymous' ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                        <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
                        This email was sent automatically from your portfolio website.
                    </p>
                </div>
            `
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Thank you for subscribing! You will receive our updates soon.'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Subscription error:', error);

        const errorMessage = import.meta.env.DEV
            ? error.message
            : 'Unable to process your subscription at this time.';

        return new Response(
            JSON.stringify({
                success: false,
                message: 'Subscription failed',
                error: errorMessage
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}