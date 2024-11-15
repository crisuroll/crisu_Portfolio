import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // SMTP configuration
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, name = 'Anonymous' } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Website" <${import.meta.env.EMAIL_USER}>`,
      to: 'cristina.cg9@hotmail.com',
      subject: '🎉 New Newsletter Subscription',
      html: `
        <p>New subscriber:</p>
        <p>Email: ${email}</p>
        ${name !== 'Anonymous' ? `<p>Name: ${name}</p>` : ''}
        <p>Subscription date: ${new Date().toLocaleString()}</p>
      `
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Thank you for subscribing!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Subscription error:', error);

    const errorMessage = import.meta.env.DEV
      ? (error as Error).message
      : 'Unable to process your subscription at this time.';

    return new Response(
      JSON.stringify({ success: false, message: 'Subscription failed', error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};